// Verity Core Configuration & Auth Management
// firebaseConfig is loaded from firebase-config.js (not in Git)
// If firebaseConfig is not defined, initialization will fail.
if (typeof firebaseConfig === 'undefined') {
    console.error("firebaseConfig is not defined. Please make sure firebase-config.js is loaded.");
}

// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const auth = firebase.auth();
const db = firebase.database();

// Global User State
let currentUser = null;

// Image Utility: Convert file to Base64 with optional compression
async function fileToBase64(file, maxWidth = 800) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event) => {
            const img = new Image();
            img.src = event.target.result;
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const scale = maxWidth / img.width;
                if (scale < 1) {
                    canvas.width = maxWidth;
                    canvas.height = img.height * scale;
                } else {
                    canvas.width = img.width;
                    canvas.height = img.height;
                }
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                resolve(canvas.toDataURL('image/jpeg', 0.7)); // Compressed to 70% quality
            };
        };
        reader.onerror = error => reject(error);
    });
}

// Initialize Auth Listener
auth.onAuthStateChanged(user => {
    if (user) {
        currentUser = user;
        // Update local storage for immediate access across pages
        db.ref('users/' + user.uid).once('value').then(snapshot => {
            if (snapshot.exists()) {
                const userData = snapshot.val();
                localStorage.setItem('verity_user', JSON.stringify({
                    uid: user.uid,
                    name: userData.name,
                    email: user.email,
                    photoURL: userData.profilePic || userData.photoURL || 'https://via.placeholder.com/150'
                }));
                // Custom event for pages to react to auth ready
                window.dispatchEvent(new CustomEvent('verity_auth_ready', { detail: userData }));
            }
        });
    } else {
        currentUser = null;
        localStorage.removeItem('verity_user');
        // Redirect to login if not on login page
        if (!window.location.pathname.includes('login.html')) {
            window.location.href = 'login.html';
        }
    }
});

// Common UI Utilities
function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;
    
    if (diff < 60000) return 'Just now';
    if (diff < 3600000) return Math.floor(diff / 60000) + 'm ago';
    if (diff < 86400000) return Math.floor(diff / 3600000) + 'h ago';
    if (diff < 604800000) return Math.floor(diff / 86400000) + 'd ago';
    return date.toLocaleDateString();
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Notification System
function showToast(message, type = 'info') {
    // Basic toast implementation
    const toast = document.createElement('div');
    toast.className = `alert alert-${type} position-fixed bottom-0 end-0 m-3 shadow-lg`;
    toast.style.zIndex = '9999';
    toast.innerHTML = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}
