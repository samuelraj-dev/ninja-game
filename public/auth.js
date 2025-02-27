async function checkAuth() {
    try {
        const res = await fetch('/api/auth/status', {
            method: 'GET',
            credentials: 'include'
        });
        const data = await res.json();
        if (data.loggedIn) {
            document.getElementById('profile').style.display = 'flex';
            document.getElementById('username').textContent = data.user.email;
        } else {
            document.getElementById('loginBtn').style.display = 'block';
        }
    } catch (error) {
        console.error("Error checking auth status:", error);
    }
}

async function logout() {
    try {
        await fetch('/api/auth/logout', {
            method: 'DELETE',
            credentials: 'include'
        });
        window.location.reload();
    } catch (error) {
        console.error("Error logging out:", error);
    }
}

checkAuth();