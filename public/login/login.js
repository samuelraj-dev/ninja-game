// document.getElementById('submitData').addEventListener('click', async () => {
//     const response = await fetch('/createUser');
//     const data = await response.json();
//     document.getElementById('output').textContent = JSON.stringify(data);
// });
// async function login() {
//     const email = document.getElementById("email").value;
//     const password = document.getElementById("password").value;

//     const response = await fetch("/api/auth/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         credentials: "include",
//         body: JSON.stringify({ email, password })
//     });

//     const data = await response.json();
//     document.getElementById("message").textContent = data.message;

//     if (response.ok) {
//         window.location.href = "/dashboard.html";
//     }
// }
document.getElementById("loginForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    document.getElementById("message").textContent = data.message;
    console.log(data.message)

    if (response.ok) {
        window.location.href = "/";
    }
});