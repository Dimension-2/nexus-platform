const API_BASE = "http://localhost:5000/api";

// Reusable function to call the backend
async function apiCall(endpoint, method = 'GET', body = null) {
    const token = localStorage.getItem("token");
    const headers = { 
        "Content-Type": "application/json",
        "Authorization": token ? token : "" 
    };

    const options = { method, headers };
    if (body) options.body = JSON.stringify(body);

    const res = await fetch(`${API_BASE}${endpoint}`, options);
    return await res.json();
}// Add this helper to assets/js/api.js
async function fetchData(endpoint) {
    const token = localStorage.getItem("token");
    const res = await fetch(`http://localhost:5000/api${endpoint}`, {
        headers: { "Authorization": token }
    });
    return await res.json();
}