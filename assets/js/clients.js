const openBtn = document.getElementById("openClientModal");
const closeBtn = document.getElementById("closeModal");
const modal = document.getElementById("clientModal");

// Edit Mode
let editingClientId = null;

openBtn.addEventListener("click", function () {
    editingClientId = null;

    clientForm.reset();

    clearFieldError("clientName");
    clearFieldError("clientEmail");
    clearFieldError("clientCompany");

    modal.classList.remove("hidden");
});

closeBtn.addEventListener("click", function () {
    modal.classList.add("hidden");
});

const clientForm = document.getElementById("clientForm");

clientForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const clientName = document.getElementById("clientName").value.trim();
    const clientEmail = document.getElementById("clientEmail").value.trim().toLowerCase();
    const clientCompany = document.getElementById("clientCompany").value.trim();

    clearFieldError("clientName");
    clearFieldError("clientEmail");
    clearFieldError("clientCompany");

    if (clientName.length < 3) {
        showFieldError("clientName", "Client name must contain at least 3 characters.");
        return;
    }

    if (clientEmail === "") {
        showFieldError("clientEmail", "Email is required.");
        return;
    }

    if (!clientEmail.includes("@")) {
        showFieldError("clientEmail", "Please enter a valid email.");
        return;
    }

    if (clientCompany === "") {
        showFieldError("clientCompany", "Company is required.");
        return;
    }

    const clients = JSON.parse(localStorage.getItem("crm_clients")) || [];

    if (editingClientId === null) {

        const client = {
            id: Date.now(),
            name: clientName,
            email: clientEmail,
            company: clientCompany,
            createdAt: new Date().toISOString()
        };

        clients.push(client);

        showToast("Client added successfully!");

    } else {

        const client = clients.find(function (item) {
            return item.id === editingClientId;
        });

        client.name = clientName;
        client.email = clientEmail;
        client.company = clientCompany;

        showToast("Client updated successfully!");

        editingClientId = null;
    }

    localStorage.setItem("crm_clients", JSON.stringify(clients));

    clientForm.reset();

    modal.classList.add("hidden");

    renderClients();

});

function renderClients() {

    const clients = JSON.parse(localStorage.getItem("crm_clients")) || [];

    const tableBody = document.getElementById("clientsTableBody");

    tableBody.innerHTML = "";

    clients.forEach(function (client) {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${client.name}</td>
            <td>${client.email}</td>
            <td>${client.company}</td>
            <td>
                <button class="edit-btn" data-id="${client.id}">
                    Edit
                </button>

                <button class="delete-btn" data-id="${client.id}">
                    Delete
                </button>
            </td>
        `;

        tableBody.appendChild(row);

    });

}

renderClients();

document.addEventListener("click", function (event) {

    if (event.target.classList.contains("delete-btn")) {

        const clientId = Number(event.target.dataset.id);

        deleteClient(clientId);

    }

    if (event.target.classList.contains("edit-btn")) {

        const clientId = Number(event.target.dataset.id);

        editClient(clientId);

    }

});

function deleteClient(clientId) {

    let clients = JSON.parse(localStorage.getItem("crm_clients")) || [];

    clients = clients.filter(function (client) {
        return client.id !== clientId;
    });

    localStorage.setItem("crm_clients", JSON.stringify(clients));

    showToast("Client deleted successfully!");

    renderClients();

}

function editClient(clientId) {

    const clients = JSON.parse(localStorage.getItem("crm_clients")) || [];

    const client = clients.find(function (item) {
        return item.id === clientId;
    });

    document.getElementById("clientName").value = client.name;
    document.getElementById("clientEmail").value = client.email;
    document.getElementById("clientCompany").value = client.company;

    editingClientId = client.id;

    modal.classList.remove("hidden");

}