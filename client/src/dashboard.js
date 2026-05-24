// client/src/dashboard.js

document.addEventListener('DOMContentLoaded', () => {
    // 1. Route Protection: Check if token exists
    const token = localStorage.getItem('nexus_token');
    if (!token) {
        // If no token, kick them back to login page
        window.location.href = '/pages/index.html';
        return;
    }

    // 2. Load User Data
    const userDataRaw = localStorage.getItem('nexus_user');
    if (userDataRaw) {
        const user = JSON.parse(userDataRaw);
        
        // Update the UI dynamically
        document.getElementById('userName').textContent = user.name;
        document.getElementById('userRoleBadge').textContent = user.role;
        
        // Optional: Change UI colors based on role
        if(user.role === 'investor') {
            document.getElementById('userRoleBadge').style.background = 'linear-gradient(90deg, #00d2ff 0%, #3a7bd5 100%)';
        } else {
            document.getElementById('userRoleBadge').style.background = 'linear-gradient(90deg, #f12711 0%, #f5af19 100%)';
        }
    }

    // 3. Handle Logout
    document.getElementById('logoutBtn').addEventListener('click', () => {
        // Clear secure data
        localStorage.removeItem('nexus_token');
        localStorage.removeItem('nexus_user');
        
        // Redirect to login
        window.location.href = '/pages/index.html';
    });
});