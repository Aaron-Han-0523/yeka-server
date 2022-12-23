const multer = require("multer");
const path = require("path");
const myUtils = require("./myUtils");

const UPLOADFILES_ROOT = process.env.UPLOADFILES_ROOT || "uploads";
const FILE_MAX_SIZE = process.env.FILE_MAX_SIZE || 5;

// 업로드 파일 저장 설정
let storage = (dir_path) =>
  multer.diskStorage({
    destination: function (req, file, callback) {
      const FILES_PATH = path.join(UPLOADFILES_ROOT, dir_path);
      const FOLDER_PATH = path.join(process.cwd(), FILES_PATH);
      myUtils.mkdir(FOLDER_PATH);

      callback(null, FILES_PATH);
    },
    filename: function (req, file, callback) {
      let extension = path.extname(file.originalname);
      let basename = path.basename(file.originalname, extension);
      let encoding = [];
      for (let i = 0; i < basename.length; i++) {
        encoding.push(basename.codePointAt(i).toString(36));
      }
      encoding = encoding.slice(0, 200);
      callback(null, Date.now() + "-" + encoding.join("_") + extension);
    },
  });

// 미들웨어 등록
module.exports.upload = (dir_path) =>
  multer({
    storage: storage(dir_path),
    // file size 제한(MB)
    limits: {
      fileSize: FILE_MAX_SIZE * 1024 * 1024,
    },
  });

module.exports.multerConsoleError = (err, req, res, next) => {
  if (err instanceof Error) {
    console.error(err);
  }
  next();
};
