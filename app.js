require('dotenv').config();
const express = require('express');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const app = express();
const port = 4000;

const db = require('./config/db')();
app.use(
    session({
        secret: 'book@keeping!house',
        store: new MySQLStore(db.options),
        resave: false,
        saveUninitialized: false
    })
)
const connection = db.init();
db.open(connection);

const { body, validationResult } = require('express-validator');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//todo 회원가입
app.post('/api/signup',
    //! 유효성 검사
    body('email').isEmail(), body('password').isLength({ min: 4 }),
    (req, res) => {
        console.log(req.body)
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        //!중복 검사
        let nicknameCheck = `SELECT * FROM users WHERE nickname=?`;
        let emailCheck = `SELECT * FROM users WHERE email=?`;
        connection.query(nicknameCheck, [req.body.nickname], function (err, result) {
            if (result.length !== 0) {
                return res.status(400).send('exist nickname');
            } else {
                connection.query(emailCheck, [req.body.email], (err, result) => {
                    if (result.length !== 0) {
                        return res.status(400).send('exist email');
                    } else {
                        //! 유저 저장
                        let sql = `INSERT INTO users (nickname, email, password) VALUES (?,?,?)`;
                        connection.query(sql, [req.body.nickname, req.body.email, req.body.password], (err, result) => {
                            if (result.length !== 0) {
                                let initial = `INSERT INTO income_expenditure (income, expenditure, userId) VALUES (?,?,?)`;
                                connection.query(initial, [0, 0, result.insertId], (err, result) => {
                                    if (err) {
                                        console.log(err)
                                    }
                                })
                                //return res.status(200).send('success sign up');

                                let login = 'SELECT * FROM users WHERE email=? AND password=?'
                                connection.query(login, [req.body.email, req.body.password], (err, result) => {
                                    console.log(result)
                                    console.log(result[0].id)
                                    if (err) {
                                        return res.status(404).send('not found user')
                                    } else {
                                        req.session.userId = result[0].id;
                                        req.session.save(() => {
                                            console.log(result[0].id)
                                            let housekeeping = `SELECT * FROM income_expenditure WHERE userId=?`
                                            connection.query(housekeeping, [result[0].id], (err, result2) => {
                                                console.log(result2)
                                                let data = {
                                                    id: result[0].id,
                                                    email: result[0].email,
                                                    nickname: result[0].nickname,
                                                    income: result2[0].income,
                                                    expenditure: result2[0].expenditure,
                                                }
                                                res.status(200).json(data);
                                            })
                                        })
                                    }
                                })

                            } else {
                                console.log(err)
                            }
                        })
                    }
                })
            }
        })
    })
//todo 로그인
app.post('/api/login', (req, res) => {
    let login = 'SELECT * FROM users WHERE email=? AND password=?'
    connection.query(login, [req.body.email, req.body.password], (err, result) => {
        console.log(result)
        console.log(result[0].id)
        if (err) {
            return res.status(404).send('not found user')
        } else {
            req.session.userId = result[0].id;
            req.session.save(() => {
                console.log(result[0].id)
                let housekeeping = `SELECT * FROM income_expenditure WHERE userId=?`
                connection.query(housekeeping, [result[0].id], (err, result2) => {
                    console.log(result2)
                    let data = {
                        id: result[0].id,
                        email: result[0].email,
                        nickname: result[0].nickname,
                        income: result2[0].income,
                        expenditure: result2[0].expenditure,
                    }
                    res.status(200).json(data);
                })
            })
        }
    })
})
//todo 로그아웃
app.post('/api/logout', (req, res) => {
    if (!req.session.userId) {
        return res.status(404).send('unauthorization user');
    } else {
        delete req.session.userId;

        req.session.save(() => {
            return res.status(200).send('success logout')
        })
    }
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})

