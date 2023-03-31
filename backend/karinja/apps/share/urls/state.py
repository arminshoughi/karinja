from django.urls import path

from .. import views

urlpatterns = [
    path('states/', views.StateList.as_view()),
]
