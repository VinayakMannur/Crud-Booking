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

function onSubmit(e) {
    e.preventDefault();
    // console.log(nameInput.value);

    if (nameInput.value === '' || emailInput.value === '') {
        msg.classList.add('error');
        msg.innerHTML = 'Please enter all fields';
        setTimeout(() => msg.remove(), 3000);
    } else {
        
        let obj = {
            name: nameInput.value,
            email: emailInput.value
        };

        axios.post("http://localhost:8000/add", obj)
            .then((responce) => {
                // console.log(responce);
                alert(response.data.msg)
            })
            .catch(err => console.log(err))
            
        location.reload()
    }
}

function remove(id) {
    axios.get(`http://localhost:8000/delete/${id}`)
        .then((responce) => {
            // console.log(responce)
            alert(responce.data.msg)
        })
        .catch((err) => {
            console.log(err)
        })
}

function removeItem(e) {
    e.preventDefault();
    if (e.target.classList.contains('delete')) {
        remove(e.target.parentElement.firstChild.textContent);
        var li = e.target.parentElement;
        userList.removeChild(li);
        nameInput.value = '';
        emailInput.value = '';
    }
}

const update = document.getElementById('update');

update.addEventListener('click', replaceText);

async function replaceText() {

    let uname = document.getElementById('uname');
    let uemail = document.getElementById('uemail');
    let uid = document.getElementById('uid');

    console.log(uid.textContent)
    await axios.post(`http://localhost:8000/edit`, {
        id : uid.textContent,
        name: uname.value,
        email: uemail.value
    })
        .then((responce) => {
            // console.log(responce);
            alert(responce.data.msg)
        })
        .catch((err) => {
            console.log(err)
        })

    location.reload();
}

async function editPop(id) {
    // console.log(id);

    let uname = document.getElementById('uname');
    let uemail = document.getElementById('uemail');
    let uid = document.getElementById('uid');
    // console.log(uemail.value,uname.value);

    let listv = [];
    await axios.get("http://localhost:8000")
        .then((responce) => {
            // console.log(responce.data.data);

            listv = responce.data.data
        })

    // console.log(listv);

    listv.forEach((item) => {
        // console.log(item);

        if (item.id == id) {
            console.log("loging");
            uname.value = item.name
            uemail.value = item.email
            uid.textContent = item.id
        }
    })

}

function edit(e) {
    e.preventDefault();
    if (e.target.classList.contains('edit')) {
        // console.log(e.target.parentElement.firstChild.textContent)
        editPop(e.target.parentElement.firstChild.textContent)

    }
}


async function show2() {
    let listv = [];
    await axios.get("http://localhost:8000")
        .then((responce) => {
            // console.log(responce.data.data);

            listv = responce.data.data
        })

    // console.log(listv);

    listv.forEach((user) => {

        const li = document.createElement('li');
        const deleteBtn = document.createElement('button');
        const editBtn = document.createElement('button');
        deleteBtn.className = 'btn btn-danger btn-sm delete';
        editBtn.className = 'btn btn-sm btn-success edit';
        deleteBtn.appendChild(document.createTextNode('X'));
        editBtn.appendChild(document.createTextNode('EDIT'));

        const span = document.createElement('span');
        span.textContent = user.id;
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

