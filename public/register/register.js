// document.getElementById('submitData').addEventListener('click', async () => {
//     const response = await fetch('/createUser');
//     const data = await response.json();
//     document.getElementById('output').textContent = JSON.stringify(data);
// });
document.getElementById("registerForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    // const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    document.getElementById("message").textContent = data.message;

    if (response.ok) {
        window.location.href = "/login";
    }
});