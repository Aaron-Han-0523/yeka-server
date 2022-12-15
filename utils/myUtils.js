const fs = require('fs');
const multer = require('multer');
const { resolve } = require('path');
const path = require('path');



module.exports.mkdir = mkdir = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}


module.exports.getRandomInt = (min, max) => {
  if (max === undefined) {
    max = min;
    min = 0;
  }
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
}

const en_month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

module.exports.formatDateTime = (d_t, sep = '.') => {
  if (!d_t) return '';
  let year = d_t.getFullYear();
  let month = ("0" + (d_t.getMonth() + 1)).slice(-2);
  let day = ("0" + d_t.getDate()).slice(-2);
  let hour = ("0" + d_t.getHours()).slice(-2);
  let minute = ("0" + d_t.getMinutes()).slice(-2);
  let seconds = ("0" + d_t.getSeconds()).slice(-2);
  return year + sep + month + sep + day + " " + hour + ":" + minute + ":" + seconds;
}

module.exports.formatDate = (d_t, option = { sep: '-', style: 'iso' }) => {
  if (!d_t) return '';
  let year = "";
  let month = "";
  let day = ("0" + d_t.getDate()).slice(-2);

  switch (option.style) {
    case "iso":
      year = ("" + d_t.getFullYear()).slice(-4);
      month = ("0" + (d_t.getMonth() + 1)).slice(-2);
      return year + option.sep + month + option.sep + day;
    case "en":
      year = ("" + d_t.getFullYear()).slice(-2);
      month = en_month[d_t.getMonth()];
      return day + option.sep + month + option.sep + en_year;
  }
}

module.exports.text_ellipsis = (text, max_length) => {
  return text.length > max_length ? text.slice(0, max_length) + "..." : text
}

// array = "1,2,3,4"
module.exports.array_i18n = (array, i18n_func) => {
  array = array.split(',');
  let result = [];
  array.forEach((item, index) => {
    result.push(i18n_func(item));
  })
  return result;
}


// 업로드 파일 저장 설정
let storage = (dir_path) => multer.diskStorage({
  destination: function (req, file, callback) {
    const FILES_PATH = path.join(process.env.UPLOADFILES_ROOT, dir_path);
    const FOLDER_PATH = path.join(process.cwd(), FILES_PATH);
    exports.mkdir(FOLDER_PATH);

    callback(null, FILES_PATH)
  }, filename: function (req, file, callback) {
    let extension = path.extname(file.originalname);
    let basename = path.basename(file.originalname, extension);
    let encoding = []
    for (let i = 0; i < basename.length; i++) {
      encoding.push(basename.codePointAt(i).toString(36));
    }
    encoding = encoding.slice(0, 200);
    callback(null, req.res.locals.user.id + '-' + Date.now() + "-" + encoding.join('_') + extension);
  },
});

// 미들웨어 등록
module.exports.upload = (dir_path) => multer({
  storage: storage(dir_path),
  // file size 제한(MB)
  limits: {
    fileSize: process.env.FILE_MAX_SIZE * 1024 * 1024,
  },
});

module.exports.multerConsoleError = (err, req, res, next) => {
  if (err instanceof Error) {
    console.error(err);
  }
  next(err);
}

function make_url(baseURL, page, limit, word) {
  if (!page) page = '';
  if (!limit) limit = '';
  if (!word) word = '';
  return baseURL + '?' + new URLSearchParams({ p: page, limit: limit, q: word });
}

// 부트스트랩 v5, fontawesome 이용
module.exports.make_pagination_by_href = function (page, count, baseURL, limit = 10, word = "") {
  let end_page = parseInt((count - 1) / limit) + 1;
  let end_list_num = end_page > 6 ? 5 : end_page;
  let temp_html = `<div class="d-flex justify-content-center">
  <!-- 페이징처리 시작 -->
  <!-- 처음 & 이전페이지 -->
  <ul class="p-2 pagination">
    `;
  if (page == 1) {
    temp_html += `
    <li class="page-item disabled"><a class="page-link">
        <<
      </a>
    </li>
    <li class="page-item disabled"><a class="page-link">
        <
      </a>
    </li>
    `;
  } else {
    temp_html += `
    <li class="page-item"><a class="page-link" href="${make_url(baseURL, 1, limit, word)}">
        <<
      </a>
    </li>
    <li class="page-item"><a class="page-link" href="${make_url(baseURL, page - 1, limit, word)}">
        <
      </a>
    </li>
    `;
  } temp_html += `
  </ul>
  <!-- 페이지 리스트 -->
  <ul class="p-2 pagination">
    `;
  if (page < 4) {
    for (let i = 1; i <= end_list_num; i++) {

      if (page == i) {
        temp_html += `
    <li class="page-item disabled">
      <a class="page-link current_page">
        ${i}
      </a>
    </li>
    `;
      } else {
        temp_html += `
    <li class="page-item"><a class="page-link" href="${make_url(baseURL, i, limit, word)}">
        ${i}
      </a></li>
    `;
      }
    } temp_html += `
    `;
  } else if (page > end_page - 3) {
    for (let i = end_page - 4; i <= end_page; i++) {
      if (page == i) {
        temp_html += `
    <li class="page-item disabled">
      <a class="page-link current_page">
        ${i}
      </a>
    </li>
    `;
      } else {
        temp_html += `
    <li class="page-item">
      <a class="page-link" href="${make_url(baseURL, i, limit, word)}">
        ${i}
      </a>
    </li>
    `;
      }
    }
  } else {
    for (let i = page - 2; i < page + 3; i++) {
      if (page == i) {
        temp_html += `
    <li class="page-item disabled">
      <a class="page-link current_page">
        ${i}
      </a>
    </li>
    `;
      } else {
        temp_html += `
    <li class="page-item">
      <a class="page-link" href="${make_url(baseURL, i, limit, word)}">
        ${i}
      </a>
    </li>
    `;
      }
    }
  } temp_html += `
  </ul>
  <!-- 다음 & 마지막페이지 -->
  <ul class="p-2 pagination">
    `;
  if (page == end_page) {
    temp_html += `
    <li class="page-item disabled">
      <a class="page-link">
        >
      </a>
    </li>
    <li class="page-item disabled">
      <a class="page-link">
        >>
      </a>
    </li>
    `;
  } else {
    temp_html += `
    <li class="page-item">
      <a class="page-link" href="${make_url(baseURL, page + 1, limit, word)}">
        >
      </a>
    </li>
    <li class="page-item">
      <a class="page-link" href="${make_url(baseURL, end_page, limit, word)}">
        >>
      </a>
    </li>
    `;
  } temp_html += `
  </ul>
  <!-- 페이징처리 끝 -->
</div>`
  return temp_html;
}
// 부트스트랩 v5, fontawesome 이용
module.exports.make_pagination_by_func = function (page, count, func_name, limit = 10) {
  let end_page = parseInt((count - 1) / limit) + 1;
  let end_list_num = end_page > 6 ? 5 : end_page;
  let temp_html = `<div class="d-flex justify-content-center">
    <!-- 페이징처리 시작 -->
    <!-- 처음 & 이전페이지 -->
    <ul class="p-2 pagination">
      `;
  if (page == 1) {
    temp_html += `
      <li class="page-item disabled"><button type="button" class="page-link">
          <<
        </button>
      </li>
      <li class="page-item disabled"><button type="button" class="page-link">
          <
        </button>
      </li>
      `;
  } else {
    temp_html += `
      <li class="page-item"><button type="button" class="page-link" onclick="${func_name}(1);">
          <<
        </button>
      </li>
      <li class="page-item"><button type="button" class="page-link" onclick="${func_name}(${page - 1});">
          <
        </button>
      </li>
      `;
  } temp_html += `
    </ul>
    <!-- 페이지 리스트 -->
    <ul class="p-2 pagination">
      `;
  if (page < 4) {
    for (let i = 1; i <= end_list_num; i++) {

      if (page == i) {
        temp_html += `
      <li class="page-item disabled">
        <button type="button" class="page-link current_page">
          ${i}
        </button>
      </li>
      `;
      } else {
        temp_html += `
      <li class="page-item"><button type="button" class="page-link" onclick="${func_name}(${i});">
          ${i}
        </button></li>
      `;
      }
    } temp_html += `
      `;
  } else if (page > end_page - 3) {
    for (let i = end_page - 4; i <= end_page; i++) {
      if (page == i) {
        temp_html += `
      <li class="page-item disabled">
        <button type="button" class="page-link current_page">
          ${i}
        </button>
      </li>
      `;
      } else {
        temp_html += `
      <li class="page-item">
        <button type="button" class="page-link" onclick="${func_name}(${i});">
          ${i}
        </button>
      </li>
      `;
      }
    }
  } else {
    for (let i = page - 2; i < page + 3; i++) {
      if (page == i) {
        temp_html += `
      <li class="page-item disabled">
        <button type="button" class="page-link current_page">
          ${i}
        </button>
      </li>
      `;
      } else {
        temp_html += `
      <li class="page-item">
        <button type="button" class="page-link" onclick="${func_name}(${i});">
          ${i}
        </button>
      </li>
      `;
      }
    }
  } temp_html += `
    </ul>
    <!-- 다음 & 마지막페이지 -->
    <ul class="p-2 pagination">
      `;
  if (page == end_page) {
    temp_html += `
      <li class="page-item disabled">
        <button type="button" class="page-link">
          >
        </button>
      </li>
      <li class="page-item disabled">
        <button type="button" class="page-link">
          >>
        </button>
      </li>
      `;
  } else {
    temp_html += `
      <li class="page-item">
        <button type="button" class="page-link" onclick="${func_name}(${page + 1});">
          >
        </button>
      </li>
      <li class="page-item">
        <button type="button" class="page-link" onclick="${func_name}(${end_page});">
          >>
        </button>
      </li>
      `;
  } temp_html += `
    </ul>
    <!-- 페이징처리 끝 -->
  </div>`
  return temp_html;
}