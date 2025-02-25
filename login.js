const CLIENT_ID = CONFIG.GOOGLE_CLIENT_ID;
const REDIRECT_URI = "http://localhost:8080";

async function openGoogleLoginPopup() {
    const url = await `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&response_type=token&redirect_uri=${REDIRECT_URI}&scope=openid%20profile%20email&prompt=consent`;

    // Open a new popup
    const popup = window.open(url, "Google Login", "width=500,height=600");

    // Poll the popup window to check when it redirects back
    const interval = setInterval(() => {
        try {
            if (popup.location.origin === window.location.origin) {
                const params = new URLSearchParams(popup.location.hash.substring(1));
                const accessToken = params.get("access_token");

                if (accessToken) {
                    popup.close();
                    clearInterval(interval);
                    fetchUserInfo(accessToken);
                }
            }
        } catch (error) {
            // Ignore cross-origin errors until redirected back
        }
    }, 1000);
}

function fetchUserInfo(token) {
    fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
        headers: { Authorization: `Bearer ${token}` }
    })
    .then(response => response.json())
    .then(user => {
        console.log(user)
        document.getElementById('profile-pic').src = user.picture;
        document.getElementById('username').innerText = `Hello, ${user.name}`;
        document.getElementById('profile').style.display = "block";
        document.getElementById('loginBtn').style.display = "none"; // Hide login button
        localStorage.setItem("access_token", token); // Store token for session persistence
    })
    .catch(error => console.error("Error fetching user info:", error));
}

function logout() {
    localStorage.removeItem("access_token");
    document.getElementById('profile').style.display = "none";
    document.getElementById('login-btn').style.display = "block"; // Show login button
}

window.onload = function() {
    const token = localStorage.getItem("access_token");
    if (token) {
        fetchUserInfo(token); // Auto-login if token exists
    }
};
