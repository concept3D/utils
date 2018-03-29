const AWS = require('aws-sdk');

const { IS_OFFLINE, DB_PORT } = process.env;
let dynamoDb;

exports.connectDatabase = function() {
  if (!dynamoDb) {
    if (IS_OFFLINE === 'true') {
      dynamoDb = new AWS.DynamoDB.DocumentClient({
        region: 'localhost',
        endpoint: `http://localhost:${DB_PORT}`,
      });
    } else {
      dynamoDb = new AWS.DynamoDB.DocumentClient();
    }
  }
  return dynamoDb;
}

