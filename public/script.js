const wrapper = document.querySelector(".wrapper");
const loginLink = document.querySelector(".login-link");
const registerLink = document.querySelector(".registerLink");
const btnpop = document.querySelector('.btnlogin-popup');
const iconClose = document.querySelector('.icon-close');

// Toggle between Login and Register forms
registerLink?.addEventListener('click', () => {
    wrapper.classList.add('active');
});

loginLink?.addEventListener('click', () => {
    wrapper.classList.remove('active');
});

// Popup handling
btnpop?.addEventListener('click', () => {
    wrapper.classList.add('active-btn');
});

iconClose?.addEventListener('click', () => {
    wrapper.classList.remove('active-btn');
});

// Login Form Submission
document.querySelector('.login')?.addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const email = document.querySelector('input[name="email"]').value.trim();
    const password = document.querySelector('input[name="password"]').value.trim();

    if (!email || !password) {
        alert("Please enter both email and password.");
        return;
    }

    try {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const result = await response.json();
        console.log(result);

        if (response.ok) {
            alert(result.message);

            // Store userId in local storage
            localStorage.setItem('userId', result.user._id);

            window.location.href = '/matches'; // Redirect to matches page
        } else {
            alert(result.message || "Login failed. Please try again.");
        }
    } catch (error) {
        console.error('Error during login:', error);
        alert("An error occurred. Please try again later.");
    }
});

// Register Form Submission
document.querySelector('.register')?.addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);

    const username = formData.get('username').trim();
    const email = formData.get('email').trim();
    const password = formData.get('password').trim();

    if (!username || !email || !password) {
        alert("Please fill in all the fields.");
        return;
    }

    try {
        const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password })
        });

        const result = await response.json();
        console.log(result);

        if (response.ok) {
            alert(result.message);
            wrapper.classList.remove('active'); // Switch to login form after successful registration
        } else {
            alert(result.message || "Registration failed. Please try again.");
        }
    } catch (error) {
        console.error('Error during registration:', error);
        alert("An error occurred. Please try again later.");
    }
});
