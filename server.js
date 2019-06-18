//load app server using express

const express = require('express')
const app = express();
const morgan = require('morgan')

app.use(morgan('short'))

//specify root route 
app.get("/", (req, res) => {
    console.log("responding to root route")
    res.send("hello from root")
})

app.get("/users", (req, res) => {
    var user1 = {firstName: "DeMarco", lastName: "Grayson"}
    const user2= {firstName: "Amber", lastName: "Griggs"}
    res.json([user1, user2])
    res.send("nodemon auto updates when i save this file")
})


app.listen()

// localhost:9000
app.listen(9000, () => {
    console.log("server is up and running on 9k")
})