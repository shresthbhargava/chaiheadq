from django.shortcuts import render, get_object_or_404, redirect
from .models import Tweet
from .forms import TweetForm, userRegisterForm
from django.contrib.auth.decorators import login_required
from django.contrib.auth import login

def index(request):
    """Display all tweets on the homepage"""
    tweets = Tweet.objects.all().order_by('-created_at')
    return render(request, 'tweet/index.html', {'tweets': tweets})

def tweet_list(request):
    """Display a list of all tweets"""
    tweets = Tweet.objects.all().order_by('-created_at')
    return render(request, 'tweet/tweet_list.html', {'tweets': tweets})

@login_required
def tweet_create(request):
    """Create a new tweet"""
    if request.method == 'POST':
        form = TweetForm(request.POST, request.FILES)
        if form.is_valid():
            tweet = form.save(commit=False)
            tweet.user = request.user
            tweet.save()
            # FIX: Use the URL name 'tweet_list' instead of a path
            return redirect('tweet_list')
    else:
        form = TweetForm()
    return render(request, 'tweet/tweet_form.html', {'form': form})

@login_required
def tweet_edit(request, tweet_id):
    """Edit an existing tweet"""
    tweet = get_object_or_404(Tweet, pk=tweet_id, user=request.user)
    if request.method == 'POST':
        form = TweetForm(request.POST, request.FILES, instance=tweet)
        if form.is_valid():
            tweet = form.save(commit=False)
            tweet.user = request.user
            tweet.save()
            # FIX: Use the URL name 'tweet_list' instead of a path
            return redirect('tweet_list')
    else:
        form = TweetForm(instance=tweet)
    return render(request, 'tweet/tweet_form.html', {'form': form})

@login_required
def tweet_delete(request, tweet_id):
    """Delete a tweet"""
    tweet = get_object_or_404(Tweet, pk=tweet_id, user=request.user)
    if request.method == 'POST':
        tweet.delete()
        # This one was already correct!
        return redirect('tweet_list')
    return render(request, 'tweet/tweet_confirm_delete.html', {'tweet': tweet})

def register(request):
    """User registration view"""
    if request.method == 'POST':
        form = userRegisterForm(request.POST)
        if form.is_valid():
            user = form.save(commit=False)
            # Minor formatting cleanup: removed space before parenthesis
            user.set_password(form.cleaned_data['password1'])
            user.save()
            login(request, user)
            # FIX: Use the URL name 'tweet_list' instead of a path
            return redirect('tweet_list')
    else:
        form = userRegisterForm()
    return render(request, 'registration/register.html', {'form': form})