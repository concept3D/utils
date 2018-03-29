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

exports.dbError = function(err, req, res, next) {
  const message = 'DB error. ';
  console.log(message, err); // eslint-disable-line no-console
  next(message);
}

exports.catchError = function(err, req, res, next) {
  const message = 'Error caught in Space Planner API. (This has automatically been reported to our dev team.)';
  /* eslint-disable no-console */
  console.log(message);
  console.log('err: ', err);
  /* eslint-disable no-console */
  next(message);
}

exports.stripLeadingTrailing = function(delim, string) {
  let str = string.trim();
  if (str.substr(0, delim.length) === delim) {
    str = str.substring(delim.length);
  }

  const len = str.length;
  if (str.substr(len - delim.length, delim.length) === delim) {
    str = str.substring(0, len - delim.length);
  }
  return str;
}

