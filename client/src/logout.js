document.addEventListener('DOMContentLoaded', () => {
    // 1. Find the logout button
    const logoutBtn = document.querySelector('.logout-btn');

    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            initiateLogout();
        });
    }

    function initiateLogout() {
        // 2. Inject High-End Styles (Only once)
        if (!document.getElementById('nexus-logout-styles')) {
            const styles = document.createElement('style');
            styles.id = 'nexus-logout-styles';
            styles.innerHTML = `
                .logout-overlay {
                    position: fixed;
                    top: 0; left: 0; width: 100vw; height: 100vh;
                    background: rgba(10, 14, 10, 0.4);
                    backdrop-filter: blur(8px);
                    -webkit-backdrop-filter: blur(8px);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 9999;
                    opacity: 0;
                    animation: fadeIn 0.3s forwards ease-out;
                    font-family: 'Montserrat', sans-serif;
                }
                .logout-modal {
                    background: #fff;
                    padding: 2.5rem 3rem;
                    border-radius: 8px;
                    box-shadow: 0 20px 40px rgba(0,0,0,0.1);
                    text-align: center;
                    transform: translateY(20px);
                    animation: slideUp 0.4s forwards cubic-bezier(0.16, 1, 0.3, 1);
                    max-width: 400px;
                    width: 90%;
                }
                .logout-modal h3 {
                    font-family: 'Cormorant Garamond', serif;
                    font-size: 2rem;
                    color: #1a1a1a;
                    margin: 0 0 1rem 0;
                    font-weight: 600;
                }
                .logout-modal p {
                    color: #555;
                    font-size: 0.95rem;
                    line-height: 1.5;
                    margin-bottom: 2rem;
                }
                .logout-actions {
                    display: flex;
                    gap: 1rem;
                    justify-content: center;
                }
                .logout-btn-action {
                    padding: 0.8rem 1.5rem;
                    border: none;
                    border-radius: 4px;
                    font-weight: 600;
                    font-size: 0.8rem;
                    text-transform: uppercase;
                    letter-spacing: 0.1em;
                    cursor: pointer;
                    transition: all 0.2s ease;
                }
                .btn-cancel {
                    background: transparent;
                    color: #555;
                    border: 1px solid #d1d1d1;
                }
                .btn-cancel:hover {
                    background: #f5f5f5;
                    color: #1a1a1a;
                }
                .btn-confirm {
                    background: #0a0e0a;
                    color: #fff;
                }
                .btn-confirm:hover {
                    background: #c5a059; /* Gold accent hover */
                }
                
                /* Loading State UI */
                .logout-loader {
                    display: none;
                    flex-direction: column;
                    align-items: center;
                    gap: 1.5rem;
                }
                .spinner {
                    width: 40px;
                    height: 40px;
                    border: 3px solid rgba(197, 160, 89, 0.2);
                    border-top-color: #c5a059; /* Gold accent */
                    border-radius: 50%;
                    animation: spin 1s infinite linear;
                }
                .logout-loader p {
                    margin: 0;
                    font-weight: 500;
                    color: #1a1a1a;
                    letter-spacing: 0.1em;
                    text-transform: uppercase;
                    font-size: 0.8rem;
                }

                @keyframes fadeIn { to { opacity: 1; } }
                @keyframes slideUp { to { transform: translateY(0); } }
                @keyframes fadeOut { to { opacity: 0; } }
                @keyframes spin { to { transform: rotate(360deg); } }
            `;
            document.head.appendChild(styles);
        }

        // 3. Create the UI Elements
        const overlay = document.createElement('div');
        overlay.className = 'logout-overlay';

        overlay.innerHTML = `
            <div class="logout-modal">
                <div class="logout-content">
                    <h3>Sign Out</h3>
                    <p>Are you sure you want to securely close your active session?</p>
                    <div class="logout-actions">
                        <button class="logout-btn-action btn-cancel">Cancel</button>
                        <button class="logout-btn-action btn-confirm">Confirm</button>
                    </div>
                </div>
                
                <div class="logout-loader">
                    <div class="spinner"></div>
                    <p>Terminating Session...</p>
                </div>
            </div>
        `;

        document.body.appendChild(overlay);

        // 4. Handle Button Actions
        const cancelBtn = overlay.querySelector('.btn-cancel');
        const confirmBtn = overlay.querySelector('.btn-confirm');
        const contentDiv = overlay.querySelector('.logout-content');
        const loaderDiv = overlay.querySelector('.logout-loader');

        // Cancel - Remove the modal gracefully
        cancelBtn.addEventListener('click', () => {
            overlay.style.animation = 'fadeOut 0.3s forwards ease-out';
            setTimeout(() => {
                document.body.removeChild(overlay);
            }, 300); // Wait for animation to finish
        });

        // Confirm - Show spinner, redirect after delay
        confirmBtn.addEventListener('click', () => {
            // Swap content to loading state
            contentDiv.style.display = 'none';
            loaderDiv.style.display = 'flex';

            // Optional: Clear session storage or local storage here if needed
            // sessionStorage.clear();
            
            // Wait 1.5 seconds for visual feedback, then redirect
            setTimeout(() => {
                window.location.href = 'http://localhost:5173/index.html';
            }, 1500);
        });
    }
});