from django.urls import path
from .views import (
    WaitlistJoinView,
    WaitlistStatsView,
    WaitlistAdminListView,
    WaitlistAdminExportCSVView,
    WaitlistAdminDeleteView,
    DistrictChoicesView,
)

urlpatterns = [
    path('join/', WaitlistJoinView.as_view(), name='waitlist-join'),
    path('stats/', WaitlistStatsView.as_view(), name='waitlist-stats'),
    path('districts/', DistrictChoicesView.as_view(), name='waitlist-districts'),
    path('admin/registrations/', WaitlistAdminListView.as_view(), name='waitlist-admin-list'),
    path('admin/export-csv/', WaitlistAdminExportCSVView.as_view(), name='waitlist-admin-export-csv'),
    path('admin/registrations/<int:pk>/', WaitlistAdminDeleteView.as_view(), name='waitlist-admin-delete'),
]
