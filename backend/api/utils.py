from django.core.mail import send_mail
from django.conf import settings

def send_order_confirmation_email(user_email):
    subject = "Order Confirmation"
    message = "Your order has been confirmed. Thank you for shopping with us!"
    from_email = settings.DEFAULT_FROM_EMAIL
    recipient_list = [user_email]

    send_mail(subject, message, from_email, recipient_list)