const storage = require('@google-cloud/storage');
const fs = require('fs')

const gcs = storage({
  projectId: 'architect-proj',
  keyFilename: `${process.cwd()}/config/architect-proj-3c5a2736018e.json`
});

let ImgUpload = {};

ImgUpload.uploadToGcs = (req, res, next) => {
  if(!req.files) return next();

  const bucketName = req.params.id

  gcs.createBucket(bucketName, {
    location: 'europe-west3',
    storageClass: 'REGIONAL'
  }).then(() => {
    console.log(`Bucket ${bucketName} created.`);
    const bucket = gcs.bucket(bucketName);
    // Can optionally add a path to the gcsname below by concatenating it before the filename
    req.files.map(fileItem => {
      const gcsname = fileItem.originalname;
      const file = bucket.file(gcsname);

      const stream = file.createWriteStream({
        metadata: {
          contentType: fileItem.mimetype
        }
      });


      stream.on('error', (err) => {
        console.log(err);
        fileItem.cloudStorageError = err;
        next(err);
      });

      stream.on('finish', () => {
        fileItem.cloudStorageObject = gcsname;
        next();
      });

      stream.end(fileItem.buffer);
    })
  })
  .catch(err => {
    console.error('ERROR:', err);
  });

}

module.exports = ImgUpload;
