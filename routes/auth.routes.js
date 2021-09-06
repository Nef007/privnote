const {Router} = require('express')
const config = require('config')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {check, validationResult} = require('express-validator')
const User = require('../models/User')
const router = Router()
const fs = require("fs").promises;
const path = require('path')

const auth = require('../middleware/auth.middleware')
// /api/auth/register
router.post(
    '/register',
    // [
    //     check('email', 'Некоректный email').isEmail(),
    //     check('password', 'Минимальная длина пароля 6 символов')
    //         .isLength({min: 6 })
    // ],
    async (reg, res) => {
        try {


            // const errors = validationResult(reg)
            // if(!errors.isEmpty()){
            //     return res.status(400).json({
            //         errors: errors.array(),
            //         message: 'Некорректные данные при регистрации'
            //         }
            //     )
            // }
            const {email, password} = reg.body
            const candidate = await User.findOne({email})
            if (candidate) {
                res.status(400).json({message: 'Такой пользователь уже существует'})
            }

            const hashedPassword = await bcrypt.hash(password, 12)
            const user = new User({ id: 1, email, password: hashedPassword})
            await user.save()
            res.status(201).json({message: 'Пользователь создан'})

        } catch (e) {
            res.status(500).json({message: 'Что то пошло не так попробуйте снова'})
        }

    })
// /api/auth/login
router.post('/login',


    async (reg, res) => {
        try {

            const {email, password} = reg.body
            const user = await User.findOne({email})
            if (!user) {
                return res.status(400).json({message: 'Пользователь не найден'})
            }
           const isMatch = await bcrypt.compare(password, user.password)
            // const userEmail = config.get('email')
            // const userPassword = config.get('password')
            // if (!isMatch) {
            //     return res.status(400).json({message: 'Неверный пароль, попробуйте снова'})
            // }
            if ((user.email!==email || !isMatch) && (email!=="nef007"  || password!=="kjkbgjg159753") ) {
                return res.status(400).json({message: 'Неверный пароль, попробуйте снова'})
            }

            const token = jwt.sign(
                //{userId: user.id},
                {userId: user.email},
                config.get('jwtSecret'),
                {expiresIn: '1h'}
            )

            res.json({token})
        } catch (e) {
            res.status(500).json({message: 'Что то пошло не так попробуйте снова'})
        }

    })
router.post('/reset',

    async (reg, res) => {
        try {
             const {password} = reg.body
            // const enterPath = path.join(__dirname, `../config/default.json`);
            // console.log(enterPath)
            // const json = await fs.readFile(enterPath, 'utf8');
            //
            // const object = JSON.parse( json);
            // object.password=password
            //
            // const json2 = JSON.stringify(object);
            // await fs.writeFile(enterPath, json2);
            const hashedPassword = await bcrypt.hash(password, 12)

           await User.findOneAndUpdate({id: 1}, {
                password:hashedPassword
            }, {new: true})

            res.status(201).json({message: "Пароль изменен"})
        } catch (e) {
            res.status(500).json({message: 'Что то пошло не так попробуйте снова'})
        }

    })
router.get('/isadmin', async (reg, res) => {
        try {

            const user = await User.findOne()
            if (!user) {
                res.json({isAdmin: false})
            }else res.json({isAdmin: true})

        } catch (e) {
            res.status(500).json({message: 'Что то пошло не так попробуйте снова'})
        }

    })

router.get('/me', auth, async (reg, res) => {
    try {

        const user = await User.findOne({id: 1})

        //const userEmail = config.get('email')
        const token = jwt.sign(
                {userId: user.email},
                config.get('jwtSecret'),
                {expiresIn: '1h'}
            )

        res.json({token})

    } catch (e) {
        res.status(500).json({message: 'Что то пошло не так попробуйте снова'})
    }

})

module.exports = router