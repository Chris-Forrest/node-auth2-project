const jwt = require("jsonwebtoken");
const Users = require("../users/users-model");

function restrict(department){
    const departments = ["sales", "marketing", "finance"]
    return async (req,res,next) => {
        const authError = {
            message: "Invalid credentials",
        };

        try{//assume the token gets passed to the api as an authorization header
            const token = req.headers.authorization
            //this will send the token back as a cookie
            //const token = req.cookies.token
            if(!token){
                return res.status(401).json({ message: "no token"})
            }
            //decode the token resign the payload and check if the signature is valid
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if(err){
                return res.status(401).json({message: "invalid token"})
            }
            //check that decoded department equals department 
            //if the decoded department is not equal to departments.indexOf(departments) they don't gain access
            if(department && departments.indexOf(decoded.userDepartment) !== departments.indexOf(department)){
                return res.status(401).json({ message: " You shall not pass"})
            }
            req.token = decoded
            next()
        })
        }catch(err){
            next(err)
        }
    }

};

module.exports = restrict