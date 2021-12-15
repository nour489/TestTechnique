let SftpUpload = require('sftp-upload'),
  fs = require('fs');
let router = {};
router.upload = function(filePath, customer) {
  try {
    let options = {
        host: customer.ssh_server,
        username: customer.ssh_username,
        password: customer.ssh_password,
        path: filePath,
        remoteDir: '/files',
        privateKey: fs.readFileSync(customer.ssh_private_key),
        //  passphrase: fs.readFileSync('privateKey_rsa.passphrase'),
        dryRun: false,
      },
      sftp = new SftpUpload(options);

    sftp.on('error', function(err) {
        throw err;
      })
      .on('uploading', function(progress) {
        console.log('Uploading', progress.file);
        console.log(progress.percent + '% completed');
      })
      .on('completed', function() {
        console.log('Upload Completed');
      })

  .upload();
  }
  catch (err) {
    logger(null, 5, err)
    return err
  }
}


module.exports = router;
