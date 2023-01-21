    const express = require('express')
    const bodyParser = require('body-parser')
    const app = express()
    const Publisher = require('./publisher')
    const publisher = new Publisher()

    app.use(bodyParser.json("application/json"))

    app.post("/publishmessage", async (req, res, next) => {
    await publisher.sendMessage(req.body.logType, req.body.message)
    res.send()
    })

    app.listen(3000, ()=> {
        console.log("Backend server has started...") 
    })

