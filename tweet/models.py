from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

class Tweet(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    text = models.TextField(max_length=280, help_text="What's happening?")
    photo= models.ImageField(upload_to='tweets/', blank=True, null=True, help_text="Optional photo")
    video = models.FileField(upload_to='tweets/videos/', blank=True, null=True, help_text="Optional video")
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)
    likes = models.ManyToManyField(User, related_name='liked_tweets', blank=True)
    
    class Meta:
        ordering = ['-created_at']
        
    def __str__(self):
        return f"{self.user.username}: {self.text[:50]}..."
    
    def total_likes(self):
        return self.likes.count()
