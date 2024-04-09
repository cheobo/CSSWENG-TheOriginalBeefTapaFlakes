import multer from 'multer';

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 1024 * 1024,
    },
    fileFilter: (req, file, cb) => {
        if (
            file.mimetype === 'image/jpeg' ||
            file.mimetype === 'image/png'
        ){
            cb(null, true);
        } else {
            cb(new Error('Only JPEG and PNG image files are allowed.'));
        }
    }
});

export default upload;