const express = require('express')

const app = express()
app.set('view engine', 'ejs')
app.set('views', 'src')

app.listen(3000)

app.get('/', (req, res) => {
    //res.send('<p>Home</p>')
    res.sendFile('./src/index.html', {root: __dirname})
})

app.get('/about', (req, res) => {
    res.sendFile('./src/about.html', {root: __dirname})
})

app.get('/about-us', (req, res) => {
    res.redirect('/about')
})

app.use((req, res) => {
    res.status(404).sendFile('./src/404.html', {root: __dirname})
})