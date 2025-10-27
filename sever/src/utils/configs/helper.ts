import multer from 'multer';
import path from 'path';

// Sử dụng memoryStorage để lưu trữ tệp trong bộ nhớ thay vì trên đĩa
// Điều này ngăn chặn việc tạo các tệp tạm thời trong thư mục uploads
const storage = multer.memoryStorage();

// Lọc file upload
const fileFilter = (req: any, file: any, cb: any) => {
    console.log('File upload attempt:', {
        fieldname: file.fieldname,
        originalname: file.originalname,
        mimetype: file.mimetype,
        size: file.size
    });

    // Chấp nhận hình ảnh và các file phổ biến
    const allowedFileTypes = [
        'image/jpeg',
        'image/jpg',
        'image/png',
        'image/gif',
        'image/webp',
        'image/svg+xml',
        'image/bmp',
        'image/tiff',
        'image/avif',
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ];

    if (allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        console.error('Unsupported file type:', file.mimetype);
        cb(new Error('Định dạng file không được hỗ trợ!'), false);
    }
};

// Cấu hình upload
export const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024 // Giới hạn 5MB
    }
});

// Hàm chuyển đổi formdata sang object
export const formDataToObject = (req: any) => {
    const result = { ...req.body };

    // Thêm các file đã upload vào object (nếu có)
    if (req.file) {
        result.file = {
            fieldname: req.file.fieldname,
            originalname: req.file.originalname,
            encoding: req.file.encoding,
            mimetype: req.file.mimetype,
            size: req.file.size,
            buffer: req.file.buffer
        };
    }

    if (req.files && Array.isArray(req.files)) {
        // Xử lý files là một mảng (từ upload.any())
        result.files = req.files.map((file: any) => ({
            fieldname: file.fieldname,
            originalname: file.originalname,
            encoding: file.encoding,
            mimetype: file.mimetype,
            size: file.size,
            buffer: file.buffer
        }));
    }

    return result;
};

// Hàm xử lý các loại dữ liệu khác nhau
export const parseRequestData = (req: any) => {
    const contentType = req.headers['content-type'] || '';

    if (contentType.includes('multipart/form-data')) {
        const obj = formDataToObject(req);
        // parse requirements/benefits if they were sent as JSON strings
        ['requirements', 'benefits'].forEach((key) => {
            if (obj[key] && typeof obj[key] === 'string') {
                try {
                    const parsed = JSON.parse(obj[key]);
                    if (Array.isArray(parsed)) {
                        obj[key] = parsed.map((s: any) => String(s).trim()).filter(Boolean);
                    }
                } catch {
                    // not JSON -> leave as-is (string) so callers can handle
                }
            }
        });

        return obj;
    } else if (contentType.includes('application/json')) {
        return req.body;
    } else if (contentType.includes('application/x-www-form-urlencoded')) {
        return req.body;
    }

    return { ...req.body, ...req.query };
};
