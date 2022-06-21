from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.forms import TextInput, Textarea, CharField
from django import forms
from django.db import models
from .models import UserProfile, Company

class UserAdminConfig(UserAdmin):
    model = UserProfile
    # search_fields = ('email', 'username',)
    # list_filter = ('email', 'username',)
    # ordering = ('-username',)
    # list_display = ('id', 'email', 'username',)
    # fieldsets = (
    #     (None, {'fields': ('email', 'username',)}),
    #     # ('Permissions', {'fields': ('is_staff', 'is_active')}),
    # )
    # formfield_overrides = {
    #     models.TextField: {'widget': Textarea(attrs={'rows': 20, 'cols': 60})},
    # }
    # add_fieldsets = (
    #     (None, {
    #         'classes': ('wide',),
    #         'fields': ('email', 'username', 'password1', 'password2', 'is_active', 'is_staff')}
    #      ),
    # )


admin.site.register(UserProfile)
admin.site.register(Company)

# @admin.register(models.Company)
# class CompanyAdmin(admin.ModelAdmin):
#     model = models.Company