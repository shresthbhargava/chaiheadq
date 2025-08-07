# Index Template Specification

## Current Issues
The current index.html template only displays a basic welcome message and doesn't show any tweets, which is not useful for a Twitter-like application.

## Proposed Solution
Transform the index page into a proper homepage that displays tweets for authenticated users and shows a welcome message with call-to-action for unauthenticated users.

## Implementation Details

### For Authenticated Users
1. Display a list of all tweets (similar to tweet_list.html)
2. Include pagination if there are many tweets
3. Show tweet content, author, and timestamp
4. Include edit/delete options for tweets owned by the current user

### For Unauthenticated Users
1. Display a welcome message
2. Show application description
3. Provide clear call-to-action buttons:
   - "Login" button
   - "Register" button

### HTML Structure for Authenticated Users
```html
{% extends "layout.html" %}
{% block title %}Home - ChaiHeadQ{% endblock %}

{% block content %}
    <h1 class="text-light">Welcome back, {{ user.username }}!</h1>
    <p class="text-muted">See what's happening in your network.</p>
    
    <a href="{% url 'tweet_create' %}" class="btn btn-primary mb-4">Create Tweet</a>
    
    <div class="container row gap-3">
        {% for tweet in tweets %}
        <div class="card" style="width: 18rem;">
            {% if tweet.photo %}
                <img src="{{ tweet.photo.url }}" class="card-img-top" alt="Tweet image">
            {% endif %}
            <div class="card-body">
                <h5 class="card-title">{{ tweet.user.username }}</h5>
                <p class="card-text">{{ tweet.text }}</p>
                <small class="text-muted">{{ tweet.created_at|timesince }} ago</small>
                {% if tweet.user == user %}
                    <a href="{% url 'tweet_edit' tweet.id %}" class="btn btn-primary">Edit</a>
                    <a href="{% url 'tweet_delete' tweet.id %}" class="btn btn-danger">Delete</a>
                {% endif %}
            </div>
        </div>
        {% empty %}
        <p>No tweets yet. <a href="{% url 'tweet_create' %}">Create the first tweet!</a></p>
        {% endfor %}
    </div>
{% endblock %}
```

### HTML Structure for Unauthenticated Users
```html
{% extends "layout.html" %}
{% block title %}Home - ChaiHeadQ{% endblock %}

{% block content %}
    <div class="jumbotron">
        <h1 class="display-4">Welcome to ChaiHeadQ</h1>
        <p class="lead">Your one-stop platform for sharing and discovering tweets.</p>
        <hr class="my-4">
        <p>Join our community to share your thoughts and connect with others.</p>
        <p class="lead">
            <a class="btn btn-primary btn-lg" href="{% url 'login' %}" role="button">Login</a>
            <a class="btn btn-success btn-lg" href="{% url 'register' %}" role="button">Register</a>
        </p>
    </div>
{% endblock %}
```

### Required Changes to Views
The index view in views.py needs to be updated to:
1. Check if user is authenticated
2. For authenticated users, fetch tweets and pass them to the template
3. For unauthenticated users, pass minimal context