const jwt = require('jsonwebtoken');
const fs = require("fs")
const verifyCompany = (req, res, next)=> {
    if(!req.headers.authorization) {
        fs.unlink(`./${process.env.FILE_PATH}/${req?.file?.filename}`, (err,result)=> {})
        return res.status(401).send({
            message: "unauthorized",
            status: 401
        })
    }else {
        jwt.verify(req.headers.authorization, process.env.PRIVATE_KEY, function(err, decoded) {
            
            if(err) {
                fs.unlink(`./${process.env.FILE_PATH}/${req?.file?.filename}`, (err,result)=> {})
                return res.status(403).send({
                    message: "Access Forbidden",
                    status: 403
                })
            }
            
            if(decoded.role === 'recruiter' 
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


module.exports = verifyCompany