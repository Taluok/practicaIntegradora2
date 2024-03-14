import multer from 'multer';
import { __dirname } from '../utils/utils.js';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let folder;
        const fileType = file.fieldname;
        console.log('UPLOADER------------->', file);
        switch (fileType) {
            case 'profile':
                folder = 'profiles';
                break;
            case 'product':
                folder = 'products';
                break;
            case 'document':
                folder = 'documents';
                break;
            default:
                folder = 'documents';
        }
        console.log('UPLOADER2------------->', fileType);

        cb(null, __dirname + '/public/' + folder);
        console.log('CB------------->', __dirname + '/public/' + folder);
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);

    }
});

export const uploader = multer({ storage: storage });
