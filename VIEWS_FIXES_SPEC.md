# Views.py Fixes Specification

## Current Issues
The current views.py file has several issues:
1. Inconsistent spacing and formatting
2. Minor logic issues in the register view
3. Missing context in some views
4. Some lines have extra spaces or formatting issues

## Proposed Solution
Fix the formatting, logic, and context issues in views.py to make the code more readable and functional.

## Specific Issues and Fixes

### 1. Formatting Issues
- Inconsistent indentation throughout the file
- Extra spaces in some lines
- Missing blank lines between functions for readability

### 2. Register View Issues
Line 57: `user=form.save(commit=False)` - Missing space after comma
Line 58: `user.set_password (form.cleaned_data['password1'])` - Extra space after set_password
Line 63: `form = userRegisterForm()` - Inconsistent indentation

### 3. Context Issues
- The index view should handle both authenticated and unauthenticated users differently
- Add proper error handling where needed

## Implementation Details

### Register View Fixes
```python
def register(request):
    """User registration view"""
    if request.method == 'POST':
        form = userRegisterForm(request.POST)
        if form.is_valid():
            user = form.save(commit=False)  # Fix: Added space after comma
            user.set_password(form.cleaned_data['password1'])  # Fix: Removed extra space
            user.save()
            login(request, user)
            return redirect('tweet_list')
    else:
        form = userRegisterForm()  # Fix: Corrected indentation
    return render(request, 'registration/register.html', {'form': form})
```

### Index View Enhancement
```python
def index(request):
    """Display homepage with tweets for authenticated users or welcome message for guests"""
    if request.user.is_authenticated:
        tweets = Tweet.objects.all().order_by('-created_at')
        return render(request, 'index.html', {'tweets': tweets})
    else:
        return render(request, 'index.html')
```

### General Formatting Fixes
- Ensure consistent 4-space indentation
- Add blank lines between functions for readability
- Remove extra spaces around operators
- Ensure consistent line spacing

## Other Views to Check
1. tweet_create - Ensure proper handling of form errors
2. tweet_edit - Verify user ownership check
3. tweet_delete - Verify user ownership check
4. tweet_list - Ensure proper context is passed

## Required Changes
1. Fix spacing and formatting inconsistencies
2. Correct the register view logic issues
3. Enhance the index view to handle authentication states
4. Ensure all views have proper error handling