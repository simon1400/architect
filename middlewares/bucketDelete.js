const storage = require('@google-cloud/storage');

const gcs = storage({
  projectId: 'architect-proj',
  keyFilename: `${process.cwd()}/config/architect-proj-3c5a2736018e.json`
});

bucketDelete = (bucketName) => {
  const bucket = gcs.bucket(bucketName)
  bucket.deleteFiles(err => {
    if(err) console.log('Delete all files from bucket error:', err);

    bucket.delete()
      .then(() => {
        console.log(`Bucket ${bucketName} deleted.`);
      }).catch(err => {
        console.error('ERROR:', err);
      });
  })
}

module.exports = bucketDelete;
