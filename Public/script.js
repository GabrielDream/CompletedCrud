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


