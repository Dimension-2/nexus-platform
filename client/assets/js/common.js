// assets/js/common.js

// 1. Force Login
if (!localStorage.getItem("token")) {
    window.location.href = "login.html";
}

// 2. Set Global Date
document.addEventListener('DOMContentLoaded', () => {
    const el = document.getElementById('cd');
    if (el) {
        el.textContent = new Date().toLocaleDateString('en-US', { 
            weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' 
        });
    }
});