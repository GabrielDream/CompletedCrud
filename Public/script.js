async function addUser () {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    if(!name || !email) {
        alert("NAME AND EMAIL ARE REQUIRED!");
        return; 
    }

    const response = await fetch ('http://localhost:3040/api/add-user', {
        method: 'POST', 
        headers: {'Content-Type':
        'application/json' },
        body: JSON.stringify({ name, email })
    });

    if(response.status === 400) {
        const errorMenssage = await response.text(); 
        alert(errorMenssage);
    }
    else if(response.status === 201) {
        alert ("DATA SUCESSFULY ADDED!"); 
        userList();
    }else {
        alert("ERROR IN ADDING!"); 
    }
}


//userList:
async function userList() {
    const response = await fetch ('http://localhost:3040/api/user');

    const users = await response.json(); 

    const userList = document.getElementById('userList'); 
    userList.innerHTML = ""; 

    users.forEach (user => {
        const li = document.createElement('li'); 
        li.textContent = user.name; 


        //DELETING BUUTTON:>
        const delButton = document.createElement('button'); 
        delButton.textContent = "DELETE!!"; 
        delButton.style.marginLeft = "10px"; 
        delButton.onclick = () => deleteUser (user._id);

        userList.appendChild(li); 
        li.appendChild(delButton);  
    });
}

//DELETE FUNCTION!
async function deleteUser (id) {
    if(!confirm("DELETE THIS DATA?!")) {
        return; 
    }

    const response = await fetch (`http://localhost:3040/api/user/${id}`, {
        method: 'DELETE'
    }); 

    if(response.ok) {
        alert("DELETED!"); 
        userList(); 
    }else {
        alert("ERROR IN DELETING FUNCTION!M FIX THIS CODE!"); 
    }
}

window.onload = userList;
