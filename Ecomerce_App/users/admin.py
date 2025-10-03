from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser, Address

@admin.register(CustomUser)
class CustomUserAdmin(UserAdmin):
    list_display = ('username', 'email', 'first_name', 'last_name', 'phone_number', 'is_staff', 'date_joined')
    list_filter = ('is_staff', 'is_superuser', 'is_active', 'date_joined')
    search_fields = ('username', 'first_name', 'last_name', 'email')
    ordering = ('-date_joined',)
    
    fieldsets = UserAdmin.fieldsets + (
        ('Additional Info', {'fields': ('phone_number', 'date_of_birth')}),
    )

@admin.register(Address)
class AddressAdmin(admin.ModelAdmin):
    list_display = ('user', 'street_address', 'city', 'state', 'postal_code', 'country', 'is_default')
    list_filter = ('country', 'state', 'is_default')
    search_fields = ('user__username', 'street_address', 'city')
    ordering = ('-created_at',)
