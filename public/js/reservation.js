/*-------------- Calendar Start -------------- */

let currentYear;
let currentMonth;
let currenDate;
let firstDay;
let lastDate;

// 임시 데이터
const data = [
  { date: '2023-02-01', content: '테스트1' },
  { date: '2023-02-03', content: '테스트2' },
  { date: '2023-02-15', content: '테스트3' },
  { date: '2023-02-26', content: '테스트4' },
  { date: '2023-02-21', content: '테스트5' },
];

// 데이터 가공
const calendarList = data.reduce(
  (acc, v) => 
    ({ ...acc, [v.date]: [...(acc[v.date] || []), v.content] })
  , {}
);

// pad method
Number.prototype.pad = function() {
  return this > 9 ? this : '0' + this;
}

// 달력 생성
const makeCalendar = (date)  => {
  // 현재의 년도와 월 받아오기
  currentYear = new Date(date).getFullYear(); // 연도 : 2023
  currentMonth = new Date(date).getMonth() + 1; // 월 : 0 부터 시작
  currenDate = new Date(date).getDate() // 일 : 1 부터 시작

  // 현재 달의 첫 요일
  firstDay = new Date(date.setDate(1)).getDay(); // 요일 : 0
  // 현재 달의 마지막 날짜 구하기
  lastDate = new Date(currentYear, currentMonth, 0).getDate(); // day가 0이면 전달 마지막 날

  // 남은 박스만큼 다음달 날짜 표시
  const limitDay = firstDay + lastDate; 
  const nextDay = Math.ceil(limitDay / 7) * 7;

  let htmlDummy = '';

  // 한달전 날짜 부분을 표시하기
  for (let i = 0; i < firstDay; i++) {
    htmlDummy += `<div class="noColor"></div>`;
  }

  // 이번달 날짜 표시하기
  for (let i = 1; i <= lastDate; i++) {
    const date = `${currentYear}-${currentMonth.pad()}-${i.pad()}`

    let dateFormat = 'a' + currentYear +
	'-' + ( (currentMonth) <= 9 ? "0" + (currentMonth) : (currentMonth) ) +
	'-' + ( (i) <= 9 ? "0" + (i) : (i) );
    
    htmlDummy += `
      <div id="${dateFormat}" class="date">
        ${i}
        <p>
          ${calendarList[date]?.join('</p><p>') || ''}
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
  document.querySelector(`.dateTitle`).innerText = `${currentYear}년 ${currentMonth}월`;
}

let today = new Date();
// 오늘을 기준으로 2022-05-20 형식으로 Format
let dateFormat = today.getFullYear() +
	'-' + ( (today.getMonth()+1) <= 9 ? "0" + (today.getMonth()+1) : (today.getMonth()+1) ) +
	'-' + ( (today.getDate()) <= 9 ? "0" + (today.getDate()) : (today.getDate()) );
  
const date = new Date(dateFormat);
// Format 후 parameter 로 사용
makeCalendar(date);

// 이전달 이동
document.querySelector(`.prevDay`).onclick = () => {
makeCalendar(new Date(date.setMonth(date.getMonth() - 1)));
}

// 다음달 이동
document.querySelector(`.nextDay`).onclick = () => {
makeCalendar(new Date(date.setMonth(date.getMonth() + 1)));
}

/*-------------- Calendar End -------------- */

currentYear = new Date(date).getFullYear();
currentMonth = new Date(date).getMonth() + 1; 
currenDate = new Date(date).getDate() 
firstDay = new Date(date.setDate(1)).getDay(); 
lastDate = new Date(currentYear, currentMonth, 0).getDate();
for(let i = 1; i <= lastDate; i++) {

    let dateFormat = 'a' + currentYear +
	'-' + ( (currentMonth) <= 9 ? "0" + (currentMonth) : (currentMonth) ) +
	'-' + ( (i) <= 9 ? "0" + (i) : (i) );

  const buttons = document.querySelectorAll(`#${dateFormat}`)
    for (const button of buttons) {
      button.addEventListener('click', () => {
        alert(`${dateFormat}`.substring(1));
    })
  }
}
