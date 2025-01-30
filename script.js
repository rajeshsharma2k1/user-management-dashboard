document.addEventListener("DOMContentLoaded", function () {
    const API_URL = "https://jsonplaceholder.typicode.com/users";
    const userTableBody = document.getElementById("userTableBody");
    const userModal = document.getElementById("userModal");
    const modalTitle = document.getElementById("modalTitle");
    const addUserBtn = document.getElementById("addUserBtn");
    const closeModal = document.querySelector(".close");
    const userForm = document.getElementById("userForm");
    let editingUserId = null;

    // Fetch users and display them
    function fetchUsers() {
        fetch(API_URL)
            .then(response => response.json())
            .then(users => {
                userTableBody.innerHTML = "";
                users.forEach(user => addUserToTable(user));
            })
            .catch(error => console.error("Error fetching users:", error));
    }

    // Add user row to table
    function addUserToTable(user) {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${user.id}</td>
            <td>${user.name.split(" ")[0]}</td>
            <td>${user.name.split(" ")[1] || ""}</td>
            <td>${user.email}</td>
            <td>${user.company?.name || "N/A"}</td>
            <td class="actions">
                <button class="edit" onclick="editUser(${user.id})">Edit</button>
                <button class="delete" onclick="deleteUser(${user.id})">Delete</button>
            </td>
        `;
        userTableBody.appendChild(row);
    }

    // Open modal for adding/editing user
    function openModal(edit = false) {
        userModal.style.display = "block";
        modalTitle.innerText = edit ? "Edit User" : "Add User";
    }

    // Close modal
    closeModal.onclick = () => {
        userModal.style.display = "none";
        userForm.reset();
        editingUserId = null;
    };

    // Handle form submission for adding/editing users
    userForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const userData = {
            name: `${document.getElementById("firstName").value} ${document.getElementById("lastName").value}`,
            email: document.getElementById("email").value,
            company: { name: document.getElementById("department").value }
        };

        if (editingUserId) {
            fetch(`${API_URL}/${editingUserId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userData)
            })
                .then(response => response.json())
                .then(() => {
                    fetchUsers();
                    closeModal.click();
                })
                .catch(error => console.error("Error updating user:", error));
        } else {
            fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userData)
            })
                .then(response => response.json())
                .then(user => {
                    user.id = Math.floor(Math.random() * 1000);
                    addUserToTable(user);
                    closeModal.click();
                })
                .catch(error => console.error("Error adding user:", error));
        }
    });

    // Edit user
    window.editUser = function (id) {
        openModal(true);
        editingUserId = id;
    };

    // Delete user
    window.deleteUser = function (id) {
        fetch(`${API_URL}/${id}`, { method: "DELETE" })
            .then(() => fetchUsers())
            .catch(error => console.error("Error deleting user:", error));
    };

    // Show modal on "Add User" button click
    addUserBtn.onclick = () => openModal();

    // Fetch and display users on page load
    fetchUsers();
});
