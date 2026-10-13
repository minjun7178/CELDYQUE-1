# 카탈로그 기준 콘텐츠 배포 — 2026-10-13

상태: 배포 완료. GitHub의 validate·deploy 작업 모두 성공했고, 공개 파일 21개가 최종 소스와 일치함을 확인했습니다.

- 배포 커밋: `5f9e95e0e6b77e722e78ccb75824fcf9c5138717`
- 배포 기록: https://github.com/minjun7178/CELDYQUE-1/actions/runs/38373242799
- 공개 주소: https://celdyque.com/
- 공개 검증: 제품 14개 + 홈페이지·FAQ·제품 목록 + sitemap·robots·service worker·검색 JS, 총 21개 모두 HTTP 200 및 내용 일치. Git 체크아웃의 CRLF/LF 차이만 정규화함.
- 실제 공개 클렌징 오일 페이지의 녹차·어성초·LHA 표기를 브라우저에서도 확인함.

## 반영 범위

- 기존 디자인과 제품 URL·구매 링크를 유지한 14개 제품 페이지.
- 제품 FAQ 59개, 공통 FAQ 21개, 제품 목록 태그, 홈페이지 일부 문구, 검색 카탈로그, 메타 설명 및 JSON-LD.
- ArbutXA: Arbutin 5%, Alpha-Arbutin 2%, Tranexamic Acid 5%, Niacinamide 2%.
- 클렌징 오일: 병풀·티트리·녹차·어성초·LHA. 서로 다른 주요 성분 소개를 모순으로 취급하지 않음. 쑥은 추가하지 않음.
- PDRN 25%: 카탈로그의 젤 제형. 바쿠치올 크림 5,000 ppm, 두피 세럼의 카탈로그 함량, 젠틀 클렌저의 AHA/BHA/PHA 및 글루타치온의 아데노신 보완.
- 카탈로그 19쪽의 잘못된 레티놀 제목·레티날 설명 및 23쪽의 다른 제품 제목은 옮기지 않음.
- 기존 사용법·빈도·주의사항 유지. 성분 연구와 완제품 시험 결과를 구분하며, 새로운 완제품 임상 결과·원료 순도·전성분표를 만들지 않음.

## 검사

- 원고·본문·메타 설명·구조화 데이터·연구 출처 일치 검사 통과.
- 카탈로그 핵심 정보가 14개 제품에 실제 표시되는지 검사 통과.
- SEO 21페이지, HTML 28파일, Python 단위 테스트 28개, JavaScript 단위 테스트 28개 통과.
- 브라우저 회귀 테스트 7개 통과. 최초 6-worker 실행에서는 localhost의 site.js 연결 거부 1건이 있었고, CI와 같은 2-worker 설정으로 전체 통과. 테스트 기대 조건을 완화하지 않음.
- Before 복구 dry-run 29개 파일 통과.

## 백업과 복구

- Before 커밋: `a150659d59365f91bcd3833816bb24130ccfe5ab`
- Before 태그: `before-content-after-2026-10-13`
- Before ZIP: `C:/Users/USER/Documents/celdyque/CELDYQUE-backups/before-after-20261013-144032/before.zip`
- Before ZIP SHA-256: `a969661c182761ef72e868382cb55d1b91e225056c349fc1d1b82a718a6a71f2`
- 최종 카탈로그 반영 직전 추가 스냅샷: 같은 백업 폴더의 `before-catalog-final-20261013-175350.zip`
- 로컬 복구: `python -B scripts/restore_before_content.py`로 확인한 뒤 `--apply`로 적용. 이는 로컬 사이트 파일 복구용입니다. 공개 사이트를 완전히 되돌릴 때는 아래 Git 복구 기준으로 검사 설정까지 함께 복구해야 함.
- 공개 Before 복구 기준은 위 Before 태그 전체입니다. 배포 커밋을 revert하고 이후 문서 변경 충돌을 해결하거나, 이 태그 기준의 복구 커밋을 만들어 CI를 통과시킨 뒤 재배포합니다. 현재 원고 일치 검사는 After 원고용이므로 HTML만 Before로 바꿔서 푸시하지 않습니다. 기존 Before 태그는 삭제하지 않으며 원본 ZIP도 수정하지 않았습니다.

## 원고와 공개 범위

- 최종 고객용 영어 원고: `content/CUSTOMER-COPY-EN.md`
- 카탈로그 근거와 페이지별 연결: `content/catalog-facts-2026.json`
- 승인 기록: `content/release-approval-2026-10-13.json`
- 사이트 빌드는 실제 웹사이트 파일만 포함. 원고·백업·검토 문서·임시 파일·Before/After 미리보기·미공개 가이드 5개는 웹사이트에 포함하지 않음.

원격 CI와 공개 URL 반영을 모두 확인했습니다. Google 색인 및 AI 추천 여부는 배포 성공과 별개의 관찰 대상입니다.
