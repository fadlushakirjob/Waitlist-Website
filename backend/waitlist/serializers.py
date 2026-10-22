import re
from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from .models import WaitlistEntry, KERALA_DISTRICTS


class WaitlistJoinSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
        validators=[
            UniqueValidator(
                queryset=WaitlistEntry.objects.all(),
                message="You are already on the waitlist! Your reserved spot has been secured."
            )
        ]
    )
    # Honeypot field for anti-bot spam protection
    website_hp = serializers.CharField(
        required=False,
        allow_blank=True,
        write_only=True
    )

    class Meta:
        model = WaitlistEntry
        fields = [
            'id',
            'email',
            'full_name',
            'phone_number',
            'district',
            'consent_updates',
            'queue_number',
            'created_at',
            'website_hp',
        ]
        read_only_fields = ['id', 'queue_number', 'created_at']

    def validate_email(self, value):
        normalized = value.strip().lower()
        if not normalized or '@' not in normalized or '.' not in normalized:
            raise serializers.ValidationError("Please provide a valid email address.")
        return normalized

    def validate_phone_number(self, value):
        if not value:
            return ""
        cleaned = re.sub(r'[\s\-\(\)]', '', value)
        if len(cleaned) < 7:
            raise serializers.ValidationError("Please provide a valid contact number.")
        return cleaned

    def validate(self, attrs):
        # Honeypot check: automated spam bots fill invisible fields
        if attrs.get('website_hp'):
            raise serializers.ValidationError("Spam submission detected.")
        attrs.pop('website_hp', None)
        return attrs


class WaitlistAdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = WaitlistEntry
        fields = '__all__'
