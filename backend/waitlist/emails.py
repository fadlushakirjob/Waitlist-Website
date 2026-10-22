import logging
import threading
from django.core.mail import EmailMultiAlternatives
from django.conf import settings

logger = logging.getLogger(__name__)


def _send_email_async(email_message):
    try:
        email_message.send(fail_silently=False)
        logger.info(f"Email successfully dispatched to {email_message.to}")
    except Exception as e:
        logger.warning(f"Could not send email to {email_message.to}: {e}")


def send_waitlist_welcome_email(entry):
    """
    Sends a branded, responsive HTML confirmation email to the waitlist subscriber.
    Dispatched in a separate thread so API response is instantaneous and resilient.
    """
    recipient = entry.email
    queue_no = entry.queue_number or "Confirmed"
    name = entry.full_name or "Commuter"
    district = entry.district or "Kerala"

    subject = f"Welcome to TravelZync! Your Waitlist Spot #{queue_no} is Confirmed"
    from_email = getattr(settings, 'DEFAULT_FROM_EMAIL', 'TravelZync Labs <travelzynclabs@gmail.com>')

    plain_text = f"""
Hello {name},

Thank you for joining the TravelZync waitlist!

Your priority queue position is: #{queue_no}
Preferred District: {district}

TravelZync was built with a clear mission: to transform public transportation in Kerala through technology and innovation. From real-time bus tracking and digital ticketing to AI-powered travel assistance, we are working towards making everyday journeys smarter, simpler, and more convenient.

What is coming next:
- Real-time bus telemetry across private and KSRTC fleets
- Cashless QR digital ticketing (zero loose change disputes)
- AI multi-modal travel assistant for daily commuters
- Smart ETA and crowd density predictions

We will notify you the moment early access beta invites open in {district}.

Follow our journey on:
- LinkedIn: https://linkedin.com/company/travelzync
- Instagram: https://instagram.com/travelzync
- Official Website: https://travelzync.com

Warm regards,
The TravelZync Labs Team
"Your journey perfectly synced."
"""

    html_content = f"""
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body {{ font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 0; color: #1e293b; }}
    .container {{ max-width: 600px; margin: 30px auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.06); border: 1px solid #e2e8f0; }}
    .header {{ background: #ED1C24; padding: 32px 24px; text-align: center; color: #ffffff; }}
    .header h1 {{ margin: 0; font-size: 26px; font-weight: 800; letter-spacing: -0.5px; }}
    .header p {{ margin: 6px 0 0; font-size: 14px; opacity: 0.9; font-style: italic; }}
    .content {{ padding: 36px 32px; }}
    .greeting {{ font-size: 18px; font-weight: 700; color: #0f172a; margin-bottom: 12px; }}
    .badge-box {{ background: #fff1f2; border: 1.5px dashed #fca5a5; border-radius: 12px; padding: 20px; text-align: center; margin: 24px 0; }}
    .badge-label {{ font-size: 12px; text-transform: uppercase; font-weight: 700; color: #991b1b; letter-spacing: 1px; }}
    .badge-number {{ font-size: 38px; font-weight: 800; color: #ED1C24; margin: 4px 0; }}
    .badge-sub {{ font-size: 13px; color: #64748b; }}
    .features-list {{ margin: 24px 0; padding: 0; list-style: none; }}
    .features-list li {{ padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-size: 14px; color: #334155; }}
    .check {{ color: #ED1C24; font-weight: bold; margin-right: 8px; font-size: 15px; }}
    .cta-button {{ display: inline-block; background: #ED1C24; color: #ffffff !important; text-decoration: none; padding: 12px 28px; border-radius: 9999px; font-weight: 700; font-size: 14px; margin-top: 20px; }}
    .footer {{ background: #0f172a; padding: 24px; text-align: center; font-size: 12px; color: #94a3b8; }}
    .footer a {{ color: #ffffff; text-decoration: none; margin: 0 8px; }}
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>TravelZync Labs</h1>
      <p>Your journey perfectly synced.</p>
    </div>
    <div class="content">
      <div class="greeting">Hello {name},</div>
      <p style="font-size: 15px; line-height: 1.6; color: #475569;">
        Thank you for reserving early access on the official <strong>TravelZync</strong> waitlist. We are thrilled to welcome you to the future of public transportation in Kerala.
      </p>

      <div class="badge-box">
        <div class="badge-label">Your Reserved Queue Position</div>
        <div class="badge-number">#{queue_no}</div>
        <div class="badge-sub">Registered for {district} Pilot Rollout</div>
      </div>

      <h3 style="font-size: 16px; color: #0f172a; margin-top: 28px;">What TravelZync Brings to Your Daily Commute:</h3>
      <ul class="features-list">
        <li><span class="check">[OK]</span> <strong>Real-Time Bus Tracking:</strong> Live GPS fleet locations and accurate stop ETAs.</li>
        <li><span class="check">[OK]</span> <strong>100% Cashless Ticketing:</strong> Quick QR boarding pass, zero change hassles.</li>
        <li><span class="check">[OK]</span> <strong>AI Travel Assistant:</strong> Multi-modal route guidance in Malayalam and English.</li>
        <li><span class="check">[OK]</span> <strong>Crowd Prediction:</strong> View passenger density before your bus arrives.</li>
      </ul>

      <p style="font-size: 14px; color: #64748b; line-height: 1.6;">
        We will notify you immediately when early access beta invitations open for your route.
      </p>

      <div style="text-align: center; margin: 28px 0 10px;">
        <a href="https://travelzync.com" class="cta-button">Visit Official Website</a>
      </div>
    </div>
    <div class="footer">
      <p style="margin: 0 0 10px;">(c) 2026 TravelZync Labs Private Limited - Calicut and Kochi, Kerala, India</p>
      <div>
        <a href="https://linkedin.com/company/travelzync">LinkedIn</a> |
        <a href="https://instagram.com/travelzync">Instagram</a> |
        <a href="https://travelzync.com">travelzync.com</a>
      </div>
    </div>
  </div>
</body>
</html>
"""

    msg = EmailMultiAlternatives(
        subject=subject,
        body=plain_text,
        from_email=from_email,
        to=[recipient],
    )
    msg.attach_alternative(html_content, "text/html")

    thread = threading.Thread(target=_send_email_async, args=(msg,))
    thread.daemon = True
    thread.start()


def send_contact_inquiry_notification(inquiry):
    """
    Notifies the TravelZync team of a new contact inquiry from the website.
    """
    subject = f"New Inquiry: {inquiry.name} ({inquiry.get_role_display()})"
    from_email = getattr(settings, 'DEFAULT_FROM_EMAIL', 'TravelZync Labs <travelzynclabs@gmail.com>')
    admin_recipient = getattr(settings, 'ADMIN_NOTIFICATION_EMAIL', 'contact@travelzync.com')

    body = f"""
New Inquiry Received on TravelZync Website:

Name: {inquiry.name}
Email: {inquiry.email}
Role: {inquiry.get_role_display()}
Message:
{inquiry.message}

Received at: {inquiry.created_at}
IP Address: {inquiry.ip_address}
"""

    msg = EmailMultiAlternatives(
        subject=subject,
        body=body,
        from_email=from_email,
        to=[admin_recipient],
    )

    thread = threading.Thread(target=_send_email_async, args=(msg,))
    thread.daemon = True
    thread.start()
