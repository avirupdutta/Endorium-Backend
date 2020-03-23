from django.contrib import admin

from .models import User, AdminMap, UserMap, Message, Message2
# Register your models here.

admin.site.register(User)
admin.site.register(AdminMap)
admin.site.register(UserMap)
admin.site.register(Message)
admin.site.register(Message2)