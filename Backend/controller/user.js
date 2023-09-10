const User = require('../model/user');

exports.getAll = (req, res, next) => {
    User.fetchAll()
        .then( data =>{
            // console.log(data);
            res.json({data:data[0]})
        })
        .catch( err => console.log(err))
};

exports.addUser = (req,res ,next) =>{
    const name = req.body.name;
    const email = req.body.email;
    console.log(name, email);
    const user = new User(null, name, email);

    user.save()
        .then((result) =>{
            // console.log(result);
            res.json({msg:"User added successfully"})
        })
        .catch(err => console.log(err))
    
}

exports.editUser = (req, res, next) =>{
    const editId = req.body.id;
    const editName = req.body.name;
    const editEmail = req.body.email;

    const user = new User(editId, editName, editEmail);

    user.save()
        .then((responce) =>{
            res.json({msg:"Updated successfully"});
        })
        .catch(err => console.log(err))
}

exports.deleteUser = (req,res,next) =>{
    const deleteId = req.params.id;
    
    User.deleteById(deleteId)
        .then((result) =>{
            res.json({msg: "User deleted Successfully"})
        })
        .catch(err => console.log(err))
}
