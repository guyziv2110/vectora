// fileController
var fs = require('fs');
var path = require('path');

/**
 * @param {Object} req HTTP request object.
 * @param {Object} res HTTP response object.
 */
exports.upload = function(req, res) {

    console.log('POST - /file/upload');
    // access req.files.file thanks to the multiparty middleware
    var file = req.files.file;
    var fileName = file.name;
    var appDir = path.dirname(require.main.filename);
    var tmpPathFile = file.path;
    var uploadPath = path.normalize(appDir + '/uploads/');
    var uploadPathFile = uploadPath + fileName;

    fs.rename(tmpPathFile, uploadPathFile, function(err) {
      if (err) {
        return console.log('file upload failure. ' + err);
      }
      console.log('file upload success. path: ' + uploadPathFile);
    });
};

