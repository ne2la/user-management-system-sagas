import nodeEmailer from "nodemailer";

const sendEmail = async (req,res,email,subject,text,link) => {

    try {

        const transporter = nodeEmailer.createTransport({
            service: "hotmail",
            auth:{
                user: "lakshitha-mern@outlook.com",
                pass: "Madushan@1234"
            } 
        });

        const options = {
            from: "lakshitha-mern@outlook.com",
            to: email,
            subject: subject,
            text: text
        };

        // await transporter.sendMail(options,(err,info) => {
        //     if(err){
        //         return res.status(422).json({ err });
        //     }

        //     res.status(200).json({ message: `Check Your email. We've sent required details to ${email}` });
        // })

        res.status(200).json({ message: `Check Your email. We've sent required details to ${email}` });

    } catch (error) {
        res.status(422).json({ error });
    }


}

export default sendEmail;