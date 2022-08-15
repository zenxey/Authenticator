const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()
const User = require('../models/user')
const mongoose = require('mongoose') //require mongoose then declare connection string to the db or collection/ connection string may look like mongodb+srv://(add username):<password>@(add your cluster name).e3hjh.mongodb.net/(add your dbname)?retryWrites=true&w=majority change user and password accordingly
const { JsonWebTokenError } = require('jsonwebtoken')
const db = "mongodb+srv://test:Lightmode@rest.e3hjh.mongodb.net/eventsdb?retryWrites=true&w=majority" //write connection string here find it on Mlab or https://cloud.mongodb.com/v2/6257f5bd6b5a9557d92b9782#clusters/connect?clusterId=rest ,select connect here and select connect to app
    //connection to DB below using mongoose.connect(parameter 1, parameter 2) i.e. parameter 1 = DB string declared above; parameter 2 = callback function to return error if connection not successful.
mongoose.connect(db, err => {
    if (err) {
        console.log('Error!' + err)
    } else {
        console.log('connected to mongodb')
    }
})


//                                              ***************    MIDDLEWARE    ***************


/* BELOW IS THE MIDDLEWARE FOR VERIFYING THE TOKEN IN THE BACKEND NOW LET'S ADD THIS TO THE SPECIAL EVENTS ROUTE IN THE API.js */

function verifyToken(req, res, next) {
    if (!req.headers.authorization) { //check wheather the authorization key is present in the header
        return res.status(401).send('Unauthorized Request')
    }
    let token = req.headers.authorization.split(' ')[1] //let's extract token value from Bearer token if auth value present; what is happening here: we split on space that results into an array with index bearer in 0th index and actual token in the 1 index; so token variable will contain actual value.
    if (token === 'null') { //if the token is null string(not an object) then unauthorized Request
        return res.status(401).send('Unauthorized Request')
    }
    let payload = jwt.verify(token, 'secretKey') //if token actually present then verify token using jwt package; the verify() returns decoded token only if it is valid; if invalid then return 401
    if (!payload) {
        return res.status(401).send('Unauthorized Request')
    } // if all conditions pass we assign the payload subject as the request userId and pass execution to the next handler
    req.userId = payload.subject
    next()
}

router.get('/', (req, res) => {
    res.send('API route activated')
})

router.post('/register', (req, res) => {
    let userData = req.body //extract the userinfo from req body into userData; userData must be cast into a user model than mongoose can understand; we have made user mode in user.js so import that in api.js
    let user = new User(userData) //now make user model with the userData
        // now we have a user that mongoose understands the structure of; now final step is to save it to the db; mongoose provides a simple way for this; on user obj/model call the save method()
    user.save((error, registeredUser) => { //either this gives a error or registerd user
        if (error) {
            console.log('Error!' + error)
        } else {
            let payload = { subject: registeredUser._id } // payload = object i.e. { key: value} in our case using registeredID
            let token = jwt.sign(payload, 'secretKey') // jwt.sign(payload, any secret key you want to add you can) now we have jwt stored in token variable
            res.status(200).send({ token }) //this is a registeration API; now to test the API using Postman //step2 after importing jwt sending token as an object as per es6
        }
    })
})

//time to make login api
router.post('/login', (req, res) => {
    let userData = req.body //we have email and password stored in UserData variable; now check if email address exists in db or not then we can move forward; mongoose provides findone(),it accepts condition and returns exactly 1 document from db that matches that condition
        //above code extracts userdata from req.body into userData
    User.findOne({ email: userData.email }, (error, user) => {
            if (error) {
                console.log('error!')
            } else {
                if (!user) {
                    res.status(401).send('invalid email, User not found')
                } else
                if (user.password !== userData.password) {
                    res.status(401).send('invalid Password')
                } else {
                    let payload = { subject: user._id }
                    let token = jwt.sign(payload, 'secretKey')
                    res.status(200).send({ token })
                }
            }
            //test above api with http://localhost:3000/api/login on postman
        }) //condition is email in the db should be same as email submitted from frontend
})

router.get('/events', (req, res) => { //regular events
    let events = [{
            "_id": "1",
            "name": "Auto Expo",
            "description": "lorem epsum",
        },
        {
            "_id": "2",
            "name": "Auto Expo",
            "description": "lorem epsum",

        },
        {
            "_id": "3",
            "name": "Auto Expo",
            "description": "lorem epsum"

        },
        {
            "_id": "4",
            "name": "Auto Expo",
            "description": "lorem epsum"

        },
        {
            "_id": "5",
            "name": "Auto Expo",
            "description": "lorem epsum"

        },
        {
            "_id": "6",
            "name": "Auto Expo",
            "description": "lorem epsum"

        }
    ]
    res.json(events)
})

router.get('/special', verifyToken, (req, res) => { //special events; PASSING verifyToken Middleware Declared Above To Only Provide Access on Valid Token Else Don't Bother Executing below;
    //Now that the middleware is done let's handle the 401 status code in the frontend(goto Special-Events.ts and edit the ngOnInit())
    let events = [{
            "_id": "1",
            "name": "Auto Expo",
            "description": "lorem epsum",
        },
        {
            "_id": "2",
            "name": "Auto Expo",
            "description": "lorem epsum",

        },
        {
            "_id": "3",
            "name": "Auto Expo",
            "description": "lorem epsum"

        },
        {
            "_id": "4",
            "name": "Auto Expo",
            "description": "lorem epsum"

        },
        {
            "_id": "5",
            "name": "Auto Expo",
            "description": "lorem epsum"

        },
        {
            "_id": "6",
            "name": "Auto Expo",
            "description": "lorem epsum"

        }
    ]
    res.json(events)
})

module.exports = router
    /* Since Registration is a post method; Select Post method and post the url as localhost:portnumberyouareusing/api/register(pathwhateveryouareusing) */

/* JWT JSON WEB TOKENS */
// Safe Way To Represent A Set of Information Between Two Parties
//    **** Systax: header.playload.signature where****
// header: consists of type of token jwt and hashing algorithm used
// payload: consists of data stored in json web token (in the above case the jwt is created by backend and the userID is stored inside the payload)
// signature: This is used to verify the token
/* Install JWT by using NPM, i.e. npm install jsonwebtoken --save.
methods: 
jwt.sign(payload, secret or PrivateKey, [options, callback])
jwt.verify(payload, secret or PublicKey, [options, callback]) */

/* NOW WE MUST SEND THE TOKEN FROM THE BROWSER TO OUR DATABASE TO VERIFY THE USER AND THE WAY TO DO IT IS BY USING ANGULAR's HTTP INTERCEPTOR SERVICE
   Install the token interceptor by angular CLI, i.e. ng g s token-interceptor
*/