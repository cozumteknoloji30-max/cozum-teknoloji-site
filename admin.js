async function getUsers() {
    const response = await fetch("https://cozum-teknoloji.onrender.com/users");
    const users = await response.json();

    let html = "";
    users.forEach(u => {
        html += `<li>${u.username} - ${u.password}</li>`;
    });

    document.getElementById("userList").innerHTML = html;
}

// Kullanıcı adı veya şifre düzenleme
async function updateUser() {
    const oldName = document.getElementById("oldName").value;
    const newName = document.getElementById("newName").value;
    const newPass = document.getElementById("newPass").value;

    const response = await fetch("https://cozum-teknoloji.onrender.com/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            oldName,
            newName,
            newPass
        })
    });

    const result = await response.json();

    alert(result.message);
    getUsers();
}

getUsers();
