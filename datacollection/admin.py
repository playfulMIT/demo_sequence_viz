from django.contrib import admin

from .models import Event, URL, Player

# Register your models here.

admin.site.register(Event)
admin.site.register(URL)
admin.site.register(Player)
# admin.site.register(PlayerSession)
