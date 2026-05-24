import axiosInstance from "./api/axiosInstance.js";

let isLoginMode = true;

// UI Elements
const formTitle = document.getElementById("formTitle");
const formInstruction = document.getElementById("formSub"); // Note: Ensure this ID matches index.html
const nameGroup = document.getElementById("nameGroup");
const btnSubmit = document.getElementById("submitBtn");
const toggleBtn = document.getElementById("toggleBtn");
const authForm = document.getElementById("authForm");

// Toggle View
toggleBtn.addEventListener("click", () => {
  isLoginMode = !isLoginMode;
  if (isLoginMode) {
    formTitle.innerText = "Welcome Back";
    formInstruction.innerText =
      "Please enter your credentials to access your dashboard.";
    nameGroup.style.display = "none";
    btnSubmit.innerText = "Sign In to Nexus";
    toggleBtn.innerText = "Sign Up Here";
  } else {
    formTitle.innerText = "Create Account";
    formInstruction.innerText =
      "Join Nexus to pitch ideas or find custom investment options.";
    nameGroup.style.display = "block";
    btnSubmit.innerText = "Register Account";
    toggleBtn.innerText = "Sign In Instead";
  }
});

// Submit Handler
authForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // FIX: Get role from the active button class
  const activeBtn = document.querySelector(".role-btn.active");
  const role = activeBtn ? activeBtn.innerText.trim() : "Entrepreneur";

  try {
    if (isLoginMode) {
      const response = await axiosInstance.post("/auth/login", {
        email,
        password,
      });
      localStorage.setItem("nexus_token", response.data.token);
      localStorage.setItem("nexus_user", JSON.stringify(response.data.user));
      window.location.href = "/src/pages/dashboard.html";
    } else {
      const name = document.getElementById("fullName").value;
      await axiosInstance.post("/auth/register", {
        name,
        email,
        password,
        role,
      });
      alert("Account registered! Please log in.");
      toggleBtn.click(); // Switch to login
    }
  } catch (error) {
    alert(error.response?.data?.message || "An error occurred.");
  }
});
authForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  console.log("Form submitted!"); // Check if this appears in F12 Console
  
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  
  // ... rest of your logic
});
const stripe = Stripe('YOUR_PUBLISHABLE_KEY');
const elements = stripe.elements();
const card = elements.create('card');
card.mount('#card-element');

document.getElementById('payment-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // 1. Get clientSecret from your backend
    const res = await fetch('/api/create-payment-intent', { method: 'POST' });
    const { clientSecret } = await res.json();

    // 2. Confirm payment with Stripe
    const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card: card }
    });

    if (result.error) {
        alert(result.error.message);
    } else {
        alert("Payment Successful!");
    }
});
