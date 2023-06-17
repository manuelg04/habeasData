// instanceAWS.ts
import AWS from 'aws-sdk';

AWS.config.update({
  accessKeyId: process.env.accessKeyId,
  secretAccessKey: process.env.secretAccessKey,
  region: process.env.region,
});

const s3 = new AWS.S3();

export default s3;
