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

app.use('/static', express.static(process.env.FILE_PATH));
app.use("/api/v1", router) 

app.listen(process.env.PORT || port, () => {
    console.log(`Example app listening on port ${port}`)
})
