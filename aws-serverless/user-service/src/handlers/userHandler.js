"use strict";

import { userModel } from "../models";
import crypto from "crypto";
import Validations from "../validations/index.js";
import AWS from "aws-sdk";
import { v4  } from "uuid";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import { sendResponse, validateInput } from "../functions";

const ses = new AWS.SES({ region: 'us-east-1' })
const cognito = new AWS.CognitoIdentityServiceProvider()

const userHandler = {

    registerUser: async (event) => {

        try {

          await Validations.signUpSchema.validateAsync(JSON.parse(event.body));
          const createdAt = new Date().toISOString();
          const { firstName,lastName, email, password } = JSON.parse(event.body);
        
    
          // Encrypt password
          const salt = await bcrypt.genSalt(10);
      
          const encryptPassword = await bcrypt.hash(password, salt);
      
          const newUser = {
            id: v4(),
            name: `${firstName} ${lastName}`,
            email,
            password: encryptPassword,
            createdAt,
          };

          const user = await userModel.existsEmail(email);
    
          if (user) {
            console.log("Email already exists!");
            return {
              statusCode: 400,
              body: JSON.stringify({ message: "Email already exists!" }),
            };
          }
          
          await userModel.registerUser(newUser);
    
          // Return jasonwebtoken
          // const payload = { id: newUser.id };
    
          // const token = jwt.sign(payload, "secret", { expiresIn: 36000 });
          // console.log({ msg: "Registration successful", token });

          return {
            statusCode: 200,
            body: JSON.stringify({ message: "Registration successful" }),
          };

        } catch (error) {

          console.log("Register User Error: ",error)
          return {
              statusCode: 500,
              body: JSON.stringify({ message: error.message }),
          };

        }
      },

      fetchUsers: async (event) => {
        try {
          const users = await userModel.getUsers();
          console.log(users);
          return {
            statusCode: 200,
            body: JSON.stringify(users),
          };
        } catch (error) {
          console.log("Fetch Users Error: ",error);
          return {
            statusCode: 500,
            body: JSON.stringify({message: error}),
          };
        }
    },

    signInUser: async (event) => {

      try {
        await Validations.signInSchema.validateAsync(JSON.parse(event.body));
        const { email, password } = JSON.parse(event.body);
        const user = await userModel.existsEmail(email);
  
        if (!user) {
          console.log("This email doesn't have a user");
          return {
            statusCode: 400,
            body: JSON.stringify({ message: "This email doesn't have a user" }),
          };
        }
  
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
          console.log("Invalid Email or Password");
          return {
            statusCode: 400,
            body: JSON.stringify({ message: "Invalid Email or Password" }),
          };
        }
  
        const payload = { id: user.id };
    
        const token = jwt.sign(payload, "secret", { expiresIn: 36000 });
        console.log({ message: "Login successful",user, token });
        
        return {
          statusCode: 200,
          body: JSON.stringify({ message: "Login successful",user,token }),
        };

      } catch (error) {

          console.log("SignIn Error: ",error)
          return {
              statusCode: 500,
              body: JSON.stringify({ message: error.message }),
          };
      }

      
    },

    forgotPassword: async (event) => {

      try {

        await Validations.resetPasswordSchema.validateAsync(JSON.parse(event.body));
        const { email } = JSON.parse(event.body);

        const user = await userModel.existsEmail(email);

        if (!user) {
          console.log("This email doesn't have a user");
          return {
            statusCode: 400,
            body: JSON.stringify({ message: "This email doesn't have a user" }),
          }
        }

        const payload = { tokenData: crypto.randomBytes(32).toString("hex")};
        const resetToken = jwt.sign(payload, "secret", { expiresIn: "10m" });
       
        const resetLink = `http://localhost:3000/resetPassword/${user.id}/${resetToken}`;

        var transporter = nodemailer.createTransport({
          service: "hotmail",
          auth: {
            user: "awsserverlessmadushan@outlook.com",
            pass: "Madushan@1234",
          },
        });
      
        var mailOptions = {
          from: "awsserverlessmadushan@outlook.com",
          to: email,
          subject: "User Management System Password Reset",
          text: `Link - ${resetLink}`,
        };

        const result = await transporter.sendMail(mailOptions);
        return {
          statusCode: 200,
          body: JSON.stringify({
            message: `Check Your email. We've sent required details to ${email}, ${resetLink}`
          }),
        }

        
      } catch (error) {

        console.log("Forgot Password Error: ",error)
        return {
            statusCode: 500,
            body: JSON.stringify({ message: error.message }),
        };
      }

    },

    resetPassword: async (event) => {
      
      try {

        const { newPassword } = JSON.parse(event.body);
        const {id,token} = event.pathParameters;
  
        const isValidId = await userModel.isValidID(id);
  
        if(!isValidId){
  
          return{
            statusCode: 404,
            body: JSON.stringify({
                message: "Invalid ID"
            }),
          };
  
        }
  
        const payload = jwt.verify(token,"secret");
    
        // Encrypt password
        const salt = await bcrypt.genSalt(10);
        const encryptPassword = await bcrypt.hash(newPassword, salt);
        
        const data = { id, encryptPassword };

        await userModel.resetPassword(data);

        console.log({ msg: "Your password has been successfully reset" });
        return {
          statusCode: 200,
          body: JSON.stringify({ message: "Your password has been successfully reset" }),
        };

      } catch (error) {
        return {
          statusCode: 500,
          body: JSON.stringify({ message: "Invalid URL" }),
        };
      }
    },

    deleteUser: async (event) => {

      try {

        const { id } = event.pathParameters;
        const isValidId = await userModel.isValidID(id);

        if(!isValidId){

          return{
            statusCode: 404,
            body: JSON.stringify({
                message: "Invalid ID"
            }),
          };

        }else{

          await userModel.deleteUser(id);
          return {
            statusCode: 200,
            body: JSON.stringify({ message: "User Deleted Successfully" }),
          };

        }


      } catch (error) {
        console.log("Delete User Error: ",error)
            return {
                statusCode: 500,
                body: JSON.stringify({ message: error.message }),
            };
      }

    },

    registerUserCognito: async (event) => {
      try {
        const isValid = validateInput(event.body)
        if (!isValid)
            return sendResponse(400, { message: 'Invalid input' })

        const { email, password } = JSON.parse(event.body)
        const { user_pool_id,client_id } = process.env

        var params = {
          ClientId: client_id, /* required */
          Password: password, /* required */
          Username: email, /* required */
          UserAttributes: [
            {
              Name: 'email',
              Value: email,
            },
            /* more items */
          ],

          ValidationData: [
            {
              Name: email, /* required */
              Value: 'false',
            },
            /* more items */
          ],
        

        };

        const result = await cognito.signUp(params).promise();
        console.log("Validation Data: ",result)

        return sendResponse(200, { message: `Check Your email. We've sent required details to ${email}` });
      }
      catch (error) {
          const message = error.message ? error.message : 'Internal server error'
          return sendResponse(500, { message })
      }
    },

    confirmRegisterUserCognito: async (event) => {

      try {
        const { email,verificationCode } = JSON.parse(event.body)
        const { user_pool_id, client_id } = process.env

        var params = {
          ClientId: client_id, /* required */
          ConfirmationCode: verificationCode, /* required */
          Username: email, /* required */
        };

        const cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();

        await cognitoidentityserviceprovider.confirmSignUp(params).promise();

        return sendResponse(200, { message: `Your account has been successfully Created` });


      } catch (error) {
          const message = error.message ? error.message : 'Internal server error'
          return sendResponse(500, { message })
      }

    },

    signInUserCognito: async (event) => {
      try {
        const isValid = validateInput(event.body)
        if (!isValid)
            return sendResponse(400, { message: 'Invalid input' })

        const { email, password } = JSON.parse(event.body)
        const { user_pool_id, client_id } = process.env
        const params = {
            AuthFlow: "ADMIN_NO_SRP_AUTH",
            UserPoolId: user_pool_id,
            ClientId: client_id,
            AuthParameters: {
                USERNAME: email,
                PASSWORD: password
            }
        }
        const response = await cognito.adminInitiateAuth(params).promise();
        return sendResponse(200, { message: 'Success', token: response.AuthenticationResult.IdToken })
      }
      catch (error) {
          const message = error.message ? error.message : 'Internal server error'
          return sendResponse(500, { message })
      }
    },

    forgotPasswordCognito: async (event) => {
      try {
        const { email } = JSON.parse(event.body)
        const { user_pool_id, client_id } = process.env

        const params = {
            ClientId: client_id,
            Username: email
        }
        const cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();

        await cognitoidentityserviceprovider.forgotPassword(params).promise();
        // console.log("response iz: ",response)

        // return response.CodeDeliveryDetails;

        // return {
        //     statusCode: 200,
        //     body: response,
        //   };

        return sendResponse(200, { message: `Check Your email. We've sent required details to ${email}` });

      } catch (error) {
          const message = error.message ? error.message : 'Internal server error'
          return sendResponse(500, { message })
      }
    },

    resetPasswordCognito: async (event) => {
      try {

        const { email,verificationCode,newPassword } = JSON.parse(event.body)
        const { user_pool_id, client_id } = process.env

        var params = {
            ClientId: client_id, /* required */
            ConfirmationCode: verificationCode, /* required */
            Password: newPassword, /* required */
            Username: email, /* required */
            
        };

        const cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();

        await cognitoidentityserviceprovider.confirmForgotPassword(params).promise();

        return sendResponse(200, { message: `Your password has been successfully Reset` });

        

      } catch (error) {
          const message = error.message ? error.message : 'Internal server error'
          return sendResponse(500, { message })
      }
    },

}

export default userHandler;