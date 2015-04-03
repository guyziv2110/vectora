// fileController

/**
 * @param {Object} req HTTP request object.
 * @param {Object} res HTTP response object.
 */
exports.upload = function(req, res) {

    console.log('POST - /file/upload');
    // access req.files.file thanks to the multiparty middleware
    var file = req.files.file;
    console.log(file.name);
    console.log(file.type);
};

