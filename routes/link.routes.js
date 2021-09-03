const {Router} = require('express')
const config = require('config')
const shortid = require('shortid')
const Link = require('../models/Links')
const auth = require('../middleware/auth.middleware')
const router = Router()

router.post('/create', async (req, res) => {
    try {


        const baseUrl = config.get('baseUrl')
        const {text, password, hour, confirm, email, name} = req.body.form

        const code = shortid.generate()
        const code2 = shortid.generate()


        const dateDetected = (hour) => {
            let convertHour = 0
            if (hour === "1") {
                convertHour = Date.now() + 3378000
            }
            if (hour === "24") {
                convertHour = Date.now() + 82800000 + 3378000
            }
            if (hour === "168") {
                convertHour = Date.now() + 601200000 + 3378000
            }
            if (hour === "720") {
                convertHour = Date.now() + 2588400000 + 3378000
            }

            return convertHour
        }
        let newHour = dateDetected(hour)

        let link
        if (password) {
            link = baseUrl + '/' + code
        } else {
            link = baseUrl + '/' + code + '#' + code2
        }


        const newLink = new Link({
            text, password, hour: newHour, deletehour: newHour, confirm, email, name, link, short: code
        })

        await newLink.save()


        res.status(201).json({link, password, hour: newHour})


    } catch (e) {
        res.status(500).json({message: 'Что то пошло не так попробуйте снова'})
    }


})
router.get('/', async (req, res) => {
    try {

        const links = await Link.find()

        res.json(links)
    } catch (e) {
        res.status(500).json({message: 'Что то пошло не так попробуйте снова'})
    }


})
router.post('/:id', async (req, res) => {
    try {

        const {password} = req.body
        const link = await Link.findOne({short: req.params.id})
        if (!link) {
            return res.status(400).json({message: 'Ссылка не найдена'})
        }

        if (link.password !== password) {
            return res.status(400).json({message: "Введен неверный пароль. Пожалуйста, попробуйте снова."})
        }
        if (link.hour) {
            res.json(link)
        } else {
            // стереть текст
            await Link.updateOne({short: req.params.id}, {status: "Удалена", deleteNoteDate: Date.now()})
            res.json(link)
        }


    } catch (e) {
        res.status(500).json({message: 'Что то пошло не так попробуйте снова'})
    }
})


router.post('/save/:id', async (req, res) => {
    try {

        const {text} = req.body
        const link = await Link.findOne({short: req.params.id})
        if (!link) {
            return res.status(400).json({message: 'Ссылка не найдена'})
        }

        await Link.updateOne({short: req.params.id}, {text: text})
        const links = await Link.find()

        res.json({links: links, message: `Ссылка ${req.params.id} изменена`})

    } catch (e) {
        res.status(500).json({message: 'Что то пошло не так попробуйте снова'})
    }


})

router.delete('/:id', async (req, res) => {
    try {


        // стереть текст
        const link = await Link.findOneAndUpdate({short: req.params.id}, {
            hour: 0,
            status: "Удалена",
            deleteNoteDate: Date.now()
        }, {new: true})


        res.json(link)


    } catch (e) {
        res.status(500).json({message: 'Что то пошло не так попробуйте снова'})
    }

})

router.delete('/', async (req, res) => {
    try {

        // стереть текст
        await Link.deleteMany()

        res.status(201).json({})

    } catch (e) {
        res.status(500).json({message: 'Что то пошло не так попробуйте снова'})
    }


})

router.get('/check/:id', async (req, res) => {
    try {

        const link = await Link.findOne({short: req.params.id})
        if (!link) {
            return res.status(201).json({
                message: "404",
            })
        } else if (link.status === "Удалена") {
            return res.status(201).json({
                isCheck: false,
                short: link.short,
                deleteNoteDate: link.deleteNoteDate,
            })
        } else {
            return res.status(201).json({
                isCheck: true,
                confirm: !link.confirm
            })
        }

    } catch (e) {
        res.status(500).json({message: 'Что то пошло не так попробуйте снова'})
    }

})


module.exports = router