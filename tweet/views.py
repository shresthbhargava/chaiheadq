from django.shortcuts import render
from .models import Tweet
from .forms import TweetForm, userRegisterForm
from django.shortcuts import get_object_or_404,redirect
from django.contrib.auth.decorators import login_required
from django.contrib.auth import login
from django.contrib.auth.models import User


def index(request):
    """Display all tweets on the homepage"""
    tweets = Tweet.objects.all().order_by('-created_at')[:5]  # Show only recent tweets
    context = {
        'tweets': tweets,
        'total_tweets': Tweet.objects.count(),
        'total_users': User.objects.count(),
        'total_likes': sum(tweet.total_likes() for tweet in Tweet.objects.all()),
    }
    return render(request, 'index.html', context)

def tweet_list(request):
    """Display a list of all tweets"""
    tweets = Tweet.objects.all().order_by('-created_at')
    return render(request, 'tweet_list.html', {'tweets': tweets})

@login_required
def tweet_create(request):
    """Create a new tweet"""
    if request.method == 'POST':
        form = TweetForm(request.POST, request.FILES)
        if form.is_valid():
            tweet = form.save(commit=False)
            tweet.user = request.user  # Set the user to the current logged-in user
            tweet.save()
            return redirect('tweet_list')  # Redirect to the tweet list after saving
    else:
        form = TweetForm()
    return render(request, 'tweet_form.html', {'form': form})

@login_required
def tweet_edit(request, tweet_id):
    """Edit an existing tweet"""
    tweet = get_object_or_404(Tweet, pk=tweet_id,user=request.user)
    if request.method == 'POST':
        form = TweetForm(request.POST, request.FILES, instance=tweet)
        if form.is_valid():
            tweet=form.save(commit=False)
            tweet.user = request.user
            tweet.save()
            return redirect('tweet_list')  # Redirect to the tweet list after saving
    else:
        form = TweetForm(instance=tweet)
    return render(request, 'tweet_form.html', {'form': form})

@login_required
def tweet_delete(request, tweet_id):
    """Delete a tweet"""
    tweet = get_object_or_404(Tweet, pk=tweet_id,user=request.user)
    if request.method == 'POST':
        tweet.delete()
        return redirect('tweet_list')  # Redirect to the tweet list after deletion
    return render(request, 'tweet_confirm_delete.html', {'tweet': tweet})

def register(request):
    """User registration view"""
    if request.method == 'POST':
        form = userRegisterForm(request.POST)
        if form.is_valid():
            user=form.save(commit=False)  # Save the user to the database
            user.set_password (form.cleaned_data['password1']) 
            user.save()
            login(request, user)
            return redirect('tweet_list')  # Redirect to login after successful registration
    else:
     form = userRegisterForm()
    return render(request, 'registration/register.html', {'form': form})  # Placeholder for registration logic

