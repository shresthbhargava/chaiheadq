# Media File Handling Verification Specification

## Current Implementation
The project has basic media file handling configured in settings.py:
- MEDIA_URL = '/media/'
- MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

The main urls.py includes static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT) to serve media files during development.

## Verification Points

### 1. Settings Configuration
Check that settings.py has proper media file configuration:
```python
# Media files
MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')
```

### 2. URL Configuration
Verify that the main urls.py includes media file serving:
```python
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    # ... other patterns
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
```

### 3. Model Configuration
Verify that the Tweet model properly handles file uploads:
```python
photo = models.ImageField(upload_to='tweets/', blank=True, null=True, help_text="Optional photo")
video = models.FileField(upload_to='tweets/videos/', blank=True, null=True, help_text="Optional video")
```

### 4. Form Configuration
Verify that the TweetForm properly handles file uploads:
```python
class TweetForm(forms.ModelForm):
    class Meta:
        model = Tweet
        fields = ['text', 'photo', 'video']
```

The form should be used with enctype="multipart/form-data" in templates.

### 5. Template Implementation
Verify that templates properly reference media files:
```html
{% if tweet.photo %}
    <img src="{{ tweet.photo.url }}" class="card-img-top" alt="Tweet image">
{% endif %}
```

## Required Changes
1. Verify all configurations are correct
2. Ensure proper directory structure for media files
3. Test file upload functionality
4. Verify file display in templates