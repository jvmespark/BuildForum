/*
    AWS S3 queries for media
*/
const {
  S3Client,
  PutObjectCommand,
  CreateBucketCommand,
  DeleteObjectCommand,
  DeleteBucketCommand,
  paginateListObjectsV2,
  GetObjectCommand,
} = require("@aws-sdk/client-s3");

const configs = require('./configs.json')

const credentials = {
  region: configs.s3.region,
  credentials: {
    accessKeyId: configs.s3.accessKeyId,
    secretAccessKey: configs.s3.secretAccessKey
  }
};

 const s3Client = new S3Client(credentials);

 module.exports.uploadFile = (file, contentType, serverPath, filename) => {
  if (!filename) {
   filename = serverPath.split('/').pop()
  }
  s3Client.send(
    new PutObjectCommand({
      Bucket: "bulletin-media",
      ACL: 'private',
      Key: serverPath,
      Body: file[0],
      ContentType: 'image/jpg',
      //ContentDisposition: `attachment; filename=${filename}`,
    })
  );
}

function encode(data) {
  var str = data.reduce(function(a,b){ return a+String.fromCharCode(b) },'');
  return btoa(str).replace(/.{76}(?=.)/g,'$&\n');
}

module.exports.getFile = async function (req, res) {
  var serverPath = req.params.id.replace('-','/')
  const command = new GetObjectCommand({
    Bucket: "bulletin-media",
    Key: serverPath,
  });

  try {
    const response = await s3Client.send(command);
    res.send( "data:image/jpeg;base64," + encode(response.Body) );
  } catch (err) {
    console.error(err);
  }
}

 /*
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

module.exports.deleteFile = (serverPath) => s3.deleteObject({
  Bucket: "bulletin-media",
  Key: serverPath,
}).promise()
const serverPaths = [{      
   Key: "1.jpg"
  },{      
   Key: "2.jpg"
}]
module.exports.deleteFiles = (serverPaths) => s3.deleteObjects({
  Bucket: "bulletin-media",
  Delete: [{
   Objects: serverPaths
  }]
}).promise()

const downloadUrl = (key) => s3.getSignedUrlPromise('getObject', {
  Bucket: "bulletin-media",
  Key: key,
  Expires: 1800,
})
*/