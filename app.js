const express = require('express')
const mongoose = require('mongoose')
const blogRoutes = require('./routes/blogRoutes')

const dbURI = 'mongodb+srv://test-user:testpass@cluster0.xw14m68.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(dbURI)
    .then((result) => {
        console.log('connected to db')
        app.listen(3000)
    })
    .catch((err) => console.log(err))

const app = express()
app.set('view engine', 'ejs')

app.use(express.static('public'))
app.use(express.urlencoded({ extended:true }))

app.get('/', (req, res) => {
  res.redirect('/blogs')
})

app.get('/about', (req, res) => {
    res.render('about', { title: 'About'})
})

app.use('/blogs', blogRoutes)

app.use((req, res) => {
    res.status(404).render('404.ejs', { title: '404'})
})