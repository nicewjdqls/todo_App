# total-back
# 나의 GitHub 페이지

안녕하세요! 구정빈 입니다. todo-APP입니다.

## 프로젝트 목록
할일앱 백엔드

### 1. 실행결과
MongoDB로 CURD 기능
post  - .save()
get   - find()
put   - updateOne()
del   - deleteOne()

* put, del 사용시
id값을 받아오는것은 params 방식을 사용
const  id = req.params.id;

* update(put)
업데이트시
nModified 로 수정여부 판단 
nModified == 0 이면 수정사항 없음
nModified == 1 이면 수정

* delete(del)
삭제시
deletedCount 로 삭제여부 판단
deletedCount == 0 이면 삭제안됨
deletedCount == 1 이면 삭제됨

## 연락처
- 이메일: nicewjdqls@naver.com
