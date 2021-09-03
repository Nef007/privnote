const express = require('express')
const config = require('config')
const path = require('path')
const mongoose = require('mongoose')
const Link = require('./models/Links')

const  app = express()
app.use(express.json({extended: true}))

app.use('/auth', require('./routes/auth.routes') )
app.use('/t', require('./routes/redirect.routes') )
app.use('/api/link', require('./routes/link.routes') )

if (process.env.NODE_EVN === 'production'){
    app.use('/', express.static(path.join(__dirname, 'client', 'build')))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

const PORT = config.get('port') || 5000

async function  start() {
    
    try{
       await mongoose.connect(config.get('mongoUri'), {
           useNewUrlParser: true,
           useUnifiedTopology: true,
           useCreateIndex: true

       })
        app.listen(PORT, ()=> console.log(`app has been started on port ${PORT}...`))
        setInterval(async ()=> {


          //удалилить текст
          await  Link.updateMany({ $and: [{deletehour: { $lt: Date.now() }},{deletehour: {$ne: 0}} ]}, {status: "Удалена", deleteNoteDate: Date.now(), deletehour: 0})
            console.log("Подчистили " + new Date())
        },240000)

    } catch (e) {
        console.log('Server Error', e.message)
        process.exit(1)
    }

}

// новое изменение 2

start()
