// script.js
document.addEventListener('DOMContentLoaded', function() {
    const signupForm = document.getElementById('signupForm');
    const loginForm = document.getElementById('loginForm');
    const mainPageUrl = 'main.html'; // Change to your main webpage URL

    document.getElementById('signupLink').addEventListener('click', function() {
        signupForm.style.display = 'block';
        loginForm.style.display = 'none';
    });

    document.getElementById('loginLink').addEventListener('click', function() {
        signupForm.style.display = 'none';
        loginForm.style.display = 'block';
    });

    document.getElementById('signup').addEventListener('submit', function(event) {
        event.preventDefault();
        // Simulate signup and show login form
        alert('Signed up successfully! Please log in.');
        signupForm.style.display = 'none';
        loginForm.style.display = 'block';
    });

    document.getElementById('login').addEventListener('submit', function(event) {
        event.preventDefault();
        // Simulate login and redirect
        alert('Login successful! Redirecting to main page.');
        window.location.href = mainPageUrl;
    });
});
