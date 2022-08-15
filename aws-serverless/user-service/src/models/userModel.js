import AWS from "aws-sdk"
import crypto from "crypto";
import nodeEmailer from "nodemailer";

const dynamoDb = new AWS.DynamoDB.DocumentClient();

const userModel = {

    registerUser: async (newUser) => {

        const params = {
            TableName: process.env.USER_TABLE,
            Item: newUser,
        };

        await dynamoDb.put(params).promise();

    },

    existsEmail: async (email) => {

        const params = {
          TableName: process.env.USER_TABLE,
          IndexName: "email_index",
          KeyConditionExpression: "email = :email",
          ExpressionAttributeValues: {
            ":email": email,
          },
        };
    
        const result = await dynamoDb.query(params).promise();
        if (!result || !result.Items) return null;
        return result.Items[0];

    },

    getUsers: async () => {

      const params = {
        TableName: process.env.USER_TABLE,
      };
  
      const result = await dynamoDb.scan(params).promise();
      if (!result || !result.Items) return null;
      return result.Items;

    },

    isValidID: async (id) => {
      
      const params = {
        TableName: process.env.USER_TABLE,
        Key: {id}
      }

      const result = await dynamoDb.get(params).promise();
      return result.Item;

    },

    resetPassword: async (data) => {
      const params = {
        TableName: process.env.USER_TABLE,
        Key: { id: data.id },
        UpdateExpression: "set password = :password",
        ExpressionAttributeValues: {
          ":password": data.encryptPassword,
        },
      };
      await dynamoDb.update(params).promise();
    },

    deleteUser: async (id) => {

      const params = {
        TableName: process.env.USER_TABLE,
        Key: {id},
      }

      await dynamoDb.delete(params).promise();

    },

    sendEmail: async (email,subject,text) => {

        console.log("Inside sendmail try")
        
        const transporter = nodeEmailer.createTransport({
            service: "hotmail",
            auth:{
                user: "serverless-mern@outlook.com",
                pass: "Madushan@1234"
            } 
        });

        console.log("created Transport")

        const options = {
            from: "serverless-mern@outlook.com",
            to: email,
            subject: subject,
            text: text
        };

        console.log("created Options")

        await transporter.sendMail(options)

    }




}

export default userModel;