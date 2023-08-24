const myForm = document.querySelector('#my-form');
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const msg = document.querySelector('.msg');
const userList = document.querySelector('#users');
const editList = document.querySelector('#users');

myForm.addEventListener('submit', onSubmit);

userList.addEventListener('click', removeItem);

editList.addEventListener('click', edit);


show2()
/*
window.addEventListener("DOMContentLoaded", () => {
    axios.get("https://crudcrud.com/api/d01d62245470422b8b98f203cc9112f8/appointments")
        .then((responce) => {
            console.log(responce.data);

            for (var i = 0; i < responce.data.length; i++) {
                showUserList(responce.data[i]);
            }
        })
        .catch((err) => {
            console.log(err)
        })
})
*/
function showUserList(user) {

    const li = document.createElement('li');
    const deleteBtn = document.createElement('button');
    const editBtn = document.createElement('button');
    deleteBtn.className = 'delete';
    editBtn.className = 'edit';
    deleteBtn.appendChild(document.createTextNode('X'));
    editBtn.appendChild(document.createTextNode('EDIT'));

    const span = document.createElement('span');
    span.textContent = user._id;
    span.style = 'display:none';
    li.appendChild(span)

    li.appendChild(document.createTextNode(`${user.name} : ${user.email}  `));

    li.appendChild(editBtn);
    li.appendChild(deleteBtn);

    userList.appendChild(li);
}

function onSubmit(e) {
    e.preventDefault();
    // console.log(nameInput.value);

    if (nameInput.value === '' || emailInput.value === '') {
        msg.classList.add('error');
        msg.innerHTML = 'Please enter all fields';
        setTimeout(() => msg.remove(), 3000);
    } else {
        
        let obj = {
            name: `${nameInput.value}`,
            email: `${emailInput.value}`
        };


        axios.post("https://crudcrud.com/api/d01d62245470422b8b98f203cc9112f8/appointments", obj)
            .then((responce) => {
                console.log(responce);
                // console.log(responce.data);
            })
            .catch(err => console.log(err))


        // let myObj_serialized = JSON.stringify(obj);

        // localStorage.setItem(`${emailInput.value}`,myObj_serialized);
        // userList.appendChild(li);  
        // nameInput.value = '';
        // emailInput.value = '';
        location.reload()
    }
}

// function del(data,id){
//     if(data.email == emailid){
//         axios.delete(`https://crudcrud.com/api/d01d62245470422b8b98f203cc9112f8/appointments/${data._id}`)
//         .then((responce)=>{
//             console.log(responce)
//         })
//         .catch((err)=>{
//             console.log(err)
//         })
//     }
// }

function remove(id) {
    axios.delete(`https://crudcrud.com/api/d01d62245470422b8b98f203cc9112f8/appointments/${id}`)
        .then((responce) => {
            console.log(responce)
        })
        .catch((err) => {
            console.log(err)
        })
    // axios.get("https://crudcrud.com/api/d01d62245470422b8b98f203cc9112f8/appointments")
    //     .then((responce)=>{
    //         console.log(responce.data);

    //         for(var i=0;i<responce.data.length;i++){
    //             del(responce.data[i],id);
    //         }
    //     })

}

function removeItem(e) {
    e.preventDefault();
    if (e.target.classList.contains('delete')) {
        if (confirm('Are You Sure?')) {
            console.log(e.target.parentElement.firstChild.textContent)
            remove(e.target.parentElement.firstChild.textContent);
            var li = e.target.parentElement;
            userList.removeChild(li);
            nameInput.value = '';
            emailInput.value = '';
        }
    }
}

const update = document.getElementById('update');

update.addEventListener('click', replaceText);

async function replaceText() {

    let uname = document.getElementById('uname');
    let uemail = document.getElementById('uemail');
    let uid = document.getElementById('uid');

    console.log(uid.textContent)
    await axios.put(`https://crudcrud.com/api/d01d62245470422b8b98f203cc9112f8/appointments/${uid.textContent}`, {
        name: uname.value,
        email: uemail.value
    })
        .then((responce) => {
            console.log(responce)
        })
        .catch((err) => {
            console.log(err)
        })

    location.reload();
}



async function editPop(id) {
    console.log(id);

    let uname = document.getElementById('uname');
    let uemail = document.getElementById('uemail');
    let uid = document.getElementById('uid');
    // console.log(uemail.value,uname.value);

    let listv = [];
    await axios.get("https://crudcrud.com/api/d01d62245470422b8b98f203cc9112f8/appointments")
        .then((responce) => {
            console.log(responce.data);

            listv = responce.data
        })

    console.log(listv);

    listv.forEach((item) => {
        console.log(item);

        if (item._id == id) {
            console.log("loging");
            uname.value = item.name
            uemail.value = item.email
            uid.textContent = item._id
        }
    })

}

function edit(e) {
    e.preventDefault();
    if (e.target.classList.contains('edit')) {
        console.log(e.target.parentElement.firstChild.textContent)
        editPop(e.target.parentElement.firstChild.textContent)

    }
}


async function show2() {
    let listv = [];
    await axios.get("https://crudcrud.com/api/d01d62245470422b8b98f203cc9112f8/appointments")
        .then((responce) => {
            console.log(responce.data);

            listv = responce.data
        })

    console.log(listv);

    listv.forEach((user) => {

        const li = document.createElement('li');
        const deleteBtn = document.createElement('button');
        const editBtn = document.createElement('button');
        deleteBtn.className = 'btn btn-danger btn-sm delete';
        editBtn.className = 'btn btn-sm btn-success edit';
        deleteBtn.appendChild(document.createTextNode('X'));
        editBtn.appendChild(document.createTextNode('EDIT'));

        const span = document.createElement('span');
        span.textContent = user._id;
        span.style = 'display:none';
        editBtn.setAttribute("data-bs-toggle","modal" )
        editBtn.setAttribute("data-bs-target","#exampleModal")
        li.appendChild(span)

        li.appendChild(document.createTextNode(`${user.name} : ${user.email}  `));

        li.appendChild(editBtn);
        li.appendChild(deleteBtn);

        userList.appendChild(li);

    })
}

