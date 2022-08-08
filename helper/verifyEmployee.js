const jwt = require('jsonwebtoken');
const fs = require("fs")
const verifyEmployee = (req, res, next)=> {
    if(!req.headers.authorization) {
        fs.unlink(`./${process.env.FILE_PATH}/${req?.file?.filename}`, (err,result)=> {})
        return res.status(401).send({
            message: "unauthorized",
            status: 401
        })
    }else {
        jwt.verify(req.headers.authorization, process.env.PRIVATE_KEY, function(err, decoded) {
            console.log(req.body.user_id)
            if(err) {
                fs.unlink(`./${process.env.FILE_PATH}/${req?.file?.filename}`, (err,result)=> {})
                return res.status(403).send({
                    message: "Access Forbidden",
                    status: 403
                })
            }
            
            if(decoded.role === 'employee' 
            && decoded.userId == req.params.id
            || decoded.userId == req.body.user_id            
            ) {
                next()
            } else {
                fs.unlink(`./${process.env.FILE_PATH}/${req?.file?.filename}`, (err,result)=> {})
                return res.status(403).send({
                    message: "Access Forbidden",
                    status: 403
                })
            }
           
        });
    }

}


module.exports = verifyEmployee