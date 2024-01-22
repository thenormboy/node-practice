const express = require('express')
const mongoose = require('mongoose')
const Blog = require('./models/blog')

const dbURI = 'mongodb+srv://test-user:testpass@cluster0.xw14m68.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(dbURI)
    .then((result) => {
        console.log('connected to db')
        app.listen(3000)
    })
    .catch((err) => console.log(err))

const app = express()
app.set('view engine', 'ejs')
app.set('views', 'src')

app.use(express.static('public'))
app.use(express.urlencoded({ extended:true }))

app.get('/', (req, res) => {
  res.redirect('/blogs')
})

app.get('/about', (req, res) => {
    res.render('about', { title: 'About'})
})

app.get('/blogs', (req, res) => {
    Blog.find().sort({ createdAt: -1 })
    .then((result) => {
        res.render('index', { title: 'All Blogs', blogs: result })
    })
    .catch((err) => {
        console.log(err)
    })
})

app.post('/blogs', (req, res) => {
    const blog = new Blog(req.body)
    blog.save()
        .then(() => {
            res.redirect('/blogs')
        })
        .catch((err) => {
            console.log(err)
        })
})

app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'Create a New Blog'})
})

app.use((req, res) => {
    res.status(404).render('404.ejs', { title: '404'})
})