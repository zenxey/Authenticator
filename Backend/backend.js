const bodyParser = require('body-parser')
const express = require('express')
const api = require('./routes/api')
const PORT = 3000
const app = express()
const cors = require('cors')

app.use(cors())
app.use(bodyParser.json())

// app.use('/', function(req, res) {
//     res.send("this is working");
// })
app.use('/api', api)

app.listen(PORT, function() {
    console.log('server running on localhost:' + PORT)
})

/* To verify token in the backend we will be using middleware; MIDDLEWARE: it is a fn() that gets executed before the user defined handler is executed; lets make a verified token middleware
    in the backend go to api to make the function. */