const codezip = {};

codezip.user_type = {
    length: 3,
    "0": "일반회원",
    "1": "컨설턴트",
    "2": "협력사",
    "99": "관리자",
}
codezip.gender = ["남성", "여성", "기타"]
codezip.payment_status = ["입금대기", "예약금 입금 완료", "최종입금 완료"]
codezip.consulting_status = ["상담 진행 대기", "상담 진행 중", "상담 종료"]
codezip.community_type = ["공지사항", "유투브 및 칼럼", "자유게시판"]


module.exports = codezip;