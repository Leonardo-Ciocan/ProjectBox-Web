from django import forms
from django.contrib.auth.models import User
from django.core.validators import validate_email


class SignupForm(forms.Form):
    username = forms.CharField(label="Username" , min_length=3 , max_length=100 , required=True)
    password = forms.CharField(label="Password" , widget=forms.PasswordInput , required=True)
    email = forms.EmailField(required=False)

    def clean_username(self):
        username = self.cleaned_data['username']
        if username_present(username):
            raise forms.ValidationError("That username is taken")

        return username

    def clean_email(self):
        email = self.cleaned_data['email']
        if email == "":
            return email
        validate_email( self.cleaned_data['email'] )
        if email_present(email):
            raise forms.ValidationError("That email is already used.")
        return email


def username_present(username):
    if User.objects.filter(username=username).exists():
        return True

    return False


def email_present(email):
    if User.objects.filter(email=email).exists():
        return True
    return False