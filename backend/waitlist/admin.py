import csv
from datetime import datetime
from django.contrib import admin
from django.http import HttpResponse
from .models import WaitlistEntry


@admin.action(description="Export selected registrations to CSV")
def export_selected_to_csv(modeladmin, request, queryset):
    response = HttpResponse(content_type='text/csv')
    filename = f"travelzync_admin_export_{datetime.now().strftime('%Y%m%d_%H%M%S')}.csv"
    response['Content-Disposition'] = f'attachment; filename="{filename}"'

    writer = csv.writer(response)
    writer.writerow([
        'Queue #',
        'Email Address',
        'Full Name',
        'Mobile Number',
        'District',
        'Consent Updates',
        'Created Date',
        'Created Time (UTC)',
        'IP Address'
    ])

    for obj in queryset:
        writer.writerow([
            obj.queue_number,
            obj.email,
            obj.full_name,
            obj.phone_number,
            obj.district or 'N/A',
            'Yes' if obj.consent_updates else 'No',
            obj.created_at.strftime('%Y-%m-%d'),
            obj.created_at.strftime('%H:%M:%S'),
            obj.ip_address or ''
        ])

    return response


@admin.register(WaitlistEntry)
class WaitlistEntryAdmin(admin.ModelAdmin):
    list_display = (
        'queue_number',
        'email',
        'full_name',
        'phone_number',
        'district',
        'consent_updates',
        'created_at',
    )
    list_display_links = ('queue_number', 'email')
    search_fields = ('email', 'full_name', 'phone_number', 'district')
    list_filter = ('district', 'consent_updates', 'created_at')
    date_hierarchy = 'created_at'
    readonly_fields = ('queue_number', 'ip_address', 'user_agent', 'created_at')
    actions = [export_selected_to_csv]
    ordering = ('-created_at',)
