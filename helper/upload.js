const multer = require("multer");
const path = require("path") 

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, `${process.env.FILE_PATH}/`)
    },
    filename: function (req, file, cb) {
        const uniqeSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9)
        cb(null, `${uniqeSuffix}-${file.originalname}`)
    }
})

const fileFilter = (req, file, cb) => {
    const ext = path.extname(file.originalname)
  
    if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
      return cb(new Error('Please input jpeg, png, or gif format! '), 'test') 
      
    }
    cb(null, true)
}


const uploadPortfolio = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {fileSize: 2 * 1024 * 1024}
}).single("image")

const uploadProfile = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {fileSize: 1 * 1024 * 1024}
}).single("image")




module.exports = {

    uploadPortfolio: function(req,res, next) {
        uploadPortfolio(req, res, err => {
            if(err) {
                res.status(400).send({
                    message: err.message,
                    status: 400
                })
            } else {
                next()
            }
            
        })
    },
    uploadProfile: function(req,res, next) {
        uploadProfile(req, res, err => {
            if(err) {
                res.status(400).send({
                    message: err.message,
                    status: 400
                })
            } else {
                next()
            }
        })
    }
}