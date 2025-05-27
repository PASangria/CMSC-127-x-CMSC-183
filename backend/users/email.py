from djoser import email 
from django.utils import timezone

class ActivationEmail(email.ActivationEmail):
    template_name = "email/activation.html"
    
    def get_context_data(self):
        context = super().get_context_data()
        context['year'] = timezone.now().year  
        return context
    
class ConfirmationEmail(email.ConfirmationEmail):
    template_name = "email/confirmation.html"

class PasswordResetEmail(email.PasswordResetEmail):
    template_name = "email/password_reset.html"

class PasswordChangedConfirmationEmail(email.PasswordChangedConfirmationEmail):
    template_name = "email/password_changed_confirmation.html"
