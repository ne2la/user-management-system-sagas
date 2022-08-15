"use strict";
import { userDetailsModal } from "../models";
import Validations from "../validations/index.js";
import { v4 } from "uuid";
import AWS from "aws-sdk";


const userDetailsHandler = {

    addUser: async (event) => {

        try {

            const createdAt = new Date().toISOString();
            await Validations.userDetailSchema.validateAsync(JSON.parse(event.body));
            
            const { userName, userEmail, NIC, occupation,userImage  } = JSON.parse(event.body);

            const newMember = {
                id: v4(),
                userName,
                email: userEmail,
                NIC,
                occupation,
                userImage,
                createdAt,
            }

            const isExistingEmail = await userDetailsModal.existsEmail(userEmail);
            const isExistingNIC = await userDetailsModal.existsNIC(NIC);

            if(isExistingEmail.length > 0){

              console.log("Email already exists!");
              return {
                statusCode: 400,
                body: JSON.stringify({ message: "Email already exists!" }),
              };

            }else if(isExistingNIC.length > 0){

              console.log("NIC already exists!");
              return {
                statusCode: 400,
                body: JSON.stringify({ message: "NIC already exists!" }),
              };
              
            }else{

              await userDetailsModal.addUser(newMember);
              console.log("User Created Successfully");
              return {
                  statusCode: 200,
                  body: JSON.stringify({ message: "User Created Successfully" }),
              };

            }

        } catch (error) {
            console.log("Add User Error: ",error)
            return {
                statusCode: 500,
                body: JSON.stringify({ message: error.message }),
            };
        }

        

    },

    fetchUsers: async (event) => {
        try {
          const users = await userDetailsModal.getUsers();
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

    deleteUser: async (event) => {

      try {

        const { id } = event.pathParameters;
        const isValidId = await userDetailsModal.isValidID(id);

        if(!isValidId){

          return{
            statusCode: 404,
            body: JSON.stringify({
                message: "Invalid ID"
            }),
          };

        }else{

          await userDetailsModal.deleteUser(id);
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

    updateUser: async (event) => {

      try {

        await Validations.userDetailSchema.validateAsync(JSON.parse(event.body));

        const { id } = event.pathParameters;
        const { userName, userEmail, NIC, occupation,userImage } = JSON.parse(event.body);

        const user = await userDetailsModal.isValidID(id);
        // console.log("isValid ID: ", isValidId)

        if(!user){

          return{
            statusCode: 404,
            body: JSON.stringify({
                message: "Invalid ID"
            }),
          };

        }

        const isExistingEmail = await userDetailsModal.existsEmail(userEmail);
        const isExistingNIC = await userDetailsModal.existsNIC(NIC);

        if(isExistingEmail.length > 0 && (isExistingEmail[0].email !== user.email)){

          console.log("Email already exists!");
          return {
            statusCode: 400,
            body: JSON.stringify({ message: "Email already exists!" }),
          };

        }else if(isExistingNIC.length > 0 && (isExistingNIC[0].NIC !== user.NIC)){

            console.log("NIC already exists!");
            return {
              statusCode: 400,
              body: JSON.stringify({ message: "NIC already exists!" }),
            };

        }else{

          const updatedData ={
            id,
            userName,
            email: userEmail,
            NIC,
            occupation,
            userImage
          };
          
          await userDetailsModal.updateUser(updatedData);
          
          return {
            statusCode: 200,
            body: JSON.stringify({
              message: "User Updated Successfully",
            }),
          };

        }

      } catch (error) {

            console.log("Update User Error: ",error)
            return {
                statusCode: 500,
                body: JSON.stringify({ message: error.message }),
            };
      }

    }

}

export default userDetailsHandler;