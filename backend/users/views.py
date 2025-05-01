from django.forms import ValidationError
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404, redirect
from django.contrib.auth import get_user_model
from rest_framework import generics, permissions, status


from django.http import JsonResponse

def test_connection(request):
    return JsonResponse({'status': 'Django connected successfully'})