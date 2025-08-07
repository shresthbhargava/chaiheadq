# Template Enhancements Specification

## Current Issues
Several templates need styling and structural improvements:
1. tweet_form.html - Basic form styling
2. Registration templates - Could be enhanced
3. Login templates - Could be enhanced

## Proposed Solutions

### 1. Tweet Form Template (tweet_form.html)
#### Current Issues
- Basic form with minimal styling
- No visual distinction between create and edit modes
- No help text or guidance for users

#### Proposed Enhancements
```html
{% extends "layout.html" %}
{% block title %}{% if form.instance.pk %}Edit Tweet{% else %}Create Tweet{% endif %} - ChaiHeadQ{% endblock %}

{% block content %}
    <div class="container">
        <h2>{% if form.instance.pk %}Edit Tweet{% else %}Create Tweet{% endif %}</h2>
        
        <form method="post" enctype="multipart/form-data" class="form">
            {% csrf_token %}
            
            <div class="mb-3">
                <label for="{{ form.text.id_for_label }}" class="form-label">Tweet Content</label>
                {{ form.text }}
                <div class="form-text">{{ form.text.help_text }}</div>
                {% if form.text.errors %}
                    <div class="alert alert-danger mt-2">{{ form.text.errors }}</div>
                {% endif %}
            </div>
            
            <div class="mb-3">
                <label for="{{ form.photo.id_for_label }}" class="form-label">Photo (Optional)</label>
                {{ form.photo }}
                <div class="form-text">{{ form.photo.help_text }}</div>
                {% if form.photo.errors %}
                    <div class="alert alert-danger mt-2">{{ form.photo.errors }}</div>
                {% endif %}
            </div>
            
            <div class="mb-3">
                <label for="{{ form.video.id_for_label }}" class="form-label">Video (Optional)</label>
                {{ form.video }}
                <div class="form-text">{{ form.video.help_text }}</div>
                {% if form.video.errors %}
                    <div class="alert alert-danger mt-2">{{ form.video.errors }}</div>
                {% endif %}
            </div>
            
            <button class="btn btn-primary" type="submit">Submit</button>
            <a href="{% url 'tweet_list' %}" class="btn btn-secondary">Cancel</a>
        </form>
    </div>
{% endblock %}
```

### 2. Registration Template (register.html)
#### Current Issues
- Basic form with minimal styling
- No visual feedback for errors
- No guidance for users

#### Proposed Enhancements
```html
{% extends "layout.html" %}
{% block title %}Register - ChaiHeadQ{% endblock %}

{% block content %}
    <div class="container">
        <h2>Register</h2>
        <p>Create an account to start sharing your thoughts.</p>
        
        <form method="post" class="form">
            {% csrf_token %}
            
            <div class="mb-3">
                <label for="{{ form.username.id_for_label }}" class="form-label">Username</label>
                {{ form.username }}
                {% if form.username.errors %}
                    <div class="alert alert-danger mt-2">{{ form.username.errors }}</div>
                {% endif %}
            </div>
            
            <div class="mb-3">
                <label for="{{ form.email.id_for_label }}" class="form-label">Email</label>
                {{ form.email }}
                {% if form.email.errors %}
                    <div class="alert alert-danger mt-2">{{ form.email.errors }}</div>
                {% endif %}
            </div>
            
            <div class="mb-3">
                <label for="{{ form.password1.id_for_label }}" class="form-label">Password</label>
                {{ form.password1 }}
                {% if form.password1.errors %}
                    <div class="alert alert-danger mt-2">{{ form.password1.errors }}</div>
                {% endif %}
            </div>
            
            <div class="mb-3">
                <label for="{{ form.password2.id_for_label }}" class="form-label">Confirm Password</label>
                {{ form.password2 }}
                {% if form.password2.errors %}
                    <div class="alert alert-danger mt-2">{{ form.password2.errors }}</div>
                {% endif %}
            </div>
            
            <button class="btn btn-primary" type="submit">Register</button>
        </form>
        
        <p class="mt-3">Already have an account? <a href="{% url 'login' %}">Login here</a>.</p>
    </div>
{% endblock %}
```

### 3. Login Template (login.html)
#### Current Issues
- Basic form with minimal styling
- No visual feedback for errors
- No guidance for users

#### Proposed Enhancements
```html
{% extends "layout.html" %}
{% block title %}Login - ChaiHeadQ{% endblock %}

{% block content %}
    <div class="container">
        <h2>Login</h2>
        <p>Sign in to your account to continue.</p>
        
        <form method="post" class="form">
            {% csrf_token %}
            
            <div class="mb-3">
                <label for="{{ form.username.id_for_label }}" class="form-label">Username</label>
                {{ form.username }}
                {% if form.username.errors %}
                    <div class="alert alert-danger mt-2">{{ form.username.errors }}</div>
                {% endif %}
            </div>
            
            <div class="mb-3">
                <label for="{{ form.password.id_for_label }}" class="form-label">Password</label>
                {{ form.password }}
                {% if form.password.errors %}
                    <div class="alert alert-danger mt-2">{{ form.password.errors }}</div>
                {% endif %}
            </div>
            
            <button class="btn btn-primary" type="submit">Login</button>
        </form>
        
        <p class="mt-3">Don't have an account? <a href="{% url 'register' %}">Register here</a>.</p>
    </div>
{% endblock %}
```

## Required Changes
1. Improve form styling with Bootstrap classes
2. Add proper labels and help text
3. Add error handling for form fields
4. Add proper titles for each page
5. Add navigation links (Cancel, Login/Register links)
6. Add descriptive text to guide users