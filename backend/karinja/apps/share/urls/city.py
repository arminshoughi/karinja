from django.urls import path

from .. import views

urlpatterns = [
    path('states/<int:state_id>/cities/', views.CityList.as_view()),
]

