import AWS from "aws-sdk";

const dynamoDb = new AWS.DynamoDB.DocumentClient();

const userDetailsModal = {

    getUsers: async () => {

        const params = {
          TableName: process.env.MEMBER_DETAILS_TABLE,
        };
    
        const result = await dynamoDb.scan(params).promise();
        if (!result || !result.Items) return null;
        return result.Items;
    },

    addUser: async (newMember) => {
        const params = {
          TableName: process.env.MEMBER_DETAILS_TABLE,
          Item: newMember,
        };
    
        await dynamoDb.put(params).promise();
    },

    existsEmail: async (email) => {
      const params = {
        TableName: process.env.MEMBER_DETAILS_TABLE,
        IndexName: "email_index",
        KeyConditionExpression: "email = :email",
        ExpressionAttributeValues: {
          ":email": email,
        },
      };
  
      const result = await dynamoDb.query(params).promise();
      if (!result || !result.Items) return null;
      return result.Items;
    },

    existsNIC: async (NIC) => {
      const params = {
        TableName: process.env.MEMBER_DETAILS_TABLE,
        IndexName: "NIC_index",
        KeyConditionExpression: "NIC = :NIC",
        ExpressionAttributeValues: {
          ":NIC": NIC,
        },
      };
  
      const result = await dynamoDb.query(params).promise();
      if (!result || !result.Items) return null;
      return result.Items;
    },

    isValidID: async (id) => {
      
      const params = {
        TableName: process.env.MEMBER_DETAILS_TABLE,
        Key: {id}
      }

      const result = await dynamoDb.get(params).promise();
      return result.Item;

    },

    deleteUser: async (id) => {

      const params = {
        TableName: process.env.MEMBER_DETAILS_TABLE,
        Key: {id},
      }

      await dynamoDb.delete(params).promise();

    },

    updateUser: async (updatedData) => {

      const params = {

        TableName: process.env.MEMBER_DETAILS_TABLE,
        Key: { id: updatedData.id },
        UpdateExpression:
          "set userName = :userName, NIC = :NIC , email = :email ,occupation = :occupation, userImage = :userImage",
        ExpressionAttributeValues: {
          ":userName": updatedData.userName,
          ":email": updatedData.email,
          ":NIC": updatedData.NIC,
          ":occupation": updatedData.occupation,
          ":userImage": updatedData.userImage
        },
      };
  
      await dynamoDb.update(params).promise();
    }

}

export default userDetailsModal;