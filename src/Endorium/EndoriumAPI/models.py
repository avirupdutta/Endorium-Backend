from django.db import models

# Create your models here.
class User(models.Model):
    user_id = models.AutoField(primary_key=True)
    user_name = models.CharField(max_length=200)
    password = models.CharField(max_length=50)

    def __str__(self):
        return self.user_name

class AdminMap(models.Model):
    room_id = models.AutoField(primary_key=True)
    admin_id = models.ForeignKey(User, on_delete=models.CASCADE)
    phrase = models.IntegerField()

    def __str__(self):
        return self.room_id

class UserMap(models.Model):
    map_id = models.AutoField(primary_key=True)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    room_id = models.ForeignKey(AdminMap, on_delete=models.CASCADE)
    banned = models.IntegerField()

    def __str__(self):
        return self.map_id

class Message(models.Model):
    message_id = models.AutoField(primary_key=True)
    room_id = models.ForeignKey(AdminMap, on_delete=models.CASCADE)
    message = models.CharField(max_length=512)
    upvote = models.IntegerField()
    downvote = models.IntegerField()
    
    def __str__(self):
        return self.message_id

class Message2(models.Model):
    message_id = models.ForeignKey(Message, on_delete=models.CASCADE)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    upvote_id = models.IntegerField(blank=True)
    downvote_id = models.IntegerField(blank=True)

    def __str__(self):
        return self.id
