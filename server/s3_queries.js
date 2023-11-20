/*
    AWS S3 queries for media
*/
const {S3} = require('@aws-sdk/client-s3');
const configs = require('./configs.json')

const s3Config = {
  apiVersion: '2006-03-01',
  accessKeyId: configs.s3.accessKeyId,
  secretAccessKey: configs.s3.secretAccessKey,
  region: configs.s3.region,
 }
 const s3 = new S3(s3Config)

 module.exports.createBucket = (bucketName) => {
  s3.createBucket({
    Bucket: bucketName,    
    CreateBucketConfiguration: {  
     LocationConstraint: configs.s3.region  
    },
    ACL: 'private',
    GrantRead: 'IAM_USERID',
    GrantWrite: 'IAM_USERID',
    GrantFullControl: 'IAM_USERID',
    GrantReadACP: 'IAM_USERID',
    GrantWriteACP: 'IAM_USERID',
    ObjectLockEnabledForBucket: false
   }).promise()
}

 module.exports.uploadFile = (file, contentType, serverPath, filename) => {
  if (!filename) {
   filename = serverPath.split('/').pop()
  }
  return s3.upload({
   Bucket: BUCKET,
   ACL: 'private',
   Key: serverPath,
   Body: file,
   ContentType: contentType,
   ContentDisposition: `attachment; filename=${filename}`,
  }).promise()
}

module.exports.deleteFile = (serverPath) => s3.deleteObject({
  Bucket: BUCKET,
  Key: serverPath,
}).promise()
const serverPaths = [{      
   Key: "1.jpg"
  },{      
   Key: "2.jpg"
}]
module.exports.deleteFiles = (serverPaths) => s3.deleteObjects({
  Bucket: BUCKET,
  Delete: [{
   Objects: serverPaths
  }]
}).promise()

const downloadUrl = (key) => s3.getSignedUrlPromise('getObject', {
  Bucket: BUCKET,
  Key: key,
  Expires: 1800,
})