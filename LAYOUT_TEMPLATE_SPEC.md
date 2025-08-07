# Layout Template Specification

## Current Issues
The current layout.html template has a generic Bootstrap navbar that doesn't match the application's purpose. It contains placeholder content and doesn't provide proper navigation for the ChaiHeadQ application.

## Proposed Solution
Replace the generic navbar with a custom navigation bar tailored for the ChaiHeadQ application.

## New Navigation Structure

### Brand
- Brand name: "ChaiHeadQ"
- Link: Homepage (index)

### Navigation Items
1. **Home** - Link to index page
2. **Tweets** - Link to tweet list page
3. **Create Tweet** - Link to tweet creation page (only visible when authenticated)
4. **Authentication Area** (right-aligned):
   - If user is authenticated:
     * Display username
     * "Logout" link
   - If user is not authenticated:
     * "Login" link
     * "Register" link

## Implementation Details

### HTML Structure
```html
<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <div class="container-fluid">
    <a class="navbar-brand" href="{% url 'index' %}">ChaiHeadQ</a>
    
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-target="#navbarNav">
      <span class="navbar-toggler-icon"></span>
    </button>
    
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav me-auto">
        <li class="nav-item">
          <a class="nav-link" href="{% url 'index' %}">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="{% url 'tweet_list' %}">Tweets</a>
        </li>
        {% if user.is_authenticated %}
        <li class="nav-item">
          <a class="nav-link" href="{% url 'tweet_create' %}">Create Tweet</a>
        </li>
        {% endif %}
      </ul>
      
      <ul class="navbar-nav ms-auto">
        {% if user.is_authenticated %}
        <li class="nav-item">
          <span class="navbar-text">Hello, {{ user.username }}!</span>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="{% url 'logout' %}">Logout</a>
        </li>
        {% else %}
        <li class="nav-item">
          <a class="nav-link" href="{% url 'login' %}">Login</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="{% url 'register' %}">Register</a>
        </li>
        {% endif %}
      </ul>
    </div>
  </div>
</nav>
```

### Required Changes
1. Update Bootstrap classes to match current version (data-bs-toggle instead of data-toggle)
2. Replace placeholder content with meaningful navigation
3. Add authentication-based visibility for relevant items
4. Improve styling with proper Bootstrap classes