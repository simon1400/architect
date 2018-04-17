const storage = require('@google-cloud/storage');

const gcs = storage({
  projectId: 'architect-proj',
  keyFilename: `${process.cwd()}/config/architect-proj-3c5a2736018e.json`
});

ImgDelete = (bucket, file) => {
  var myBucket = gcs.bucket(bucket);
  var fileDel = myBucket.file(file);

  fileDel.delete(function (err, apiResponse) {
    if (err) {
      console.log(err);
    }
    else {
      console.log("Deleted successfully");
    }
  });
}


module.exports = ImgDelete;
