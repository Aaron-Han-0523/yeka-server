/*-------------- Calendar Start -------------- */

let currentYear;
let currentMonth;
let currenDate;
let firstDay;
let lastDate;

// 임시 데이터
const data = [
  { date: "2023-02-01", content: "" },
  { date: "2023-02-03", content: "" },
  { date: "2023-02-15", content: "" },
  { date: "2023-02-26", content: "" },
  { date: "2023-02-21", content: "" },
];

// 데이터 가공
const calendarList = data.reduce(
  (acc, v) => ({ ...acc, [v.date]: [...(acc[v.date] || []), v.content] }),
  {}
);

// pad method
Number.prototype.pad = function () {
  return this > 9 ? this : "0" + this;
};

// 달력 생성
const makeCalendar = (date) => {
  // 현재의 년도와 월 받아오기
  currentYear = new Date(date).getFullYear(); // 연도 : 2023
  currentMonth = new Date(date).getMonth() + 1; // 월 : 0 부터 시작
  currenDate = new Date(date).getDate(); // 일 : 1 부터 시작

  // 현재 달의 첫 요일
  firstDay = new Date(date.setDate(1)).getDay(); // 요일 : 0
  // 현재 달의 마지막 날짜 구하기
  lastDate = new Date(currentYear, currentMonth, 0).getDate(); // day가 0이면 전달 마지막 날

  // 남은 박스만큼 다음달 날짜 표시
  const limitDay = firstDay + lastDate;
  const nextDay = Math.ceil(limitDay / 7) * 7;

  let htmlDummy = "";

  // 한달전 날짜 부분을 표시하기
  for (let i = 0; i < firstDay; i++) {
    htmlDummy += `<div class="noColor"></div>`;
  }

  // 이번달 날짜 표시하기
  for (let i = 1; i <= lastDate; i++) {
    const date = `${currentYear}-${currentMonth.pad()}-${i.pad()}`;

    let dateFormat =
      "a" +
      currentYear +
      "-" +
      (currentMonth <= 9 ? "0" + currentMonth : currentMonth) +
      "-" +
      (i <= 9 ? "0" + i : i);

    htmlDummy += `
      <div id="${dateFormat}" class="date" name="date">
        ${i}
        <p>
          ${calendarList[date]?.join("</p><p>") || ""}
        </p>
      </div>
    `;
  }

  // 다음달 날짜 부분을 표시하기
  for (let i = limitDay; i < nextDay; i++) {
    htmlDummy += `<div class="noColor"></div>`;
  }
  // 날짜 박스 표시하기
  document.querySelector(`.dateBoard`).innerHTML = htmlDummy; // 위에서 계속 추가해주었던 html 코드를 출력
  // 현재 날짜 정보 표시하기
  document.querySelector(
    `.dateTitle`
  ).innerText = `${currentYear}년 ${currentMonth}월`;
};

let today = new Date();
// 오늘을 기준으로 2022-05-20 형식으로 Format
let dateFormat =
  today.getFullYear() +
  "-" +
  (today.getMonth() + 1 <= 9
    ? "0" + (today.getMonth() + 1)
    : today.getMonth() + 1) +
  "-" +
  (today.getDate() <= 9 ? "0" + today.getDate() : today.getDate());

const date = new Date(dateFormat);
// Format 후 parameter 로 사용
makeCalendar(date);

// 이전달 이동
document.querySelector(`.prevDay`).onclick = () => {
  makeCalendar(new Date(date.setMonth(date.getMonth() - 1)));
};

// 다음달 이동
document.querySelector(`.nextDay`).onclick = () => {
  makeCalendar(new Date(date.setMonth(date.getMonth() + 1)));
};

/*-------------- Calendar END -------------- */

/*-------------- @선택한 id 다루기@  -------------- */

let operationDate = [];
let view_check = false;

function btn_listener(event) {
  var tempDate;
  /*-------------- 선택한 날짜를 배열에 넣기 -------------- */
  let dateId = event.target.id;

  tempDate = dateId.substring(1);
  /*-------------- div 선택시 화면 변환 및 값 수정 -------------- */
  view_check = !view_check;
  if (view_check) {
    event.target.style.backgroundColor = "salmon";
    operationDate.push(tempDate);
    // document.body.style.backgroundColor = 'salmon'; // body의 전체 배경색 변경
  } else {
    event.target.style.backgroundColor = "white";
    // operationDate.filter((element) => element !== validation); 특정값을 제거한 새로운 배열을 만드는거라 탈락
    for (let i = 0; i < operationDate.length; i++) {
      if (operationDate[i] === tempDate) {
        operationDate.splice(i, 1);
      }
    }
  }

  // /*-------------- 배열에 중복 제거 -------------- */
  // duplication_inspection.forEach((element) => {
  //   if (!operationDate.includes(element)) {
  //     operationDate.push(element);
  //   }
  // });
  console.log(operationDate);
}

/*-------------- div 선택시 화면 변환 END -------------- */
/*-------------- 선택한 날짜 DATE Format으로 바꿔 배열에 넣기 -------------- */
currentYear = new Date(date).getFullYear();
currentMonth = new Date(date).getMonth() + 1;
currenDate = new Date(date).getDate();
firstDay = new Date(date.setDate(1)).getDay();
lastDate = new Date(currentYear, currentMonth, 0).getDate();
for (let i = 1; i <= lastDate; i++) {
  let dateFormat =
    "a" +
    currentYear +
    "-" +
    (currentMonth <= 9 ? "0" + currentMonth : currentMonth) +
    "-" +
    (i <= 9 ? "0" + i : i);

  const buttons = document.querySelectorAll(`#${dateFormat}`);
  for (const button of buttons) {
    button.addEventListener("click", btn_listener);
  }
}
/*-------------- 선택한 날짜 DATE Format으로 바꿔 배열에 넣기 END -------------- */

/*-------------- @ 선택한 id 다루기 END@ -------------- */

/*-------------- Flip Button value check -------------- */
// function is_checked() {

//   // 1. checkbox element를 찾습니다.
//   const checkbox = document.getElementById('b09');

//   // 2. checked 속성을 체크합니다.
//   const is_checked = checkbox.checked;

//   // 3. 결과를 출력합니다.
//   document.getElementById('result').innerText = is_checked;

// }
let timeList = [];

function flipButtonCheck() {
  timeList = [];
  const b07 = document.getElementById("b07").checked;
  const b08 = document.getElementById("b08").checked;
  const b09 = document.getElementById("b09").checked;
  const b10 = document.getElementById("b10").checked;
  const b11 = document.getElementById("b11").checked;
  const b12 = document.getElementById("b12").checked;
  const b13 = document.getElementById("b13").checked;
  const b14 = document.getElementById("b14").checked;
  const b15 = document.getElementById("b15").checked;
  const b16 = document.getElementById("b16").checked;
  const b17 = document.getElementById("b17").checked;
  const b18 = document.getElementById("b18").checked;
  timeList.push(b07);
  timeList.push(b08);
  timeList.push(b09);
  timeList.push(b10);
  timeList.push(b11);
  timeList.push(b12);
  timeList.push(b13);
  timeList.push(b14);
  timeList.push(b15);
  timeList.push(b16);
  timeList.push(b17);
  timeList.push(b18);
  console.log(timeList);
}

/*-------------- Flip Button value check END -------------- */

// /*-------------- 자바스크립트로 form 태그의 input 검증(validation) 후에 수동으로 submit 처리하기 -------------- */
// 기본적으로 <form>태그를 사용하여 입력한 데이터를 웹서버로 전송할때 <input>태그의 type="submit"을 통해 전송버튼을 만들어 사용합니다.

// input submit의 경우 form 안에 있는 모든 input의 value를 전송하게 되는데, 이경우 각 input에 값이 입력되었는지 등의 여부를 검증(validation)할 수 없습니다.

// 따라서 이 경우 <input type="button">으로 버튼을 하나 만들고 onClick이벤트를 직접 핸들링하여, 버튼을 클릭했을 때 각 입력값을 검증한 후 수동으로 submit처리 해주어야 합니다.

function dataProcessing() {
  // <div id="${dateFormat}" class="date"></div>
  let consultantIdList = document.getElementById("consultantIdList").value;
  
  fetch("/admin/reservation/add", {
    method: "POST",
    headers: {
      "Content-Type":"application/json"
    },
    body: JSON.stringify({
      "operationDate": operationDate,
      "timeList": timeList,
      "consultantIdList": consultantIdList
    })
  }).then(resp =>{
    alert(`----`);
  }).catch(err=>{

  })
}
// input tag의 'hidden' 사용하기
// <input type="hidden" class="class" name="name" id="id" value="숨길 내용">
// 값을 가져올 때 document.getElementById("id").value