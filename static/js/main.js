// Modern Twitter Clone JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all interactive features
    initializeTweetInteractions();
    initializeFormEnhancements();
    initializeAnimations();
    initializeImagePreview();
    initializeCharacterCounter();
    initializeLazyLoading();
});

// Tweet Interactions
function initializeTweetInteractions() {
    // Like button functionality
    const likeButtons = document.querySelectorAll('.like-btn');
    likeButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const tweetId = this.dataset.tweetId;
            toggleLike(tweetId, this);
        });
    });

    // Retweet functionality
    const retweetButtons = document.querySelectorAll('.retweet-btn');
    retweetButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const tweetId = this.dataset.tweetId;
            toggleRetweet(tweetId, this);
        });
    });

    // Share functionality
    const shareButtons = document.querySelectorAll('.share-btn');
    shareButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const tweetText = this.closest('.tweet-card').querySelector('.tweet-content').textContent;
            shareTweet(tweetText);
        });
    });
}

// Like functionality
function toggleLike(tweetId, button) {
    const icon = button.querySelector('i');
    const countSpan = button.querySelector('.like-count');
    let count = parseInt(countSpan.textContent) || 0;
    
    // Add animation
    button.classList.add('pulse');
    setTimeout(() => button.classList.remove('pulse'), 300);
    
    if (icon.classList.contains('far')) {
        // Like the tweet
        icon.classList.remove('far');
        icon.classList.add('fas');
        icon.style.color = '#e0245e';
        countSpan.textContent = count + 1;
        
        // Create heart animation
        createHeartAnimation(button);
    } else {
        // Unlike the tweet
        icon.classList.remove('fas');
        icon.classList.add('far');
        icon.style.color = '';
        countSpan.textContent = Math.max(0, count - 1);
    }
}

// Create heart animation
function createHeartAnimation(button) {
    const heart = document.createElement('div');
    heart.innerHTML = '❤️';
    heart.style.position = 'absolute';
    heart.style.fontSize = '20px';
    heart.style.pointerEvents = 'none';
    heart.style.animation = 'heartFloat 1s ease-out forwards';
    
    const rect = button.getBoundingClientRect();
    heart.style.left = rect.left + rect.width / 2 + 'px';
    heart.style.top = rect.top + 'px';
    
    document.body.appendChild(heart);
    
    setTimeout(() => {
        document.body.removeChild(heart);
    }, 1000);
}

// Retweet functionality
function toggleRetweet(tweetId, button) {
    const icon = button.querySelector('i');
    const countSpan = button.querySelector('.retweet-count');
    let count = parseInt(countSpan.textContent) || 0;
    
    button.classList.add('pulse');
    setTimeout(() => button.classList.remove('pulse'), 300);
    
    if (icon.style.color !== 'rgb(23, 191, 99)') {
        icon.style.color = '#17bf63';
        countSpan.textContent = count + 1;
        showToast('Tweet retweeted!', 'success');
    } else {
        icon.style.color = '';
        countSpan.textContent = Math.max(0, count - 1);
        showToast('Retweet removed', 'info');
    }
}

// Share functionality
function shareTweet(text) {
    if (navigator.share) {
        navigator.share({
            title: 'ChaiHeadQ Tweet',
            text: text,
            url: window.location.href
        });
    } else {
        // Fallback to clipboard
        navigator.clipboard.writeText(text + ' - ' + window.location.href).then(() => {
            showToast('Tweet link copied to clipboard!', 'success');
        });
    }
}

// Form Enhancements
function initializeFormEnhancements() {
    // Auto-resize textareas
    const textareas = document.querySelectorAll('textarea');
    textareas.forEach(textarea => {
        textarea.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = this.scrollHeight + 'px';
        });
    });

    // Form validation
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            if (!validateForm(this)) {
                e.preventDefault();
            }
        });
    });
}

// Form validation
function validateForm(form) {
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            showFieldError(field, 'This field is required');
            isValid = false;
        } else {
            clearFieldError(field);
        }
    });
    
    return isValid;
}

// Show field error
function showFieldError(field, message) {
    clearFieldError(field);
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.textContent = message;
    errorDiv.style.color = '#e0245e';
    errorDiv.style.fontSize = '0.8rem';
    errorDiv.style.marginTop = '0.25rem';
    
    field.parentNode.appendChild(errorDiv);
    field.style.borderColor = '#e0245e';
}

// Clear field error
function clearFieldError(field) {
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
    field.style.borderColor = '';
}

// Character Counter
function initializeCharacterCounter() {
    const tweetTextarea = document.querySelector('#id_text');
    if (tweetTextarea) {
        const maxLength = 280;
        const counter = document.createElement('div');
        counter.className = 'character-counter';
        counter.style.textAlign = 'right';
        counter.style.marginTop = '0.5rem';
        counter.style.fontSize = '0.9rem';
        
        tweetTextarea.parentNode.appendChild(counter);
        
        function updateCounter() {
            const remaining = maxLength - tweetTextarea.value.length;
            counter.textContent = `${remaining} characters remaining`;
            
            if (remaining < 20) {
                counter.style.color = '#e0245e';
            } else if (remaining < 50) {
                counter.style.color = '#ffad1f';
            } else {
                counter.style.color = '#657786';
            }
        }
        
        tweetTextarea.addEventListener('input', updateCounter);
        updateCounter();
    }
}

// Image Preview
function initializeImagePreview() {
    const imageInput = document.querySelector('#id_photo');
    if (imageInput) {
        imageInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    showImagePreview(e.target.result);
                };
                reader.readAsDataURL(file);
            }
        });
    }
}

// Show image preview
function showImagePreview(src) {
    // Remove existing preview
    const existingPreview = document.querySelector('.image-preview');
    if (existingPreview) {
        existingPreview.remove();
    }
    
    const preview = document.createElement('div');
    preview.className = 'image-preview';
    preview.style.marginTop = '1rem';
    preview.innerHTML = `
        <img src="${src}" alt="Preview" style="max-width: 100%; height: auto; border-radius: 12px;">
        <button type="button" class="btn btn-sm btn-danger mt-2" onclick="removeImagePreview()">Remove</button>
    `;
    
    const imageInput = document.querySelector('#id_photo');
    imageInput.parentNode.appendChild(preview);
}

// Remove image preview
function removeImagePreview() {
    const preview = document.querySelector('.image-preview');
    const imageInput = document.querySelector('#id_photo');
    
    if (preview) {
        preview.remove();
    }
    if (imageInput) {
        imageInput.value = '';
    }
}

// Animations
function initializeAnimations() {
    // Fade in animation for tweets
    const tweetCards = document.querySelectorAll('.tweet-card');
    tweetCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
    
    // Smooth scroll for navigation
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Lazy Loading
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Toast Notifications
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    
    // Toast styles
    Object.assign(toast.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '1rem 1.5rem',
        borderRadius: '8px',
        color: 'white',
        fontSize: '0.9rem',
        fontWeight: '500',
        zIndex: '9999',
        transform: 'translateX(100%)',
        transition: 'transform 0.3s ease',
        maxWidth: '300px'
    });
    
    // Toast colors
    const colors = {
        success: '#17bf63',
        error: '#e0245e',
        warning: '#ffad1f',
        info: '#1da1f2'
    };
    
    toast.style.backgroundColor = colors[type] || colors.info;
    
    document.body.appendChild(toast);
    
    // Animate in
    setTimeout(() => {
        toast.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 3000);
}

// Utility Functions
function formatTimeAgo(date) {
    const now = new Date();
    const diff = now - new Date(date);
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    if (days > 0) return `${days}d`;
    if (hours > 0) return `${hours}h`;
    if (minutes > 0) return `${minutes}m`;
    return `${seconds}s`;
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes heartFloat {
        0% {
            transform: translateY(0) scale(1);
            opacity: 1;
        }
        100% {
            transform: translateY(-50px) scale(1.5);
            opacity: 0;
        }
    }
    
    .lazy {
        opacity: 0;
        transition: opacity 0.3s;
    }
    
    .lazy.loaded {
        opacity: 1;
    }
`;
document.head.appendChild(style);