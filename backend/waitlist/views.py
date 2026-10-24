import csv
from datetime import datetime
from django.http import HttpResponse
from django.db.models import Count, Q
from django.conf import settings
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny

from .models import WaitlistEntry, ContactInquiry, KERALA_DISTRICTS
from .serializers import WaitlistJoinSerializer, WaitlistAdminSerializer
from .emails import send_waitlist_welcome_email, send_contact_inquiry_notification


def get_client_ip(request):
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        ip = x_forwarded_for.split(',')[0].strip()
    else:
        ip = request.META.get('REMOTE_ADDR')
    return ip


def verify_admin_key(request):
    token = request.headers.get('X-Admin-Key') or request.GET.get('admin_key')
    if token:
        token = str(token).strip()
    expected = str(getattr(settings, 'ADMIN_DASHBOARD_KEY', 'travelzync_admin_2026')).strip()
    return token == expected or (request.user and request.user.is_staff)


class DistrictChoicesView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        districts = [{"code": code, "name": label} for code, label in KERALA_DISTRICTS]
        return Response(districts)


class WaitlistJoinView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = WaitlistJoinSerializer(data=request.data)
        if serializer.is_valid():
            ip_addr = get_client_ip(request)
            user_agent = request.META.get('HTTP_USER_AGENT', '')[:300]

            entry = serializer.save(
                ip_address=ip_addr,
                user_agent=user_agent
            )

            # Trigger automated confirmation email
            send_waitlist_welcome_email(entry)

            total_count = WaitlistEntry.objects.count()

            return Response({
                "success": True,
                "message": "Welcome aboard! Your spot on the TravelZync waitlist is confirmed.",
                "queue_number": entry.queue_number,
                "total_registered": total_count,
                "data": {
                    "id": entry.id,
                    "email": entry.email,
                    "full_name": entry.full_name,
                    "district": entry.district,
                    "created_at": entry.created_at
                }
            }, status=status.HTTP_201_CREATED)

        errors = serializer.errors
        first_error_msg = "Please check your information and try again."
        if "email" in errors:
            first_error_msg = errors["email"][0]
        elif "non_field_errors" in errors:
            first_error_msg = errors["non_field_errors"][0]

        return Response({
            "success": False,
            "message": first_error_msg,
            "errors": errors
        }, status=status.HTTP_400_BAD_REQUEST)


class ContactInquiryView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        name = request.data.get('name', '').strip()
        email = request.data.get('email', '').strip()
        role = request.data.get('role', 'commuter')
        message = request.data.get('message', '').strip()

        if not name or not email or not message:
            return Response(
                {"success": False, "message": "Name, email and message are required."},
                status=status.HTTP_400_BAD_REQUEST
            )

        ip_addr = get_client_ip(request)
        inquiry = ContactInquiry.objects.create(
            name=name,
            email=email,
            role=role,
            message=message,
            ip_address=ip_addr
        )

        send_contact_inquiry_notification(inquiry)

        return Response({
            "success": True,
            "message": "Thank you! Your message has been received by TravelZync Labs."
        })


class WaitlistStatsView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        total_registered = WaitlistEntry.objects.count()
        district_counts = (
            WaitlistEntry.objects.exclude(district='')
            .values('district')
            .annotate(count=Count('id'))
            .order_by('-count')
        )

        public_counter = 10000 + total_registered

        return Response({
            "total_registered": total_registered,
            "public_display_count": public_counter,
            "target_buses": "300+ Private Buses",
            "starting_region": "Kerala, India",
            "districts_breakdown": list(district_counts)
        })


class WaitlistAdminListView(APIView):
    def get(self, request):
        if not verify_admin_key(request):
            return Response(
                {"error": "Unauthorized: Admin access key required."},
                status=status.HTTP_401_UNAUTHORIZED
            )

        queryset = WaitlistEntry.objects.all()

        search = request.GET.get('search', '').strip()
        if search:
            queryset = queryset.filter(
                Q(email__icontains=search) |
                Q(full_name__icontains=search) |
                Q(phone_number__icontains=search)
            )

        district = request.GET.get('district', '').strip()
        if district:
            queryset = queryset.filter(district__iexact=district)

        date_from = request.GET.get('date_from', '').strip()
        date_to = request.GET.get('date_to', '').strip()
        if date_from:
            try:
                dt_from = datetime.strptime(date_from, "%Y-%m-%d")
                queryset = queryset.filter(created_at__date__gte=dt_from.date())
            except ValueError:
                pass

        if date_to:
            try:
                dt_to = datetime.strptime(date_to, "%Y-%m-%d")
                queryset = queryset.filter(created_at__date__lte=dt_to.date())
            except ValueError:
                pass

        total_matching = queryset.count()
        serializer = WaitlistAdminSerializer(queryset, many=True)

        return Response({
            "total_count": total_matching,
            "registrations": serializer.data
        })


class WaitlistAdminExportCSVView(APIView):
    def get(self, request):
        if not verify_admin_key(request):
            return Response(
                {"error": "Unauthorized: Admin access key required."},
                status=status.HTTP_401_UNAUTHORIZED
            )

        queryset = WaitlistEntry.objects.all().order_by('-created_at')

        search = request.GET.get('search', '').strip()
        if search:
            queryset = queryset.filter(
                Q(email__icontains=search) |
                Q(full_name__icontains=search)
            )

        district = request.GET.get('district', '').strip()
        if district:
            queryset = queryset.filter(district__iexact=district)

        response = HttpResponse(content_type='text/csv')
        filename = f"travelzync_waitlist_{datetime.now().strftime('%Y%m%d_%H%M%S')}.csv"
        response['Content-Disposition'] = f'attachment; filename="{filename}"'

        writer = csv.writer(response)
        writer.writerow([
            'Queue #',
            'Email Address',
            'Full Name',
            'Mobile Number',
            'District (Kerala)',
            'Consent Updates',
            'Registration Date',
            'Registration Time (UTC)',
            'IP Address'
        ])

        for entry in queryset:
            writer.writerow([
                entry.queue_number or '',
                entry.email,
                entry.full_name or '',
                entry.phone_number or '',
                entry.district or 'Not specified',
                'Yes' if entry.consent_updates else 'No',
                entry.created_at.strftime('%Y-%m-%d'),
                entry.created_at.strftime('%H:%M:%S'),
                entry.ip_address or ''
            ])

        return response


class WaitlistAdminDeleteView(APIView):
    def delete(self, request, pk):
        if not verify_admin_key(request):
            return Response(
                {"error": "Unauthorized: Admin access key required."},
                status=status.HTTP_401_UNAUTHORIZED
            )

        try:
            entry = WaitlistEntry.objects.get(pk=pk)
            entry.delete()
            return Response({"success": True, "message": "Waitlist entry deleted successfully."})
        except WaitlistEntry.DoesNotExist:
            return Response({"error": "Entry not found."}, status=status.HTTP_404_NOT_FOUND)
