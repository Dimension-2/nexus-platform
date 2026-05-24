document.addEventListener("DOMContentLoaded", () => {
  const payButton = document.querySelector("#pay-button"); 
  const modalContent = document.querySelector(".modal-body"); // Make sure this exists in your HTML
  const amountInput = document.querySelector("#amount"); // Changed to match your HTML ID

  // 1. The Logic Engine
  async function processTransaction(amount) {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Simulation: Fail if amount is 0 or empty
    if (!amount || amount === "0") {
      return { status: "error", message: "API Credits Empty. Transaction blocked." };
    }

    // Simulation: Fail if amount is insanely high
    if (parseInt(amount) > 1000000) {
      return { status: "error", message: "Insufficient funds in your developer wallet." };
    }

    return { status: "success", message: "Transaction successful." };
  }

  // 2. The Interaction
  if (payButton) {
    payButton.addEventListener("click", async (e) => {
      e.preventDefault(); // Stop form refresh
      
      const amount = amountInput.value;

      // Show Loading
      modalContent.innerHTML = `
        <div class="loader-container">
            <div class="spinner"></div>
            <p>Processing Transaction...</p>
        </div>
      `;

      // Run Transaction Check
      const result = await processTransaction(amount);

      // 3. CONDITIONAL DATABASE SAVE
      if (result.status === "success") {
        console.log("DATABASE ACTION: Saving record for amount $" + amount);
        // Here you would trigger your fetch() to your real backend
      } else {
        console.log("DATABASE ACTION: Skipped. Transaction failed.");
      }

      // Show Result
      modalContent.innerHTML = `
        <div class="result-box ${result.status}">
            <h3>${result.status === "success" ? "SUCCESS" : "FAILED"}</h3>
            <p>${result.message}</p>
            <button onclick="location.reload()" class="btn-close">Close</button>
        </div>
      `;
    });
  }
});