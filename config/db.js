const mysql = require('mysql');

module.exports = function () {
    return {
        options: options = {
            host: process.env.DB_HOST,
            port: '3306',
            user: process.env.DB_USER,
            password: process.env.DB_PWD,
            database: process.env.DB_NAME
        },
        init: function () {
            return mysql.createConnection(options)
        },
        open: function (con) {
            con.connect(function (err) {
                if (err) {
                    console.log('mysql connection error :' + err)
                } else {
                    console.log('mysql is connected successfully.')
                }
            })
        }
    }
};