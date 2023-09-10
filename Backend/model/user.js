// const Sequelize = require('sequelize');

// const sequelize = require('../util/database');

// const User = sequelize.define('user',{
//     id:{
//         type: Sequelize.INTEGER,
//         autoIncrement: true,
//         allowNull: false,
//         primaryKey: true
//     },
//     name: {
//         type: Sequelize.STRING,
//         allowNull: false
//     },
//     email: {
//         type: Sequelize.STRING,
//         allowNull: false
//     }
// })

// module.exports = User;

const db = require('../util/database');

module.exports = class User {
    constructor(id, name, email) {
      this.id = id;
      this.name = name;
      this.email = email;
    }

    save() {
        if(!this.id){
            return db.execute('INSERT INTO user (name, email) VALUES (?, ?)',
            [this.name, this.email]);
        }
        else{
            console.log('logging the uodate');
            return db.execute('UPDATE user SET name=?, email=? WHERE id=?',
            [this.name, this.email, this.id])
        }
    }

    static deleteById(id) {
        return db.execute('DELETE FROM user WHERE id=?',[id])
    }

    static fetchAll() {
        return db.execute('SELECT * FROM user')
    }

}