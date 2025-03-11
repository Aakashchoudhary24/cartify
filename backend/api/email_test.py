import smtplib
from email.mime.text import MIMEText
from django.conf import settings

# Your Gmail credentials (Use App Password)
EMAIL_HOST = "smtp.gmail.com"
EMAIL_PORT = 587
EMAIL_HOST_USER = ""  # Replace with your Gmail
EMAIL_HOST_PASSWORD = ""  # Generate App Password from Google

# Receiver Email
to_email = ""  # Replace with your test email

# Email Content
subject = "Test Email from Django"
body = "Hello! This is a test email sent using Django and Gmail SMTP."

# Create email
msg = MIMEText(body)
msg["Subject"] = subject
msg["From"] = EMAIL_HOST_USER
msg["To"] = to_email

# Send email using SMTP
def send_test_email():
    try:
        server = smtplib.SMTP(EMAIL_HOST, EMAIL_PORT)
        server.starttls()
        server.login(EMAIL_HOST_USER, EMAIL_HOST_PASSWORD)
        server.sendmail(EMAIL_HOST_USER, to_email, msg.as_string())
        server.quit()
        print("✅ Email sent successfully!")
    except Exception as e:
        print(f"❌ Failed to send email: {e}")

# Run the function to send email
if __name__ == "__main__":
    send_test_email()
