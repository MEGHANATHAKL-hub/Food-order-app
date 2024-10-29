const express = require('express')
const bodyParser = require('body-parser')
const  { router } = require('./routes/userRoutes')
const app = express()

app.use(bodyParser.json())

//Routes
app.use('/api/users', router);

app.get('/', (req, res) => {
    res.send("Working....Bingo!")
})

const port = 5000
app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})