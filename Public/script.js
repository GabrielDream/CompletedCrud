async function addUser() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    if (!name || !email) {
        alert("NAME AND EMAIL ARE REQUIRED!");
        return;
    }

    try{
        const response = await fetch('http://localhost:3040/api/add-user', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email })
        });

        
        if (response.status === 400) {
            const errorMessage = await response.text();
            alert(errorMessage);
        } 
        else if (response.status === 201) {
        alert("DATA SUCCESSFULLY ADDED!");
        userList();
        }
        else {
            alert("ERROR IN ADDING!");
        }

    }catch (err) { 
        alert("NETWORK ERROR! TRY AGAIN.");
        console.error("Error in addUser():", error);
    }
}

// Função para listar usuários
async function userList() {
    try{
        const response = await fetch('http://localhost:3040/api/user');
        const users = await response.json();

        const userList = document.getElementById('userList');
        userList.innerHTML = "";

        users.forEach(user => {
            const li = document.createElement('li');
            li.textContent = `${user.name} - ${user.email}`;
    
            // Botão de deletar
            const delButton = document.createElement('button');
            delButton.textContent = "DELETE";
            delButton.style.marginLeft = "10px";
            delButton.onclick = () => deleteUser(user._id);
    
            // Botão de atualização
            const updateButton = document.createElement('button');
            updateButton.textContent = "UPDATE";
            updateButton.style.marginLeft = "10px";
            updateButton.onclick = () => userUpdate(user._id, user.name, user.email);
    
            li.appendChild(delButton);
            li.appendChild(updateButton);
            userList.appendChild(li);
        });

    }catch (err) {
        alert("NETWORK ERROR! TRY AGAIN.");
        console.error("Error in userList():", err);
    }
}

// Função para deletar usuário
async function deleteUser(id) {
    if (!confirm("DELETE THIS DATA?!")) {
        return;
    }

    try{
        const response = await fetch(`http://localhost:3040/api/user/${id}`, {
            method: 'DELETE'
        });
           
        if (response.ok) {
            alert("DELETED!");
            userList();
        }
        else {
            alert("ERROR IN DELETING FUNCTION! FIX THIS CODE!");
        }

    }catch (err) {
        alert("NETWORK ERROR! TRY AGAIN.");
        console.error("Error in deleteUser():", error);
    }
}

// Função para atualizar usuário
async function userUpdate(userId, currentName, currentEmail) {
    // Criar inputs para edição
    const nameInput = document.createElement("input");
    nameInput.type = "text";
    nameInput.value = currentName;

    const emailInput = document.createElement("input");
    emailInput.type = "email";
    emailInput.value = currentEmail;

    const confirmButton = document.createElement("button");
    confirmButton.textContent = "UPDATE NOW!";

    confirmButton.onclick = async () => {
        const newName = nameInput.value.trim();
        const newEmail = emailInput.value.trim();

        if (!newName || !newEmail) {
            alert("NAME and EMAIL are required!");
            return;
        }

        try {
            const response = await fetch(`http://localhost:3040/api/user/${userId}`, {
                method: 'PUT',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify({ name: newName, email: newEmail })
            });

            const result = await response.text();
            alert(result);

            if (response.ok) {
                window.location.reload();
            }
        } catch (err) {
            alert("ERROR UPDATING USER!!");
        }
    };

    // Criar e exibir div para edição'
    const editDiv = document.createElement("div");
    editDiv.appendChild(nameInput);
    editDiv.appendChild(emailInput);
    editDiv.appendChild(confirmButton);

    document.body.appendChild(editDiv);
}

// Carregar lista de usuários ao iniciar a página
window.onload = userList;
