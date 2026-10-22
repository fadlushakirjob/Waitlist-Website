from django.contrib import admin
from django.urls import path, include
from django.http import JsonResponse

def api_root(request):
    return JsonResponse({
        "service": "TravelZync Waitlist API",
        "company": "TravelZync Labs Private Limited",
        "tagline": "Your journey perfectly synced.",
        "status": "online",
        "endpoints": {
            "join": "/api/waitlist/join/",
            "stats": "/api/waitlist/stats/",
            "districts": "/api/waitlist/districts/",
            "admin_list": "/api/waitlist/admin/registrations/",
            "admin_export_csv": "/api/waitlist/admin/export-csv/",
            "django_admin": "/admin/"
        }
    })

urlpatterns = [
    path('', api_root, name='api-root'),
    path('admin/', admin.site.urls),
    path('api/waitlist/', include('waitlist.urls')),
]
