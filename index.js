require("dotenv").config()
const express = require("express")
const app = express();
const port = 5000
const bodyParser = require("body-parser")
const router = require("./router")
const cors = require("cors")

app.use(cors())


app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json()) 

app.use('/static', express.static('public'));
app.use("/api/v1", router) 

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
