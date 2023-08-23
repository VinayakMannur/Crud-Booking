const myForm = document.querySelector('#my-form');
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const msg = document.querySelector('.msg');
const userList = document.querySelector('#users');
const editList = document.querySelector('#users');

myForm.addEventListener('submit',onSubmit);

userList.addEventListener('click',removeItem);

editList.addEventListener('click',edit);

window.addEventListener("DOMContentLoaded",()=>{
    axios.get("https://crudcrud.com/api/8c80b94cf6224a1fb3f76363dc382e52/appointments")
        .then((responce)=>{
            console.log(responce.data);

            for(var i=0;i<responce.data.length;i++){
                showUserList(responce.data[i]);
            }
        })
        .catch((err)=>{
            console.log(err)
        })
})

function showUserList(user){
    const li = document.createElement('li');
    const deleteBtn = document.createElement('button');
    const editBtn = document.createElement('button');
    deleteBtn.className = 'delete';
    editBtn.className = 'edit';
    deleteBtn.appendChild(document.createTextNode('X'));
    editBtn.appendChild(document.createTextNode('EDIT'));

    const span = document.createElement('span');
    span.appendChild(document.createTextNode(`${user.email}`))
    span.style = 'display:none';
    li.appendChild(span)

    li.appendChild(document.createTextNode(`${user.name} : ${user.email}  `)); 

    li.appendChild(editBtn);
    li.appendChild(deleteBtn);

    userList.appendChild(li);  
}

function onSubmit(e){
    e.preventDefault();
    // console.log(nameInput.value);

    if(nameInput.value === '' || emailInput.value===''){
        msg.classList.add('error');
        msg.innerHTML = 'Please enter all fields';
        setTimeout(()=>msg.remove(),3000);
    }else{
        const li = document.createElement('li');
        const deleteBtn = document.createElement('button');
        const editBtn = document.createElement('button');
        deleteBtn.className = 'delete';
        editBtn.className = 'edit';
        deleteBtn.appendChild(document.createTextNode('X'));
        editBtn.appendChild(document.createTextNode('EDIT'));

        li.appendChild(document.createTextNode(`${nameInput.value} : ${emailInput.value}  `)); 
        li.appendChild(editBtn);
        li.appendChild(deleteBtn);
        let obj = {
            name : `${nameInput.value}`,
            email : `${emailInput.value}`
        };


        axios.post("https://crudcrud.com/api/8c80b94cf6224a1fb3f76363dc382e52/appointments",obj)
            .then((responce)=>{
                userList.appendChild(li);
                // console.log(responce.data);
            })
            .catch(err=>console.log(err))


        // let myObj_serialized = JSON.stringify(obj);

        // localStorage.setItem(`${emailInput.value}`,myObj_serialized);
        // userList.appendChild(li);  
        // nameInput.value = '';
        // emailInput.value = '';
    }
}

function del(data,emailid){
    if(data.email == emailid){
        axios.delete(`https://crudcrud.com/api/8c80b94cf6224a1fb3f76363dc382e52/appointments/${data._id}`)
        .then((responce)=>{
            console.log(responce)
        })
        .catch((err)=>{
            console.log(err)
        })
    }
}

function remove(emailid){
    axios.get("https://crudcrud.com/api/8c80b94cf6224a1fb3f76363dc382e52/appointments")
        .then((responce)=>{
            console.log(responce.data);

            for(var i=0;i<responce.data.length;i++){
                del(responce.data[i],emailid);
            }
        })

}

function removeItem(e){
    e.preventDefault();
    if(e.target.classList.contains('delete')){
        if(confirm('Are You Sure?')){
            console.log(e.target.parentElement.firstChild.textContent)
            remove(e.target.parentElement.firstChild.textContent);
            var li = e.target.parentElement;
            userList.removeChild(li);
            nameInput.value = '';
            emailInput.value = '';
        }
    }
}

function edit(e){
    e.preventDefault();
    if(e.target.classList.contains('edit')){
        localStorage.removeItem(`${emailInput.value}`);
        var li = e.target.parentElement;
            userList.removeChild(li);
    }
}

