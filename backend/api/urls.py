from django.contrib import admin
from django.urls import path
from strawberry.django.views import GraphQLView
from .schema import schema
from chowkidar.view import auth_enabled_view

admin.site.site_header = "Cartify"
admin.site.site_title = "Cartify Admin Portal"
admin.site.index_title = "Welcome to Cartify"

urlpatterns = [
    path('admin/', admin.site.urls),
    path("auth/", auth_enabled_view(GraphQLView.as_view(schema=schema))),
]
