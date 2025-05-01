from djoser import email
from django.template.loader import render_to_string
from django.core.mail import EmailMultiAlternatives

class CustomActivationEmail(email.ActivationEmail):
    template_name = 'email/activation.html'

    def get_context_data(self):
        context = super().get_context_data()
        context['user'] = self.user
        context['activation_url'] = self.context.get('activation_url')
        return context

    def send(self, to):
        context = self.get_context_data()
        subject = self.subject
        body = render_to_string(self.template_name, context)
        msg = EmailMultiAlternatives(subject, body, None, [to])
        msg.attach_alternative(body, "text/html")
        msg.send()
