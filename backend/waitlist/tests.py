from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status
from .models import WaitlistEntry


class WaitlistAPITests(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_join_waitlist_success(self):
        url = reverse('waitlist-join')
        data = {
            'email': 'commuter.test@keralabus.in',
            'full_name': 'Test Commuter',
            'phone_number': '+91 98950 12345',
            'district': 'Kozhikode',
            'consent_updates': True,
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(response.data['success'])
        self.assertIn('queue_number', response.data)
        self.assertTrue(WaitlistEntry.objects.filter(email='commuter.test@keralabus.in').exists())

    def test_duplicate_email_prevention(self):
        url = reverse('waitlist-join')
        data = {
            'email': 'duplicate.test@keralabus.in',
            'full_name': 'First Entry',
            'district': 'Ernakulam',
            'consent_updates': True,
        }
        res1 = self.client.post(url, data, format='json')
        self.assertEqual(res1.status_code, status.HTTP_201_CREATED)

        # Submit duplicate
        res2 = self.client.post(url, data, format='json')
        self.assertEqual(res2.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertFalse(res2.data['success'])
        self.assertIn('already on the waitlist', res2.data['message'])

    def test_spam_honeypot_rejection(self):
        url = reverse('waitlist-join')
        data = {
            'email': 'spambot@example.com',
            'website_hp': 'http://spambot-link.com',
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_waitlist_stats(self):
        url = reverse('waitlist-stats')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('total_registered', response.data)
        self.assertIn('public_display_count', response.data)
