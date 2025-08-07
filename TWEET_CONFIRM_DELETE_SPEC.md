# Tweet Confirm Delete Template Specification

## Current Issues
The current tweet_confirm_delete.html template contains duplicate content from index.html, which is incorrect for a delete confirmation page.

## Proposed Solution
Replace the duplicate content with a proper delete confirmation message that includes the tweet content being deleted.

## Implementation Details

### HTML Structure
```html
{% extends "layout.html" %}
{% block title %}Confirm Delete - ChaiHeadQ{% endblock %}

{% block content %}
    <div class="container">
        <h2>Confirm Delete</h2>
        <p>Are you sure you want to delete this tweet?</p>
        
        <div class="card mb-3">
            <div class="card-body">
                <h5 class="card-title">{{ tweet.user.username }}</h5>
                <p class="card-text">{{ tweet.text }}</p>
                {% if tweet.photo %}
                    <img src="{{ tweet.photo.url }}" class="img-fluid" alt="Tweet image">
                {% endif %}
                <small class="text-muted">{{ tweet.created_at|timesince }} ago</small>
            </div>
        </div>
        
        <form method="post">
            {% csrf_token %}
            <button class="btn btn-danger" type="submit">Confirm Delete</button>
            <a href="{% url 'tweet_list' %}" class="btn btn-secondary">Cancel</a>
        </form>
    </div>
{% endblock %}
```

### Key Features
1. Clear title indicating the purpose of the page
2. Confirmation message asking if the user is sure
3. Display of the tweet being deleted (content, author, image if any, timestamp)
4. Proper form with CSRF token
5. Two buttons:
   - "Confirm Delete" (danger style)
   - "Cancel" (secondary style) that redirects to tweet list

### Required Changes
1. Replace duplicate content with proper delete confirmation
2. Add tweet details display
3. Update title block
4. Ensure proper form structure with CSRF token