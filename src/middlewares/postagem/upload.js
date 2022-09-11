const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/img/posts')
    },
    filename: function (req, file, cb) {
        let fileNameArray = file.originalname.split('.');
        let extensao = fileNameArray[fileNameArray.length - 1];
        cb(null, file.fieldname + '-post-' + Date.now().toString() + '.' + extensao);
    }
});
let maxSize = 4 * 1000 * 1000;
module.exports = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        const extensions = ['image/png', 'image/jpeg', 'image/gif', 'image/jpg'].find(format => format === file.mimetype);
        if(extensions){
            return cb(null, true);
        }
        return cb(null, false);
    },
    limits: {fileSize: maxSize}
});