const sqlite = require('sqlite3').verbose();
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { createToken } = require('../midlewares/jwt');
require('dotenv').config();


const db = new sqlite.Database("./database.db", sqlite.OPEN_READWRITE, err => err && console.log(err));


const authUser = async (req, res) => {
    try{
        res.json(req.user)
    }catch(error){
        res.status(404).send(error)
    }
}

// LOGIN USER
const loginUser = (req, res) => {
    try {
        const { email, password } = req.body;
        db.get(`SELECT * FROM users WHERE email='${email}'`, async (err, user) => {
            if(err) throw err;
            if(!user) return res.status(404).send('Not registered!')
            const verified = await bcryptjs.compare(password, user.password)
            if(!verified){
                return res.status(409).send('Wrong Password!')
            }
            const userCredentials = {id:user.id, name:user.name, email:user.email, profile_image:user.profile_image}
            const ACCESS_TOKEN = await createToken(userCredentials);
            res.cookie('ACCESS_TOKEN', ACCESS_TOKEN, {
                expires: new Date(Date.now() + (3600 * 1000 * 24 * 180 * 1)),
                httpOnly: true,
                sameSite: "none",
                secure: 'false',
            });
            res.json({
                user:userCredentials,
                ACCESS_TOKEN
            })
        })
    } catch (error) {
        console.log(error)
    }
}

// db.run('update resumies set user_id = 3 Where id = 3')
// RESGISTER NEW USER
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        db.get(`SELECT * FROM users WHERE email='${email}'`, async (err, user) => {
            if(err) throw err;
            if(user){
                res.status(409).send('Already registered!')
            }else{
                // const profleImage = 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_640.png'
                const profleImage = 'http://localhost:3001/images/user.png'
                const hashPass = await bcryptjs.hash(password, 4)
                sql = 'INSERT INTO users(name, email, password, profile_image) VALUES(?,?,?,?)'
                db.run(sql, [name, email, hashPass, profleImage], async err => {
                    if(err) throw err
                    const userCredentials = {id:Date.now(), name, email, profile_image:profleImage}
                    const ACCESS_TOKEN = await createToken(userCredentials);
                    res.cookie('ACCESS_TOKEN', ACCESS_TOKEN, {
                        expires: new Date(Date.now() + (3600 * 1000 * 24 * 180 * 1)),
                        httpOnly: true,
                        sameSite: "none",
                        secure: 'false',
                    });
                    res.json(userCredentials)
                })
            }
        })
    } catch (error) {
        res.send('Error')
     console.log(error)   
    }
}

const getAllUsersController = (req, res) => {
    try{
        db.all('SELECT * FROM users', [], (err, rows) => {
            if(err) throw err;
            res.json(rows)
        })

    }catch(error){
        console.log(error)
    }
}


module.exports = { 
    getAllUsersController, 
    registerUser, 
    authUser,
    loginUser,
}
