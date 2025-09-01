require('dotenv').config();
const AWS = require('aws-sdk');

const s3 = new AWS.S3({
  accessKeyId: process.env.IAM_USER_ACCESSKEY,
  secretAccessKey: process.env.IAM_USER_SECRETKEY,
  region: process.env.AWS_REGION,
  signatureVersion: 'v4',
});

const BUCKET_NAME = 'playtrust-images';

const uploadToS3 = (fileBuffer, key) => {
  return new Promise((resolve, reject) => {
    const params = {
      Bucket: BUCKET_NAME,
      Key: key,
      Body: fileBuffer,
      ACL: 'public-read',
    };

    s3.upload(params, (err, data) => {
      if (err) {
        console.error('S3 upload error:', err);
        return reject(err);
      }
      resolve(data.Location);
    });
  });
};


function deleteFromS3(key){
  const params={Bucket:BUCKET_NAME,Key:key};
  return s3.deleteObject(params).promise();
}

module.exports={uploadToS3,deleteFromS3};