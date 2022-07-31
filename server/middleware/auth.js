import jwt from "jsonwebtoken";

const auth = async (req,res,next) => {

    try {
        const token = req.headers.authorization.split(' ')[1];
       
        if(!token){
            return res.status(500).json({ message: "Token is required" });
        }

        let decodedData;

        if(token){
            decodedData = jwt.verify(token,"test");
            req.userId = decodedData?.id;
        }

        
        next();

    } catch (error) {
        res.status(500).json({ message: error.message })   
    }

}

export default auth;