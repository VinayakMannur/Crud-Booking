// const Sequelize = require('sequelize');

// const sequelize = new Sequelize('booking-appointment', 'root', 'Vinz@#$200120',{
//     dialect: 'mysql',
//     host: 'localhost'
// });

// module.exports = sequelize;

const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'booking-appointment',
    password: 'Vinz@#$200120'
})

module.exports = pool.promise();