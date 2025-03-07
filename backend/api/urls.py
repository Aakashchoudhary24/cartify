from django.contrib import admin
from django.urls import path
from strawberry.django.views import GraphQLView
from .schema import schema
from chowkidar.view import auth_enabled_view
from strawberry.django.views import GraphQLView

urlpatterns = [
    path('admin/', admin.site.urls),
    path("auth/", auth_enabled_view(GraphQLView.as_view(schema=schema))),

    path("graphql/", GraphQLView.as_view(schema=schema)),


]
