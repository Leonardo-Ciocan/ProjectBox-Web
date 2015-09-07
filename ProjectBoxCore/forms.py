from django import forms
from django.contrib.auth.models import User


class SignupForm(forms.Form):
    username = forms.CharField(label="Username" , max_length=100)
    password = forms.CharField(label="Password" , widget=forms.PasswordInput , required=True)

    def clean(self):
        username = self.cleaned_data['username']
        email = self.cleaned_data['email']
        if username_present(username):
            raise forms.ValidationError("That username is taken")
        if email_present(email):
            raise forms.ValidationError("That email is already used.")


def username_present(username):
    if User.objects.filter(username=username).exists():
        return True

    return False


def email_present(username):
    if User.objects.filter(username=username).exists():
        return True
    return False