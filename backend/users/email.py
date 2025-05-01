from djoser.email import ActivationEmail, PasswordResetEmail
from django.conf import settings

class CustomBaseEmail:
    def get_context_data(self, user, *args, **kwargs):
        context = super().get_context_data(user, *args, **kwargs)
        # Replace the URLs with the correct frontend URL base (e.g., Vite URL or production URL)
        context['url'] = self.get_custom_url(user, context['url'])
        return context

    def get_custom_url(self, user, url):
        # General method to replace the domain part of the URL with the frontend URL
        return url.replace("localhost:8000", settings.SITE_URL)

class CustomActivationEmail(CustomBaseEmail, ActivationEmail):
    pass

class CustomPasswordResetEmail(CustomBaseEmail, PasswordResetEmail):
    pass