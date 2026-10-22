from django.db import models


KERALA_DISTRICTS = [
    ('Alappuzha', 'Alappuzha'),
    ('Ernakulam', 'Ernakulam (Kochi)'),
    ('Idukki', 'Idukki'),
    ('Kannur', 'Kannur'),
    ('Kasaragod', 'Kasaragod'),
    ('Kollam', 'Kollam'),
    ('Kottayam', 'Kottayam'),
    ('Kozhikode', 'Kozhikode (Calicut)'),
    ('Malappuram', 'Malappuram'),
    ('Palakkad', 'Palakkad'),
    ('Pathanamthitta', 'Pathanamthitta'),
    ('Thiruvananthapuram', 'Thiruvananthapuram (Trivandrum)'),
    ('Thrissur', 'Thrissur'),
    ('Wayanad', 'Wayanad'),
]

INQUIRY_ROLES = [
    ('commuter', 'Regular Commuter / Passenger'),
    ('bus_operator', 'Private Bus Owner / Operator'),
    ('investor', 'Ecosystem Partner / Institutional'),
    ('media', 'Media & Press Inquiry'),
]


class WaitlistEntry(models.Model):
    QUEUE_BASE = 10420

    email = models.EmailField(
        unique=True,
        max_length=254,
        db_index=True,
        help_text="Primary email address of the waitlist subscriber."
    )
    full_name = models.CharField(
        max_length=150,
        blank=True,
        default="",
        help_text="Optional full name of the user."
    )
    phone_number = models.CharField(
        max_length=25,
        blank=True,
        default="",
        help_text="Optional mobile contact number."
    )
    district = models.CharField(
        max_length=50,
        choices=KERALA_DISTRICTS,
        blank=True,
        default="",
        help_text="Preferred travel district in Kerala."
    )
    consent_updates = models.BooleanField(
        default=True,
        help_text="User consent for receiving product updates and notifications."
    )
    queue_number = models.PositiveIntegerField(
        unique=True,
        blank=True,
        null=True,
        db_index=True,
        help_text="Official assigned queue position number."
    )
    ip_address = models.GenericIPAddressField(
        null=True,
        blank=True,
        help_text="IP address recorded during waitlist submission."
    )
    user_agent = models.CharField(
        max_length=300,
        blank=True,
        default="",
        help_text="Browser/client user-agent header."
    )
    created_at = models.DateTimeField(
        auto_now_add=True,
        db_index=True,
        help_text="Timestamp of waitlist registration."
    )

    class Meta:
        verbose_name = "Waitlist Registration"
        verbose_name_plural = "Waitlist Registrations"
        ordering = ['-created_at']

    def save(self, *args, **kwargs):
        if not self.queue_number:
            last_entry = WaitlistEntry.objects.order_by('-queue_number').first()
            if last_entry and last_entry.queue_number:
                self.queue_number = max(last_entry.queue_number + 1, self.QUEUE_BASE + 1)
            else:
                self.queue_number = self.QUEUE_BASE + 1
        super().save(*args, **kwargs)

    def __str__(self):
        name_str = f" ({self.full_name})" if self.full_name else ""
        return f"#{self.queue_number} - {self.email}{name_str}"


class ContactInquiry(models.Model):
    name = models.CharField(max_length=150)
    email = models.EmailField(max_length=254)
    role = models.CharField(max_length=50, choices=INQUIRY_ROLES, default='commuter')
    message = models.TextField()
    ip_address = models.GenericIPAddressField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Contact Inquiry"
        verbose_name_plural = "Contact Inquiries"
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.name} ({self.get_role_display()}) - {self.email}"
