const myForm = document.querySelector('#my-form');
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const msg = document.querySelector('.msg');
const userList = document.querySelector('#users');
const editList = document.querySelector('#users');

myForm.addEventListener('submit',onSubmit);

userList.addEventListener('click',removeItem);

editList.addEventListener('click',edit);

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

        axios.post("https://crudcrud.com/api/310b601288d54688a2089c8033b9fb26/appointments",obj)
            .then((responce)=>{
                userList.appendChild(li);
                console.log(responce.data);
            })
            .catch(err=>console.log(err))


        // let myObj_serialized = JSON.stringify(obj);

        // localStorage.setItem(`${emailInput.value}`,myObj_serialized);
        // userList.appendChild(li);  
        // nameInput.value = '';
        // emailInput.value = '';
    }
}

function removeItem(e){
    e.preventDefault();
    if(e.target.classList.contains('delete')){
        if(confirm('Are You Sure?')){
            localStorage.removeItem(`${emailInput.value}`);
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