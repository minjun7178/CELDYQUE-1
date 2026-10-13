# CELDYQUE 웹사이트 자료·콘텐츠 현황

작성일: 2026-10-12 (Asia/Seoul)
조사 기준: 로컬 `main`, 커밋 `a150659d59365f91bcd3833816bb24130ccfe5ab`
연결 문서: [향후 자료 구조·콘텐츠 계획](content-plan-2026-10-12.md)

빠른 이동: [현황 요약](#overview) · [불일치/확인 목록](#issues) · [14제품 자료](#products) · [공통 FAQ](#faq) · [전체 본문 아카이브](#archive)

## 1. 이 문서의 범위와 읽는 방법

현재 저장소의 루트 HTML 26개, 공통 헤더·푸터, 검색 카탈로그, 분석 스크립트, 사이트맵, 배포 설정과 인수인계 문서를 조사했다. 앞부분은 한국어 현황과 문제 목록이며, 뒤에는 14개 제품별 자료와 전체 페이지의 HTML 본문 텍스트 아카이브를 수록한다. 기존 영어 문구는 번역 과정에서 뜻이 바뀌지 않도록 원문도 보존한다.

**이 문서는 현재 사이트에 무엇이 적혀 있는지 기록한 조사서다. 성분·함량·효능·원산지·인증을 검증한 제품 사양서는 아니다.** 기존 문구를 재수록했다는 사실은 향후 게시 문구로 승인했다는 뜻이 아니다.

- `코드 확인`: 파일에서 직접 확인한 구조·문구·링크.
- `기록 확인`: 기존 MD에 적힌 과거 작업. 현재 외부 계정 상태를 보증하지 않는다.
- `사용자 확인`: 이 대화에서 사용자가 알려준 사실.
- `추가 확인`: 제조사·패키지·계정 화면·운영 환경 등 별도 근거가 필요한 항목.

이미지에 포함된 글자는 OCR하지 않았고, 영상 장면 전체와 실제 브라우저 화면을 새로 검수하지 않았다. JavaScript가 생성하는 콘텐츠는 홈 철학 슬라이드·검색 카탈로그·분석 동의 UI를 별도로 조사했다. 모든 동적 화면 상태의 캡처 또는 외부 판매처의 현재 상품 설명을 수집한 보고서는 아니다. 로컬 파일과 운영 배포본 전체의 동일성도 이번 문서에서 보증하지 않는다.

<a id="overview"></a>

## 2. 현재 상태 요약

| 항목 | 확인 결과 |
|---|---|
| 사이트 역할 | 영문 중심 스킨케어 브랜드·제품 소개, 외부 판매처 연결 |
| 기술 | 정적 HTML + CSS + JavaScript. 별도 CMS·DB·제품 데이터 원본 없음 |
| 루트 HTML | 26개 |
| 사이트맵 | 21 URL = 일반 페이지 7개 + 운영 카탈로그 제품 14개 |
| 운영 제품 | 얼굴 세럼·농축액 8개, 크림 3개, 클렌저 2개, 두피 세럼 1개 |
| 공통 FAQ | 12개 주제, 21개 질문·답변 |
| 제품별 FAQ | Volufiline 5개 + 나머지 13제품 각 3개 = 44개 |
| FAQ 총량 | 공통·제품별 합계 65개 질문·답변. 서로 다른 질문 65개라는 뜻은 아님 |
| 미디어 파일 | `images/` 123개 파일, `videos/` 3개 파일. 변형·원본 포함, 고유 콘텐츠 수와 다름 |
| 사이트맵 미디어 | 이미지 참조 64개, 영상 항목 1개 |
| 결제·주문 | 자체 결제 없음. Amazon 등 판매처에서 구매 |
| SEO 기반 | 제목·설명·canonical·robots·구조화 데이터·사이트맵·내부 링크 검사 있음 |
| 가장 큰 자료 문제 | 제품 정보가 여러 파일에 반복되고 항목별 출처·승인 상태가 없음 |

현재는 기술적인 검색 기반을 다시 만드는 단계보다, 기존 정보의 사실관계를 확인하고 하나의 제품 원본으로 통합하는 단계다. 검사 통과는 검색 순위·색인·AI 인용 또는 제품 주장에 대한 검증이 아니다.

## 3. 현재 자료가 흩어져 있는 위치

| 위치 | 저장된 자료 | 변경 시 함께 확인할 곳 |
|---|---|---|
| `product-*.html` | 제품명, 용량, 요약, 특징, 성분, 사용법, FAQ, 이미지, 구매 링크, JSON-LD | Shop, 검색, 홈, FAQ, 사이트맵 |
| [shop.html](../shop.html) | 14개 카드, 카테고리, 성분 태그, 용량, ItemList | 제품 원문·검색 카탈로그 |
| [assets/site.js](../assets/site.js) | `DEFAULT_CATALOG` 14개: ID·이름·부제·URL·이미지·검색 태그 | 카드·제품 제목과 용어 일치 |
| [index.html](../index.html) | 대표 제품 8개, 브랜드 철학 4개, 브랜드 소개·영상 | 제품 기준 정보·About |
| [faq.html](../faq.html) | 주제별 공통 Q&A 21개, 14제품 링크, FAQ 구조화 데이터 | 제품별 FAQ·설명·주의사항 |
| [about.html](../about.html) | 브랜드 철학, 연구·효능 관련 브랜드 문구 | 홈·푸터·근거 자료 |
| [store.html](../store.html), [contact.html](../contact.html) | 판매처·연락처·주소·운영 시간 | 헤더·푸터·Organization 데이터 |
| [partials/header.html](../partials/header.html), [partials/footer.html](../partials/footer.html) | 메뉴·외부 판매처·브랜드 문구·연락처 | 페이지 내 fallback 메뉴 |
| 각 HTML의 `<head>` | 검색 제목·설명, canonical, 공유 이미지, JSON-LD | 같은 페이지의 실제 본문 |
| [sitemap.xml](../sitemap.xml), [robots.txt](../robots.txt) | URL·이미지·영상 발견 및 수집 정책 | 공개 페이지 집합 |
| `images/`, `videos/` | 실제 제품 사진, 콘셉트·스톡 이미지, 영상 및 변형 | 파일 권리·실제 촬영 대상·설명 |

`scripts/build_site.py`는 자료를 해석해서 HTML을 생성하는 도구가 아니다. 이미 작성된 HTML과 정적 폴더를 `site-dist/`로 복사한다. 즉 현 상태에서는 한 제품의 정보를 여러 곳에서 직접 수정해야 한다.

## 4. 페이지별 역할

### 4.1 주요 페이지

| 파일 | 현재 내용 | 자료 관점에서 필요한 후속 작업 |
|---|---|---|
| `index.html` | 브랜드 영상, 4개 진입 카드, 철학 4개, 대표 제품 8개, About·Coming Soon 링크 | 대표 제품 정보 원본화, 브랜드 연구·임상 표현 근거 점검 |
| `shop.html` | 14개 제품, All·Serum·Cream·Cleanser 필터, 제품 카드와 ItemList | 두피 제품의 분류 기준, 이름·태그·용량 일치 |
| `about.html` | CELL·MEDICINE·TECHNIQUE 맥락의 브랜드 철학, 농도·연구·효능 설명 | 회사·브랜드 사실과 마케팅 문구 분리, 연구 근거 연결 |
| `store.html` | Amazon, TikTok Shop, YesStyle, Stylevana | 공식 판매처 근거와 지역·배송 안내 책임 범위 확인 |
| `contact.html` | 서울 주소, 이메일, 운영 시간, 판매처 | 실제 회사 정보와 담당자가 확인한 최신 정보로 통일 |
| `faq.html` | 공통 Q&A 21개, 검색·주제 필터, 질문 직접 링크 | 상세 답변은 해당 제품·가이드로 연결하고 모순 수정 |
| `brand-film.html` | 14초 무음 브랜드 영상, 장면 설명, 관련 페이지 링크 | 첫 공개일 확인 전 VideoObject 추가 보류 |

현재 주소 표기: `Garak-ro 25, 2nd Floor, Songpa-gu, Seoul, Republic of Korea`. 이메일: `team@celdyque.com`. Contact 운영 시간: 월~금 10 AM–5 PM KST. 이는 현재 페이지 문구이며 회사 정보의 별도 검증 결과가 아니다.

### 4.2 사이트맵 밖 파일도 배포 대상

| 파일 | 현재 상태 | 후속 판단 |
|---|---|---|
| `coming-soon.html` | 메뉴·홈에서 연결됨. 제목은 9-Peptide인데 본문은 새 크림·두 처방 예고. canonical·noindex 없음 | 현재 예고 대상과 출시 상태 확정 후 유지·수정·종료 결정 |
| `product-advanced-retinol-pro-retinal-serum-0-5.html` | Shop 카드 주석 처리, 검색 카탈로그·사이트맵 제외. HTML은 존재하며 canonical·noindex 없음 | 운영 여부 확인. 11배 빠른 효과·부작용 관련 표현과 농도 의미 검토 |
| `product-detail.html` | Volufiline 상세로 meta refresh, canonical도 새 상세 주소 | 기존 URL 유지. HTTP 301로 오인하지 않기 |
| `tiktok-callback.html` | 인증 콜백 보조 페이지, `noindex, follow` | 콘텐츠 페이지로 취급하지 않기. 운영 목적 유지 여부 별도 판단 |
| `임시.html` | 발렌타인 오픈 안내, `noindex, follow` | 필요 여부 확인 후 정리. 기존 접근 경로를 확인하기 전 삭제하지 않기 |

배포 스크립트가 루트 `*.html` 전체를 복사하므로, 메뉴·사이트맵에서 제외됐다고 비공개가 되는 것은 아니다. 현재 빌드 기준으로 `docs/`는 배포 대상이 아니지만, 저장소가 공개라면 Git에 올린 문서는 공개될 수 있다.

## 5. 검색·분석·외부 계정 인수인계

| 항목 | 근거와 상태 | 다음에 확인할 것 |
|---|---|---|
| Search Console | 사용자가 연결 완료라고 확인함. 앞선 대화의 DNS 조회에서 Google 인증 TXT 3개 확인. 저장소에는 완료 기록 대신 예전 후속 안내가 남음 | 기존 속성·접근 계정, 사이트맵 제출 상태, 실제 색인 및 실적 |
| DNS 인증 기록 | Google 소유권 인증 흔적. Search Console 외 Google 서비스에도 사용될 수 있음 | 어떤 서비스·계정의 인증인지. 레코드 개수는 계정·속성 수를 뜻하지 않음 |
| GTM | `GTM-TGMT9VPL`; 문서에 2026-09-08 버전 2 게시 기록 | 현재 컨테이너 권한·게시 태그·실제 동작 |
| GA4 | `G-XC5139NX5L`; 사용자 동의 후 지정 HTTPS 도메인에서만 작동 | Realtime/DebugView와 실제 방문·외부 클릭 수집 |
| Bing Webmaster Tools | 저장소에 등록 완료 기록 없음 | 기존 등록·접근 가능 여부 |
| Amazon Attribution | 14개 단품 ASIN 및 구매 링크의 기존 추적 파라미터 검사 있음 | 계정 성과, 판매처별 최신 상품·재고·가격 |
| HTTPS·리디렉션 | 이전 MD에 후속 확인 항목 | 운영 응답·호스팅 설정. 과거 문제를 현재 문제로 단정하지 않기 |

사이트 코드에 인증 태그가 없다는 이유로 Search Console 미연결로 판단하면 안 된다. DNS 인증은 프로젝트 파일 바깥에서 이루어진다. 앞으로 완료일·속성명·확인 방법·담당 역할만 기록하고 비밀번호·인증 세션·비공개 토큰을 문서에 넣지 않는다.

관련 기록: [SEO-NEXT-STEPS.md](../SEO-NEXT-STEPS.md), [ANALYTICS-SETUP.md](../ANALYTICS-SETUP.md), [PREVIEW-CHANGES.md](../PREVIEW-CHANGES.md). 이전 문서에는 20페이지·62이미지 등 과거 수치가 남아 있다. 본 조사 기준은 21 URL·64 이미지 참조다. README도 현 기능·검사 범위를 모두 반영하지 않는다.

<a id="issues"></a>

## 6. 확인된 정보 불일치와 우선 검토 목록

우선순위는 이번 정리 작업의 순서다. 검색엔진의 가중치나 법적 판단이 아니다.

| ID | 우선순위 | 관찰된 내용·위치 | 필요한 처리 |
|---|---|---|---|
| C01 | 우선 | 제품 14종의 전성분을 완전한 INCI 순서로 제공하는 자료 구조가 없음. 다수 페이지는 Key Ingredients, Volufiline도 패키지 참조 | 제품별 최신 전성분 원본 확보, 주요 성분과 전성분 필드 분리 |
| C02 | 우선 | FAQ의 Blue Copper Peptide 답변은 `full ingredient list`를 안내하지만 상세 페이지는 주요 성분 묶음과 패키지 참조 | 실제 제공 범위에 맞게 답변 수정하거나 전성분 게재. 일반 성분 안내 질문은 단순히 `ingredients`라고 쓰므로 모든 FAQ가 전성분을 약속한다고 확대 해석하지 않기 |
| C03 | 우선 | PDRN 12% 세럼에서 `120,000 ppm PDRN complex`와 `PDRN 120,000 ppm` 혼재 | 복합 원료 배합률·PDRN 자체 함량·표시 기준 구분. 수치 환산만으로 동일 의미라고 판단하지 않기 |
| C04 | 우선 | PDRN 25% FAQ 답변이 `page's ... positioning`에 의존 | 제조사 근거로 25% 의미 설명. 기존 페이지를 제조 근거로 쓰지 않기 |
| C05 | 우선 | PDRN 제품에 `Post-Care Friendly`, microneedling-style 문구. 공통 FAQ는 시술 후 의료진 확인 안내 | 제품별 주의·추천 표현 일치, 시술용·상처용으로 해석될 여지 검토 |
| C06 | 우선 | 검색 카탈로그 PDRN 부제 `Skin Regeneration`, `Total Anti-aging`; 두피 검색 태그 `hair growth` | 공통 FAQ와 제품의 확정된 설명 범위에 맞게 검색 표현도 정리 |
| C07 | 우선 | 여러 제품 본문에 `search-friendly`, `AI summaries`, `original page`, `positioning`, `story` 등 제작 관점 문구 | 소비자가 실제로 제품을 이해하는 설명으로 교체 |
| C08 | 우선 | Vegan·Cruelty-Free·Fragrance-Free·EWG·liposome·원산지·임상 관련 표현 존재 | 주장별 근거와 적용 범위 확인. 인증 없는 항목을 인증처럼 표현하지 않기 |
| C09 | 다음 | Niacinamide `Advanced`/`Pore Minimizer`, PDRN `25%`/`250,000ppm`, 두피 `Care` 유무 등 이름 변형 | 공식명·짧은 이름·검색 별칭 분리 |
| C10 | 다음 | 30 ml가 일부는 1 fl oz, Blue Copper는 1.01 fl oz로 표기 | 임의 통일 전에 제품별 패키지 표기 대조 |
| C11 | 다음 | 검색 두피 ID `9-peptide-scalp-care-serum`, URL은 `product-9-peptide-scalp-serum.html` | 이름·URL과 독립된 안정적 제품 ID 매핑 |
| C12 | 다음 | Organization의 TikTok URL과 현재 메뉴 링크가 서로 다름 | 실제 공식 계정 확인 후 브랜드 원본에서 통합 |
| C13 | 다음 | Coming Soon 제목·본문 불일치, 숨겨진 Retinal 페이지 잔존 | 페이지 상태를 active·upcoming·retired·utility로 관리 |
| C14 | 다음 | 자체 Product 데이터에 검증된 실시간 Offer/리뷰 없음 | 없는 가격·재고·평점 생성 금지. 상품 식별 정보 유지 |
| C15 | 다음 | 브랜드/제품 스톡 이미지와 실제 제품 사진 혼재 | 실제 촬영 대상·출처·이용 권리·alt를 구분. 실험실 사진을 실제 연구 증거로 취급하지 않기 |
| C16 | 다음 | `shop.html?cat=serum` 등의 메뉴 링크가 있지만 Shop 필터 스크립트에서 URL 파라미터 초기 적용을 찾지 못함 | 실제 동작 확인 후 링크와 필터 상태를 일치시키기. 이번에는 수정하지 않음 |

예시 근거: [PDRN 세럼](../product-pdrn-12-egf.html), [PDRN 농축액](../product-pdrn-25.html), [Blue Copper](../product-blue-copper-peptide-bakuchiol-serum.html), [Niacinamide](../product-niacinamide-20-advanced.html), [공통 FAQ](../faq.html), [검색 카탈로그](../assets/site.js).

## 7. 이미 구축된 기반과 유지할 것

- 주요 페이지의 canonical·메타 설명·공유 이미지·브랜드 식별 정보.
- 14종의 기존 제품 URL, ASIN, Amazon Attribution 구매 파라미터.
- 공통 FAQ의 화면 답변과 JSON-LD 일치 검사.
- 헤더·푸터 요청 실패 때 작동하는 기본 탐색 링크.
- 모바일 메뉴·검색·FAQ 필터·제품 필터.
- WebP·반응형 이미지·지연 로딩·영상 포스터.
- 서비스 워커의 영상·Range 요청 제외, 캐시 버전 관리.
- 사용자 분석 동의, 동의 철회, 운영 도메인 한정 GTM 로딩.
- GitHub Actions의 HTML·SEO·Python·Node·브라우저 검사 후 배포 흐름.

현재 SEO 검사는 내용의 실제 효능·라벨 정확성·Google 색인·AI 추천 여부를 검증하지 않는다. 새 디자인에서는 기존 URL과 콘텐츠를 유지하며 옮기고, 불가피한 URL 변경만 명시적인 매핑과 영구 리디렉션 대상으로 삼는다.

## 8. 앞으로의 정리 작업에 넘길 기준

1. HTML의 기존 문구는 `현재 게시 문구`로 수집한다.
2. 제조사·패키지·시험 등 근거 자료와 대조하기 전에는 `검증된 사실`로 승격하지 않는다.
3. 항목별로 출처·확인 상태·버전·공개 여부를 기록한다.
4. 기준 정보에서 제품 페이지·카드·FAQ·검색·구조화 데이터를 일관되게 파생한다.
5. PDRN 3종을 먼저 정리하되, 현재 14종과 미운영 페이지 목록은 빠짐없이 보존한다.

아래 부록의 모든 제품 주장은 현재 HTML의 기록이다. 새로운 제품 추천이나 검증 완료 문안이 아니다.

<!-- GENERATED_INVENTORY_START -->

<a id="products"></a>

## 9. 운영 제품 14종 자료 목록

다음 표의 이름·용량·ASIN은 현 HTML의 Product 데이터에서 추출했다. 각 제품의 수치·주장은 아직 제조 자료로 검증하지 않았다. 제품별 상세 기록은 링크를 눌러 확인할 수 있다.

| 제품 | 현재 이름 | 용량 | ASIN | 기존 상세 파일 |
|---|---|---|---|---|
| [P01](#product-volufiline-100) | CELDYQUÉ Volufiline 100% Concentrate | 10 ml / 0.33 fl oz | B0CPLDVTFP | [product-volufiline-100.html](../product-volufiline-100.html) |
| [P02](#product-bakuchiol-30000) | CELDYQUE Bakuchiol 30,000ppm Serum | 30 ml / 1 fl oz | B0DC6H8MSW | [product-bakuchiol-30000.html](../product-bakuchiol-30000.html) |
| [P03](#product-pdrn-25) | CELDYQUE PDRN 250,000ppm Concentrate | 30 ml / 1 fl oz | B0FMFBGW9N | [product-pdrn-25.html](../product-pdrn-25.html) |
| [P04](#product-pdrn-12-egf) | CELDYQUE PDRN 12% + EGF Peptide Serum | 30 ml / 1 fl oz | B0F1Y8DML3 | [product-pdrn-12-egf.html](../product-pdrn-12-egf.html) |
| [P05](#product-pdrn-12-egf-cream) | CELDYQUE PDRN 12% + EGF Peptide Cream | 50 ml / 1.7 fl oz | B0FJY6SCPX | [product-pdrn-12-egf-cream.html](../product-pdrn-12-egf-cream.html) |
| [P06](#product-arbutxa-glow-cream) | CELDYQUE ArbutXA Glow Cream | 50 ml / 1.7 fl oz | B0FWBM5SR8 | [product-arbutxa-glow-cream.html](../product-arbutxa-glow-cream.html) |
| [P07](#product-gentle-cleanser) | CELDYQUE Gentle Cleanser Purifying Touch | 150 ml / 5.07 fl oz | B0FGPXK14C | [product-gentle-cleanser.html](../product-gentle-cleanser.html) |
| [P08](#product-cleansing-oil) | CELDYQUE Pore Purifying Cleansing Oil | 200 ml / 6.76 fl oz | B0FKM689SK | [product-cleansing-oil.html](../product-cleansing-oil.html) |
| [P09](#product-glutathione-30000) | CELDYQUE Glutathione Glow Serum 30,000 ppm | 30 ml / 1 fl oz | B0DP4FG8B9 | [product-glutathione-30000.html](../product-glutathione-30000.html) |
| [P10](#product-azelaic-12) | CELDYQUE Azelaic Acid 12% Topical Serum | 30 ml / 1 fl oz | B0DP4FQPDL | [product-azelaic-12.html](../product-azelaic-12.html) |
| [P11](#product-niacinamide-20-advanced) | CELDYQUE Niacinamide 20% Pore Minimizer Serum | 30 ml / 1 fl oz | B0C2PH12CR | [product-niacinamide-20-advanced.html](../product-niacinamide-20-advanced.html) |
| [P12](#product-9-peptide-scalp-serum) | CELDYQUE 9-Peptide Scalp Care Serum Roll-On | 40 ml / 1.35 fl oz | B0GGZRNGKL | [product-9-peptide-scalp-serum.html](../product-9-peptide-scalp-serum.html) |
| [P13](#product-bakuchiol-volume-collagen-cream) | CELDYQUE Bakuchiol Volume Collagen Cream | 50 ml / 1.7 fl oz | B0GXV5RJX5 | [product-bakuchiol-volume-collagen-cream.html](../product-bakuchiol-volume-collagen-cream.html) |
| [P14](#product-blue-copper-peptide-bakuchiol-serum) | CELDYQUE Blue Copper Peptide Bakuchiol Serum | 30 ml / 1.01 fl oz | B0H6DCQPN8 | [product-blue-copper-peptide-bakuchiol-serum.html](../product-blue-copper-peptide-bakuchiol-serum.html) |

<a id="product-volufiline-100"></a>

### P01. CELDYQUÉ Volufiline 100% Concentrate

- 원본: [product-volufiline-100.html](../product-volufiline-100.html)
- H1: Volufiline 100% Concentrate
- 현재 검색용 이름 / 부제: Volufiline 100% Concentrate / Firming & Volumizing
- 현재 분류 / 용량 / ASIN: Face Serum / 10 ml / 0.33 fl oz / B0CPLDVTFP
- 현재 대표 URL: https://celdyque.com/product-volufiline-100.html
- 별도 확인 초점: 100%의 정의, Sederma 원료 사용·출처, INCI, 혼합 1–2방울 지침을 원본으로 확인. 순수 단일 활성 성분 100%라고 자동 해석하지 않는다.

**현재 제품 요약(원문)**

> A minimalist oil-based skincare booster made with original Volufiline raw material from Sederma, France. Designed to be mixed with cream, lotion or serum for targeted firmness and fuller-looking skin care.

**현재 주요 성분·제형·주의 문구(원문)**

> Ingredients Minimalist Oil-Based Formula Original Volufiline™ raw material from Sederma, France in a concentrated oil-based format. For the complete and most current ingredient declaration, refer to the INCI list printed on the product packaging. Texture: Oil-type concentrate. For comfortable application and spreadability, mixing 1–2 drops with cream, lotion or compatible serum is recommended. Caution: For external use only. Avoid direct contact with eyes. Patch test before first use. Discontinue use if persistent irritation occurs. Keep out of reach of children.

**현재 사용법(원문)**

> How to Use Volufiline 100% Think of it as a concentrated booster rather than another step you need to add to your routine. 1 Drop Dispense 1–2 drops of Volufiline 100% Concentrate into your palm. 2 Mix Mix with your usual cream, moisturizer, lotion or compatible serum. 3 Apply Smooth the mixture onto areas where you want focused firmness and fuller-looking skin care. YOUR FAVORITE CREAM + 1–2 DROPS OF VOLUFILINE = YOUR CUSTOMIZED ROUTINE

**제품 FAQ 원문**

- **What is Volufiline?**
  - Volufiline is a cosmetic ingredient developed by Sederma, France. CELDYQUÉ uses the original Volufiline raw material in an oil-based concentrated booster designed for targeted firmness and fuller-looking skin care.
- **What does Volufiline 100% mean?**
  - CELDYQUÉ Volufiline 100% refers to using the original Volufiline raw material as the concentrated formula rather than diluting it into a conventional water-based serum base. It does not mean 100% pure sarsasapogenin.
- **How do I use CELDYQUÉ Volufiline 100% Concentrate?**
  - Add 1–2 drops of CELDYQUÉ Volufiline 100% Concentrate to your usual cream, lotion or serum, mix in your palm, and apply to areas where you want focused firmness care.
- **Can I mix Volufiline with moisturizer or serum?**
  - Yes. CELDYQUÉ Volufiline 100% Concentrate is specifically suited to customized mixing. Add 1–2 drops to your usual moisturizer, cream or compatible serum before application.
- **Is CELDYQUÉ Volufiline from France?**
  - The original Volufiline raw material used by CELDYQUÉ is supplied by Sederma, France. CELDYQUÉ then uses this ingredient to create the finished cosmetic product.

**페이지에 저장된 설명 항목**

Volufiline™ from Sederma, France. → Concentrated by design. → How to Use Volufiline 100% → Where can you use Volufiline? → Simple formula. Flexible routine. → Frequently Asked Questions → Ingredients → Try CELDYQUÉ Volufiline 100%.

**제품 구매 링크**

- [Shop on Amazon →](https://www.amazon.com/CELDYQUE-100-Volufiline-Concentrate-Serum/dp/B0CPLDVTFP?maas=maas_adg_7982F2D6742712787939772A0788E56D_afap_abs&ref_=aa_maas&tag=maas&th=1)

본문 전체, 이미지 설명, 페이지 내 기타 링크는 부록 A에서 확인한다.


<a id="product-bakuchiol-30000"></a>

### P02. CELDYQUE Bakuchiol 30,000ppm Serum

- 원본: [product-bakuchiol-30000.html](../product-bakuchiol-30000.html)
- H1: Bakuchiol 30,000ppm Serum
- 현재 검색용 이름 / 부제: Bakuchiol 30,000ppm Serum / Retinol-alternative
- 현재 분류 / 용량 / ASIN: Face Serum / 30 ml / 1 fl oz / B0DC6H8MSW
- 현재 대표 URL: https://celdyque.com/product-bakuchiol-30000.html
- 별도 확인 초점: 30,000 ppm의 기준과 혼합 권장 지침, Vegan·Cruelty-Free·무첨가 표현의 근거를 확인한다.

**현재 제품 요약(원문)**

> CELDYQUE Bakuchiol 30,000ppm Serum is a high-potency retinol-alternative mix-in serum with Bakuchiol, Butylene Glycol and a minimalist formula for customized firm-looking and smooth-looking care.

**현재 주요 성분·제형·주의 문구(원문)**

> Key Ingredients Bakuchiol · Minimalist Mix-In Serum Mix-In Vegan Cruelty-Free Retinol Alternative Key Ingredients: Bakuchiol 30,000 ppm, Butylene Glycol, Water and 1,2-Hexanediol. Free From: Parabens, sulfates and synthetic fragrances. Note: The original page recommends mixing with moisturizer because of the high concentration. Refer to the product packaging for the complete and most current ingredient list. For external use only. Avoid direct contact with the eyes. Perform a patch test before first use. Discontinue use if persistent irritation occurs. Keep out of reach of children.

**현재 사용법(원문)**

> How to Use 1 Dose Add 1-2 drops to moisturizer, cream or compatible serum. 2 Mix Blend in your palm before applying. 3 Apply Smooth over face and neck. Use sunscreen in the morning. Because it is concentrated, start slowly and patch test before first use.

**제품 FAQ 원문**

- **What is Bakuchiol 30,000ppm Serum?**
  - It is a concentrated Bakuchiol mix-in serum positioned as a retinol-alternative skincare booster.
- **Should I use it alone?**
  - The original page recommends mixing it with moisturizer or compatible skincare due to the high concentration.
- **Can I use it during the day?**
  - Use as tolerated and apply sunscreen in the morning.

**페이지에 저장된 설명 항목**

A concentrated retinol-alternative booster. → Designed around visible skincare results. → Bakuchiol Booster Architecture → How to Use → Frequently Asked Questions → Try CELDYQUE Bakuchiol 30,000ppm Serum.

**제품 구매 링크**

- [Shop on Amazon →](https://www.amazon.com/Korean-Bakuchiol-Concentrate-Mix-Serum/dp/B0DC6H8MSW?maas=maas_adg_CF21960666737CC63E9003F20D927B2C_afap_abs&ref_=aa_maas&tag=maas&th=1)

본문 전체, 이미지 설명, 페이지 내 기타 링크는 부록 A에서 확인한다.


<a id="product-pdrn-25"></a>

### P03. CELDYQUE PDRN 250,000ppm Concentrate

- 원본: [product-pdrn-25.html](../product-pdrn-25.html)
- H1: PDRN 250,000ppm Concentrate
- 현재 검색용 이름 / 부제: PDRN 25% Concentrate / Skin Regeneration
- 현재 분류 / 용량 / ASIN: Face Serum / 30 ml / 1 fl oz / B0FMFBGW9N
- 현재 대표 URL: https://celdyque.com/product-pdrn-25.html
- 별도 확인 초점: 25%/250,000 ppm이 무엇을 뜻하는지 제조 자료로 확인. 제품명·본문·FAQ·검색 부제의 표현을 함께 검토한다.

**현재 제품 요약(원문)**

> CELDYQUE PDRN 25% Concentrate features 250,000 ppm Sodium DNA PDRN with EGF peptide, Panthenol and hydration support in a lightweight booster for elastic-looking, dewy-looking skin.

**현재 주요 성분·제형·주의 문구(원문)**

> Key Ingredients PDRN · EGF · Peptides · Panthenol Booster Fast-Absorbing Mix-In High PDRN Key Ingredients: Sodium DNA / PDRN 250,000 ppm, rh-Oligopeptide-1 / EGF, Panthenol, Water, Propylene Glycol, Butylene Glycol and moisturizing support ingredients. Benefits: Elasticity boost, deep hydration, barrier support and glow enhancement. Texture: Lightweight, fast-absorbing liquid type. Refer to the product packaging for the complete and most current ingredient list. For external use only. Avoid direct contact with the eyes. Perform a patch test before first use. Discontinue use if persistent irritation occurs. Keep out of reach of children.

**현재 사용법(원문)**

> How to Use 1 Apply Use after cleansing and toning on clean skin. 2 Boost Apply a few drops directly or mix with compatible serum or cream. 3 Seal Follow with moisturizer. Use sunscreen in the morning. Introduce gradually if your skin is new to concentrated active formulas.

**제품 FAQ 원문**

- **What does PDRN 25% mean?**
  - It refers to the page's 250,000 ppm PDRN positioning in a concentrated skincare booster.
- **Can I mix it with cream?**
  - Yes. The product is positioned as a booster that can be mixed with compatible serum or cream.
- **When should I use it?**
  - Use after cleansing and toning, then follow with moisturizer.

**페이지에 저장된 설명 항목**

A concentrated booster for elastic-looking glow. → Designed around visible skincare results. → PDRN Booster Architecture → How to Use → Frequently Asked Questions → Try CELDYQUE PDRN 250,000ppm Concentrate.

**제품 구매 링크**

- [Shop on Amazon →](https://www.amazon.com/Salmon-PDRN-Concentrate-Skincare-Booster/dp/B0FMFBGW9N?maas=maas_adg_423AC43EAAC0FDA7535EF6FE63667104_afap_abs&ref_=aa_maas&tag=maas&th=1)

본문 전체, 이미지 설명, 페이지 내 기타 링크는 부록 A에서 확인한다.


<a id="product-pdrn-12-egf"></a>

### P04. CELDYQUE PDRN 12% + EGF Peptide Serum

- 원본: [product-pdrn-12-egf.html](../product-pdrn-12-egf.html)
- H1: PDRN 12% + EGF Peptide Serum
- 현재 검색용 이름 / 부제: PDRN 12% + EGF Peptide Serum / Total Anti-aging
- 현재 분류 / 용량 / ASIN: Face Serum / 30 ml / 1 fl oz / B0F1Y8DML3
- 현재 대표 URL: https://celdyque.com/product-pdrn-12-egf.html
- 별도 확인 초점: PDRN complex와 PDRN 자체 표기를 분리 검토. phyto PDRN·liposome·시술 후 관련 표현도 확인한다.

**현재 제품 요약(원문)**

> CELDYQUE PDRN 12% + EGF Peptide Serum combines 120,000 ppm PDRN complex, EGF, peptides, Volufiline, Niacinamide, Ceramide, Panthenol and Hyaluronic Acid for Korean booster-style skincare.

**현재 주요 성분·제형·주의 문구(원문)**

> Key Ingredients PDRN · EGF · Volufiline · Peptides PDRN 12% EGF Volufiline Liposome Key Ingredients: PDRN 120,000 ppm, Sodium DNA, phyto PDRN, Niacinamide 20,000 ppm, Volufiline, EGF, Acetyl Hexapeptide-8, Ceramide, Panthenol and Hyaluronic Acid Complex. Technology: Liposome encapsulation for an elegant serum delivery story. Texture: Lightweight, non-sticky and fast-absorbing. Refer to the product packaging for the complete and most current ingredient list. For external use only. Avoid direct contact with the eyes. Perform a patch test before first use. Discontinue use if persistent irritation occurs. Keep out of reach of children.

**현재 사용법(원문)**

> How to Use 1 Prep Use after cleansing and toner. 2 Apply Apply 2-3 drops over the face or targeted areas. 3 Layer Follow with cream. Use sunscreen in the morning. For microneedling-style routines, follow professional guidance and use only on skin that is ready for topical skincare.

**제품 FAQ 원문**

- **What is PDRN 12% + EGF Peptide Serum?**
  - It is a Korean booster-style serum centered on PDRN, EGF, peptides and Volufiline for firm-looking, hydrated, radiant-looking care.
- **Can I use it every day?**
  - Yes, introduce gradually and use as tolerated before moisturizer.
- **Does it replace moisturizer?**
  - No. Apply it as a serum step and follow with cream or moisturizer.

**페이지에 저장된 설명 항목**

A Korean booster serum for bounce and glow. → Designed around visible skincare results. → PDRN + Peptide Architecture → How to Use → Frequently Asked Questions → Try CELDYQUE PDRN 12% + EGF Peptide Serum.

**제품 구매 링크**

- [Shop on Amazon →](https://www.amazon.com/Salmon-Peptide-Microneedling-Volufiline-Growth/dp/B0F1Y8DML3?maas=maas_adg_650A715F4856800A04724A06656CFF91_afap_abs&ref_=aa_maas&tag=maas&th=1)

본문 전체, 이미지 설명, 페이지 내 기타 링크는 부록 A에서 확인한다.


<a id="product-pdrn-12-egf-cream"></a>

### P05. CELDYQUE PDRN 12% + EGF Peptide Cream

- 원본: [product-pdrn-12-egf-cream.html](../product-pdrn-12-egf-cream.html)
- H1: PDRN 12% + EGF Peptide Cream
- 현재 검색용 이름 / 부제: PDRN 12% + EGF Peptide Cream / Deep Moisturizing
- 현재 분류 / 용량 / ASIN: Cream / 50 ml / 1.7 fl oz / B0FJY6SCPX
- 현재 대표 URL: https://celdyque.com/product-pdrn-12-egf-cream.html
- 별도 확인 초점: 12%의 정확한 의미, 전성분, 세럼과의 차이, 시술 후·민감 피부 관련 표현을 확인한다.

**현재 제품 요약(원문)**

> CELDYQUE PDRN 12% + EGF Peptide Cream combines Sodium DNA PDRN, Volufiline, Niacinamide, EGF, Ceramide, Panthenol, Hyaluronic Acid, Jojoba Seed Oil and Squalane for soothing barrier and firm-looking care.

**현재 주요 성분·제형·주의 문구(원문)**

> Key Ingredients PDRN · EGF · Volufiline · Barrier Cream Barrier Cream Non-Greasy PDRN 12% EGF Key Ingredients: Sodium DNA / PDRN, Volufiline, Niacinamide, Ceramide NP, Panthenol, Hyaluronic Acid, sh-Oligopeptide-1 / EGF, Jojoba Seed Oil and Squalane. Benefits: Deep hydration, barrier support, elasticity care and soothing comfort. Texture: Silky, lightweight cream that absorbs quickly without greasiness. Refer to the product packaging for the complete and most current ingredient list. For external use only. Avoid direct contact with the eyes. Perform a patch test before first use. Discontinue use if persistent irritation occurs. Keep out of reach of children.

**현재 사용법(원문)**

> How to Use 1 Apply After serum, apply a moderate amount to the face and neck. 2 Target Add a little extra to dry or sensitive-looking areas. 3 Protect Use as the cream step. In the morning, follow with sunscreen. Patch test before first use, especially after professional skin treatments.

**제품 FAQ 원문**

- **Who is PDRN 12% + EGF Peptide Cream for?**
  - It is for routines focused on hydration, barrier comfort and firm-looking care.
- **Can I pair it with the PDRN serum?**
  - Yes. Apply serum first, then use this as the cream step.
- **Is it greasy?**
  - It is positioned as a lightweight cream with a non-greasy satin finish.

**페이지에 저장된 설명 항목**

Barrier comfort with a firm-looking finish. → Designed around visible skincare results. → PDRN Cream Architecture → How to Use → Frequently Asked Questions → Try CELDYQUE PDRN 12% + EGF Peptide Cream.

**제품 구매 링크**

- [Shop on Amazon →](https://www.amazon.com/CELDYQUE-PDRN-Peptide-Cream-Microneedling/dp/B0FJY6SCPX?maas=maas_adg_216C98761617EBF7B80D255DB5F838E4_afap_abs&ref_=aa_maas&tag=maas&th=1)

본문 전체, 이미지 설명, 페이지 내 기타 링크는 부록 A에서 확인한다.


<a id="product-arbutxa-glow-cream"></a>

### P06. CELDYQUE ArbutXA Glow Cream

- 원본: [product-arbutxa-glow-cream.html](../product-arbutxa-glow-cream.html)
- H1: ArbutXA Glow Cream
- 현재 검색용 이름 / 부제: ArbutXA Glow Cream / Brightening
- 현재 분류 / 용량 / ASIN: Cream / 50 ml / 1.7 fl oz / B0FWBM5SR8
- 현재 대표 URL: https://celdyque.com/product-arbutxa-glow-cream.html
- 별도 확인 초점: Arbutin 7%·TXA 5%·Niacinamide 2% 및 Alpha-Arbutin을 구분하고 라벨과 실제 처방을 확인한다.

**현재 제품 요약(원문)**

> CELDYQUE ArbutXA Glow Cream features Arbutin 7%, Tranexamic Acid 5%, Niacinamide 2%, Alpha-Arbutin, Cica, Heartleaf, Green Tea, Hyaluronic Acid and Ceramide NP for dark spot, uneven tone and hydration care.

**현재 주요 성분·제형·주의 문구(원문)**

> Key Ingredients Arbutin · Tranexamic Acid · Niacinamide Tone Care Glow Cream Hydrating Daily Cream Key Ingredients: Arbutin 70,000 ppm, Tranexamic Acid 50,000 ppm, Niacinamide 20,000 ppm, Alpha-Arbutin, Centella Asiatica Extract, Houttuynia Cordata Extract, Green Tea Leaf Extract, Hyaluronic Acid Complex, Ceramide NP and Adenosine. Benefits: Dark spot appearance care, tone evenness, soothing support and barrier hydration. Texture: Smooth, lightweight cream that layers well under makeup. Refer to the product packaging for the complete and most current ingredient list. For external use only. Avoid direct contact with the eyes. Perform a patch test before first use. Discontinue use if persistent irritation occurs. Keep out of reach of children.

**현재 사용법(원문)**

> How to Use 1 Apply After serum, apply a moderate amount evenly across the face and neck. 2 Target Apply an extra thin layer to areas with visible dark spots or uneven-looking tone. 3 Protect Use sunscreen during the day to help prevent the look of new spots. For best results, use consistently and pair daytime use with sunscreen.

**제품 FAQ 원문**

- **What is ArbutXA Glow Cream for?**
  - It is a tone-care cream for the appearance of dark spots, uneven-looking tone and dullness.
- **Should I use sunscreen?**
  - Yes. Use sunscreen during the day, especially with tone-care routines.
- **Can I use it morning and night?**
  - Yes, use as tolerated as the cream step of your routine.

**페이지에 저장된 설명 항목**

Tone care for a visibly clearer glow. → Designed around visible skincare results. → Tone-Care Architecture → How to Use → Frequently Asked Questions → Try CELDYQUE ArbutXA Glow Cream.

**제품 구매 링크**

- [Shop on Amazon →](https://www.amazon.com/Tranexamic-Niacinamide-Intensive-Pigmentation-Uneven-Looking/dp/B0FWBM5SR8?maas=maas_adg_FD312B20E0F9A766AF64408015E6D02A_afap_abs&ref_=aa_maas&tag=maas&th=1)

본문 전체, 이미지 설명, 페이지 내 기타 링크는 부록 A에서 확인한다.


<a id="product-gentle-cleanser"></a>

### P07. CELDYQUE Gentle Cleanser Purifying Touch

- 원본: [product-gentle-cleanser.html](../product-gentle-cleanser.html)
- H1: Gentle Cleanser Purifying Touch
- 현재 검색용 이름 / 부제: Gentle Cleanser / Purifying Touch
- 현재 분류 / 용량 / ASIN: Cleanser / 150 ml / 5.07 fl oz / B0FGPXK14C
- 현재 대표 URL: https://celdyque.com/product-gentle-cleanser.html
- 별도 확인 초점: AHA/BHA/PHA 표시와 주요 성분 목록의 관계, 전체 INCI, 세정·각질 관련 표현을 확인한다.

**현재 제품 요약(원문)**

> CELDYQUE Gentle Cleanser Purifying Touch is a Korean foaming cleanser with Centella, Tea Tree, Green Tea, AHA, BHA, PHA, Sodium Hyaluronate, Collagen, Niacinamide and Allantoin for pore cleansing and sensitive-looking skin.

**현재 주요 성분·제형·주의 문구(원문)**

> Key Ingredients AHA · BHA · PHA · Centella Foaming Cleanser Pore Care Daily Wash Soft Finish Key Ingredients: Centella Asiatica Extract, Tea Tree Extract, Green Tea Leaf Powder, Sodium Cocoyl Isethionate, Glycerin, Sodium Hyaluronate, Hydrolyzed Collagen, Niacinamide and Allantoin. Benefits: Pore cleansing, exfoliation, soothing support and hydration. Formula: Lightweight foaming wash that leaves no residue. Refer to the product packaging for the complete and most current ingredient list. For external use only. Avoid direct contact with the eyes. Perform a patch test before first use. Discontinue use if persistent irritation occurs. Keep out of reach of children.

**현재 사용법(원문)**

> How to Use 1 Lather Dispense a small amount and lather with water. 2 Massage Gently massage over damp face, avoiding the eye area. 3 Rinse Rinse thoroughly and follow with toner, serum and moisturizer. Use morning and evening. Reduce frequency if your skin feels dry.

**제품 FAQ 원문**

- **Is this a foaming cleanser?**
  - Yes. It is a foaming wash for daily pore cleansing.
- **Does it contain exfoliating acids?**
  - Yes. The page positions the formula around AHA, BHA and PHA.
- **What should I use after cleansing?**
  - Follow with toner, serum and moisturizer. Use sunscreen in the morning.

**페이지에 저장된 설명 항목**

A daily cleanse that feels fresh, not stripped. → Designed around visible skincare results. → Cleanser Architecture → How to Use → Frequently Asked Questions → Try CELDYQUE Gentle Cleanser Purifying Touch.

**제품 구매 링크**

- [Shop on Amazon →](https://www.amazon.com/Exfoliant-Cleansing-Minimizer-Acne-Prone-Non-Stripping/dp/B0FGPXK14C?maas=maas_adg_FD9A03F5A5E1C2F315E98D088BF02599_afap_abs&ref_=aa_maas&tag=maas&th=1)

본문 전체, 이미지 설명, 페이지 내 기타 링크는 부록 A에서 확인한다.


<a id="product-cleansing-oil"></a>

### P08. CELDYQUE Pore Purifying Cleansing Oil

- 원본: [product-cleansing-oil.html](../product-cleansing-oil.html)
- H1: Pore Purifying Cleansing Oil
- 현재 검색용 이름 / 부제: Pore Purifying Cleansing Oil / Deep Clean
- 현재 분류 / 용량 / ASIN: Cleanser / 200 ml / 6.76 fl oz / B0FKM689SK
- 현재 대표 URL: https://celdyque.com/product-cleansing-oil.html
- 별도 확인 초점: Shop의 Heartleaf/Mugwort/Tea Tree 태그와 상세의 Soybean Oil/LHA/Green Tea 등 성분 목록을 대조. 실제 성분 부재로 단정하지 않는다.

**현재 제품 요약(원문)**

> CELDYQUE Pore Purifying Cleansing Oil is a lightweight cleansing oil with Soybean Oil, LHA, Centella, Tea Tree, Green Tea, Jojoba Seed Oil, Squalane and Panthenol for makeup removal, sunscreen cleansing and blackhead care.

**현재 주요 성분·제형·주의 문구(원문)**

> Key Ingredients LHA · Centella · Tea Tree · Cleansing Oil First Cleanse Clean Rinse LHA Pore Care Key Ingredients: Glycine Soja / Soybean Oil, Capryloyl Salicylic Acid / LHA, Centella Asiatica Extract, Tea Tree Extract, Green Tea Extract, Jojoba Seed Oil, Squalane and Panthenol. Benefits: Makeup removal, blackhead care, soothing support and balancing. Formula: Mineral oil-free, paraben-free and artificial fragrance-free positioning from the original page. Refer to the product packaging for the complete and most current ingredient list. For external use only. Avoid direct contact with the eyes. Perform a patch test before first use. Discontinue use if persistent irritation occurs. Keep out of reach of children.

**현재 사용법(원문)**

> How to Use 1 Pump Apply 2-3 pumps to dry skin with dry hands. 2 Massage Massage gently to dissolve makeup, sunscreen and impurities. 3 Emulsify Add water until milky, then rinse thoroughly. Follow with cleanser if desired. Avoid direct contact with eyes. Rinse thoroughly if contact occurs.

**제품 FAQ 원문**

- **Do I use cleansing oil on wet or dry skin?**
  - Apply it to dry skin first, massage, then add water to emulsify before rinsing.
- **Can it remove sunscreen?**
  - Yes. It is designed as a first-cleanse step for sunscreen, makeup and oil-based buildup.
- **Should I double cleanse?**
  - You can follow with a foaming cleanser if desired.

**페이지에 저장된 설명 항목**

Melt makeup and sunscreen, then rinse clean. → Designed around visible skincare results. → Cleansing Oil Architecture → How to Use → Frequently Asked Questions → Try CELDYQUE Pore Purifying Cleansing Oil.

**제품 구매 링크**

- [Shop on Amazon →](https://www.amazon.com/Cleansing-Lightweight-Blackheads-Waterproof-Acne-Prone/dp/B0FKM689SK?maas=maas_adg_8CC3CBC6AC803453B28CA24D0B64DD83_afap_abs&ref_=aa_maas&tag=maas&th=1)

본문 전체, 이미지 설명, 페이지 내 기타 링크는 부록 A에서 확인한다.


<a id="product-glutathione-30000"></a>

### P09. CELDYQUE Glutathione Glow Serum 30,000 ppm

- 원본: [product-glutathione-30000.html](../product-glutathione-30000.html)
- H1: Glutathione Glow Serum 30,000 ppm
- 현재 검색용 이름 / 부제: Glutathione 30,000ppm / Antioxidant serum · Glow support
- 현재 분류 / 용량 / ASIN: Face Serum / 30 ml / 1 fl oz / B0DP4FG8B9
- 현재 대표 URL: https://celdyque.com/product-glutathione-30000.html
- 별도 확인 초점: 30,000 ppm 및 주요 성분·밝기 관련 표현의 근거 확인. 제목·검색 이름에 Glow/Serum 표기를 정리한다.

**현재 제품 요약(원문)**

> CELDYQUE Glutathione Glow Serum 30,000 ppm combines Glutathione, Niacinamide, Resveratrol, 5-type Hyaluronic Acid, Ceramide NP, Panthenol and botanical proteins for radiance, dark spot appearance and hydration care.

**현재 주요 성분·제형·주의 문구(원문)**

> Key Ingredients Glutathione · Niacinamide · Resveratrol Glow Serum Hydrating Dewy Finish Tone Care Key Ingredients: Glutathione 30,000 ppm, Niacinamide, 5-type Hyaluronic Acid Complex, Ceramide NP, Panthenol, Resveratrol and Hydrolyzed Vegetable Proteins. Benefits: Bright-looking radiance, even-looking tone, hydration and soothing support. Texture: Lightweight, fast-absorbing serum that leaves a dewy finish. Refer to the product packaging for the complete and most current ingredient list. For external use only. Avoid direct contact with the eyes. Perform a patch test before first use. Discontinue use if persistent irritation occurs. Keep out of reach of children.

**현재 사용법(원문)**

> How to Use 1 Apply After cleansing and toning, apply 2-3 drops to the face. 2 Pat Gently pat until absorbed. 3 Layer Follow with moisturizer and use sunscreen in the morning. Use consistently for best visible radiance results.

**제품 FAQ 원문**

- **What is Glutathione Glow Serum for?**
  - It is a radiance serum for bright-looking, even-looking, hydrated skin.
- **Can I use it daily?**
  - Yes. Use morning or evening as tolerated.
- **Should I use sunscreen?**
  - Yes. Sunscreen helps support tone-care routines during the day.

**페이지에 저장된 설명 항목**

A glow serum for brighter-looking, even-looking skin. → Designed around visible skincare results. → Glow Serum Architecture → How to Use → Frequently Asked Questions → Try CELDYQUE Glutathione Glow Serum 30,000 ppm.

**제품 구매 링크**

- [Shop on Amazon →](https://www.amazon.com/Glutathione-Serum-Spots-Uneven-Radiance-Boosting/dp/B0DP4FG8B9?maas=maas_adg_D93AB1E59E3F992E567F61E5457CA82B_afap_abs&ref_=aa_maas&tag=maas&th=1)

본문 전체, 이미지 설명, 페이지 내 기타 링크는 부록 A에서 확인한다.


<a id="product-azelaic-12"></a>

### P10. CELDYQUE Azelaic Acid 12% Topical Serum

- 원본: [product-azelaic-12.html](../product-azelaic-12.html)
- H1: Azelaic Acid 12% Topical Serum
- 현재 검색용 이름 / 부제: Azelaic Acid 12% / Clarity serum · Tone & texture
- 현재 분류 / 용량 / ASIN: Face Serum / 30 ml / 1 fl oz / B0DP4FQPDL
- 현재 대표 URL: https://celdyque.com/product-azelaic-12.html
- 별도 확인 초점: 12%의 의미와 전체 산 성분 처방·사용 지침 확인. 제품 설명과 공통 FAQ의 화장품 범위가 맞는지 검토한다.

**현재 제품 요약(원문)**

> CELDYQUE Azelaic Acid 12% Serum combines Azelaic Acid, Salicylic Acid, Tranexamic Acid, Niacinamide, Centella, Panthenol, Ceramide, Hyaluronic Acid and a Vitamin C derivative for redness appearance, acne-prone and dark spot care.

**현재 주요 성분·제형·주의 문구(원문)**

> Key Ingredients Azelaic Acid · BHA · TXA · Cica Redness Care BHA Tone Care Lightweight Key Ingredients: Azelaic Acid 12%, Tranexamic Acid, Salicylic Acid, Niacinamide, Centella Asiatica Extract, Panthenol, Ceramide NP, Hyaluronic Acid and a Vitamin C derivative. Benefits: Redness appearance care, acne-prone routine support, spot fading appearance and even-looking tone. Texture: Lightweight, non-greasy serum that layers well under makeup. Refer to the product packaging for the complete and most current ingredient list. For external use only. Avoid direct contact with the eyes. Perform a patch test before first use. Discontinue use if persistent irritation occurs. Keep out of reach of children.

**현재 사용법(원문)**

> How to Use 1 Apply After toner, apply a thin layer to the face or targeted areas. 2 Moisturize Follow with a gentle moisturizer. 3 Protect Use sunscreen during the day. Introduce gradually if your skin is new to acids or high-active serums.

**제품 FAQ 원문**

- **What is Azelaic Acid 12% Serum for?**
  - It is for redness appearance, clogged-pore routines and uneven-looking tone.
- **Can I use it with moisturizer?**
  - Yes. Apply serum first, then moisturize.
- **Should I use it every day?**
  - Introduce gradually and increase frequency as tolerated.

**페이지에 저장된 설명 항목**

Calm-looking clarity for uneven, breakout-prone skin. → Designed around visible skincare results. → Azelaic Serum Architecture → How to Use → Frequently Asked Questions → Try CELDYQUE Azelaic Acid 12% Topical Serum.

**제품 구매 링크**

- [Shop on Amazon →](https://www.amazon.com/Azelaic-Acid-Facial-Serum-Niacinamide/dp/B0DP4FQPDL?maas=maas_adg_ADF10714365CF9D97EE4BBD33BD084E3_afap_abs&ref_=aa_maas&tag=maas&th=1)

본문 전체, 이미지 설명, 페이지 내 기타 링크는 부록 A에서 확인한다.


<a id="product-niacinamide-20-advanced"></a>

### P11. CELDYQUE Niacinamide 20% Pore Minimizer Serum

- 원본: [product-niacinamide-20-advanced.html](../product-niacinamide-20-advanced.html)
- H1: Niacinamide 20% Pore Minimizer Serum
- 현재 검색용 이름 / 부제: Niacinamide 20% Advanced / High-strength · Tone & texture
- 현재 분류 / 용량 / ASIN: Face Serum / 30 ml / 1 fl oz / B0C2PH12CR
- 현재 대표 URL: https://celdyque.com/product-niacinamide-20-advanced.html
- 별도 확인 초점: Advanced/Pore Minimizer 공식명, 20%·장미수 63.3%·녹차 1%, EWG·Vegan·Fragrance-Free 표현을 확인한다.

**현재 제품 요약(원문)**

> CELDYQUE Niacinamide 20% Advanced Serum uses a 63.3% Rosa Damascena Flower Water base with 20% Niacinamide, Green Tea 1%, Hyaluronic Acid and Beta-Glucan for pore appearance, tone and texture care.

**현재 주요 성분·제형·주의 문구(원문)**

> Key Ingredients Niacinamide · Rose Water · Green Tea Fragrance-Free Vegan Non-Sticky Pore Serum Key Ingredients: Rosa Damascena Flower Water 63.3%, Niacinamide 20%, Glycerin, Butylene Glycol, Green Tea Leaf Extract, Hydrolyzed Sodium Hyaluronate, Beta-Glucan and supporting formula ingredients. Benefits: Pore minimizing appearance, tone evening, hydration and age-defying-looking care. Texture: Lightweight, non-sticky liquid gel with EWG green grade positioning from the original page. Refer to the product packaging for the complete and most current ingredient list. For external use only. Avoid direct contact with the eyes. Perform a patch test before first use. Discontinue use if persistent irritation occurs. Keep out of reach of children.

**현재 사용법(원문)**

> How to Use 1 Apply After cleansing and toner, apply a few drops to the face. 2 Adapt Start slowly if your skin is new to 20% Niacinamide. 3 Layer Follow with moisturizer and sunscreen in the morning. Patch test recommended because of the high 20% concentration.

**제품 FAQ 원문**

- **Is 20% Niacinamide strong?**
  - Yes. It is a high-strength niacinamide serum, so introduce gradually if your skin is new to it.
- **What is it best for?**
  - It is best positioned for pore appearance, tone, texture and hydration support.
- **Can I use it under makeup?**
  - Yes. The lightweight, non-sticky texture is designed to layer well.

**페이지에 저장된 설명 항목**

High-strength pore care with a hydrated finish. → Designed around visible skincare results. → Niacinamide Serum Architecture → How to Use → Frequently Asked Questions → Try CELDYQUE Niacinamide 20% Pore Minimizer Serum.

**제품 구매 링크**

- [Shop on Amazon →](https://www.amazon.com/Niacinamide-Concentrated-Hyaluronic-Beta-Glucan-Defying-Aging/dp/B0C2PH12CR?maas=maas_adg_9D8A330F96AA01A13A0033A6A67C5609_afap_abs&ref_=aa_maas&tag=maas&th=1)

본문 전체, 이미지 설명, 페이지 내 기타 링크는 부록 A에서 확인한다.


<a id="product-9-peptide-scalp-serum"></a>

### P12. CELDYQUE 9-Peptide Scalp Care Serum Roll-On

- 원본: [product-9-peptide-scalp-serum.html](../product-9-peptide-scalp-serum.html)
- H1: 9-Peptide Scalp Care Serum Roll-On
- 현재 검색용 이름 / 부제: 9-Peptide Scalp Serum / Rosemary 2% · Caffeine 1% · PDRN & Spicule 300
- 현재 분류 / 용량 / ASIN: Scalp Serum / 40 ml / 1.35 fl oz / B0GGZRNGKL
- 현재 대표 URL: https://celdyque.com/product-9-peptide-scalp-serum.html
- 별도 확인 초점: 로즈마리 2%·카페인 1%·Spicule 300·9-peptide 구성, 40 ml 라벨과 사용법 확인. hair growth 검색 태그와 공통 FAQ를 대조한다.

**현재 제품 요약(원문)**

> CELDYQUE 9-Peptide Scalp Care Serum Roll-On targets the scalp with Rosemary 2%, Caffeine 1%, PDRN, Spicule 300, Dexpanthenol, Biotin, Zinc PCA and a peptide complex for lightweight daily root-focused care.

**현재 주요 성분·제형·주의 문구(원문)**

> Key Ingredients Rosemary · Caffeine · PDRN · Peptides Roll-On No Rinse Non-Greasy Daily Scalp Care Key Ingredients: Rosemary Extract, Caffeine, Dexpanthenol, Sodium DNA (PDRN), Hydrolyzed Sponge / Spicule 300, Biotin, Zinc PCA and a 9-peptide complex. Benefits: Scalp care, root nourishment, hair-density support appearance and scalp purifying care. Formula: Lightweight water-base gel. Non-greasy. No rinse needed. Refer to the product packaging for the complete and most current ingredient list. For external use only. Avoid direct contact with the eyes. Perform a patch test before first use. Discontinue use if persistent irritation occurs. Keep out of reach of children.

**현재 사용법(원문)**

> How to Use 1 Part Part hair to expose the scalp area you want to target. 2 Roll Roll the applicator directly across hairline, crown or parting areas. 3 Massage Gently massage with fingertips and leave on. No rinsing needed. Use daily on dry or towel-dried scalp. Avoid applying to broken or irritated skin.

**제품 FAQ 원문**

- **How do I use the scalp serum?**
  - Part the hair, roll directly onto the target scalp area and massage lightly. It is a leave-on formula.
- **Can men and women use it?**
  - Yes. The page positions it for all scalp types, women and men.
- **Is it greasy?**
  - No. It is a lightweight, non-greasy water-base gel.

**페이지에 저장된 설명 항목**

Root-focused scalp care without the mess. → Designed around visible skincare results. → Scalp Active System → How to Use → Frequently Asked Questions → Try CELDYQUE 9-Peptide Scalp Care Serum Roll-On.

**제품 구매 링크**

- [Shop on Amazon →](https://www.amazon.com/9-Peptide-Growth-Scalp-Serum-Roll/dp/B0GGZRNGKL?maas=maas_adg_B3610BD8B3001B42E9EA2D0A7A72F58C_afap_abs&ref_=aa_maas&tag=maas&th=1)

본문 전체, 이미지 설명, 페이지 내 기타 링크는 부록 A에서 확인한다.


<a id="product-bakuchiol-volume-collagen-cream"></a>

### P13. CELDYQUE Bakuchiol Volume Collagen Cream

- 원본: [product-bakuchiol-volume-collagen-cream.html](../product-bakuchiol-volume-collagen-cream.html)
- H1: Bakuchiol Volume Collagen Cream
- 현재 검색용 이름 / 부제: Bakuchiol Volume Collagen Cream / Bakuchiol · Volufiline · Collagen
- 현재 분류 / 용량 / ASIN: Cream / 50 ml / 1.7 fl oz / B0GXV5RJX5
- 현재 대표 URL: https://celdyque.com/product-bakuchiol-volume-collagen-cream.html
- 별도 확인 초점: Bakuchiol·Volufiline·Collagen·snail mucin·EGF 구성과 제형 설명을 라벨/사양으로 확인한다.

**현재 제품 요약(원문)**

> CELDYQUE Bakuchiol Volume Collagen Cream combines Bakuchiol, Volufiline, EGF peptide, low-molecular collagen, snail mucin, Ceramide, Panthenol and Cica for firm-looking, plump-looking hydration care.

**현재 주요 성분·제형·주의 문구(원문)**

> Key Ingredients Bakuchiol · Volufiline · Collagen · Barrier Support Non-Greasy Dewy Finish Daily Cream Barrier Support Key Ingredients: Bakuchiol, Volufiline, Hydrolyzed Collagen, Snail Secretion Filtrate, EGF peptide, Hyaluronic Acid, Ceramide, Panthenol and Cica. Benefits: Firm-looking skin, plumping care, dewy hydration, barrier support and smooth texture. Texture: Silky, lightweight cream that absorbs comfortably without a greasy finish. Refer to the product packaging for the complete and most current ingredient list. For external use only. Avoid direct contact with the eyes. Perform a patch test before first use. Discontinue use if persistent irritation occurs. Keep out of reach of children.

**현재 사용법(원문)**

> How to Use 1 Apply After serum, apply a moderate amount over the face and neck. 2 Massage Smooth outward along cheeks, jawline and areas that need extra comfort. 3 Seal Use as the moisturizer step. In the morning, finish with sunscreen. Use morning and evening as the cream step of your routine.

**제품 FAQ 원문**

- **What is Bakuchiol Volume Collagen Cream best for?**
  - It is designed for people seeking a moisturizer focused on firm-looking elasticity, plump-looking hydration and barrier comfort.
- **Can I use it with serum?**
  - Yes. Apply after serum as the cream step.
- **Is it heavy?**
  - The texture is positioned as silky and lightweight with a non-greasy finish.

**페이지에 저장된 설명 항목**

A plush cream for bounce, glow and daily comfort. → Designed around visible skincare results. → Cream Architecture → How to Use → Frequently Asked Questions → Try CELDYQUE Bakuchiol Volume Collagen Cream.

**제품 구매 링크**

- [Shop on Amazon →](https://www.amazon.com/Bakuchiol-Collagen-Cream-Low-Molecular-Radiant-Looking/dp/B0GXV5RJX5?maas=maas_adg_74F8B22ED5F8F87B0ED1F1AA5B1974B5_afap_abs&ref_=aa_maas&tag=maas)

본문 전체, 이미지 설명, 페이지 내 기타 링크는 부록 A에서 확인한다.


<a id="product-blue-copper-peptide-bakuchiol-serum"></a>

### P14. CELDYQUE Blue Copper Peptide Bakuchiol Serum

- 원본: [product-blue-copper-peptide-bakuchiol-serum.html](../product-blue-copper-peptide-bakuchiol-serum.html)
- H1: Blue Copper Peptide Bakuchiol Serum
- 현재 검색용 이름 / 부제: Blue Copper Peptide Bakuchiol Serum / Multi-Peptide · Plumping & Firming
- 현재 분류 / 용량 / ASIN: Face Serum / 30 ml / 1.01 fl oz / B0H6DCQPN8
- 현재 대표 URL: https://celdyque.com/product-blue-copper-peptide-bakuchiol-serum.html
- 별도 확인 초점: 12-peptide·상표 원료·Niacinamide 2%·Fragrance-Free의 근거와 전체 INCI 확인. 30 ml/1.01 fl oz 표기 대조.

**현재 제품 요약(원문)**

> CELDYQUE Blue Copper Peptide Bakuchiol Serum pairs Copper Tripeptide-1, Bakuchiol, Matrixyl 3000, Argireline, EGF, Niacinamide and Hyaluronic Acid for lightweight firming, plumping, smoothing and hydration care.

**현재 주요 성분·제형·주의 문구(원문)**

> Key Ingredients Peptides · Hydration · Daily Firming Care Fragrance-Free Lightweight Fast-Absorbing Non-Greasy Peptide Complex: Copper Tripeptide-1 (GHK-Cu), Matrixyl 3000, Argireline / Acetyl Hexapeptide-8, EGF / sh-Oligopeptide-1, Palmitoyl Tripeptide-1, Palmitoyl Tetrapeptide-7 and additional peptides in the 12-Peptide Complex. Firming & Radiance Care: Bakuchiol, Niacinamide 2%, Adenosine, Tocopherol and Guaiazulene. Hydration Support: Hydrolyzed Hyaluronic Acid, Hydrolyzed Collagen, Beta-Glucan, Panthenol, Allantoin and Betaine. Refer to the product packaging for the complete and most current ingredient list. For external use only. Avoid direct contact with the eyes. Perform a patch test before first use. Discontinue use if persistent irritation occurs. Keep out of reach of children.

**현재 사용법(원문)**

> How to Use 1 Prep After cleansing and toning, make sure the face and neck are ready for serum application. 2 Apply Apply 2-3 drops to the face and neck. Add a small amount to visible smile-line or fine-line areas as desired. 3 Layer Gently pat until absorbed, then follow with moisturizer. Use sunscreen as the final morning step. Use morning and evening. Introduce gradually if your skin is new to active skincare ingredients.

**제품 FAQ 원문**

- **What is Blue Copper Peptide Bakuchiol Serum used for?**
  - It is a daily Korean face serum designed for the appearance of plumper, firmer, smoother and more hydrated-looking skin.
- **Can I use it morning and night?**
  - Yes. It is designed for AM and PM routines. Use sunscreen as the final step in the morning.
- **Is it fragrance-free?**
  - Yes. The formula is positioned as fragrance-free, lightweight and fast-absorbing.

**페이지에 저장된 설명 항목**

Blue peptide care for bounce and firmness. → Designed around visible skincare results. → Advanced Peptide Architecture → How to Use → Frequently Asked Questions → Try CELDYQUE Blue Copper Peptide Bakuchiol Serum.

**제품 구매 링크**

- [Shop on Amazon →](https://www.amazon.com/Copper-Peptide-Bakuchiol-Peptides-Plumping/dp/B0H6DCQPN8?maas=maas_adg_A56A81A3EC8F72AA086ACA835C80CF42_afap_abs&ref_=aa_maas&tag=maas&th=1)

본문 전체, 이미지 설명, 페이지 내 기타 링크는 부록 A에서 확인한다.

<a id="faq"></a>

## 10. 공통 FAQ 21개 — 현재 원문

공통 FAQ의 구조화 데이터에서 질문·답변 원문을 추출했다. 화면에는 주제·제품 이동 링크가 추가된다. 기존 SEO 검사는 공통 FAQ의 본문/JSON-LD 답변 일치를 확인한다.

### Q01. What does CELDYQUÉ Volufiline 100% mean?

The product uses original Volufiline raw material in an oil-based concentrate. The 100% name refers to the supplied raw material, not 100% pure sarsasapogenin. It is intended for cosmetic care of fuller-looking skin, not as an injectable filler or a medical treatment.

### Q02. How do I use Volufiline 100% Concentrate?

Mix 1-2 drops with your cream, lotion or serum in your palm, following the product directions. Do not add it to a sunscreen or to the full container of another product. Avoid direct contact with eyes and lips. Patch test before use and stop if irritation occurs.

### Q03. How soon will I see results from Volufiline?

Visible results vary with skin, routine and consistency. We do not promise a specific volume increase or a fixed results timeline for this finished product. Ingredient research is not a guarantee of the same result from an individual skincare routine.

### Q04. What is the difference between the PDRN 25% and PDRN 12% products?

The PDRN collection includes a 25% Concentrate, a 12% + EGF Peptide Serum and a 12% + EGF Peptide Cream. Compare the full formula, texture and directions on each product page. Product-name percentages alone do not establish which formula will work best for your skin.

### Q05. Should I choose the PDRN serum or cream?

The PDRN 12% + EGF Peptide Serum is a serum step, while the PDRN 12% + EGF Peptide Cream is a moisturizer step. Choose the texture that fits your existing routine and follow the directions for that formula.

### Q06. Can I use PDRN skincare after microneedling or a procedure?

These products are topical cosmetics, not injectable products or wound treatments. Do not apply to broken skin. After a procedure, ask the treating clinician when you can resume cosmetics and which products are appropriate.

### Q07. What is Blue Copper Peptide Bakuchiol Serum?

CELDYQUÉ Blue Copper Peptide Bakuchiol Serum combines copper peptide, bakuchiol and a multi-peptide formula for smoother-looking, plumper-looking skin care. The product page includes the full ingredient list, directions and precautions.

### Q08. How should I introduce Niacinamide 20% Advanced Serum?

Niacinamide 20% Advanced is a high-concentration serum. Patch test, follow its product directions and introduce it separately from other new actives so you can assess tolerance. A higher percentage is not automatically better for every skin type. Stop using it if irritation occurs.

### Q09. Can I combine Niacinamide 20% with other active products?

Compatibility depends on the complete formulas and your skin, not only the ingredient names. Introduce one new product at a time. Avoid starting several high-concentration products together, and ask a dermatologist about a routine involving prescription treatments.

### Q10. What is Azelaic Acid 12% Serum intended for?

This cosmetic serum is intended for uneven-looking tone and texture care. It is not presented as a prescription medicine or a treatment for acne or rosacea. Follow the product instructions and seek medical advice for persistent skin concerns.

### Q11. How does Bakuchiol 30,000ppm differ from the bakuchiol cream?

Bakuchiol 30,000ppm is a concentrate designed to be mixed with skincare according to its directions. Bakuchiol Volume Collagen Cream is a moisturizer with bakuchiol, Volufiline and collagen. Their textures and usage instructions differ; do not assume the concentrate should be used like a ready-to-use cream.

### Q12. Is bakuchiol skincare guaranteed safe during pregnancy or breastfeeding?

We do not claim pregnancy or breastfeeding safety for these finished formulas. Ask your healthcare professional to review the complete ingredient list before use. A plant-derived ingredient or a retinol-alternative label is not a safety guarantee.

### Q13. How do ArbutXA Glow Cream and Glutathione 30,000ppm Serum differ?

ArbutXA Glow Cream is a moisturizer with arbutin, tranexamic acid and niacinamide. Glutathione 30,000ppm is a serum for radiance and uneven-looking tone care. Compare the complete ingredient lists and choose a texture that fits your routine.

### Q14. How are Cleansing Oil and Gentle Cleanser used?

Pore Purifying Cleansing Oil is the oil-cleansing step for removing makeup and sunscreen. Gentle Cleanser is a rinse-off foaming cleanser. Follow each product page for application and rinsing directions; choose the cleansing steps that suit your needs.

### Q15. What is the 9-Peptide Scalp Serum Roll-On for?

The roll-on format is designed for targeted cosmetic scalp care. Follow the product directions for external use. We do not promise hair regrowth, DHT blocking or treatment of hair loss. Seek professional advice for sudden or persistent hair loss or scalp irritation.

### Q16. What order should I apply skincare products?

Follow the directions for each formula. A simple routine is cleanser, a suitable serum, then moisturizer. Use sunscreen as the final morning skincare step according to its own label. Concentrates may need to be mixed with a moisturizer; do not mix other skincare into sunscreen.

### Q17. Where can I check ingredients and product directions?

Each current product page lists ingredients, directions and precautions. Check your product packaging as well, because formulas and labeling can change. Contact CELDYQUÉ with your product name and batch details if you need clarification.

### Q18. What is the shelf life and how should I store my product?

Follow the expiry date, period-after-opening symbol and storage instructions printed on your own packaging. These may vary by product and batch. Keep containers closed and away from direct sunlight and excessive heat.

### Q19. Where can I buy CELDYQUÉ products?

Use the retailer links on our Where to Buy page or the Amazon link on the relevant product page. Available products, destinations, prices and delivery estimates are set by the retailer and may change.

### Q20. Does this website handle payments, shipping and returns?

This website provides product information and links to retailers. Purchases are completed with the selected retailer. Check that retailer for the current shipping, payment and return terms, and contact them about an existing order.

### Q21. How can I contact CELDYQUÉ?

Email team@celdyque.com or use our Contact page for product questions. Include the product name and, where relevant, its batch number. For delivery or return requests, contact the retailer that handled your order.

## 11. 검색 카탈로그와 동적 공통 콘텐츠

### 11.1 현재 검색 카탈로그

출처: `assets/site.js`의 `DEFAULT_CATALOG`. 아래 tags는 현재 사이트 내부 검색용 값이며 검색엔진이 받는 특별 가중치가 아니다.

| 검색 ID | 표시명 | 부제 | 태그 | 이미지 |
|---|---|---|---|---|
| volufiline-100 | Volufiline 100% Concentrate | Firming & Volumizing | volufiline, serum, 10ml | /images/제품/Mask group-1.webp |
| bakuchiol-30000 | Bakuchiol 30,000ppm Serum | Retinol-alternative | bakuchiol, serum, 30ml | /images/제품/Mask group-4.webp |
| pdrn-25 | PDRN 25% Concentrate | Skin Regeneration | pdrn, serum, 30ml | /images/제품/Mask group-3.webp |
| pdrn-12-egf | PDRN 12% + EGF Peptide Serum | Total Anti-aging | pdrn, egf peptide, volufiline, serum, 30ml | /images/제품/Mask group.webp |
| pdrn-12-egf-cream | PDRN 12% + EGF Peptide Cream | Deep Moisturizing | pdrn, egf peptide, volufiline, cream, 50ml | /images/제품/Mask group-6.webp |
| arbutxa-glow-cream | ArbutXA Glow Cream | Brightening | arbutin, txa, niacinamide, cream, 50ml | /images/제품/Mask group-5.webp |
| gentle-cleanser | Gentle Cleanser | Purifying Touch | centella, green tea, tea tree, cleanser, 150ml | /images/제품/Mask group-11.webp |
| cleansing-oil | Pore Purifying Cleansing Oil | Deep Clean | heartleaf, centella, tea tree, cleanser, 200ml | /images/제품/Mask group-9.webp |
| glutathione-30000 | Glutathione 30,000ppm | Antioxidant serum · Glow support | glutathione, niacinamide, adenosine, ceramide, serum, 30ml | /images/제품/Mask group-2.webp |
| azelaic-12 | Azelaic Acid 12% | Clarity serum · Tone & texture | azelaic acid, tranexamic acid, salicylic acid, serum, 30ml | /images/제품/Mask group-7.webp |
| niacinamide-20-advanced | Niacinamide 20% Advanced | High-strength · Tone & texture | niacinamide, hyaluronic acid, beta-glucan, serum, 30ml | /images/제품/Mask group-8.webp |
| 9-peptide-scalp-care-serum | 9-Peptide Scalp Serum | Rosemary 2% · Caffeine 1% · PDRN & Spicule 300 | 9-peptide complex, rosemary 2%, caffeine 1%, pdrn, spicule 300, scalp serum, roll-on, hair growth | /images/제품/ms13-320.webp |
| bakuchiol-volume-collagen-cream | Bakuchiol Volume Collagen Cream | Bakuchiol · Volufiline · Collagen | bakuchiol, volufiline, collagen, egf, cream, 50ml, 1.7 fl oz, firming, volume, moisturizer | /images/제품/ms14-320.webp |
| blue-copper-peptide-bakuchiol-serum | Blue Copper Peptide Bakuchiol Serum | Multi-Peptide · Plumping & Firming | celdyque, blue copper peptide, blue copper peptide serum, blue peptide serum, copper peptide, copper peptide serum, copper tripeptide-1, ghk-cu, ghk cu, ghkcu, bakuchiol, bakuchiol serum, matrixyl 3000, argireline, acetyl hexapeptide-8, 12 peptide, 12 peptides, 12-peptide complex, multi peptide serum, peptide serum, egf, sh-oligopeptide-1, smile line, smile lines, smile line serum, fine lines, firming, plumping, smoothing, skin elasticity, firming serum, plumping serum, face serum, niacinamide, hyaluronic acid, collagen, beta-glucan, 30ml, 1 fl oz, b0h6dcqpn8 | /images/제품/ms15-320.webp |

### 11.2 홈 철학 슬라이드

1. **We aim to find and provide ingredients with proven efficacy through research and clinical studies.**
   - 새로운 연구자료와 논문 등을 통해 입증된 효능 원료를 찾아 제공하고자 합니다.
   - 이미지: `/images/10.webp` / fallback `/images/10.jpg`

2. **Maximum efficacy while providing comfortable use from the customer's perspective.**
   - 최고의 효능을 유지하는 동시에 고객의 입장에서 편안한 사용감을 제공합니다.
   - 이미지: `/images/7.webp` / fallback `/images/7.jpg`

3. **We do not develop products recklessly to expand meaningless product lines.**
   - 의미없는 제품라인의 확장을 위해 무분별한 제품을 개발하지 않습니다.
   - 이미지: `/images/15.webp` / fallback `/images/15.jpg`

4. **Find yourself regaining confidence with visibly transformed skin.**
   - 눈에 보이는 변화를 통해 자신감을 되찾은 나를 발견할 수 있습니다.
   - 이미지: `/images/14.webp` / fallback `/images/14.jpg`

### 11.3 공통 헤더·푸터

**[partials/header.html](../partials/header.html)**

- `CELDYQUÉ` → /index.html
- `Products` → /shop.html
- `All` → /shop.html
- `Serum` → /shop.html?cat=serum
- `Cream` → /shop.html?cat=cream
- `Cleanser` → /shop.html?cat=cleanser
- `About` → /about.html
- `Brand Story` → /about.html
- `Coming Soon` → /coming-soon.html
- `Contact` → /contact.html
- `Store` → /store.html
- `FAQ` → /faq.html
- `Amazon` → https://www.amazon.com/stores/page/176EC99B-F37D-4FC8-BC48-E30CEC0FA252?maas=maas_adg_E856BC7BDD5C52C4C8DD6D3C8EFCB0D8_afap_abs&ref_=aa_maas&tag=maas&ingress=3
- `TikTok Shop` → https://www.tiktok.com/@celdyque
- `YesStyle` → https://www.yesstyle.com/en/celdyque/list.html/bpt.299_bid.331400
- `Stylevana` → https://www.stylevana.com/en_US/brands/celdyque.html

**[partials/footer.html](../partials/footer.html)**

- CELDYQUÉ constantly researches optimal concentrations and true efficacy so that your skin can always remain in its perfect state.
- Support Hours: 10 AM - 5 PM (KST)
- © 2024 CELDYQUE. All Rights Reserved.
- `All` → /shop.html
- `Serum` → /shop.html?cat=serum
- `Cream` → /shop.html?cat=cream
- `Cleanser` → /shop.html?cat=cleanser
- `Brand Story` → /about.html
- `Coming Soon` → /coming-soon.html
- `Contact` → /contact.html
- `Stores` → /store.html
- `FAQ` → /faq.html
- `team@celdyque.com` → mailto:team@celdyque.com

### 11.4 분석 동의 UI

`assets/analytics.js`가 방문 분석 안내와 Decline / Allow analytics 선택지를 생성한다. 선택은 180일 보관하고 푸터 Analytics settings에서 변경한다. HTTPS의 celdyque.com 및 www.celdyque.com에서 동의한 경우만 GTM을 삽입한다. 광고 관련 동의는 거부 상태다. 이 기능은 상품 설명과 별개의 운영 콘텐츠이며 새 디자인에서 유지해야 한다.

- Analytics cookies
- Allow Google Analytics to measure visits and product interest? Optional analytics stays off unless you allow it.
- With your permission, Google Analytics uses cookies to measure page views, traffic sources, device information and outbound link clicks. Advertising consent stays off.
- Your choice is stored in this browser for 180 days. You can change it using Analytics settings in the footer. Declining does not prevent browsing or shopping.
- Amazon links open an external store and include Amazon Attribution parameters. Amazon handles its own cookies and purchases. These settings control this website's Google Analytics only.
- How Google uses data | Contact CELDYQUE
- Details

## 12. 전체 HTML 메타데이터·공개 상태 목록

| 파일 | 사이트맵 | canonical | robots | 최상위 JSON-LD 유형 |
|---|---|---|---|---|
| [about.html](../about.html) | 포함 | https://celdyque.com/about.html | index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1 | Organization, WebSite, AboutPage, BreadcrumbList |
| [brand-film.html](../brand-film.html) | 포함 | https://celdyque.com/brand-film.html | index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1 | WebPage, ImageObject, Organization, WebSite, BreadcrumbList |
| [coming-soon.html](../coming-soon.html) | 제외 | 없음 | 미지정 | 없음 |
| [contact.html](../contact.html) | 포함 | https://celdyque.com/contact.html | index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1 | Organization, WebSite, ContactPage, BreadcrumbList |
| [faq.html](../faq.html) | 포함 | https://celdyque.com/faq.html | index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1 | Organization, WebSite, FAQPage, BreadcrumbList |
| [index.html](../index.html) | 포함 | https://celdyque.com/ | index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1 | Organization, WebSite, WebPage, ItemList |
| [product-9-peptide-scalp-serum.html](../product-9-peptide-scalp-serum.html) | 포함 | https://celdyque.com/product-9-peptide-scalp-serum.html | index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1 | Organization, WebSite, ImageObject, Product, WebPage, BreadcrumbList, FAQPage |
| [product-advanced-retinol-pro-retinal-serum-0-5.html](../product-advanced-retinol-pro-retinal-serum-0-5.html) | 제외 | 없음 | 미지정 | 없음 |
| [product-arbutxa-glow-cream.html](../product-arbutxa-glow-cream.html) | 포함 | https://celdyque.com/product-arbutxa-glow-cream.html | index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1 | Organization, WebSite, ImageObject, Product, WebPage, BreadcrumbList, FAQPage |
| [product-azelaic-12.html](../product-azelaic-12.html) | 포함 | https://celdyque.com/product-azelaic-12.html | index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1 | Organization, WebSite, ImageObject, Product, WebPage, BreadcrumbList, FAQPage |
| [product-bakuchiol-30000.html](../product-bakuchiol-30000.html) | 포함 | https://celdyque.com/product-bakuchiol-30000.html | index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1 | Organization, WebSite, ImageObject, Product, WebPage, BreadcrumbList, FAQPage |
| [product-bakuchiol-volume-collagen-cream.html](../product-bakuchiol-volume-collagen-cream.html) | 포함 | https://celdyque.com/product-bakuchiol-volume-collagen-cream.html | index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1 | Organization, WebSite, ImageObject, Product, WebPage, BreadcrumbList, FAQPage |
| [product-blue-copper-peptide-bakuchiol-serum.html](../product-blue-copper-peptide-bakuchiol-serum.html) | 포함 | https://celdyque.com/product-blue-copper-peptide-bakuchiol-serum.html | index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1 | Organization, WebSite, ImageObject, Product, WebPage, BreadcrumbList, FAQPage |
| [product-cleansing-oil.html](../product-cleansing-oil.html) | 포함 | https://celdyque.com/product-cleansing-oil.html | index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1 | Organization, WebSite, ImageObject, Product, WebPage, BreadcrumbList, FAQPage |
| [product-detail.html](../product-detail.html) | 제외 | https://celdyque.com/product-volufiline-100.html | 미지정 | 없음 |
| [product-gentle-cleanser.html](../product-gentle-cleanser.html) | 포함 | https://celdyque.com/product-gentle-cleanser.html | index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1 | Organization, WebSite, ImageObject, Product, WebPage, BreadcrumbList, FAQPage |
| [product-glutathione-30000.html](../product-glutathione-30000.html) | 포함 | https://celdyque.com/product-glutathione-30000.html | index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1 | Organization, WebSite, ImageObject, Product, WebPage, BreadcrumbList, FAQPage |
| [product-niacinamide-20-advanced.html](../product-niacinamide-20-advanced.html) | 포함 | https://celdyque.com/product-niacinamide-20-advanced.html | index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1 | Organization, WebSite, ImageObject, Product, WebPage, BreadcrumbList, FAQPage |
| [product-pdrn-12-egf-cream.html](../product-pdrn-12-egf-cream.html) | 포함 | https://celdyque.com/product-pdrn-12-egf-cream.html | index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1 | Organization, WebSite, ImageObject, Product, WebPage, BreadcrumbList, FAQPage |
| [product-pdrn-12-egf.html](../product-pdrn-12-egf.html) | 포함 | https://celdyque.com/product-pdrn-12-egf.html | index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1 | Organization, WebSite, ImageObject, Product, WebPage, BreadcrumbList, FAQPage |
| [product-pdrn-25.html](../product-pdrn-25.html) | 포함 | https://celdyque.com/product-pdrn-25.html | index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1 | Organization, WebSite, ImageObject, Product, WebPage, BreadcrumbList, FAQPage |
| [product-volufiline-100.html](../product-volufiline-100.html) | 포함 | https://celdyque.com/product-volufiline-100.html | index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1 | Organization, WebSite, ImageObject, Product, WebPage, BreadcrumbList, FAQPage |
| [shop.html](../shop.html) | 포함 | https://celdyque.com/shop.html | index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1 | Organization, WebSite, CollectionPage, BreadcrumbList, ItemList |
| [store.html](../store.html) | 포함 | https://celdyque.com/store.html | index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1 | Organization, WebSite, WebPage, BreadcrumbList, ItemList |
| [tiktok-callback.html](../tiktok-callback.html) | 제외 | 없음 | noindex, follow | 없음 |
| [임시.html](../%EC%9E%84%EC%8B%9C.html) | 제외 | 없음 | noindex, follow | 없음 |

`product-detail.html`의 canonical 목적지가 사이트맵에 있다는 것과 이 이전 URL 자체가 사이트맵에 포함됐다는 것은 다르다. 위 표는 각 파일의 실제 URL을 기준으로 집계했다.

<a id="archive"></a>

## 부록 A. 전체 26페이지 HTML 본문·링크·이미지 설명 기록

변경 전 원문 보존용이다. 각 페이지를 펼쳐볼 수 있다. 코드·스타일·SVG·공통 메뉴 마운트·HTML 주석은 본문에서 제외하고 공백을 정리했다. 접혀 있거나 CSS로 숨겨진 정적 HTML 문구도 포함될 수 있다. 각 문구의 브라우저상 노출 여부를 모두 확인한 기록은 아니다. 이미지 내부 글자·영상 속 글자와 JavaScript 계산 결과는 자동 추출에 포함되지 않는다. 홈 슬라이드·검색·분석 동의는 11절에 별도 기록했다.

<details>
<summary>about.html — Brand Story | CELDYQUÉ Korean Skincare</summary>


원본: [about.html](../about.html)

**메타 설명**

Meet CELDYQUÉ, a Korean skincare brand focused on ingredient-led formulas. Explore our approach to product development, skincare and everyday routines.

**현재 본문 텍스트**

```text
Brand Story
CELDYQUÉ from around the world
We strive to find the perfect balance for each product to achieve optimal efficacy.
CELDYQUÉ constantly researches optimal concentrations and true efficacy so that your skin can always remain in its perfect state. Our mission is not to chase trends, but to persistently research each ingredient to find the perfect formula.
Watch the brand film
Your browser does not support the video tag.
We strive to find the perfect balance for each product to achieve optimal efficacy.
We aim to find and provide raw materials with proven efficacy through new research data and papers. Our research involves diligently studying clinical data to identify the exact concentration at which each active ingredient performs best.
Our Philosophy
Celdyque의 철학은 단순합니다.
1st Step
We aim to find and provide ingredients with proven efficacy through research.
새로운 연구자료와 논문을 통해 입증된 효능 원료를 찾아 제공합니다.
2nd Step
Maximum efficacy while providing comfortable use from the customer's perspective.
최고의 효능을 유지하면서 편안한 사용감을 제공합니다.
3rd Step
We do not develop products recklessly to expand meaningless product lines.
의미없는 제품라인 확장을 위해 무분별한 제품을 개발하지 않습니다.
4th Step
Find yourself regaining confidence with visibly transformed skin.
눈에 보이는 변화를 통해 자신감을 되찾을 수 있습니다.
```

**본문의 고유 링크 목적지**

- `CELDYQUÉ` → /index.html
- `Products` → /shop.html
- `About` → /about.html
- `Store` → /store.html
- `FAQ` → /faq.html
- `Watch the brand film` → /brand-film.html
- `Contact CELDYQUÉ` → /contact.html

**이미지 소스·대체 설명**

- `images/브랜딩로고.webp`
  - alt: CELDYQUE Logo
  - 크기: 1920 × 486
- `images/bottle-pipette-dropper-close-up-liquid-yelloworange-retinol-vitamin-c-gel-serum-beige-background.webp`
  - alt: Close-up of golden liquid and bubbles in a glass pipette
  - 크기: 1920 × 1280
- `images/close-up-hand-applying-nail-treatment.webp`
  - alt: A hand applying liquid from a dropper to the other hand
  - 크기: 1920 × 1277
- `images/golden-underwater-bubbles-abstract-oil.webp`
  - alt: Golden liquid with suspended bubbles in close-up
  - 크기: 1920 × 1280
- `images/closeup-view-glass-.webp`
  - alt: Clear droplets and bubbles beside a glass pipette
  - 크기: 1280 × 1920

</details>

<details>
<summary>brand-film.html — CELDYQUE Brand Film | Korean Skincare</summary>


원본: [brand-film.html](../brand-film.html)

**메타 설명**

Watch the CELDYQUE brand film: a short visual introduction to our Korean skincare world through glassware, flowing liquid and close-up textures.

**현재 본문 텍스트**

```text
Skip to film
Home
/
Brand Film
CELDYQUE Brand Film
Korean skincare in motion
Open the CELDYQUE brand film .
Brand film
/
14 seconds
/
Silent
A closer look at CELDYQUE
Watch the CELDYQUE brand film: a short visual introduction to our Korean skincare world through glassware, flowing liquid and close-up textures.
The film moves from a glass beaker to flowing liquid and bubbles, with the CELDYQUE name appearing over the imagery. This silent brand film contains no spoken dialogue.
Our brand story
Explore serums, creams and cleansers
```

**본문의 고유 링크 목적지**

- `Skip to film` → #main-content
- `CELDYQUÉ` → /index.html
- `Products` → /shop.html
- `About` → /about.html
- `Store` → /store.html
- `FAQ` → /faq.html
- `Home` → /
- `Open the CELDYQUE brand film` → /videos/%ED%99%88%ED%8E%98%EC%9D%B4%EC%A7%80.mp4
- `Contact CELDYQUÉ` → /contact.html

**이미지 소스·대체 설명**


</details>

<details>
<summary>coming-soon.html — 9-Peptide Scalp Care Serum | CELDYQUÉ</summary>


원본: [coming-soon.html](../coming-soon.html)

**메타 설명**

설정 없음

**현재 본문 텍스트**

```text
Coming Soon
The Next CELDYQUÉ Ritual
Something new is quietly taking shape.
Product Category
SKINCARE CREAM
TARGETED CARE
DAILY RITUAL
What To Expect
Radiance Care
Tone Refining
Blue-Toned Science
Peptide Inspired
A Quiet Preview
"Two new formulas are being refined." CELDYQUÉ is preparing the next step in focused skincare — one created for a clearer-looking, more even complexion, and another inspired by advanced peptide care for skin that appears smoother, firmer, and more resilient over time. The details are intentionally quiet for now. More will be revealed soon.
The next CELDYQUÉ ritual is coming soon.
```

**본문의 고유 링크 목적지**

- `CELDYQUÉ` → /index.html
- `Products` → /shop.html
- `About` → /about.html
- `Store` → /store.html
- `FAQ` → /faq.html
- `Contact CELDYQUÉ` → /contact.html

**이미지 소스·대체 설명**

- `https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=1200&q=80`
  - alt: CELDYQUÉ Coming Soon Preview
  - 크기: 미지정 × 미지정

</details>

<details>
<summary>contact.html — Contact | CELDYQUÉ Product Support</summary>


원본: [contact.html](../contact.html)

**메타 설명**

Contact CELDYQUÉ for product information, ingredient questions and business inquiries. Find our support email and official contact details.

**현재 본문 텍스트**

```text
Contact
Company Info
CELDYQUÉ Cell • Medicine • Technique
Address
Garak-ro 25, 2nd Floor Songpa-gu, Seoul, Republic of Korea
Email
team@celdyque.com
Business Hours
Monday - Friday 10 AM - 5 PM (KST)
Authorized Seller
Amazon
Visit Store →
TikTok Shop
Visit Store →
YesStyle
Visit Store →
Stylevana
Visit Store →
```

**본문의 고유 링크 목적지**

- `CELDYQUÉ` → /index.html
- `Products` → /shop.html
- `About` → /about.html
- `Store` → /store.html
- `FAQ` → /faq.html
- `team@celdyque.com` → mailto:team@celdyque.com
- `Visit Store →` → https://www.amazon.com/stores/page/176EC99B-F37D-4FC8-BC48-E30CEC0FA252
- `Visit Store →` → https://www.tiktok.com/@celdyque
- `Visit Store →` → https://www.yesstyle.com/en/celdyque/list.html/bpt.299_bid.331400
- `Visit Store →` → https://www.stylevana.com/en_US/brands/celdyque.html
- `Contact CELDYQUÉ` → /contact.html

**이미지 소스·대체 설명**


</details>

<details>
<summary>faq.html — Skincare FAQ | CELDYQUÉ Products, Routines & Shopping</summary>


원본: [faq.html](../faq.html)

**메타 설명**

Answers about CELDYQUÉ Volufiline, PDRN, bakuchiol, peptide serums and cleansers. Find product directions, routine guidance and official retailer links.

**현재 본문 텍스트**

```text
Home
/
FAQ
Skincare Questions
CELDYQUÉ product details, routine questions and shopping information.
All Topics
Volufiline
PDRN
Peptides
Niacinamide
Azelaic Acid
Bakuchiol
Tone & Glow
Cleansing
Scalp Care
Routine
Shopping
Support
Volufiline 100% Concentrate
Blue Copper Peptide Bakuchiol Serum
Bakuchiol Volume Collagen Cream
9-Peptide Scalp Care Serum Roll-On
Bakuchiol 30,000ppm Serum
PDRN 250,000ppm Concentrate
PDRN 12% + EGF Peptide Serum
PDRN 12% + EGF Peptide Cream
ArbutXA Glow Cream
Gentle Cleanser Purifying Touch
Pore Purifying Cleansing Oil
Glutathione Glow Serum 30,000 ppm
Azelaic Acid 12% Topical Serum
Niacinamide 20% Pore Minimizer Serum
Products
Routine
Shopping
Support
No matching questions. Contact CELDYQUÉ
Volufiline
Volufiline What does CELDYQUÉ Volufiline 100% mean? +
The product uses original Volufiline raw material in an oil-based concentrate. The 100% name refers to the supplied raw material, not 100% pure sarsasapogenin. It is intended for cosmetic care of fuller-looking skin, not as an injectable filler or a medical treatment.
Volufiline 100% Concentrate
Volufiline How do I use Volufiline 100% Concentrate? +
Mix 1-2 drops with your cream, lotion or serum in your palm, following the product directions. Do not add it to a sunscreen or to the full container of another product. Avoid direct contact with eyes and lips. Patch test before use and stop if irritation occurs.
Volufiline 100% Concentrate
Volufiline How soon will I see results from Volufiline? +
Visible results vary with skin, routine and consistency. We do not promise a specific volume increase or a fixed results timeline for this finished product. Ingredient research is not a guarantee of the same result from an individual skincare routine.
Volufiline 100% Concentrate
PDRN
PDRN What is the difference between the PDRN 25% and PDRN 12% products? +
The PDRN collection includes a 25% Concentrate, a 12% + EGF Peptide Serum and a 12% + EGF Peptide Cream. Compare the full formula, texture and directions on each product page. Product-name percentages alone do not establish which formula will work best for your skin.
PDRN 250,000ppm Concentrate
PDRN Should I choose the PDRN serum or cream? +
The PDRN 12% + EGF Peptide Serum is a serum step, while the PDRN 12% + EGF Peptide Cream is a moisturizer step. Choose the texture that fits your existing routine and follow the directions for that formula.
PDRN 12% + EGF Peptide Serum
PDRN Can I use PDRN skincare after microneedling or a procedure? +
These products are topical cosmetics, not injectable products or wound treatments. Do not apply to broken skin. After a procedure, ask the treating clinician when you can resume cosmetics and which products are appropriate.
PDRN 12% + EGF Peptide Cream
Peptides
Peptides What is Blue Copper Peptide Bakuchiol Serum? +
CELDYQUÉ Blue Copper Peptide Bakuchiol Serum combines copper peptide, bakuchiol and a multi-peptide formula for smoother-looking, plumper-looking skin care. The product page includes the full ingredient list, directions and precautions.
Blue Copper Peptide Bakuchiol Serum
Niacinamide
Niacinamide How should I introduce Niacinamide 20% Advanced Serum? +
Niacinamide 20% Advanced is a high-concentration serum. Patch test, follow its product directions and introduce it separately from other new actives so you can assess tolerance. A higher percentage is not automatically better for every skin type. Stop using it if irritation occurs.
Niacinamide 20% Pore Minimizer Serum
Niacinamide Can I combine Niacinamide 20% with other active products? +
Compatibility depends on the complete formulas and your skin, not only the ingredient names. Introduce one new product at a time. Avoid starting several high-concentration products together, and ask a dermatologist about a routine involving prescription treatments.
Niacinamide 20% Pore Minimizer Serum
Azelaic Acid
Azelaic Acid What is Azelaic Acid 12% Serum intended for? +
This cosmetic serum is intended for uneven-looking tone and texture care. It is not presented as a prescription medicine or a treatment for acne or rosacea. Follow the product instructions and seek medical advice for persistent skin concerns.
Azelaic Acid 12% Topical Serum
Bakuchiol
Bakuchiol How does Bakuchiol 30,000ppm differ from the bakuchiol cream? +
Bakuchiol 30,000ppm is a concentrate designed to be mixed with skincare according to its directions. Bakuchiol Volume Collagen Cream is a moisturizer with bakuchiol, Volufiline and collagen. Their textures and usage instructions differ; do not assume the concentrate should be used like a ready-to-use cream.
Bakuchiol 30,000ppm Serum
Bakuchiol Is bakuchiol skincare guaranteed safe during pregnancy or breastfeeding? +
We do not claim pregnancy or breastfeeding safety for these finished formulas. Ask your healthcare professional to review the complete ingredient list before use. A plant-derived ingredient or a retinol-alternative label is not a safety guarantee.
Bakuchiol Volume Collagen Cream
Tone & Glow
Tone & Glow How do ArbutXA Glow Cream and Glutathione 30,000ppm Serum differ? +
ArbutXA Glow Cream is a moisturizer with arbutin, tranexamic acid and niacinamide. Glutathione 30,000ppm is a serum for radiance and uneven-looking tone care. Compare the complete ingredient lists and choose a texture that fits your routine.
ArbutXA Glow Cream
Cleansing
Cleansing How are Cleansing Oil and Gentle Cleanser used? +
Pore Purifying Cleansing Oil is the oil-cleansing step for removing makeup and sunscreen. Gentle Cleanser is a rinse-off foaming cleanser. Follow each product page for application and rinsing directions; choose the cleansing steps that suit your needs.
Pore Purifying Cleansing Oil
Scalp Care
Scalp Care What is the 9-Peptide Scalp Serum Roll-On for? +
The roll-on format is designed for targeted cosmetic scalp care. Follow the product directions for external use. We do not promise hair regrowth, DHT blocking or treatment of hair loss. Seek professional advice for sudden or persistent hair loss or scalp irritation.
9-Peptide Scalp Care Serum Roll-On
Routine
Routine What order should I apply skincare products? +
Follow the directions for each formula. A simple routine is cleanser, a suitable serum, then moisturizer. Use sunscreen as the final morning skincare step according to its own label. Concentrates may need to be mixed with a moisturizer; do not mix other skincare into sunscreen.
Browse products
Routine Where can I check ingredients and product directions? +
Each current product page lists ingredients, directions and precautions. Check your product packaging as well, because formulas and labeling can change. Contact CELDYQUÉ with your product name and batch details if you need clarification.
Browse products
Routine What is the shelf life and how should I store my product? +
Follow the expiry date, period-after-opening symbol and storage instructions printed on your own packaging. These may vary by product and batch. Keep containers closed and away from direct sunlight and excessive heat.
Browse products
Shopping
Shopping Where can I buy CELDYQUÉ products? +
Use the retailer links on our Where to Buy page or the Amazon link on the relevant product page. Available products, destinations, prices and delivery estimates are set by the retailer and may change.
Where to buy
Shopping Does this website handle payments, shipping and returns? +
This website provides product information and links to retailers. Purchases are completed with the selected retailer. Check that retailer for the current shipping, payment and return terms, and contact them about an existing order.
Where to buy
Support
Support How can I contact CELDYQUÉ? +
Email team@celdyque.com or use our Contact page for product questions. Include the product name and, where relevant, its batch number. For delivery or return requests, contact the retailer that handled your order.
Contact CELDYQUÉ
```

**본문의 고유 링크 목적지**

- `CELDYQUÉ` → /index.html
- `Products` → /shop.html
- `About` → /about.html
- `Store` → /store.html
- `FAQ` → /faq.html
- `Home` → /
- `Volufiline 100% Concentrate` → /product-volufiline-100.html
- `Blue Copper Peptide Bakuchiol Serum` → /product-blue-copper-peptide-bakuchiol-serum.html
- `Bakuchiol Volume Collagen Cream` → /product-bakuchiol-volume-collagen-cream.html
- `9-Peptide Scalp Care Serum Roll-On` → /product-9-peptide-scalp-serum.html
- `Bakuchiol 30,000ppm Serum` → /product-bakuchiol-30000.html
- `PDRN 250,000ppm Concentrate` → /product-pdrn-25.html
- `PDRN 12% + EGF Peptide Serum` → /product-pdrn-12-egf.html
- `PDRN 12% + EGF Peptide Cream` → /product-pdrn-12-egf-cream.html
- `ArbutXA Glow Cream` → /product-arbutxa-glow-cream.html
- `Gentle Cleanser Purifying Touch` → /product-gentle-cleanser.html
- `Pore Purifying Cleansing Oil` → /product-cleansing-oil.html
- `Glutathione Glow Serum 30,000 ppm` → /product-glutathione-30000.html
- `Azelaic Acid 12% Topical Serum` → /product-azelaic-12.html
- `Niacinamide 20% Pore Minimizer Serum` → /product-niacinamide-20-advanced.html
- `Products` → #volufiline-section
- `Routine` → #routine-section
- `Shopping` → #shipping
- `Support` → #support
- `Contact CELDYQUÉ` → /contact.html

**이미지 소스·대체 설명**


</details>

<details>
<summary>index.html — CELDYQUÉ | Korean Skincare, Serums & Creams</summary>


원본: [index.html](../index.html)

**메타 설명**

Explore CELDYQUÉ Korean skincare: Volufiline, PDRN, copper peptide and bakuchiol serums, creams and cleansers. Compare formulas and find official retailers.

**현재 본문 텍스트**

```text
CELDYQUÉ
Korean Skincare Collection
Watch the brand film
Explore Products
PRODUCTS
New Product
See More
OUR STORY
Brand Story
See More
ARCHIVE
New Season
See More
PRODUCT
Best Sellers
①
②
③
④
We aim to find and provide ingredients with proven efficacy through research and clinical studies.
새로운 연구자료와 논문 등을 통해 입증된 효능 원료를 찾아 제공하고자 합니다.
Read more
Featured Skincare
Serums, concentrates, creams and daily cleansers.
100%Volufiline Concentrate
Volume | 10ml | 0.33 Fl Oz
Oil-based concentrate for a fuller-looking, firmer-looking skin routine.
Bakuchiol 30,000ppm Serum
Volume | 30ml | 1 Fl Oz
Comfortable retinol-alternative for elasticity & texture care.
PDRN 25% Concentrate
Volume | 30ml | 1 Fl Oz
Concentrated care for hydrated, supple-looking skin.
PDRN 12% + EGF Peptide Serum
Volume | 30ml | 1 Fl Oz
Synergy formula for visible texture refinement and bounce.
Blue Copper Peptide Bakuchiol Serum
30 ml / 1.01 fl oz
Bakuchiol Volume Collagen Cream
50 ml / 1.7 fl oz
ArbutXA Glow Cream
50 ml / 1.7 fl oz
Gentle Cleanser Purifying Touch
150 ml / 5.07 fl oz
All products
Product questions
Where to buy
Inside CELDYQUÉ
Brand notes, philosophy, and what we're building next.
Brand Story
CELDYQUÉ begins with a simple belief — skincare should be precise, intentional, and essential. Inspired by CELL · MEDICINE · TECHNIQUE, we focus only on what truly benefits the skin. No excess, no noise — just clinically grounded formulations designed for visible results.
Coming Soon
A new chapter is on the way. We are preparing our next innovation — thoughtfully developed, carefully tested, and designed to elevate your skincare experience. Stay tuned for what's next.
```

**본문의 고유 링크 목적지**

- `CELDYQUÉ` → /index.html
- `Products` → /shop.html
- `About` → /about.html
- `Store` → /store.html
- `FAQ` → /faq.html
- `Watch the brand film` → /brand-film.html
- `See More OUR STORY Brand Story` → about.html
- `See More ARCHIVE New Season` → /coming-soon.html
- `100%Volufiline Concentrate Volume | 10ml | 0.33 Fl Oz Oil-based concentrate for a fuller-looking, firmer-looking skin routine.` → /product-volufiline-100.html
- `Bakuchiol 30,000ppm Serum Volume | 30ml | 1 Fl Oz Comfortable retinol-alternative for elasticity & texture care.` → /product-bakuchiol-30000.html
- `PDRN 25% Concentrate Volume | 30ml | 1 Fl Oz Concentrated care for hydrated, supple-looking skin.` → /product-pdrn-25.html
- `PDRN 12% + EGF Peptide Serum Volume | 30ml | 1 Fl Oz Synergy formula for visible texture refinement and bounce.` → /product-pdrn-12-egf.html
- `Blue Copper Peptide Bakuchiol Serum 30 ml / 1.01 fl oz` → /product-blue-copper-peptide-bakuchiol-serum.html
- `Bakuchiol Volume Collagen Cream 50 ml / 1.7 fl oz` → /product-bakuchiol-volume-collagen-cream.html
- `ArbutXA Glow Cream 50 ml / 1.7 fl oz` → /product-arbutxa-glow-cream.html
- `Gentle Cleanser Purifying Touch 150 ml / 5.07 fl oz` → /product-gentle-cleanser.html
- `Contact CELDYQUÉ` → /contact.html

**이미지 소스·대체 설명**

- `/images/Group 10.png`
  - alt: Clear gel texture with droplets and air bubbles
  - 크기: 611 × 974
- `/images/Group 9.png`
  - alt: Glass pipette dispensing a drop of clear liquid
  - 크기: 611 × 974
- `/images/Group 8.png`
  - alt: Close-up of translucent blue-toned bubbles
  - 크기: 611 × 974
- `/images/Group 7.png`
  - alt: Clear glass dropper bottle and pipette
  - 크기: 611 × 974
- `/images/10.jpg`
  - alt: Glass pipette and clear liquid droplets on a reflective surface
  - 크기: 6000 × 4000
- `/images/제품/Mask group-1.png`
  - alt: CELDYQUÉ Volufiline 100% Concentrate, 10 ml / 0.33 fl oz, dropper bottle
  - 크기: 690 × 978
- `/images/제품/Mask group-4.png`
  - alt: CELDYQUE Bakuchiol 30,000ppm Serum, 30 ml, dropper bottle
  - 크기: 690 × 978
- `/images/제품/Mask group-3.png`
  - alt: CELDYQUE PDRN 250,000ppm Concentrate, 30 ml / 1 fl oz, dropper bottle
  - 크기: 690 × 978
- `/images/제품/Mask group.png`
  - alt: CELDYQUE PDRN 12% + EGF Peptide Serum, 30 ml / 1 fl oz, dropper bottle
  - 크기: 690 × 978
- `/images/제품/ms15.webp`
  - alt: CELDYQUE Blue Copper Peptide Bakuchiol Serum, 30 ml / 1.01 fl oz, dropper bottle
  - 크기: 562 × 703
  - srcset: /images/제품/ms15-320.webp 320w, /images/제품/ms15.webp 562w
- `/images/제품/ms14.webp`
  - alt: CELDYQUE Bakuchiol Volume Collagen Cream, 50 ml / 1.7 fl oz, open jar with cream texture
  - 크기: 1122 × 1402
  - srcset: /images/제품/ms14-320.webp 320w, /images/제품/ms14-640.webp 640w, /images/제품/ms14-960.webp 960w, /images/제품/ms14.webp 1122w
- `/images/제품/Mask group-5.webp`
  - alt: CELDYQUE ArbutXA Glow Cream, 50 ml / 1.7 fl oz, cream jar
  - 크기: 690 × 978
- `/images/제품/Mask group-11.webp`
  - alt: CELDYQUE Gentle Cleanser Purifying Touch, 150 ml / 5.07 fl oz, cleanser tube
  - 크기: 690 × 978
- `images/8.jpg`
  - alt: Hand holding a pipette above a stone beside a clear dropper bottle
  - 크기: 2352 × 1584
- `images/9.jpg`
  - alt: Smooth cream texture with a soft swirl
  - 크기: 3840 × 5760

</details>

<details>
<summary>product-9-peptide-scalp-serum.html — 9-Peptide Scalp Care Serum Roll-On | CELDYQUE</summary>


원본: [product-9-peptide-scalp-serum.html](../product-9-peptide-scalp-serum.html)

**메타 설명**

CELDYQUE 9-Peptide Scalp Care Serum Roll-On targets the scalp with Rosemary 2%, Caffeine 1%, PDRN, Spicule 300, Dexpanthenol, Biotin, Zinc PCA and a peptide complex for lightweight daily root-focused care.

**현재 본문 텍스트**

```text
Products
/ Scalp Serum / 9-Peptide Scalp Care Serum Roll-On
Targeted Scalp Care
9-Peptide Scalp Care Serum Roll-On
Rosemary 2%, Caffeine 1%, PDRN and Spicule 300 in a precision roll-on serum. · 40 ml / 1.35 fl oz
9-Peptide Complex
Rosemary 2%
Caffeine 1%
PDRN
Spicule 300
Dexpanthenol
Biotin
Zinc PCA
CELDYQUE 9-Peptide Scalp Care Serum Roll-On targets the scalp with Rosemary 2%, Caffeine 1%, PDRN, Spicule 300, Dexpanthenol, Biotin, Zinc PCA and a peptide complex for lightweight daily root-focused care.
9-Peptide Complex + Spicule 300 for root-focused scalp care
Rosemary 2% and Caffeine 1% for scalp vitality
PDRN 1,000 ppm for healthier-looking scalp
Precision roll-on applicator for targeted, mess-free use
Lightweight, non-greasy daily formula
For all scalp types, women and men
Shop on Amazon →
How to Use
Rosemary x Caffeine x Peptides
Root-focused scalp care without the mess.
A roll-on serum for hairline, crown and parting areas where targeted daily scalp care matters most.
Precision Roll-On Delivery
Roll-On
Targeted applicator
Spicule
300
No Rinse
Daily use
The precision roll-on applicator targets thinning-prone zones such as the hairline, crown and parting with less drip and less product waste.
Spicule 300 helps create a focused scalp-care sensation while the water-based gel texture stays lightweight.
Target the scalp directly.
A close, routine-led visual for controlled roll-on application.
Hairline
Crown
Parting
Rosemary, Caffeine and Peptide Support
2%
Rosemary
1%
Caffeine
9
Peptides
Rosemary 2% and Caffeine 1% are paired with PDRN, Biotin, Zinc PCA and a 9-peptide complex for a healthier-looking scalp environment.
Dexpanthenol and botanical extracts help support comfort and balance for daily leave-on care.
Botanical vitality meets peptide care.
A rosemary-inspired visual anchored to the product's root-focused active story.
Rosemary
Caffeine
PDRN
Key Benefits
Designed around visible skincare results.
CELDYQUE 9-Peptide Scalp Care Serum Roll-On targets the scalp with Rosemary 2%, Caffeine 1%, PDRN, Spicule 300, Dexpanthenol, Biotin, Zinc PCA and a peptide complex for lightweight daily root-focused care.
01
Targeted Root Care
Roll-on delivery helps apply serum directly to scalp zones.
02
Scalp Vitality
Rosemary and Caffeine support a refreshed scalp-care routine.
03
Peptide Support
A 9-peptide complex complements PDRN, Biotin and Zinc PCA.
04
Non-Greasy Finish
Lightweight water-base gel leaves no heavy residue.
05
No-Rinse Routine
Designed for daily leave-on use.
06
For All Scalp Types
Suitable for men and women looking for targeted scalp care.
Scalp Active System
A root-focused formula combining botanical energy, scalp comfort and peptide support.
Rosemary 2%
Botanical scalp-care active for daily vitality.
Caffeine 1%
Root-focused active in a lightweight leave-on format.
PDRN
Sodium DNA for healthier-looking scalp care.
Spicule 300
Targeted scalp-care delivery support.
9-Peptide Complex
Peptide blend for scalp and root care.
Biotin + Zinc PCA
Supporting ingredients for a balanced scalp routine.
How to Use
1
Part
Part hair to expose the scalp area you want to target.
2
Roll
Roll the applicator directly across hairline, crown or parting areas.
3
Massage
Gently massage with fingertips and leave on. No rinsing needed.
Use daily on dry or towel-dried scalp. Avoid applying to broken or irritated skin.
Key Ingredients
Rosemary · Caffeine · PDRN · Peptides
Roll-On
No Rinse
Non-Greasy
Daily Scalp Care
Key Ingredients: Rosemary Extract, Caffeine, Dexpanthenol, Sodium DNA (PDRN), Hydrolyzed Sponge / Spicule 300, Biotin, Zinc PCA and a 9-peptide complex.
Benefits: Scalp care, root nourishment, hair-density support appearance and scalp purifying care.
Formula: Lightweight water-base gel. Non-greasy. No rinse needed.
Refer to the product packaging for the complete and most current ingredient list.
For external use only. Avoid direct contact with the eyes. Perform a patch test before first use. Discontinue use if persistent irritation occurs. Keep out of reach of children.
Product FAQ
Frequently Asked Questions
Answers written for shoppers, search engines and AI summaries looking for clear product guidance.
How do I use the scalp serum?
Part the hair, roll directly onto the target scalp area and massage lightly. It is a leave-on formula.
Can men and women use it?
Yes. The page positions it for all scalp types, women and men.
Is it greasy?
No. It is a lightweight, non-greasy water-base gel.
Try CELDYQUE 9-Peptide Scalp Care Serum Roll-On.
CELDYQUE 9-Peptide Scalp Care Serum Roll-On targets the scalp with Rosemary 2%, Caffeine 1%, PDRN, Spicule 300, Dexpanthenol, Biotin, Zinc PCA and a peptide complex for lightweight daily root-focused care.
Shop on Amazon →
Back to Products
```

**본문의 고유 링크 목적지**

- `CELDYQUÉ` → /index.html
- `Products` → /shop.html
- `About` → /about.html
- `Store` → /store.html
- `FAQ` → /faq.html
- `Shop on Amazon →` → https://www.amazon.com/9-Peptide-Growth-Scalp-Serum-Roll/dp/B0GGZRNGKL?maas=maas_adg_B3610BD8B3001B42E9EA2D0A7A72F58C_afap_abs&ref_=aa_maas&tag=maas&th=1
- `How to Use` → #how-to-use
- `Contact CELDYQUÉ` → /contact.html

**이미지 소스·대체 설명**

- `/images/제품/ms13.webp`
  - alt: CELDYQUE 9-Peptide Scalp Care Serum Roll-On, 40 ml / 1.35 fl oz, scalp serum roll-on tube
  - 크기: 667 × 945
  - srcset: /images/제품/ms13-320.webp 320w, /images/제품/ms13-640.webp 640w, /images/제품/ms13.webp 667w
- `https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=800`
  - alt: CELDYQUE 9-Peptide Scalp Care Serum Roll-On concept visual
  - 크기: 미지정 × 미지정
- `https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&q=80&w=800`
  - alt: CELDYQUE 9-Peptide Scalp Care Serum Roll-On visual
  - 크기: 미지정 × 미지정

</details>

<details>
<summary>product-advanced-retinol-pro-retinal-serum-0-5.html — Advanced Retinal Pro Serum | CELDYQUE</summary>


원본: [product-advanced-retinol-pro-retinal-serum-0-5.html](../product-advanced-retinol-pro-retinal-serum-0-5.html)

**메타 설명**

Advanced Retinal Pro Serum 0.5 with 66% Centella Asiatica by CELDYQUE. Anti-aging, skin-smoothing Korean skincare.

**현재 본문 텍스트**

```text
Products
/ Serum / Advanced Retinal Pro 0.5
Advanced Retinal Pro Serum 0.5
66% Centella Asiatica Base · Rapid Anti-Aging
Experience the power of our liposome-stabilized Retinal complex, delivering results up to 11x faster than traditional retinol. Formulated with a 66% Cica base to soothe and protect, it visibly transforms skin smoothness, firmness, and radiance.
Liposome-Stabilized Retinal for Rapid Results
66% Centella Asiatica Extract to Minimize Irritation
2% Niacinamide & Panthenol for Glowing Tone
Ceramide, Squalane & Beta-Glucan Barrier Matrix
Visibly Reduces Fine Lines & Wrinkles
Where to Buy →
Rapid Renewal, Zero Compromise
Next-generation Retinal meets soothing botanicals. Wake up to visibly firmer, more luminous skin.
Next-Gen Retinal
Not all retinoids are created equal. Retinal (Retinaldehyde) requires only one conversion step in the skin, making it up to 11x faster and more effective than standard Retinol.
Our advanced liposome delivery system ensures this potent anti-aging ingredient penetrates deeply to target fine lines, wrinkles, and loss of elasticity, without the harsh side effects.
66% Cica Calming Base
To counter the potential irritation of powerful actives, we replaced plain water with 66% Centella Asiatica (Cica) Extract .
Infused with Ceramide NP, Squalane, and Hyaluronic Acid, this creamy serum deeply hydrates, strengthens the moisture barrier, and keeps sensitive skin comfortable throughout the renewal process.
How to Use
1
Night Only
Apply a pea-sized amount to clean, dry skin as part of your evening routine .
2
Acclimate
If new to retinal, use 2-3 times a week initially, gradually increasing frequency as your skin tolerates it.
3
Protect
Retinoids can increase sun sensitivity. Always apply a broad-spectrum SPF in the morning .
* Patch test recommended. Do not use alongside strong chemical exfoliants (AHA/BHA) in the same routine.
Ingredients
Advanced Efficacy
Centella Asiatica Extract (66%) , Glycerin, Niacinamide, Panthenol, Retinal , Retinol, Beta-Glucan, Macadamia Seed Oil, Adenosine, Ceramide NP, Squalane, Sodium Hyaluronate.
Benefits: Anti-Wrinkle, Firmness, Radiance, Barrier Protection.
Texture: Silky, nourishing cream-serum hybrid that absorbs smoothly.
```

**본문의 고유 링크 목적지**

- `CELDYQUÉ` → /index.html
- `Products` → /shop.html
- `About` → /about.html
- `Store` → /store.html
- `FAQ` → /faq.html
- `Where to Buy →` → store.html
- `Contact CELDYQUÉ` → /contact.html

**이미지 소스·대체 설명**

- `/images/제품/Mask group-10.webp`
  - alt: CELDYQUE Advanced Retinal Pro Serum
  - 크기: 미지정 × 미지정
- `https://images.unsplash.com/photo-1618331835717-801e976710b2?auto=format&fit=crop&q=80&w=1600`
  - alt: Nighttime Renewal
  - 크기: 미지정 × 미지정
- `https://images.unsplash.com/photo-1560750588-73207b1ef5b8?auto=format&fit=crop&q=80&w=800`
  - alt: Youthful Firm Skin
  - 크기: 미지정 × 미지정
- `https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=800`
  - alt: Centella Asiatica
  - 크기: 미지정 × 미지정

</details>

<details>
<summary>product-arbutxa-glow-cream.html — ArbutXA Glow Cream | Arbutin 7% + TXA 5% | CELDYQUE</summary>


원본: [product-arbutxa-glow-cream.html](../product-arbutxa-glow-cream.html)

**메타 설명**

CELDYQUE ArbutXA Glow Cream features Arbutin 7%, Tranexamic Acid 5%, Niacinamide 2%, Alpha-Arbutin, Cica, Heartleaf, Green Tea, Hyaluronic Acid and Ceramide NP for dark spot, uneven tone and hydration care.

**현재 본문 텍스트**

```text
Products
/ Cream / ArbutXA Glow Cream
Tone and Dark Spot Care
ArbutXA Glow Cream
Arbutin 7%, Tranexamic Acid 5% and Niacinamide 2% for uneven-looking tone. · 50 ml / 1.7 fl oz
Arbutin 7%
TXA 5%
Niacinamide 2%
Alpha-Arbutin
Cica
Heartleaf
Green Tea
Ceramide NP
CELDYQUE ArbutXA Glow Cream features Arbutin 7%, Tranexamic Acid 5%, Niacinamide 2%, Alpha-Arbutin, Cica, Heartleaf, Green Tea, Hyaluronic Acid and Ceramide NP for dark spot, uneven tone and hydration care.
Arbutin 7% for clarity care
Tranexamic Acid 5% for dark spot appearance
Niacinamide 2% for tone and texture
Soothing Cica, Heartleaf and Green Tea Complex
Multi-depth hydration with Hyaluronic Acid
Shop on Amazon →
How to Use
Arbutin x TXA x Niacinamide
Tone care for a visibly clearer glow.
A focused cream for dark spot appearance, uneven-looking tone and barrier-friendly hydration.
Triple Tone-Care Active Blend
7%
Arbutin
5%
TXA
2%
Niacinamide
Arbutin, Tranexamic Acid and Niacinamide create a clear, search-readable tone-care story for discoloration appearance and uneven-looking radiance.
Alpha-Arbutin reinforces the bright-looking positioning while keeping the claim language cosmetic and appearance-focused.
Clinical tone care, soft glow finish.
The original clarity image is preserved inside the updated premium product layout.
Arbutin
TXA
Niacinamide
Calm Hydration Support
Cica
Soothing care
Heartleaf
Comfort
HA
Hydration
Cica, Heartleaf and Green Tea help balance the high-active tone-care profile with a calmer skin feel.
Hyaluronic Acid and Ceramide NP support comfortable hydration and barrier care.
Soothing moisture for daily use.
A hydration visual retained from the original page to keep the product's existing photo direction.
Cica
Heartleaf
Ceramide
Key Benefits
Designed around visible skincare results.
CELDYQUE ArbutXA Glow Cream features Arbutin 7%, Tranexamic Acid 5%, Niacinamide 2%, Alpha-Arbutin, Cica, Heartleaf, Green Tea, Hyaluronic Acid and Ceramide NP for dark spot, uneven tone and hydration care.
01
Dark Spot Appearance Care
Arbutin and Tranexamic Acid target the look of stubborn discoloration.
02
Even-Looking Tone
Niacinamide supports a clearer, more balanced-looking complexion.
03
Soothing Support
Cica, Heartleaf and Green Tea help comfort the skin.
04
Barrier Hydration
Hyaluronic Acid and Ceramide NP support moisture balance.
05
Makeup-Friendly
Smooth cream texture layers well under makeup.
06
Daily Glow
Designed for a more luminous-looking finish with consistent use.
Tone-Care Architecture
A high-signal ingredient breakdown for AI search, shopping search and product discovery.
Arbutin 7%
Primary clarity-care active.
Tranexamic Acid 5%
Dark spot appearance and uneven tone care.
Niacinamide 2%
Tone, texture and radiance support.
Alpha-Arbutin
Additional bright-looking support.
Cica + Heartleaf
Soothing support for comfort.
Hyaluronic Acid + Ceramide
Hydration and barrier support.
How to Use
1
Apply
After serum, apply a moderate amount evenly across the face and neck.
2
Target
Apply an extra thin layer to areas with visible dark spots or uneven-looking tone.
3
Protect
Use sunscreen during the day to help prevent the look of new spots.
For best results, use consistently and pair daytime use with sunscreen.
Key Ingredients
Arbutin · Tranexamic Acid · Niacinamide
Tone Care
Glow Cream
Hydrating
Daily Cream
Key Ingredients: Arbutin 70,000 ppm, Tranexamic Acid 50,000 ppm, Niacinamide 20,000 ppm, Alpha-Arbutin, Centella Asiatica Extract, Houttuynia Cordata Extract, Green Tea Leaf Extract, Hyaluronic Acid Complex, Ceramide NP and Adenosine.
Benefits: Dark spot appearance care, tone evenness, soothing support and barrier hydration.
Texture: Smooth, lightweight cream that layers well under makeup.
Refer to the product packaging for the complete and most current ingredient list.
For external use only. Avoid direct contact with the eyes. Perform a patch test before first use. Discontinue use if persistent irritation occurs. Keep out of reach of children.
Product FAQ
Frequently Asked Questions
Answers written for shoppers, search engines and AI summaries looking for clear product guidance.
What is ArbutXA Glow Cream for?
It is a tone-care cream for the appearance of dark spots, uneven-looking tone and dullness.
Should I use sunscreen?
Yes. Use sunscreen during the day, especially with tone-care routines.
Can I use it morning and night?
Yes, use as tolerated as the cream step of your routine.
Try CELDYQUE ArbutXA Glow Cream.
CELDYQUE ArbutXA Glow Cream features Arbutin 7%, Tranexamic Acid 5%, Niacinamide 2%, Alpha-Arbutin, Cica, Heartleaf, Green Tea, Hyaluronic Acid and Ceramide NP for dark spot, uneven tone and hydration care.
Shop on Amazon →
Back to Products
```

**본문의 고유 링크 목적지**

- `CELDYQUÉ` → /index.html
- `Products` → /shop.html
- `About` → /about.html
- `Store` → /store.html
- `FAQ` → /faq.html
- `Shop on Amazon →` → https://www.amazon.com/Tranexamic-Niacinamide-Intensive-Pigmentation-Uneven-Looking/dp/B0FWBM5SR8?maas=maas_adg_FD312B20E0F9A766AF64408015E6D02A_afap_abs&ref_=aa_maas&tag=maas&th=1
- `How to Use` → #how-to-use
- `Contact CELDYQUÉ` → /contact.html

**이미지 소스·대체 설명**

- `/images/제품/Mask group-5.webp`
  - alt: CELDYQUE ArbutXA Glow Cream, 50 ml / 1.7 fl oz, cream jar
  - 크기: 690 × 978
- `https://images.unsplash.com/photo-1505576399279-565b52d4ac71?auto=format&fit=crop&q=80&w=1600`
  - alt: CELDYQUE ArbutXA Glow Cream concept visual
  - 크기: 미지정 × 미지정
- `https://images.unsplash.com/photo-1618546421236-3c6f5f78add2?q=80&w=1330&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`
  - alt: CELDYQUE ArbutXA Glow Cream visual
  - 크기: 미지정 × 미지정
- `https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&q=80&w=800`
  - alt: CELDYQUE ArbutXA Glow Cream visual
  - 크기: 미지정 × 미지정

</details>

<details>
<summary>product-azelaic-12.html — Azelaic Acid 12% Serum | CELDYQUE</summary>


원본: [product-azelaic-12.html](../product-azelaic-12.html)

**메타 설명**

CELDYQUE Azelaic Acid 12% Serum combines Azelaic Acid, Salicylic Acid, Tranexamic Acid, Niacinamide, Centella, Panthenol, Ceramide, Hyaluronic Acid and a Vitamin C derivative for redness appearance, acne-prone and dark spot care.

**현재 본문 텍스트**

```text
Products
/ Face Serum / Azelaic Acid 12% Topical Serum
Redness and Tone Care
Azelaic Acid 12% Topical Serum
Azelaic Acid 12%, Salicylic Acid, Tranexamic Acid and Cica for calm-looking clarity. · 30 ml / 1 fl oz
Azelaic Acid 12%
Salicylic Acid
Tranexamic Acid
Niacinamide
Centella
Panthenol
Ceramide NP
Vitamin C Derivative
CELDYQUE Azelaic Acid 12% Serum combines Azelaic Acid, Salicylic Acid, Tranexamic Acid, Niacinamide, Centella, Panthenol, Ceramide, Hyaluronic Acid and a Vitamin C derivative for redness appearance, acne-prone and dark spot care.
Azelaic Acid 12% for redness appearance and tone care
Salicylic Acid / BHA for clogged-pore routines
Tranexamic Acid for dark spot appearance
Soothing Centella and Panthenol
Lightweight, fast-absorbing formula
Shop on Amazon →
How to Use
Azelaic Acid x BHA x TXA
Calm-looking clarity for uneven, breakout-prone skin.
A lightweight serum designed around redness appearance, clogged-pore routines and post-blemish tone care.
Azelaic Acid 12% Clarity Care
12%
Azelaic Acid
BHA
Pore care
Cica
Comfort
Azelaic Acid 12% helps position the serum for redness appearance, texture and uneven-looking clarity.
Salicylic Acid adds a pore-care angle for clogged-pore and blemish-prone routines.
Calm and clear skin story.
The existing clear complexion visual remains part of the updated page.
Azelaic Acid
BHA
Cica
Post-Blemish Tone Support
TXA
Dark spot care
Niacinamide
Tone support
Panthenol
Comfort
Tranexamic Acid and Niacinamide support a more even-looking tone after blemishes.
Panthenol, Ceramide and Hyaluronic Acid help maintain comfort and hydration.
Spot appearance care with hydration.
A retained spot-care visual supports the product's original image language.
Tranexamic Acid
Niacinamide
Ceramide
Key Benefits
Designed around visible skincare results.
CELDYQUE Azelaic Acid 12% Serum combines Azelaic Acid, Salicylic Acid, Tranexamic Acid, Niacinamide, Centella, Panthenol, Ceramide, Hyaluronic Acid and a Vitamin C derivative for redness appearance, acne-prone and dark spot care.
01
Redness Appearance Care
Azelaic Acid supports calm-looking skin.
02
Acne-Prone Routine Support
BHA supports clogged-pore care.
03
Dark Spot Appearance
TXA and Niacinamide target uneven-looking tone.
04
Hydration Comfort
Panthenol and Hyaluronic Acid support moisture.
05
Barrier Support
Ceramide NP helps maintain comfort.
06
Lightweight Layering
Non-greasy serum texture works under cream and sunscreen.
Azelaic Serum Architecture
A high-signal active blend for redness appearance, pore care and tone care search intent.
Azelaic Acid 12%
Hero active for redness appearance and uneven texture care.
Salicylic Acid
BHA for clogged-pore routines.
Tranexamic Acid
Dark spot appearance support.
Niacinamide
Tone and texture support.
Centella + Panthenol
Soothing comfort.
Ceramide + Hyaluronic Acid
Barrier hydration support.
How to Use
1
Apply
After toner, apply a thin layer to the face or targeted areas.
2
Moisturize
Follow with a gentle moisturizer.
3
Protect
Use sunscreen during the day.
Introduce gradually if your skin is new to acids or high-active serums.
Key Ingredients
Azelaic Acid · BHA · TXA · Cica
Redness Care
BHA
Tone Care
Lightweight
Key Ingredients: Azelaic Acid 12%, Tranexamic Acid, Salicylic Acid, Niacinamide, Centella Asiatica Extract, Panthenol, Ceramide NP, Hyaluronic Acid and a Vitamin C derivative.
Benefits: Redness appearance care, acne-prone routine support, spot fading appearance and even-looking tone.
Texture: Lightweight, non-greasy serum that layers well under makeup.
Refer to the product packaging for the complete and most current ingredient list.
For external use only. Avoid direct contact with the eyes. Perform a patch test before first use. Discontinue use if persistent irritation occurs. Keep out of reach of children.
Product FAQ
Frequently Asked Questions
Answers written for shoppers, search engines and AI summaries looking for clear product guidance.
What is Azelaic Acid 12% Serum for?
It is for redness appearance, clogged-pore routines and uneven-looking tone.
Can I use it with moisturizer?
Yes. Apply serum first, then moisturize.
Should I use it every day?
Introduce gradually and increase frequency as tolerated.
Try CELDYQUE Azelaic Acid 12% Topical Serum.
CELDYQUE Azelaic Acid 12% Serum combines Azelaic Acid, Salicylic Acid, Tranexamic Acid, Niacinamide, Centella, Panthenol, Ceramide, Hyaluronic Acid and a Vitamin C derivative for redness appearance, acne-prone and dark spot care.
Shop on Amazon →
Back to Products
```

**본문의 고유 링크 목적지**

- `CELDYQUÉ` → /index.html
- `Products` → /shop.html
- `About` → /about.html
- `Store` → /store.html
- `FAQ` → /faq.html
- `Shop on Amazon →` → https://www.amazon.com/Azelaic-Acid-Facial-Serum-Niacinamide/dp/B0DP4FQPDL?maas=maas_adg_ADF10714365CF9D97EE4BBD33BD084E3_afap_abs&ref_=aa_maas&tag=maas&th=1
- `How to Use` → #how-to-use
- `Contact CELDYQUÉ` → /contact.html

**이미지 소스·대체 설명**

- `/images/제품/Mask group-7.webp`
  - alt: CELDYQUE Azelaic Acid 12% Topical Serum, 30 ml / 1 fl oz, dropper bottle
  - 크기: 690 × 978
- `https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&q=80&w=1600`
  - alt: CELDYQUE Azelaic Acid 12% Topical Serum concept visual
  - 크기: 미지정 × 미지정
- `https://images.unsplash.com/photo-1620916297397-a4a5402a3c6c?auto=format&fit=crop&q=80&w=800`
  - alt: CELDYQUE Azelaic Acid 12% Topical Serum visual
  - 크기: 미지정 × 미지정
- `https://images.unsplash.com/photo-1541261248599-cef2fcabf912?q=80&w=1083&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`
  - alt: CELDYQUE Azelaic Acid 12% Topical Serum visual
  - 크기: 미지정 × 미지정

</details>

<details>
<summary>product-bakuchiol-30000.html — Bakuchiol 30,000ppm Serum | CELDYQUE</summary>


원본: [product-bakuchiol-30000.html](../product-bakuchiol-30000.html)

**메타 설명**

CELDYQUE Bakuchiol 30,000ppm Serum is a high-potency retinol-alternative mix-in serum with Bakuchiol, Butylene Glycol and a minimalist formula for customized firm-looking and smooth-looking care.

**현재 본문 텍스트**

```text
Products
/ Face Serum / Bakuchiol 30,000ppm Serum
High-Potency Retinol Alternative
Bakuchiol 30,000ppm Serum
A concentrated Bakuchiol mix-in serum for smooth, firm-looking skincare routines. · 30 ml / 1 fl oz
Bakuchiol 30,000 ppm
Retinol Alternative
Mix-In Serum
Vegan
Cruelty-Free
Non-GMO
Minimal Formula
CELDYQUE Bakuchiol 30,000ppm Serum is a high-potency retinol-alternative mix-in serum with Bakuchiol, Butylene Glycol and a minimalist formula for customized firm-looking and smooth-looking care.
30,000 ppm high-potency Bakuchiol
Gentle retinol-alternative care for sensitive-looking skin
Hydration and skin smoothing support
Vegan, cruelty-free and non-GMO positioning
Mix-in formula for customized care
Shop on Amazon →
How to Use
Bakuchiol 30,000 ppm
A concentrated retinol-alternative booster.
A minimalist serum for routines focused on firm-looking, smooth-looking skin and customized mixing.
High-Potency Bakuchiol Care
30,000 ppm
Bakuchiol
Retinol
Alternative
Minimal
Formula
Bakuchiol 30,000 ppm creates a strong, clean ingredient signal for search and AI discovery.
The formula supports the appearance of smoother, firmer-looking skin as part of a consistent routine.
Botanical retinol-alternative care.
The original botanical image remains in the refreshed product layout.
Bakuchiol
Firmness
Texture
DIY Mix-In Format
Mix
With cream
Target
As desired
Gentle
Daily routine
Because it is concentrated, the serum is designed as a DIY mix-in with moisturizer, cream or compatible serum.
This format lets users customize the feel and intensity while keeping the routine simple.
Customize your skincare texture.
The original mixing cream visual is preserved for clear use-case continuity.
Mix-In
Cream
Booster
Key Benefits
Designed around visible skincare results.
CELDYQUE Bakuchiol 30,000ppm Serum is a high-potency retinol-alternative mix-in serum with Bakuchiol, Butylene Glycol and a minimalist formula for customized firm-looking and smooth-looking care.
01
Firm-Looking Care
Bakuchiol supports a smoother, more elastic-looking complexion.
02
Retinol Alternative
Positioned as a gentler botanical alternative to retinol routines.
03
Customizable Use
Mix with compatible skincare to adjust texture and feel.
04
Minimal Formula
Simple ingredient story for focused product discovery.
05
Sensitive-Looking Skin
A gentle active-care option when introduced gradually.
06
Smooth Texture
Supports the appearance of refined skin texture.
Bakuchiol Booster Architecture
A focused mix-in serum with a clear hero ingredient and simple usage story.
Bakuchiol 30,000 ppm
Hero retinol-alternative active.
Butylene Glycol
Moisture-supporting solvent.
Water
Formula base support.
1,2-Hexanediol
Formula support ingredient.
Mix-In Format
Customizable use with compatible skincare.
Free-From Positioning
Original page notes parabens, sulfates and synthetic fragrance free.
How to Use
1
Dose
Add 1-2 drops to moisturizer, cream or compatible serum.
2
Mix
Blend in your palm before applying.
3
Apply
Smooth over face and neck. Use sunscreen in the morning.
Because it is concentrated, start slowly and patch test before first use.
Key Ingredients
Bakuchiol · Minimalist Mix-In Serum
Mix-In
Vegan
Cruelty-Free
Retinol Alternative
Key Ingredients: Bakuchiol 30,000 ppm, Butylene Glycol, Water and 1,2-Hexanediol.
Free From: Parabens, sulfates and synthetic fragrances.
Note: The original page recommends mixing with moisturizer because of the high concentration.
Refer to the product packaging for the complete and most current ingredient list.
For external use only. Avoid direct contact with the eyes. Perform a patch test before first use. Discontinue use if persistent irritation occurs. Keep out of reach of children.
Product FAQ
Frequently Asked Questions
Answers written for shoppers, search engines and AI summaries looking for clear product guidance.
What is Bakuchiol 30,000ppm Serum?
It is a concentrated Bakuchiol mix-in serum positioned as a retinol-alternative skincare booster.
Should I use it alone?
The original page recommends mixing it with moisturizer or compatible skincare due to the high concentration.
Can I use it during the day?
Use as tolerated and apply sunscreen in the morning.
Try CELDYQUE Bakuchiol 30,000ppm Serum.
CELDYQUE Bakuchiol 30,000ppm Serum is a high-potency retinol-alternative mix-in serum with Bakuchiol, Butylene Glycol and a minimalist formula for customized firm-looking and smooth-looking care.
Shop on Amazon →
Back to Products
```

**본문의 고유 링크 목적지**

- `CELDYQUÉ` → /index.html
- `Products` → /shop.html
- `About` → /about.html
- `Store` → /store.html
- `FAQ` → /faq.html
- `Shop on Amazon →` → https://www.amazon.com/Korean-Bakuchiol-Concentrate-Mix-Serum/dp/B0DC6H8MSW?maas=maas_adg_CF21960666737CC63E9003F20D927B2C_afap_abs&ref_=aa_maas&tag=maas&th=1
- `How to Use` → #how-to-use
- `Contact CELDYQUÉ` → /contact.html

**이미지 소스·대체 설명**

- `/images/제품/test.webp`
  - alt: CELDYQUE Bakuchiol 30,000ppm Serum, 30 ml / 1 fl oz, dropper bottle
  - 크기: 550 × 778
- `https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&q=80&w=1600`
  - alt: CELDYQUE Bakuchiol 30,000ppm Serum concept visual
  - 크기: 미지정 × 미지정
- `https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=800`
  - alt: CELDYQUE Bakuchiol 30,000ppm Serum visual
  - 크기: 미지정 × 미지정
- `https://images.unsplash.com/photo-1629198688000-71f23e745b6e?auto=format&fit=crop&q=80&w=800`
  - alt: CELDYQUE Bakuchiol 30,000ppm Serum visual
  - 크기: 미지정 × 미지정

</details>

<details>
<summary>product-bakuchiol-volume-collagen-cream.html — Bakuchiol Volume Collagen Cream | CELDYQUE Korean Skincare</summary>


원본: [product-bakuchiol-volume-collagen-cream.html](../product-bakuchiol-volume-collagen-cream.html)

**메타 설명**

CELDYQUE Bakuchiol Volume Collagen Cream combines Bakuchiol, Volufiline, EGF peptide, low-molecular collagen, snail mucin, Ceramide, Panthenol and Cica for firm-looking, plump-looking hydration care.

**현재 본문 텍스트**

```text
Products
/ Cream / Bakuchiol Volume Collagen Cream
Plumping Korean Cream
Bakuchiol Volume Collagen Cream
Bakuchiol, Volufiline, EGF and low-molecular collagen in a silky daily cream. · 50 ml / 1.7 fl oz
Bakuchiol
Volufiline
Low-Molecular Collagen
EGF
Snail Mucin
Ceramide
Panthenol
Cica
CELDYQUE Bakuchiol Volume Collagen Cream combines Bakuchiol, Volufiline, EGF peptide, low-molecular collagen, snail mucin, Ceramide, Panthenol and Cica for firm-looking, plump-looking hydration care.
Bakuchiol + Volufiline for a firm, plump-looking finish
EGF Peptide + Low-Molecular Collagen care
Snail Mucin + Hyaluronic Acid for dewy hydration
Ceramide, Panthenol and Cica for barrier support
Lightweight, non-greasy cream texture for daily use
Shop on Amazon →
How to Use
Bakuchiol x Volufiline x Collagen
A plush cream for bounce, glow and daily comfort.
A skin-conditioning cream built for visible plumpness, firm-looking elasticity and smooth barrier-supporting moisture.
Firm-Looking Bakuchiol Care
Bakuchiol
Retinol-alternative
EGF
Peptide care
Daily
AM / PM comfort
Bakuchiol helps care for the look of fine lines and uneven texture without the heavy feel many richer creams can leave behind.
EGF peptide support and botanical conditioning ingredients round out the formula for a smoother, more radiant-looking finish.
Bakuchiol-led renewal care.
A golden cream texture story centered on gentle firming care and daily radiance.
Bakuchiol
EGF
Glow Care
Volufiline + Collagen Plumping Support
Volufiline
Fuller-looking skin
Collagen
Low-molecular care
Barrier
Ceramide + Panthenol
Volufiline and low-molecular collagen support a fuller, bouncier-looking complexion as part of a consistent moisturizing routine.
Snail mucin, Hyaluronic Acid, Ceramide, Panthenol and Cica help leave skin feeling cushioned, hydrated and resilient.
Plumping moisture with a satin finish.
A cream and serum-inspired visual that keeps the product's dewy collagen story front and center.
Volufiline
Collagen
Snail Mucin
Key Benefits
Designed around visible skincare results.
CELDYQUE Bakuchiol Volume Collagen Cream combines Bakuchiol, Volufiline, EGF peptide, low-molecular collagen, snail mucin, Ceramide, Panthenol and Cica for firm-looking, plump-looking hydration care.
01
Firm-Looking Elasticity
Bakuchiol and peptide care support a smoother, firmer-looking complexion.
02
Plump-Looking Hydration
Volufiline, collagen and Hyaluronic Acid help skin look fuller and bouncier.
03
Barrier Comfort
Ceramide, Panthenol and Cica support a calm, moisturized skin barrier.
04
Dewy Texture
A silky cream texture absorbs comfortably without a greasy finish.
05
Daily Routine Fit
Works as a moisturizer step in morning or evening skincare.
06
Radiant Finish
Supports a fresh, healthy-looking glow with consistent use.
Cream Architecture
A multi-active cream combining firming, plumping and barrier-supporting ingredient stories.
Bakuchiol
Retinol-alternative care for smoother-looking texture and visible firmness.
Volufiline
Supports fuller-looking facial contours as part of a moisturizing routine.
Low-Molecular Collagen
A hydration and bounce-focused ingredient for supple-looking skin.
EGF Peptide
Daily skin-conditioning peptide support.
Snail Mucin
Dewy hydration and soft skin feel.
Ceramide + Panthenol
Barrier-supporting comfort for daily use.
How to Use
1
Apply
After serum, apply a moderate amount over the face and neck.
2
Massage
Smooth outward along cheeks, jawline and areas that need extra comfort.
3
Seal
Use as the moisturizer step. In the morning, finish with sunscreen.
Use morning and evening as the cream step of your routine.
Key Ingredients
Bakuchiol · Volufiline · Collagen · Barrier Support
Non-Greasy
Dewy Finish
Daily Cream
Barrier Support
Key Ingredients: Bakuchiol, Volufiline, Hydrolyzed Collagen, Snail Secretion Filtrate, EGF peptide, Hyaluronic Acid, Ceramide, Panthenol and Cica.
Benefits: Firm-looking skin, plumping care, dewy hydration, barrier support and smooth texture.
Texture: Silky, lightweight cream that absorbs comfortably without a greasy finish.
Refer to the product packaging for the complete and most current ingredient list.
For external use only. Avoid direct contact with the eyes. Perform a patch test before first use. Discontinue use if persistent irritation occurs. Keep out of reach of children.
Product FAQ
Frequently Asked Questions
Answers written for shoppers, search engines and AI summaries looking for clear product guidance.
What is Bakuchiol Volume Collagen Cream best for?
It is designed for people seeking a moisturizer focused on firm-looking elasticity, plump-looking hydration and barrier comfort.
Can I use it with serum?
Yes. Apply after serum as the cream step.
Is it heavy?
The texture is positioned as silky and lightweight with a non-greasy finish.
Try CELDYQUE Bakuchiol Volume Collagen Cream.
CELDYQUE Bakuchiol Volume Collagen Cream combines Bakuchiol, Volufiline, EGF peptide, low-molecular collagen, snail mucin, Ceramide, Panthenol and Cica for firm-looking, plump-looking hydration care.
Shop on Amazon →
Back to Products
```

**본문의 고유 링크 목적지**

- `CELDYQUÉ` → /index.html
- `Products` → /shop.html
- `About` → /about.html
- `Store` → /store.html
- `FAQ` → /faq.html
- `Shop on Amazon →` → https://www.amazon.com/Bakuchiol-Collagen-Cream-Low-Molecular-Radiant-Looking/dp/B0GXV5RJX5?maas=maas_adg_74F8B22ED5F8F87B0ED1F1AA5B1974B5_afap_abs&ref_=aa_maas&tag=maas
- `How to Use` → #how-to-use
- `Contact CELDYQUÉ` → /contact.html

**이미지 소스·대체 설명**

- `/images/제품/ms14.webp`
  - alt: CELDYQUE Bakuchiol Volume Collagen Cream, 50 ml / 1.7 fl oz, open jar with cream texture
  - 크기: 1122 × 1402
  - srcset: /images/제품/ms14-320.webp 320w, /images/제품/ms14-640.webp 640w, /images/제품/ms14-960.webp 960w, /images/제품/ms14.webp 1122w
- `https://images.unsplash.com/photo-1748543668687-624e058c367c?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c2tpbmNhcmUlMjBmbGF0bGF5fGVufDB8fDB8fHww&ixlib=rb-4.1.0&q=60&w=3000`
  - alt: CELDYQUE Bakuchiol Volume Collagen Cream concept visual
  - 크기: 미지정 × 미지정
- `https://images.unsplash.com/photo-1748543668676-ea8241cb3886?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c2tpbmNhcmUlMjBmbGF0bGF5fGVufDB8fDB8fHww&ixlib=rb-4.1.0&q=60&w=3000`
  - alt: CELDYQUE Bakuchiol Volume Collagen Cream visual
  - 크기: 미지정 × 미지정
- `https://images.unsplash.com/photo-1748543668646-e81cda0890f3?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8c2tpbmNhcmUlMjBmbGF0bGF5fGVufDB8fDB8fHww&ixlib=rb-4.1.0&q=60&w=3000`
  - alt: CELDYQUE Bakuchiol Volume Collagen Cream visual
  - 크기: 미지정 × 미지정

</details>

<details>
<summary>product-blue-copper-peptide-bakuchiol-serum.html — Blue Copper Peptide Bakuchiol Serum | CELDYQUE Korean Skincare</summary>


원본: [product-blue-copper-peptide-bakuchiol-serum.html](../product-blue-copper-peptide-bakuchiol-serum.html)

**메타 설명**

CELDYQUE Blue Copper Peptide Bakuchiol Serum pairs Copper Tripeptide-1, Bakuchiol, Matrixyl 3000, Argireline, EGF, Niacinamide and Hyaluronic Acid for lightweight firming, plumping, smoothing and hydration care.

**현재 본문 텍스트**

```text
Products
/ Face Serum / Blue Copper Peptide Bakuchiol Serum
Advanced Korean Peptide Care
Blue Copper Peptide Bakuchiol Serum
Multi-peptide plumping and firming face serum for smoother-looking bounce. · 30 ml / 1.01 fl oz
Copper Tripeptide-1
Bakuchiol
Matrixyl 3000
Argireline
EGF
12-Peptide Complex
Niacinamide 2%
Hyaluronic Acid
CELDYQUE Blue Copper Peptide Bakuchiol Serum pairs Copper Tripeptide-1, Bakuchiol, Matrixyl 3000, Argireline, EGF, Niacinamide and Hyaluronic Acid for lightweight firming, plumping, smoothing and hydration care.
Helps soften the appearance of smile lines and fine lines
Supports firmer-looking, plumper-looking skin
12-Peptide Complex with GHK-Cu, Matrixyl 3000 and Argireline
Hydration support with Hyaluronic Acid, Collagen and Beta-Glucan
Fragrance-free, lightweight and fast-absorbing
Layers easily under moisturizer, sunscreen and makeup
Shop on Amazon →
How to Use
Copper Peptide x Bakuchiol
Blue peptide care for bounce and firmness.
A modern daily serum combining advanced peptide care with lightweight hydration for skin that looks smoother, plumper, firmer and more radiant.
A Multi-Peptide Firming Complex
GHK-Cu
Copper Tripeptide-1
12
Peptide Complex
EGF
sh-Oligopeptide-1
Copper Tripeptide-1, Matrixyl 3000, Argireline, EGF and a 12-Peptide Complex work together in a concentrated daily routine focused on the appearance of fine lines, smile lines, elasticity and uneven-looking texture.
The serum is designed to support a smoother-looking, firmer-looking complexion while maintaining a lightweight finish for morning and evening routines.
Blue Copper Peptide meets a 12-peptide complex.
A premium blue lab mood tuned to GHK-Cu, Matrixyl 3000, Argireline and EGF.
GHK-Cu
Matrixyl 3000
Argireline
Bakuchiol + Hydration Barrier Support
Bakuchiol
Retinol-alternative care
2%
Niacinamide
HA
Hyaluronic Acid
Bakuchiol, Niacinamide, Adenosine, Tocopherol and Guaiazulene support a more radiant-looking, even-looking complexion as part of a gentle daily skincare routine.
Hydrolyzed Hyaluronic Acid, Collagen, Beta-Glucan, Panthenol and Betaine help maintain comfortable hydration for a soft, supple finish.
Firming care with a soft, hydrated finish.
Bakuchiol for daily firming care plus Hyaluronic Acid, Collagen and Beta-Glucan for comfort and bounce.
Bakuchiol
Niacinamide
HA + Collagen
Key Benefits
Designed around visible skincare results.
CELDYQUE Blue Copper Peptide Bakuchiol Serum pairs Copper Tripeptide-1, Bakuchiol, Matrixyl 3000, Argireline, EGF, Niacinamide and Hyaluronic Acid for lightweight firming, plumping, smoothing and hydration care.
01
Smile Line & Fine Line Care
Helps soften the look of visible smile lines and fine lines for smoother-looking facial contours.
02
Plumping & Firming
Supports firmer-looking elasticity and a fuller, bouncier-looking finish without a heavy feel.
03
Texture Refining
Peptide and Bakuchiol care help improve the look of uneven, rough-looking texture.
04
Lightweight Hydration
Hyaluronic Acid, Collagen, Beta-Glucan and Panthenol help maintain soft, comfortable moisture.
05
Radiant-Looking Finish
Niacinamide, Adenosine and Guaiazulene support a fresh, even-looking glow.
06
Easy Daily Layering
Fragrance-free, fast-absorbing and non-greasy for use under moisturizer, sunscreen and makeup.
Advanced Peptide Architecture
A concentrated blend of recognizable peptide technologies and supporting actives for daily firming and smoothing care.
Copper Tripeptide-1 (GHK-Cu)
The hero blue copper peptide supporting a firmer-looking, revitalized-looking complexion.
Matrixyl 3000
Palmitoyl Tripeptide-1 and Palmitoyl Tetrapeptide-7 for smoother-looking, firmer-looking skin.
Argireline
Acetyl Hexapeptide-8 supports expression-prone fine line care as part of a consistent routine.
EGF (sh-Oligopeptide-1)
A peptide ingredient included in the formula's advanced daily skin-conditioning complex.
Bakuchiol
A gentle retinol-alternative ingredient for firming, smoothing and glow-focused care.
12-Peptide Complex
A multi-peptide approach supporting the appearance of elasticity, texture and facial firmness.
How to Use
1
Prep
After cleansing and toning, make sure the face and neck are ready for serum application.
2
Apply
Apply 2-3 drops to the face and neck. Add a small amount to visible smile-line or fine-line areas as desired.
3
Layer
Gently pat until absorbed, then follow with moisturizer. Use sunscreen as the final morning step.
Use morning and evening. Introduce gradually if your skin is new to active skincare ingredients.
Key Ingredients
Peptides · Hydration · Daily Firming Care
Fragrance-Free
Lightweight
Fast-Absorbing
Non-Greasy
Peptide Complex: Copper Tripeptide-1 (GHK-Cu), Matrixyl 3000, Argireline / Acetyl Hexapeptide-8, EGF / sh-Oligopeptide-1, Palmitoyl Tripeptide-1, Palmitoyl Tetrapeptide-7 and additional peptides in the 12-Peptide Complex.
Firming & Radiance Care: Bakuchiol, Niacinamide 2%, Adenosine, Tocopherol and Guaiazulene.
Hydration Support: Hydrolyzed Hyaluronic Acid, Hydrolyzed Collagen, Beta-Glucan, Panthenol, Allantoin and Betaine.
Refer to the product packaging for the complete and most current ingredient list.
For external use only. Avoid direct contact with the eyes. Perform a patch test before first use. Discontinue use if persistent irritation occurs. Keep out of reach of children.
Product FAQ
Frequently Asked Questions
Answers written for shoppers, search engines and AI summaries looking for clear product guidance.
What is Blue Copper Peptide Bakuchiol Serum used for?
It is a daily Korean face serum designed for the appearance of plumper, firmer, smoother and more hydrated-looking skin.
Can I use it morning and night?
Yes. It is designed for AM and PM routines. Use sunscreen as the final step in the morning.
Is it fragrance-free?
Yes. The formula is positioned as fragrance-free, lightweight and fast-absorbing.
Try CELDYQUE Blue Copper Peptide Bakuchiol Serum.
CELDYQUE Blue Copper Peptide Bakuchiol Serum pairs Copper Tripeptide-1, Bakuchiol, Matrixyl 3000, Argireline, EGF, Niacinamide and Hyaluronic Acid for lightweight firming, plumping, smoothing and hydration care.
Shop on Amazon →
Back to Products
```

**본문의 고유 링크 목적지**

- `CELDYQUÉ` → /index.html
- `Products` → /shop.html
- `About` → /about.html
- `Store` → /store.html
- `FAQ` → /faq.html
- `Shop on Amazon →` → https://www.amazon.com/Copper-Peptide-Bakuchiol-Peptides-Plumping/dp/B0H6DCQPN8?maas=maas_adg_A56A81A3EC8F72AA086ACA835C80CF42_afap_abs&ref_=aa_maas&tag=maas&th=1
- `How to Use` → #how-to-use
- `Contact CELDYQUÉ` → /contact.html

**이미지 소스·대체 설명**

- `/images/제품/ms15.webp`
  - alt: CELDYQUE Blue Copper Peptide Bakuchiol Serum, 30 ml / 1.01 fl oz, dropper bottle
  - 크기: 562 × 703
  - srcset: /images/제품/ms15-320.webp 320w, /images/제품/ms15.webp 562w
- `/images/제품/ms15.webp`
  - alt: CELDYQUE Blue Copper Peptide Bakuchiol Serum, 30 ml / 1.01 fl oz, dropper bottle
  - 크기: 562 × 703
  - srcset: /images/제품/ms15-320.webp 320w, /images/제품/ms15.webp 562w

</details>

<details>
<summary>product-cleansing-oil.html — Pore Purifying Cleansing Oil | CELDYQUE</summary>


원본: [product-cleansing-oil.html](../product-cleansing-oil.html)

**메타 설명**

CELDYQUE Pore Purifying Cleansing Oil is a lightweight cleansing oil with Soybean Oil, LHA, Centella, Tea Tree, Green Tea, Jojoba Seed Oil, Squalane and Panthenol for makeup removal, sunscreen cleansing and blackhead care.

**현재 본문 텍스트**

```text
Products
/ Cleanser / Pore Purifying Cleansing Oil
Lightweight Cleansing Oil
Pore Purifying Cleansing Oil
Centella, Tea Tree and gentle LHA for makeup, sunscreen and pore buildup. · 200 ml / 6.76 fl oz
Cleansing Oil
LHA
Centella
Tea Tree
Green Tea
Jojoba Oil
Squalane
Panthenol
CELDYQUE Pore Purifying Cleansing Oil is a lightweight cleansing oil with Soybean Oil, LHA, Centella, Tea Tree, Green Tea, Jojoba Seed Oil, Squalane and Panthenol for makeup removal, sunscreen cleansing and blackhead care.
Deep pore cleansing and makeup removal
Gentle LHA / Capryloyl Salicylic Acid
Soothing Centella, Tea Tree and Green Tea
Lightweight, non-comedogenic-feel formula
Rinses clean with no greasy residue
Shop on Amazon →
How to Use
Oil Cleanse x LHA
Melt makeup and sunscreen, then rinse clean.
A lightweight first cleanse for pores, blackhead-prone areas and daily sunscreen removal.
Oil-Based Makeup and Sunscreen Removal
2-3
Pumps
Dry Skin
First cleanse
Milky
Emulsifies with water
The cleansing oil is designed to dissolve sunscreen, makeup and daily oil-based buildup before emulsifying with water.
A clean-rinse texture supports a fresh finish without a greasy film.
Deep clean without heaviness.
The original pore-care visual is retained and framed in the updated premium layout.
Makeup
Sunscreen
Sebum
LHA + Botanical Balance
LHA
Gentle pore care
Cica
Comfort
Squalane
Soft finish
LHA / Capryloyl Salicylic Acid supports gentle pore-focused cleansing.
Centella, Tea Tree, Green Tea, Jojoba Seed Oil, Squalane and Panthenol help leave skin soft and balanced after rinsing.
Botanical oil-cleanse support.
A natural ingredient visual from the original page remains part of the story.
LHA
Centella
Tea Tree
Key Benefits
Designed around visible skincare results.
CELDYQUE Pore Purifying Cleansing Oil is a lightweight cleansing oil with Soybean Oil, LHA, Centella, Tea Tree, Green Tea, Jojoba Seed Oil, Squalane and Panthenol for makeup removal, sunscreen cleansing and blackhead care.
01
Makeup Removal
Melts makeup, sunscreen and daily impurities.
02
Blackhead Care
LHA supports pore-focused cleansing routines.
03
Clean Rinse
Emulsifies with water for a non-greasy finish.
04
Soothing Support
Centella, Tea Tree and Green Tea support comfortable cleansing.
05
Soft Skin Feel
Jojoba, Squalane and Panthenol help avoid dryness.
06
First-Cleanse Step
Pairs with foaming cleanser for a double-cleanse routine.
Cleansing Oil Architecture
A first-cleanse system for makeup, sunscreen, sebum and pore-focused care.
Soybean Oil
Oil base for dissolving makeup and sunscreen.
LHA
Gentle pore-care cleansing support.
Centella
Soothing support.
Tea Tree + Green Tea
Botanical balance.
Jojoba + Squalane
Soft emollient finish.
Panthenol
Comforting after-feel.
How to Use
1
Pump
Apply 2-3 pumps to dry skin with dry hands.
2
Massage
Massage gently to dissolve makeup, sunscreen and impurities.
3
Emulsify
Add water until milky, then rinse thoroughly. Follow with cleanser if desired.
Avoid direct contact with eyes. Rinse thoroughly if contact occurs.
Key Ingredients
LHA · Centella · Tea Tree · Cleansing Oil
First Cleanse
Clean Rinse
LHA
Pore Care
Key Ingredients: Glycine Soja / Soybean Oil, Capryloyl Salicylic Acid / LHA, Centella Asiatica Extract, Tea Tree Extract, Green Tea Extract, Jojoba Seed Oil, Squalane and Panthenol.
Benefits: Makeup removal, blackhead care, soothing support and balancing.
Formula: Mineral oil-free, paraben-free and artificial fragrance-free positioning from the original page.
Refer to the product packaging for the complete and most current ingredient list.
For external use only. Avoid direct contact with the eyes. Perform a patch test before first use. Discontinue use if persistent irritation occurs. Keep out of reach of children.
Product FAQ
Frequently Asked Questions
Answers written for shoppers, search engines and AI summaries looking for clear product guidance.
Do I use cleansing oil on wet or dry skin?
Apply it to dry skin first, massage, then add water to emulsify before rinsing.
Can it remove sunscreen?
Yes. It is designed as a first-cleanse step for sunscreen, makeup and oil-based buildup.
Should I double cleanse?
You can follow with a foaming cleanser if desired.
Try CELDYQUE Pore Purifying Cleansing Oil.
CELDYQUE Pore Purifying Cleansing Oil is a lightweight cleansing oil with Soybean Oil, LHA, Centella, Tea Tree, Green Tea, Jojoba Seed Oil, Squalane and Panthenol for makeup removal, sunscreen cleansing and blackhead care.
Shop on Amazon →
Back to Products
```

**본문의 고유 링크 목적지**

- `CELDYQUÉ` → /index.html
- `Products` → /shop.html
- `About` → /about.html
- `Store` → /store.html
- `FAQ` → /faq.html
- `Shop on Amazon →` → https://www.amazon.com/Cleansing-Lightweight-Blackheads-Waterproof-Acne-Prone/dp/B0FKM689SK?maas=maas_adg_8CC3CBC6AC803453B28CA24D0B64DD83_afap_abs&ref_=aa_maas&tag=maas&th=1
- `How to Use` → #how-to-use
- `Contact CELDYQUÉ` → /contact.html

**이미지 소스·대체 설명**

- `/images/제품/Mask group-9.webp`
  - alt: CELDYQUE Pore Purifying Cleansing Oil, 200 ml / 6.76 fl oz, pump bottle
  - 크기: 690 × 978
- `https://images.unsplash.com/photo-1615900119312-2acd3a71f3aa?auto=format&fit=crop&q=80&w=1600`
  - alt: CELDYQUE Pore Purifying Cleansing Oil concept visual
  - 크기: 미지정 × 미지정
- `https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&q=80&w=800`
  - alt: CELDYQUE Pore Purifying Cleansing Oil visual
  - 크기: 미지정 × 미지정
- `https://images.unsplash.com/photo-1540845511934-7721dd7adec3?auto=format&fit=crop&q=80&w=800`
  - alt: CELDYQUE Pore Purifying Cleansing Oil visual
  - 크기: 미지정 × 미지정

</details>

<details>
<summary>product-detail.html — Volufiline 100% Concentrate | CELDYQUÉ</summary>


원본: [product-detail.html](../product-detail.html)

**메타 설명**

설정 없음

**현재 본문 텍스트**

```text
Volufiline 100% Concentrate
This product page has moved. View the current product details.
```

**본문의 고유 링크 목적지**

- `View the current product details.` → /product-volufiline-100.html

**이미지 소스·대체 설명**


</details>

<details>
<summary>product-gentle-cleanser.html — Gentle Cleanser Purifying Touch | CELDYQUE</summary>


원본: [product-gentle-cleanser.html](../product-gentle-cleanser.html)

**메타 설명**

CELDYQUE Gentle Cleanser Purifying Touch is a Korean foaming cleanser with Centella, Tea Tree, Green Tea, AHA, BHA, PHA, Sodium Hyaluronate, Collagen, Niacinamide and Allantoin for pore cleansing and sensitive-looking skin.

**현재 본문 텍스트**

```text
Products
/ Cleanser / Gentle Cleanser Purifying Touch
Daily Pore Cleanser
Gentle Cleanser Purifying Touch
Centella, Tea Tree, Green Tea and AHA/BHA/PHA for a clean, soft finish. · 150 ml / 5.07 fl oz
AHA
BHA
PHA
Centella
Tea Tree
Green Tea
Hyaluronic Acid
Allantoin
CELDYQUE Gentle Cleanser Purifying Touch is a Korean foaming cleanser with Centella, Tea Tree, Green Tea, AHA, BHA, PHA, Sodium Hyaluronate, Collagen, Niacinamide and Allantoin for pore cleansing and sensitive-looking skin.
Triple acid exfoliation with AHA, BHA and PHA
Soothing Centella and Tea Tree Complex
Antioxidant Green Tea support
Hydrating, barrier-friendly formula
Ideal for sensitive-looking and acne-prone skin
Shop on Amazon →
How to Use
AHA x BHA x PHA Cleanse
A daily cleanse that feels fresh, not stripped.
A purifying foaming cleanser for pores, texture and comfortable moisture balance.
Gentle Triple-Acid Cleansing
AHA
Surface polish
BHA
Pore care
PHA
Gentle exfoliation
AHA, BHA and PHA help refine the look of rough texture and excess buildup while keeping the page's claims focused on cosmetic cleansing.
The foaming wash is designed to leave skin feeling clean without a tight, stripped finish.
Fresh foam, refined pores.
The original cleanser texture photo stays in the new layout for continuity.
Foam
Pores
Texture
Centella, Tea Tree and Green Tea Comfort
Cica
Comfort
Tea Tree
Balance
Green Tea
Antioxidant care
Centella, Tea Tree and Green Tea help support a calmer, more balanced post-cleanse feel.
Sodium Hyaluronate, Collagen, Niacinamide and Allantoin add a soft skin-conditioning finish.
Botanical support for daily cleansing.
A botanical visual from the original page supports the cleanser's soothing ingredient story.
Centella
Tea Tree
Green Tea
Key Benefits
Designed around visible skincare results.
CELDYQUE Gentle Cleanser Purifying Touch is a Korean foaming cleanser with Centella, Tea Tree, Green Tea, AHA, BHA, PHA, Sodium Hyaluronate, Collagen, Niacinamide and Allantoin for pore cleansing and sensitive-looking skin.
01
Pore Cleansing
Helps remove daily buildup, excess sebum and impurities.
02
Gentle Exfoliation
AHA, BHA and PHA support smoother-looking texture.
03
Soothing Feel
Centella and Tea Tree support comfortable cleansing.
04
Hydrated Finish
Moisture-supporting ingredients help avoid a stripped feel.
05
Sensitive-Looking Skin
Designed for daily cleansing routines.
06
Makeup Routine Ready
Leaves skin ready for serum, cream and sunscreen.
Cleanser Architecture
A cleanser formula story that balances pore cleansing, exfoliation and skin comfort.
AHA
Surface exfoliation support.
BHA
Pore-focused cleansing support.
PHA
Gentler exfoliation profile.
Centella
Soothing support.
Tea Tree + Green Tea
Balanced botanical care.
Hyaluronic Acid + Allantoin
Hydrated, comfortable finish.
How to Use
1
Lather
Dispense a small amount and lather with water.
2
Massage
Gently massage over damp face, avoiding the eye area.
3
Rinse
Rinse thoroughly and follow with toner, serum and moisturizer.
Use morning and evening. Reduce frequency if your skin feels dry.
Key Ingredients
AHA · BHA · PHA · Centella
Foaming Cleanser
Pore Care
Daily Wash
Soft Finish
Key Ingredients: Centella Asiatica Extract, Tea Tree Extract, Green Tea Leaf Powder, Sodium Cocoyl Isethionate, Glycerin, Sodium Hyaluronate, Hydrolyzed Collagen, Niacinamide and Allantoin.
Benefits: Pore cleansing, exfoliation, soothing support and hydration.
Formula: Lightweight foaming wash that leaves no residue.
Refer to the product packaging for the complete and most current ingredient list.
For external use only. Avoid direct contact with the eyes. Perform a patch test before first use. Discontinue use if persistent irritation occurs. Keep out of reach of children.
Product FAQ
Frequently Asked Questions
Answers written for shoppers, search engines and AI summaries looking for clear product guidance.
Is this a foaming cleanser?
Yes. It is a foaming wash for daily pore cleansing.
Does it contain exfoliating acids?
Yes. The page positions the formula around AHA, BHA and PHA.
What should I use after cleansing?
Follow with toner, serum and moisturizer. Use sunscreen in the morning.
Try CELDYQUE Gentle Cleanser Purifying Touch.
CELDYQUE Gentle Cleanser Purifying Touch is a Korean foaming cleanser with Centella, Tea Tree, Green Tea, AHA, BHA, PHA, Sodium Hyaluronate, Collagen, Niacinamide and Allantoin for pore cleansing and sensitive-looking skin.
Shop on Amazon →
Back to Products
```

**본문의 고유 링크 목적지**

- `CELDYQUÉ` → /index.html
- `Products` → /shop.html
- `About` → /about.html
- `Store` → /store.html
- `FAQ` → /faq.html
- `Shop on Amazon →` → https://www.amazon.com/Exfoliant-Cleansing-Minimizer-Acne-Prone-Non-Stripping/dp/B0FGPXK14C?maas=maas_adg_FD9A03F5A5E1C2F315E98D088BF02599_afap_abs&ref_=aa_maas&tag=maas&th=1
- `How to Use` → #how-to-use
- `Contact CELDYQUÉ` → /contact.html

**이미지 소스·대체 설명**

- `/images/제품/Mask group-11.webp`
  - alt: CELDYQUE Gentle Cleanser Purifying Touch, 150 ml / 5.07 fl oz, cleanser tube
  - 크기: 690 × 978
- `https://images.unsplash.com/photo-1491497895121-1334fc14d8c9?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`
  - alt: CELDYQUE Gentle Cleanser Purifying Touch concept visual
  - 크기: 미지정 × 미지정
- `https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&q=80&w=800`
  - alt: CELDYQUE Gentle Cleanser Purifying Touch visual
  - 크기: 미지정 × 미지정
- `https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&q=80&w=800`
  - alt: CELDYQUE Gentle Cleanser Purifying Touch visual
  - 크기: 미지정 × 미지정

</details>

<details>
<summary>product-glutathione-30000.html — Glutathione Glow Serum 30,000 ppm | CELDYQUE</summary>


원본: [product-glutathione-30000.html](../product-glutathione-30000.html)

**메타 설명**

CELDYQUE Glutathione Glow Serum 30,000 ppm combines Glutathione, Niacinamide, Resveratrol, 5-type Hyaluronic Acid, Ceramide NP, Panthenol and botanical proteins for radiance, dark spot appearance and hydration care.

**현재 본문 텍스트**

```text
Products
/ Face Serum / Glutathione Glow Serum 30,000 ppm
Radiance-Boosting Serum
Glutathione Glow Serum 30,000 ppm
Glutathione 30,000 ppm, Niacinamide and Resveratrol for bright-looking glow. · 30 ml / 1 fl oz
Glutathione 30,000 ppm
Niacinamide
Resveratrol
5x Hyaluronic Acid
Ceramide NP
Panthenol
Radiance
Dark Spot Care
CELDYQUE Glutathione Glow Serum 30,000 ppm combines Glutathione, Niacinamide, Resveratrol, 5-type Hyaluronic Acid, Ceramide NP, Panthenol and botanical proteins for radiance, dark spot appearance and hydration care.
Glutathione 30,000 ppm for radiance
Niacinamide and Resveratrol for tone correction appearance
5x Hyaluronic Acid Complex for deep hydration feel
Ceramide NP and Panthenol for barrier support
Visibly smooths texture and refines the look of pores
Shop on Amazon →
How to Use
Glutathione x Niacinamide
A glow serum for brighter-looking, even-looking skin.
Radiance support, hydration and barrier comfort in a lightweight daily serum.
30,000 ppm Glutathione Radiance
30,000 ppm
Glutathione
Niacinamide
Tone care
Resveratrol
Antioxidant story
Glutathione 30,000 ppm gives the page a clear radiance-focused ingredient signal for search and AI summaries.
Niacinamide and Resveratrol support the appearance of more even-looking tone and a fresh glow.
Radiance with a refined serum finish.
The original radiant complexion image is preserved inside the new layout.
Glutathione
Niacinamide
Resveratrol
Hydration + Barrier Comfort
5x
Hyaluronic Acid
Ceramide
Barrier support
Panthenol
Comfort
Five types of Hyaluronic Acid help provide lightweight hydration without a greasy feel.
Ceramide NP and Panthenol help support a comfortable moisture barrier.
Deep hydration without heaviness.
The original hydration visual continues the product's moisture story.
Hyaluronic Acid
Ceramide
Panthenol
Key Benefits
Designed around visible skincare results.
CELDYQUE Glutathione Glow Serum 30,000 ppm combines Glutathione, Niacinamide, Resveratrol, 5-type Hyaluronic Acid, Ceramide NP, Panthenol and botanical proteins for radiance, dark spot appearance and hydration care.
01
Radiance Boost
Glutathione and Niacinamide support bright-looking skin.
02
Dark Spot Appearance Care
Targets the look of uneven tone and post-acne marks.
03
Texture Refining
Helps skin look smoother and fresher.
04
Hydration
5-type Hyaluronic Acid supports comfortable moisture.
05
Barrier Support
Ceramide NP and Panthenol support moisture-barrier comfort.
06
Lightweight Glow
Fast-absorbing serum texture leaves a dewy finish.
Glow Serum Architecture
A radiance-focused serum system with hydration and barrier support built in.
Glutathione 30,000 ppm
Hero bright-looking radiance active.
Niacinamide
Tone and texture support.
Resveratrol
Antioxidant care story.
5x Hyaluronic Acid
Multi-depth hydration feel.
Ceramide NP
Barrier support.
Panthenol
Comforting moisture support.
How to Use
1
Apply
After cleansing and toning, apply 2-3 drops to the face.
2
Pat
Gently pat until absorbed.
3
Layer
Follow with moisturizer and use sunscreen in the morning.
Use consistently for best visible radiance results.
Key Ingredients
Glutathione · Niacinamide · Resveratrol
Glow Serum
Hydrating
Dewy Finish
Tone Care
Key Ingredients: Glutathione 30,000 ppm, Niacinamide, 5-type Hyaluronic Acid Complex, Ceramide NP, Panthenol, Resveratrol and Hydrolyzed Vegetable Proteins.
Benefits: Bright-looking radiance, even-looking tone, hydration and soothing support.
Texture: Lightweight, fast-absorbing serum that leaves a dewy finish.
Refer to the product packaging for the complete and most current ingredient list.
For external use only. Avoid direct contact with the eyes. Perform a patch test before first use. Discontinue use if persistent irritation occurs. Keep out of reach of children.
Product FAQ
Frequently Asked Questions
Answers written for shoppers, search engines and AI summaries looking for clear product guidance.
What is Glutathione Glow Serum for?
It is a radiance serum for bright-looking, even-looking, hydrated skin.
Can I use it daily?
Yes. Use morning or evening as tolerated.
Should I use sunscreen?
Yes. Sunscreen helps support tone-care routines during the day.
Try CELDYQUE Glutathione Glow Serum 30,000 ppm.
CELDYQUE Glutathione Glow Serum 30,000 ppm combines Glutathione, Niacinamide, Resveratrol, 5-type Hyaluronic Acid, Ceramide NP, Panthenol and botanical proteins for radiance, dark spot appearance and hydration care.
Shop on Amazon →
Back to Products
```

**본문의 고유 링크 목적지**

- `CELDYQUÉ` → /index.html
- `Products` → /shop.html
- `About` → /about.html
- `Store` → /store.html
- `FAQ` → /faq.html
- `Shop on Amazon →` → https://www.amazon.com/Glutathione-Serum-Spots-Uneven-Radiance-Boosting/dp/B0DP4FG8B9?maas=maas_adg_D93AB1E59E3F992E567F61E5457CA82B_afap_abs&ref_=aa_maas&tag=maas&th=1
- `How to Use` → #how-to-use
- `Contact CELDYQUÉ` → /contact.html

**이미지 소스·대체 설명**

- `/images/제품/Mask group-2.webp`
  - alt: CELDYQUE Glutathione Glow Serum 30,000 ppm, 30 ml / 1 fl oz, dropper bottle
  - 크기: 690 × 978
- `https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&q=80&w=1600`
  - alt: CELDYQUE Glutathione Glow Serum 30,000 ppm concept visual
  - 크기: 미지정 × 미지정
- `https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&q=80&w=800`
  - alt: CELDYQUE Glutathione Glow Serum 30,000 ppm visual
  - 크기: 미지정 × 미지정
- `https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&q=80&w=800`
  - alt: CELDYQUE Glutathione Glow Serum 30,000 ppm visual
  - 크기: 미지정 × 미지정

</details>

<details>
<summary>product-niacinamide-20-advanced.html — Niacinamide 20% Advanced Serum | CELDYQUE</summary>


원본: [product-niacinamide-20-advanced.html](../product-niacinamide-20-advanced.html)

**메타 설명**

CELDYQUE Niacinamide 20% Advanced Serum uses a 63.3% Rosa Damascena Flower Water base with 20% Niacinamide, Green Tea 1%, Hyaluronic Acid and Beta-Glucan for pore appearance, tone and texture care.

**현재 본문 텍스트**

```text
Products
/ Face Serum / Niacinamide 20% Pore Minimizer Serum
High-Strength Pore Serum
Niacinamide 20% Pore Minimizer Serum
20% Niacinamide with Damask Rose Water, Green Tea, Hyaluronic Acid and Beta-Glucan. · 30 ml / 1 fl oz
Niacinamide 20%
Rose Water 63.3%
Green Tea 1%
Hyaluronic Acid
Beta-Glucan
Pore Care
Fragrance-Free
Vegan
CELDYQUE Niacinamide 20% Advanced Serum uses a 63.3% Rosa Damascena Flower Water base with 20% Niacinamide, Green Tea 1%, Hyaluronic Acid and Beta-Glucan for pore appearance, tone and texture care.
Intense 20% Niacinamide for pores and tone
63.3% Rosa Damascena Flower Water base
Green Tea Extract 1% for antioxidant care
Hyaluronic Acid and Beta-Glucan for plump-looking hydration
Vegan, fragrance-free and non-sticky
Shop on Amazon →
How to Use
Niacinamide 20% x Rose Water
High-strength pore care with a hydrated finish.
A concentrated serum for enlarged-looking pores, uneven texture, dullness and shine-prone routines.
20% Niacinamide Pore Appearance Care
20%
Niacinamide
Pores
Texture support
Tone
Even-looking glow
High-strength 20% Niacinamide gives the product a clear pore-care and tone-care search signal.
The formula is designed for dullness, uneven texture and enlarged pore appearance without a sticky finish.
Refined skin texture story.
The existing refined texture image is preserved inside the updated design.
Niacinamide
Pores
Texture
Rose Water + Green Tea Base
63.3%
Rose Water
1%
Green Tea
0.5%
Beta-Glucan
Instead of a plain water story, this serum highlights Rosa Damascena Flower Water and Green Tea for a soothing, premium base.
Hyaluronic Acid and Beta-Glucan help keep the high-active serum hydrated and comfortable.
Hydration with a soft rose-water base.
The original rose hydration visual remains in place for continuity.
Rose Water
Green Tea
Beta-Glucan
Key Benefits
Designed around visible skincare results.
CELDYQUE Niacinamide 20% Advanced Serum uses a 63.3% Rosa Damascena Flower Water base with 20% Niacinamide, Green Tea 1%, Hyaluronic Acid and Beta-Glucan for pore appearance, tone and texture care.
01
Pore Appearance Care
20% Niacinamide supports the look of refined pores.
02
Tone Evening
Helps improve the appearance of dull, uneven-looking tone.
03
Texture Smoothing
Supports a smoother, clearer-looking skin surface.
04
Hydration
Hyaluronic Acid and Beta-Glucan support plump-looking moisture.
05
Soothing Base
Rose Water and Green Tea support comfort.
06
Non-Sticky Finish
Lightweight gel-liquid texture layers easily.
Niacinamide Serum Architecture
A concentrated formula story for pore, tone, texture and hydration search intent.
Niacinamide 20%
Hero active for pore appearance and tone care.
Rosa Damascena Flower Water 63.3%
Premium soothing base.
Green Tea Extract 1%
Antioxidant skincare support.
Hyaluronic Acid
Hydration and plump-looking moisture.
Beta-Glucan 0.5%
Comforting hydration support.
EWG Green Positioning
Original page notes EWG green grade ingredients.
How to Use
1
Apply
After cleansing and toner, apply a few drops to the face.
2
Adapt
Start slowly if your skin is new to 20% Niacinamide.
3
Layer
Follow with moisturizer and sunscreen in the morning.
Patch test recommended because of the high 20% concentration.
Key Ingredients
Niacinamide · Rose Water · Green Tea
Fragrance-Free
Vegan
Non-Sticky
Pore Serum
Key Ingredients: Rosa Damascena Flower Water 63.3%, Niacinamide 20%, Glycerin, Butylene Glycol, Green Tea Leaf Extract, Hydrolyzed Sodium Hyaluronate, Beta-Glucan and supporting formula ingredients.
Benefits: Pore minimizing appearance, tone evening, hydration and age-defying-looking care.
Texture: Lightweight, non-sticky liquid gel with EWG green grade positioning from the original page.
Refer to the product packaging for the complete and most current ingredient list.
For external use only. Avoid direct contact with the eyes. Perform a patch test before first use. Discontinue use if persistent irritation occurs. Keep out of reach of children.
Product FAQ
Frequently Asked Questions
Answers written for shoppers, search engines and AI summaries looking for clear product guidance.
Is 20% Niacinamide strong?
Yes. It is a high-strength niacinamide serum, so introduce gradually if your skin is new to it.
What is it best for?
It is best positioned for pore appearance, tone, texture and hydration support.
Can I use it under makeup?
Yes. The lightweight, non-sticky texture is designed to layer well.
Try CELDYQUE Niacinamide 20% Pore Minimizer Serum.
CELDYQUE Niacinamide 20% Advanced Serum uses a 63.3% Rosa Damascena Flower Water base with 20% Niacinamide, Green Tea 1%, Hyaluronic Acid and Beta-Glucan for pore appearance, tone and texture care.
Shop on Amazon →
Back to Products
```

**본문의 고유 링크 목적지**

- `CELDYQUÉ` → /index.html
- `Products` → /shop.html
- `About` → /about.html
- `Store` → /store.html
- `FAQ` → /faq.html
- `Shop on Amazon →` → https://www.amazon.com/Niacinamide-Concentrated-Hyaluronic-Beta-Glucan-Defying-Aging/dp/B0C2PH12CR?maas=maas_adg_9D8A330F96AA01A13A0033A6A67C5609_afap_abs&ref_=aa_maas&tag=maas&th=1
- `How to Use` → #how-to-use
- `Contact CELDYQUÉ` → /contact.html

**이미지 소스·대체 설명**

- `/images/제품/Mask group-8.webp`
  - alt: CELDYQUE Niacinamide 20% Pore Minimizer Serum, 30 ml / 1 fl oz, pump bottle
  - 크기: 690 × 978
- `https://images.unsplash.com/photo-1527066236128-2ff79f7b9705?q=80&w=1176&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`
  - alt: CELDYQUE Niacinamide 20% Pore Minimizer Serum concept visual
  - 크기: 미지정 × 미지정
- `https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&q=80&w=800`
  - alt: CELDYQUE Niacinamide 20% Pore Minimizer Serum visual
  - 크기: 미지정 × 미지정
- `https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&q=80&w=800`
  - alt: CELDYQUE Niacinamide 20% Pore Minimizer Serum visual
  - 크기: 미지정 × 미지정

</details>

<details>
<summary>product-pdrn-12-egf-cream.html — PDRN 12% + EGF Peptide Cream | CELDYQUE Korean Skincare</summary>


원본: [product-pdrn-12-egf-cream.html](../product-pdrn-12-egf-cream.html)

**메타 설명**

CELDYQUE PDRN 12% + EGF Peptide Cream combines Sodium DNA PDRN, Volufiline, Niacinamide, EGF, Ceramide, Panthenol, Hyaluronic Acid, Jojoba Seed Oil and Squalane for soothing barrier and firm-looking care.

**현재 본문 텍스트**

```text
Products
/ Cream / PDRN 12% + EGF Peptide Cream
PDRN Barrier Cream
PDRN 12% + EGF Peptide Cream
Volufiline, Salmon DNA, EGF and barrier-supporting moisture for sensitive-looking skin. · 50 ml / 1.7 fl oz
PDRN 12%
EGF
Volufiline
Ceramide
Panthenol
Hyaluronic Acid
Jojoba
Squalane
CELDYQUE PDRN 12% + EGF Peptide Cream combines Sodium DNA PDRN, Volufiline, Niacinamide, EGF, Ceramide, Panthenol, Hyaluronic Acid, Jojoba Seed Oil and Squalane for soothing barrier and firm-looking care.
PDRN 120,000 ppm + EGF Complex
Volufiline + Phyto PDRN for firm-looking care
Hydration barrier matrix with Ceramide and Panthenol
Ideal for post-care and sensitive-looking skin
Lightweight, non-greasy satin finish
Shop on Amazon →
How to Use
PDRN Cream x EGF
Barrier comfort with a firm-looking finish.
A moisturizing cream made for routines that need hydration, calm and visible elasticity support.
PDRN Barrier Moisture
120,000 ppm
PDRN
EGF
Peptide care
Cream
Satin texture
PDRN and EGF support a revitalized-looking skincare routine while the cream texture helps seal hydration.
This page preserves the original soothing hydration imagery while adding richer semantic SEO structure.
Comforting cream texture.
A clean hydration visual aligned with the product's post-care positioning.
PDRN
EGF
Cream
Volufiline + Barrier Support
Volufiline
Firm-looking care
Ceramide
Barrier support
Squalane
Soft finish
Volufiline and Salmon DNA support the look of firmer, fuller-looking skin.
Ceramide, Panthenol, Hyaluronic Acid, Jojoba Seed Oil and Squalane help the cream feel comfortable and non-greasy.
Firmness care meets cushion moisture.
A skin-focused visual reused from the original page for recognizable continuity.
Volufiline
Ceramide
Squalane
Key Benefits
Designed around visible skincare results.
CELDYQUE PDRN 12% + EGF Peptide Cream combines Sodium DNA PDRN, Volufiline, Niacinamide, EGF, Ceramide, Panthenol, Hyaluronic Acid, Jojoba Seed Oil and Squalane for soothing barrier and firm-looking care.
01
Deep Hydration
Cream texture helps keep skin comfortable and moisturized.
02
Barrier Repair Look
Ceramide and Panthenol support a resilient moisture barrier.
03
Elasticity Support
PDRN, EGF and Volufiline support a firmer-looking finish.
04
Soothing Care
Designed for sensitive-looking or post-care routines.
05
Non-Greasy Finish
Absorbs with a lightweight satin feel.
06
Daily Cream Step
Works after serum morning or evening.
PDRN Cream Architecture
A cream system focused on PDRN, EGF, Volufiline and barrier-supporting ingredients.
PDRN 12%
Sodium DNA and phyto PDRN positioning for skin-conditioning care.
EGF
Peptide care for a revitalized-looking routine.
Volufiline
Fuller-looking firmness support.
Ceramide NP
Moisture-barrier support.
Panthenol
Comforting hydration.
Jojoba + Squalane
Soft, non-greasy emollient finish.
How to Use
1
Apply
After serum, apply a moderate amount to the face and neck.
2
Target
Add a little extra to dry or sensitive-looking areas.
3
Protect
Use as the cream step. In the morning, follow with sunscreen.
Patch test before first use, especially after professional skin treatments.
Key Ingredients
PDRN · EGF · Volufiline · Barrier Cream
Barrier Cream
Non-Greasy
PDRN 12%
EGF
Key Ingredients: Sodium DNA / PDRN, Volufiline, Niacinamide, Ceramide NP, Panthenol, Hyaluronic Acid, sh-Oligopeptide-1 / EGF, Jojoba Seed Oil and Squalane.
Benefits: Deep hydration, barrier support, elasticity care and soothing comfort.
Texture: Silky, lightweight cream that absorbs quickly without greasiness.
Refer to the product packaging for the complete and most current ingredient list.
For external use only. Avoid direct contact with the eyes. Perform a patch test before first use. Discontinue use if persistent irritation occurs. Keep out of reach of children.
Product FAQ
Frequently Asked Questions
Answers written for shoppers, search engines and AI summaries looking for clear product guidance.
Who is PDRN 12% + EGF Peptide Cream for?
It is for routines focused on hydration, barrier comfort and firm-looking care.
Can I pair it with the PDRN serum?
Yes. Apply serum first, then use this as the cream step.
Is it greasy?
It is positioned as a lightweight cream with a non-greasy satin finish.
Try CELDYQUE PDRN 12% + EGF Peptide Cream.
CELDYQUE PDRN 12% + EGF Peptide Cream combines Sodium DNA PDRN, Volufiline, Niacinamide, EGF, Ceramide, Panthenol, Hyaluronic Acid, Jojoba Seed Oil and Squalane for soothing barrier and firm-looking care.
Shop on Amazon →
Back to Products
```

**본문의 고유 링크 목적지**

- `CELDYQUÉ` → /index.html
- `Products` → /shop.html
- `About` → /about.html
- `Store` → /store.html
- `FAQ` → /faq.html
- `Shop on Amazon →` → https://www.amazon.com/CELDYQUE-PDRN-Peptide-Cream-Microneedling/dp/B0FJY6SCPX?maas=maas_adg_216C98761617EBF7B80D255DB5F838E4_afap_abs&ref_=aa_maas&tag=maas&th=1
- `How to Use` → #how-to-use
- `Contact CELDYQUÉ` → /contact.html

**이미지 소스·대체 설명**

- `/images/제품/Mask group-6.webp`
  - alt: CELDYQUE PDRN 12% + EGF Peptide Cream, 50 ml / 1.7 fl oz, cream jar
  - 크기: 690 × 978
- `https://images.unsplash.com/photo-1504548840739-580b10ae7715?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`
  - alt: CELDYQUE PDRN 12% + EGF Peptide Cream concept visual
  - 크기: 미지정 × 미지정
- `https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&q=80&w=800`
  - alt: CELDYQUE PDRN 12% + EGF Peptide Cream visual
  - 크기: 미지정 × 미지정
- `https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&q=80&w=800`
  - alt: CELDYQUE PDRN 12% + EGF Peptide Cream visual
  - 크기: 미지정 × 미지정

</details>

<details>
<summary>product-pdrn-12-egf.html — PDRN 12% + EGF Peptide Serum | CELDYQUE Korean Skincare</summary>


원본: [product-pdrn-12-egf.html](../product-pdrn-12-egf.html)

**메타 설명**

CELDYQUE PDRN 12% + EGF Peptide Serum combines 120,000 ppm PDRN complex, EGF, peptides, Volufiline, Niacinamide, Ceramide, Panthenol and Hyaluronic Acid for Korean booster-style skincare.

**현재 본문 텍스트**

```text
Products
/ Face Serum / PDRN 12% + EGF Peptide Serum
Microneedling-Friendly Serum
PDRN 12% + EGF Peptide Serum
PDRN, EGF, Volufiline and peptides for glassy, firm-looking skin care. · 30 ml / 1 fl oz
PDRN 12%
EGF
Volufiline
Niacinamide
Peptides
Liposome
Ceramide
Panthenol
CELDYQUE PDRN 12% + EGF Peptide Serum combines 120,000 ppm PDRN complex, EGF, peptides, Volufiline, Niacinamide, Ceramide, Panthenol and Hyaluronic Acid for Korean booster-style skincare.
12% PDRN Complex with Salmon DNA + Phyto PDRN
EGF and multi-peptides for firm-looking care
Volufiline for volume and elasticity appearance
Niacinamide 20,000 ppm for bright-looking tone
Liposome technology for an elegant serum texture
Shop on Amazon →
How to Use
PDRN x EGF x Volufiline
A Korean booster serum for bounce and glow.
Designed for routines focused on visible firmness, smoother texture, hydration and post-care comfort.
PDRN 12% Booster Complex
120,000 ppm
PDRN complex
EGF
Growth factor peptide
Liposome
Delivery support
The formula centers on a 120,000 ppm PDRN complex combining Sodium DNA and phyto PDRN positioning for concentrated skin-conditioning care.
Liposome technology helps create a refined, lightweight serum experience for daily and post-care routines.
Advanced bio-science texture.
A clean lab visual that keeps PDRN and EGF as the main search-readable formula story.
PDRN
EGF
Liposome
Volufiline and Peptide Bounce
Volufiline
Fuller-looking care
2%
Niacinamide
Barrier
Ceramide + Panthenol
Volufiline, EGF and peptides support the appearance of bouncy, elastic-looking skin.
Niacinamide, Ceramide, Panthenol and Hyaluronic Acid complete the formula with radiance and moisture-barrier support.
Radiance, bounce and barrier care.
A soft skin visual reused from the original page to preserve the product's existing image language.
Volufiline
Peptides
Niacinamide
Key Benefits
Designed around visible skincare results.
CELDYQUE PDRN 12% + EGF Peptide Serum combines 120,000 ppm PDRN complex, EGF, peptides, Volufiline, Niacinamide, Ceramide, Panthenol and Hyaluronic Acid for Korean booster-style skincare.
01
Booster-Style PDRN Care
12% PDRN complex supports revitalized-looking skin.
02
Firm-Looking Bounce
EGF, peptides and Volufiline support elastic-looking facial contours.
03
Radiance Support
Niacinamide helps improve the appearance of uneven tone.
04
Barrier Comfort
Ceramide and Panthenol help maintain comfortable moisture.
05
Post-Care Friendly
Designed for sensitive-looking or post-procedure-style routines.
06
Lightweight Texture
Fast-absorbing serum feel without stickiness.
PDRN + Peptide Architecture
A search-friendly breakdown of the formula's strongest ingredient signals.
PDRN 12%
120,000 ppm PDRN complex with Salmon DNA and phyto PDRN positioning.
EGF
Growth-factor peptide ingredient for skin-conditioning support.
Volufiline
Fuller-looking firmness care.
Niacinamide 20,000 ppm
Bright-looking tone and texture support.
Ceramide + Panthenol
Barrier-supporting comfort.
Hyaluronic Acid
Lightweight hydration support.
How to Use
1
Prep
Use after cleansing and toner.
2
Apply
Apply 2-3 drops over the face or targeted areas.
3
Layer
Follow with cream. Use sunscreen in the morning.
For microneedling-style routines, follow professional guidance and use only on skin that is ready for topical skincare.
Key Ingredients
PDRN · EGF · Volufiline · Peptides
PDRN 12%
EGF
Volufiline
Liposome
Key Ingredients: PDRN 120,000 ppm, Sodium DNA, phyto PDRN, Niacinamide 20,000 ppm, Volufiline, EGF, Acetyl Hexapeptide-8, Ceramide, Panthenol and Hyaluronic Acid Complex.
Technology: Liposome encapsulation for an elegant serum delivery story.
Texture: Lightweight, non-sticky and fast-absorbing.
Refer to the product packaging for the complete and most current ingredient list.
For external use only. Avoid direct contact with the eyes. Perform a patch test before first use. Discontinue use if persistent irritation occurs. Keep out of reach of children.
Product FAQ
Frequently Asked Questions
Answers written for shoppers, search engines and AI summaries looking for clear product guidance.
What is PDRN 12% + EGF Peptide Serum?
It is a Korean booster-style serum centered on PDRN, EGF, peptides and Volufiline for firm-looking, hydrated, radiant-looking care.
Can I use it every day?
Yes, introduce gradually and use as tolerated before moisturizer.
Does it replace moisturizer?
No. Apply it as a serum step and follow with cream or moisturizer.
Try CELDYQUE PDRN 12% + EGF Peptide Serum.
CELDYQUE PDRN 12% + EGF Peptide Serum combines 120,000 ppm PDRN complex, EGF, peptides, Volufiline, Niacinamide, Ceramide, Panthenol and Hyaluronic Acid for Korean booster-style skincare.
Shop on Amazon →
Back to Products
```

**본문의 고유 링크 목적지**

- `CELDYQUÉ` → /index.html
- `Products` → /shop.html
- `About` → /about.html
- `Store` → /store.html
- `FAQ` → /faq.html
- `Shop on Amazon →` → https://www.amazon.com/Salmon-Peptide-Microneedling-Volufiline-Growth/dp/B0F1Y8DML3?maas=maas_adg_650A715F4856800A04724A06656CFF91_afap_abs&ref_=aa_maas&tag=maas&th=1
- `How to Use` → #how-to-use
- `Contact CELDYQUÉ` → /contact.html

**이미지 소스·대체 설명**

- `/images/제품/Mask group.webp`
  - alt: CELDYQUE PDRN 12% + EGF Peptide Serum, 30 ml / 1 fl oz, dropper bottle
  - 크기: 690 × 978
- `https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&q=80&w=1600`
  - alt: CELDYQUE PDRN 12% + EGF Peptide Serum concept visual
  - 크기: 미지정 × 미지정
- `https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&q=80&w=800`
  - alt: CELDYQUE PDRN 12% + EGF Peptide Serum visual
  - 크기: 미지정 × 미지정
- `https://images.unsplash.com/photo-1612181092745-472157c10002?q=80&w=1026&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`
  - alt: CELDYQUE PDRN 12% + EGF Peptide Serum visual
  - 크기: 미지정 × 미지정

</details>

<details>
<summary>product-pdrn-25.html — PDRN 25% Concentrate | CELDYQUE Korean Skincare</summary>


원본: [product-pdrn-25.html](../product-pdrn-25.html)

**메타 설명**

CELDYQUE PDRN 25% Concentrate features 250,000 ppm Sodium DNA PDRN with EGF peptide, Panthenol and hydration support in a lightweight booster for elastic-looking, dewy-looking skin.

**현재 본문 텍스트**

```text
Products
/ Face Serum / PDRN 250,000ppm Concentrate
High-Concentration PDRN Booster
PDRN 250,000ppm Concentrate
Salmon DNA booster with EGF and peptide synergy for firm-looking glow. · 30 ml / 1 fl oz
PDRN 250,000 ppm
Sodium DNA
EGF
Peptide Complex
Panthenol
Hydration Booster
CELDYQUE PDRN 25% Concentrate features 250,000 ppm Sodium DNA PDRN with EGF peptide, Panthenol and hydration support in a lightweight booster for elastic-looking, dewy-looking skin.
High concentration PDRN 250,000 ppm (25%)
EGF and multi-peptide complex
Panthenol for hydration and barrier support
Visibly firms, smooths and brightens
DIY booster: mix with serum or cream
Shop on Amazon →
How to Use
PDRN 25% x EGF
A concentrated booster for elastic-looking glow.
High-level PDRN care in a lightweight format made to blend into targeted serum or cream routines.
250,000 ppm PDRN Concentration
25%
PDRN
DNA
Sodium DNA
30 ml
Booster serum
PDRN is a DNA complex widely used in Korean skincare stories for skin-conditioning and revitalized-looking care.
With 250,000 ppm PDRN, this concentrate is designed as a focused booster for tired, dull or less elastic-looking skin.
High-concentration PDRN care.
A water-and-light visual that keeps the booster texture and PDRN story visible.
PDRN
Booster
Glow
EGF and Peptide Synergy
EGF
Peptide support
Panthenol
Moisture comfort
Fast
Lightweight texture
EGF peptide and a multi-peptide complex complement the PDRN story for smoother-looking firmness and a fresh finish.
Panthenol and humectants help keep the formula comfortable as a mix-in or direct-use booster.
Peptide-supported recovery care.
A lab-inspired visual anchored to EGF, peptides and hydration support.
EGF
Peptides
Panthenol
Key Benefits
Designed around visible skincare results.
CELDYQUE PDRN 25% Concentrate features 250,000 ppm Sodium DNA PDRN with EGF peptide, Panthenol and hydration support in a lightweight booster for elastic-looking, dewy-looking skin.
01
Elasticity Support
Helps skin look firmer and more resilient with consistent use.
02
PDRN Booster Care
250,000 ppm PDRN gives the page a clear high-concentration ingredient story.
03
Hydration Comfort
Panthenol and humectants support a comfortable finish.
04
Glow Enhancement
Designed for dull, tired-looking skin.
05
Custom Routine
Can be layered or mixed with compatible skincare.
06
Lightweight Feel
Fast-absorbing liquid texture for daily care.
PDRN Booster Architecture
A focused system built around PDRN, EGF, peptides and hydration support.
PDRN 250,000 ppm
High-concentration Sodium DNA booster care.
EGF
Peptide skin-conditioning support.
Multi-Peptide Complex
Supports smoother-looking, firmer-looking skin.
Panthenol
Comforting hydration and barrier support.
Humectants
Lightweight moisture for a fresh finish.
Mix-In Format
Can be customized with compatible serum or cream.
How to Use
1
Apply
Use after cleansing and toning on clean skin.
2
Boost
Apply a few drops directly or mix with compatible serum or cream.
3
Seal
Follow with moisturizer. Use sunscreen in the morning.
Introduce gradually if your skin is new to concentrated active formulas.
Key Ingredients
PDRN · EGF · Peptides · Panthenol
Booster
Fast-Absorbing
Mix-In
High PDRN
Key Ingredients: Sodium DNA / PDRN 250,000 ppm, rh-Oligopeptide-1 / EGF, Panthenol, Water, Propylene Glycol, Butylene Glycol and moisturizing support ingredients.
Benefits: Elasticity boost, deep hydration, barrier support and glow enhancement.
Texture: Lightweight, fast-absorbing liquid type.
Refer to the product packaging for the complete and most current ingredient list.
For external use only. Avoid direct contact with the eyes. Perform a patch test before first use. Discontinue use if persistent irritation occurs. Keep out of reach of children.
Product FAQ
Frequently Asked Questions
Answers written for shoppers, search engines and AI summaries looking for clear product guidance.
What does PDRN 25% mean?
It refers to the page's 250,000 ppm PDRN positioning in a concentrated skincare booster.
Can I mix it with cream?
Yes. The product is positioned as a booster that can be mixed with compatible serum or cream.
When should I use it?
Use after cleansing and toning, then follow with moisturizer.
Try CELDYQUE PDRN 250,000ppm Concentrate.
CELDYQUE PDRN 25% Concentrate features 250,000 ppm Sodium DNA PDRN with EGF peptide, Panthenol and hydration support in a lightweight booster for elastic-looking, dewy-looking skin.
Shop on Amazon →
Back to Products
```

**본문의 고유 링크 목적지**

- `CELDYQUÉ` → /index.html
- `Products` → /shop.html
- `About` → /about.html
- `Store` → /store.html
- `FAQ` → /faq.html
- `Shop on Amazon →` → https://www.amazon.com/Salmon-PDRN-Concentrate-Skincare-Booster/dp/B0FMFBGW9N?maas=maas_adg_423AC43EAAC0FDA7535EF6FE63667104_afap_abs&ref_=aa_maas&tag=maas&th=1
- `How to Use` → #how-to-use
- `Contact CELDYQUÉ` → /contact.html

**이미지 소스·대체 설명**

- `/images/제품/Mask group-3.webp`
  - alt: CELDYQUE PDRN 250,000ppm Concentrate, 30 ml / 1 fl oz, dropper bottle
  - 크기: 690 × 978
- `https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&q=80&w=1600`
  - alt: CELDYQUE PDRN 250,000ppm Concentrate concept visual
  - 크기: 미지정 × 미지정
- `https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&q=80&w=800`
  - alt: CELDYQUE PDRN 250,000ppm Concentrate visual
  - 크기: 미지정 × 미지정
- `https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&q=80&w=800`
  - alt: CELDYQUE PDRN 250,000ppm Concentrate visual
  - 크기: 미지정 × 미지정

</details>

<details>
<summary>product-volufiline-100.html — Volufiline 100% Concentrate | CELDYQUÉ Korean Skincare</summary>


원본: [product-volufiline-100.html](../product-volufiline-100.html)

**메타 설명**

Discover CELDYQUÉ Volufiline 100% Concentrate made with original Volufiline™ raw material from Sederma, France. A minimalist oil-based booster designed to mix 1–2 drops with your favorite cream or serum for targeted firmness and fuller-looking skin care.

**현재 본문 텍스트**

```text
Home
/
Products
/ Face Serum / Volufiline 100%
Original Volufiline™ Raw Material
Volufiline 100% Concentrate
Original Volufiline™ from Sederma, France · Concentrated Oil-Based Booster · 10 ml / 0.33 fl. oz.
Sederma France
Volufiline™ 100%
Minimal Formula
Mix 1–2 Drops
Face & Body
Oil-Based
CELDYQUÉ Volufiline 100% Concentrate is a minimalist, oil-based skincare booster made with the original Volufiline™ raw material supplied by Sederma, France. Designed for customized use, simply mix 1–2 drops with your favorite cream, lotion or compatible serum and apply to areas where you want focused firmness and fuller-looking skin care.
Original Volufiline™ raw material from Sederma, France
Concentrated formula without a conventional water-based serum base
Designed to mix easily with your existing skincare
Focused care for firmer-looking, fuller-looking skin
Only 1–2 drops needed for a customized routine
Buy on Amazon →
How to Use
100%
Original Volufiline™
Concentrated format using the original Volufiline raw material.
France
Sederma Origin
The Volufiline raw material used by CELDYQUÉ is supplied by Sederma, France.
1–2
Drops per Use
Mix a small amount into your everyday cream, lotion or compatible serum.
10 ml
Concentrated Format
A compact booster designed for targeted and customized skincare.
The Original Ingredient
Volufiline™ from Sederma, France.
CELDYQUÉ uses original Volufiline™ raw material supplied by Sederma, France. Rather than turning it into a conventional water-based serum, the formula keeps the ingredient in a concentrated oil-based format designed to be customized with your existing skincare.
Minimal Formula
Concentrated by design.
Volufiline 100% is not intended to feel like a conventional watery face serum. Its oil-based format is designed to work as a concentrated booster that can be mixed into the skincare products already in your routine.
01 · HERO INGREDIENT
Original Volufiline™
The signature cosmetic raw material developed by Sederma, France, used as the core of CELDYQUÉ's concentrated Volufiline formula.
Designed for targeted care focused on the appearance of firmness, volume and smoother-looking skin contours.
02 · OIL-BASED FORMAT
Minimalist Delivery
The oil-soluble format allows you to customize the concentration and texture by combining a small amount with cream, lotion or compatible serum before application.
For the complete and most current INCI ingredient list, always refer to the product packaging.
How to Use Volufiline 100%
Think of it as a concentrated booster rather than another step you need to add to your routine.
1
Drop
Dispense 1–2 drops of Volufiline 100% Concentrate into your palm.
2
Mix
Mix with your usual cream, moisturizer, lotion or compatible serum.
3
Apply
Smooth the mixture onto areas where you want focused firmness and fuller-looking skin care.
YOUR FAVORITE CREAM + 1–2 DROPS OF VOLUFILINE = YOUR CUSTOMIZED ROUTINE
Targeted Care
Where can you use Volufiline?
Apply as part of your regular skincare routine to areas where you want additional focused firmness and fuller-looking skin care.
01
Cheeks
Target areas where facial contours can appear less full or firm.
02
Smile-Line Area
Apply carefully as part of targeted facial moisturizing care.
03
Neck
Mix with your regular neck cream or moisturizer for focused care.
04
Body
Combine with body lotion for targeted firmness-focused skincare.
Why CELDYQUÉ Volufiline
Simple formula. Flexible routine.
A concentrated booster designed for people who prefer targeted skincare without adding another heavy serum layer.
01
Focused Firmness Care
Supports the appearance of firmer, fuller-looking skin in targeted areas.
02
Customizable Booster
Mix only 1–2 drops with skincare products already in your routine.
03
Minimalist Format
A concentrated oil-based formula without a conventional water-serum base.
04
Easy Routine Pairing
Designed to pair with moisturizer, cream, lotion and many everyday skincare formulas.
Volufiline FAQ
Frequently Asked Questions
Quick answers about Volufiline, concentration, origin and how to use CELDYQUÉ Volufiline 100%.
What is Volufiline?
Volufiline is a cosmetic ingredient developed by Sederma, France. CELDYQUÉ uses the original Volufiline raw material in an oil-based concentrated booster designed for targeted firmness and fuller-looking skin care.
What does Volufiline 100% mean?
CELDYQUÉ Volufiline 100% refers to using the original Volufiline raw material as the concentrated formula rather than diluting it into a conventional water-based serum base. It does not mean 100% pure sarsasapogenin.
How do I use CELDYQUÉ Volufiline 100% Concentrate?
Add 1–2 drops of CELDYQUÉ Volufiline 100% Concentrate to your usual cream, lotion or serum, mix in your palm, and apply to areas where you want focused firmness care.
Can I mix Volufiline with moisturizer or serum?
Yes. CELDYQUÉ Volufiline 100% Concentrate is specifically suited to customized mixing. Add 1–2 drops to your usual moisturizer, cream or compatible serum before application.
Is CELDYQUÉ Volufiline from France?
The original Volufiline raw material used by CELDYQUÉ is supplied by Sederma, France. CELDYQUÉ then uses this ingredient to create the finished cosmetic product.
Ingredients
Minimalist Oil-Based Formula
Original Volufiline™ raw material from Sederma, France in a concentrated oil-based format.
For the complete and most current ingredient declaration, refer to the INCI list printed on the product packaging.
Texture: Oil-type concentrate. For comfortable application and spreadability, mixing 1–2 drops with cream, lotion or compatible serum is recommended.
Caution:
For external use only. Avoid direct contact with eyes. Patch test before first use. Discontinue use if persistent irritation occurs. Keep out of reach of children.
Want to learn more?
Read more skincare and ingredient questions in the
CELDYQUÉ FAQ
or browse the full
CELDYQUÉ skincare collection
.
Try CELDYQUÉ Volufiline 100%.
Original Volufiline™ raw material from Sederma, France in a concentrated booster designed to fit into the skincare routine you already use.
Shop on Amazon →
Other Retailers
```

**본문의 고유 링크 목적지**

- `CELDYQUÉ` → /index.html
- `Products` → /shop.html
- `About` → /about.html
- `Store` → /store.html
- `FAQ` → /faq.html
- `Home` → /
- `Buy on Amazon →` → https://www.amazon.com/CELDYQUE-100-Volufiline-Concentrate-Serum/dp/B0CPLDVTFP?maas=maas_adg_7982F2D6742712787939772A0788E56D_afap_abs&ref_=aa_maas&tag=maas&th=1
- `How to Use` → #how-to-use
- `Contact CELDYQUÉ` → /contact.html

**이미지 소스·대체 설명**

- `/images/제품/Mask group-1.webp`
  - alt: CELDYQUÉ Volufiline 100% Concentrate, 10 ml / 0.33 fl oz, dropper bottle
  - 크기: 690 × 978
- `https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80&w=1600`
  - alt: Paris, France
  - 크기: 미지정 × 미지정

</details>

<details>
<summary>shop.html — Korean Skincare Products | CELDYQUÉ Serums, Creams & Cleansers</summary>


원본: [shop.html](../shop.html)

**메타 설명**

Compare CELDYQUÉ serums, creams, cleansers and scalp care. Explore Volufiline, PDRN, bakuchiol and copper peptide formulas, ingredients and product details.

**현재 본문 텍스트**

```text
Products
All Products
All
Serum
Cream
Cleanser
100% Volufiline
Concentrate
Volume
|
10ml
|
0.33 Fl Oz
Volufiline
Blue Copper Peptide
Bakuchiol Serum
Volume
|
30ml
|
1 Fl Oz
Copper Peptide
Bakuchiol
12-Peptide Complex
EGF
Bakuchiol Volume
Collagen Cream
Volume
|
50ml
|
1.7 Fl Oz
Bakuchiol
Volufiline
Collagen
9-Peptide Scalp Care
Serum Roll-On
Volume
|
40ml
|
1.35 Fl Oz
9-Peptide Complex
Rosemary 2%
PDRN & Spicule 300
Caffeine 1%
Bakuchiol
30,000ppm Serum
Volume
|
30ml
|
1 Fl Oz
Bakuchiol
PDRN 25%
Concentrate
Volume
|
30ml
|
1 Fl Oz
PDRN
PDRN 12% +
EGF Peptide Serum
Volume
|
30ml
|
1 Fl Oz
PDRN
EGF Peptide
Volufiline
PDRN 12% +
EGF Peptide Cream
Volume
|
50ml
|
1.7 Fl Oz
PDRN
EGF Peptide
Volufiline
ArbutXA
Glow Cream
Volume
|
50ml
|
1.7 Fl Oz
Arbutin
TXA
Niacinamide
Gentle Cleanser
Purifying Touch
Volume
|
150ml
|
5.07 Fl Oz
Centella
Green tea
Tea tree
Pore Purifying
Cleansing Oil
Volume
|
200ml
|
6.76 Fl Oz
Heartleaf
Centella
Mugwort
Tea tree
Glutathione
30,000ppm Serum
Volume
|
30ml
|
1 Fl Oz
Glutathione
Niacinamide
Adenosine
Ceramide
5-Hyaluronic Acid Complex
Azelaic Acid
12% Serum
Volume
|
30ml
|
1 Fl Oz
Azelaic Acid
Tranexamic Acid
Salicylic Acid
Centella Asiatica Extract
Niacinamide 20%
Advanced Serum
Volume
|
30ml
|
1 Fl Oz
Niacinamide
Hyaluronic Acid
Green Tea Extract
Beta-Glucan
```

**본문의 고유 링크 목적지**

- `CELDYQUÉ` → /index.html
- `Products` → /shop.html
- `About` → /about.html
- `Store` → /store.html
- `FAQ` → /faq.html
- `100% Volufiline Concentrate Volume | 10ml | 0.33 Fl Oz Volufiline` → /product-volufiline-100.html
- `Blue Copper Peptide Bakuchiol Serum Volume | 30ml | 1 Fl Oz Copper Peptide Bakuchiol 12-Peptide Complex EGF` → /product-blue-copper-peptide-bakuchiol-serum.html
- `Bakuchiol Volume Collagen Cream Volume | 50ml | 1.7 Fl Oz Bakuchiol Volufiline Collagen` → /product-bakuchiol-volume-collagen-cream.html
- `9-Peptide Scalp Care Serum Roll-On Volume | 40ml | 1.35 Fl Oz 9-Peptide Complex Rosemary 2% PDRN & Spicule 300 Caffeine 1%` → /product-9-peptide-scalp-serum.html
- `Bakuchiol 30,000ppm Serum Volume | 30ml | 1 Fl Oz Bakuchiol` → /product-bakuchiol-30000.html
- `PDRN 25% Concentrate Volume | 30ml | 1 Fl Oz PDRN` → /product-pdrn-25.html
- `PDRN 12% + EGF Peptide Serum Volume | 30ml | 1 Fl Oz PDRN EGF Peptide Volufiline` → /product-pdrn-12-egf.html
- `PDRN 12% + EGF Peptide Cream Volume | 50ml | 1.7 Fl Oz PDRN EGF Peptide Volufiline` → /product-pdrn-12-egf-cream.html
- `ArbutXA Glow Cream Volume | 50ml | 1.7 Fl Oz Arbutin TXA Niacinamide` → /product-arbutxa-glow-cream.html
- `Gentle Cleanser Purifying Touch Volume | 150ml | 5.07 Fl Oz Centella Green tea Tea tree` → /product-gentle-cleanser.html
- `Pore Purifying Cleansing Oil Volume | 200ml | 6.76 Fl Oz Heartleaf Centella Mugwort Tea tree` → /product-cleansing-oil.html
- `Glutathione 30,000ppm Serum Volume | 30ml | 1 Fl Oz Glutathione Niacinamide Adenosine Ceramide 5-Hyaluronic Acid Complex` → /product-glutathione-30000.html
- `Azelaic Acid 12% Serum Volume | 30ml | 1 Fl Oz Azelaic Acid Tranexamic Acid Salicylic Acid Centella Asiatica Extract` → /product-azelaic-12.html
- `Niacinamide 20% Advanced Serum Volume | 30ml | 1 Fl Oz Niacinamide Hyaluronic Acid Green Tea Extract Beta-Glucan` → /product-niacinamide-20-advanced.html
- `Contact CELDYQUÉ` → /contact.html

**이미지 소스·대체 설명**

- `/images/water-forms-beautiful-light-patterns.webp`
  - alt: Light patterns on water
  - 크기: 1920 × 838
- `/images/제품/Mask group-1.webp`
  - alt: CELDYQUÉ Volufiline 100% Concentrate, 10 ml / 0.33 fl oz, dropper bottle
  - 크기: 690 × 978
- `/images/제품/ms15-lower.webp`
  - alt: CELDYQUE Blue Copper Peptide Bakuchiol Serum, 30 ml / 1.01 fl oz, dropper bottle
  - 크기: 1122 × 1402
  - srcset: /images/제품/ms15-lower-320.webp 320w, /images/제품/ms15-lower-640.webp 640w, /images/제품/ms15-lower-960.webp 960w, /images/제품/ms15-lower.webp 1122w
- `/images/제품/ms14-lower.webp`
  - alt: CELDYQUE Bakuchiol Volume Collagen Cream, 50 ml / 1.7 fl oz, open jar with cream texture
  - 크기: 1122 × 1402
  - srcset: /images/제품/ms14-lower-320.webp 320w, /images/제품/ms14-lower-640.webp 640w, /images/제품/ms14-lower-960.webp 960w, /images/제품/ms14-lower.webp 1122w
- `/images/제품/ms13.webp`
  - alt: CELDYQUE 9-Peptide Scalp Care Serum Roll-On, 40 ml / 1.35 fl oz, scalp serum roll-on tube
  - 크기: 667 × 945
  - srcset: /images/제품/ms13-320.webp 320w, /images/제품/ms13-640.webp 640w, /images/제품/ms13.webp 667w
- `/images/제품/Mask group-4.webp`
  - alt: CELDYQUE Bakuchiol 30,000ppm Serum, 30 ml, dropper bottle
  - 크기: 690 × 978
- `/images/제품/Mask group-3.webp`
  - alt: CELDYQUE PDRN 250,000ppm Concentrate, 30 ml / 1 fl oz, dropper bottle
  - 크기: 690 × 978
- `/images/제품/Mask group.webp`
  - alt: CELDYQUE PDRN 12% + EGF Peptide Serum, 30 ml / 1 fl oz, dropper bottle
  - 크기: 690 × 978
- `/images/제품/Mask group-6.webp`
  - alt: CELDYQUE PDRN 12% + EGF Peptide Cream, 50 ml / 1.7 fl oz, cream jar
  - 크기: 690 × 978
- `/images/제품/Mask group-5.webp`
  - alt: CELDYQUE ArbutXA Glow Cream, 50 ml / 1.7 fl oz, cream jar
  - 크기: 690 × 978
- `/images/제품/Mask group-11.webp`
  - alt: CELDYQUE Gentle Cleanser Purifying Touch, 150 ml / 5.07 fl oz, cleanser tube
  - 크기: 690 × 978
- `/images/제품/Mask group-9.webp`
  - alt: CELDYQUE Pore Purifying Cleansing Oil, 200 ml / 6.76 fl oz, pump bottle
  - 크기: 690 × 978
- `/images/제품/Mask group-2.webp`
  - alt: CELDYQUE Glutathione Glow Serum 30,000 ppm, 30 ml / 1 fl oz, dropper bottle
  - 크기: 690 × 978
- `/images/제품/Mask group-7.webp`
  - alt: CELDYQUE Azelaic Acid 12% Topical Serum, 30 ml / 1 fl oz, dropper bottle
  - 크기: 690 × 978
- `/images/제품/Mask group-8.webp`
  - alt: CELDYQUE Niacinamide 20% Pore Minimizer Serum, 30 ml / 1 fl oz, pump bottle
  - 크기: 690 × 978

</details>

<details>
<summary>store.html — Where to Buy | CELDYQUÉ Official Retailers</summary>


원본: [store.html](../store.html)

**메타 설명**

Shop CELDYQUÉ Korean skincare through official retailer links for Amazon, YesStyle, Stylevana and TikTok Shop.

**현재 본문 텍스트**

```text
Where to buy
Shop CELDYQUÉ worldwide.
Explore CELDYQUÉ skincare through our official retail partners. Select a store to view current availability, delivery options and regional offers.
01
amazon
Amazon
Official brand store
↗
02
TikTok
TikTok Shop
CELDYQUÉ official account
↗
03
yesstyle
YesStyle
Global beauty retailer
↗
04
STYLEVANA
Stylevana
K-beauty retailer
↗
Official links verified by CELDYQUÉ.
Selection, pricing and shipping may vary by retailer and region.
```

**본문의 고유 링크 목적지**

- `CELDYQUÉ` → /index.html
- `Products` → /shop.html
- `About` → /about.html
- `Store` → /store.html
- `FAQ` → /faq.html
- `01 amazon Amazon Official brand store ↗` → https://www.amazon.com/stores/page/176EC99B-F37D-4FC8-BC48-E30CEC0FA252?maas=maas_adg_E856BC7BDD5C52C4C8DD6D3C8EFCB0D8_afap_abs&ref_=aa_maas&tag=maas&ingress=3
- `02 TikTok TikTok Shop CELDYQUÉ official account ↗` → https://www.tiktok.com/@celdyque
- `03 yesstyle YesStyle Global beauty retailer ↗` → https://www.yesstyle.com/en/celdyque/list.html/bpt.299_bid.331400
- `04 STYLEVANA Stylevana K-beauty retailer ↗` → https://www.stylevana.com/en_US/brands/celdyque.html
- `Contact CELDYQUÉ` → /contact.html

**이미지 소스·대체 설명**


</details>

<details>
<summary>tiktok-callback.html — TikTok Shop Authorization Callback</summary>


원본: [tiktok-callback.html](../tiktok-callback.html)

**메타 설명**

설정 없음

**현재 본문 텍스트**

```text
TikTok Shop Authorization Callback
Authorization completed. Copy the code below and use it to request an access token on the server side.
Authorization Code
Loading...
Copy code
Full Callback URL
```

**본문의 고유 링크 목적지**


**이미지 소스·대체 설명**


</details>

<details>
<summary>임시.html — CELDYQUE | Valentine's Renewal Opening</summary>


원본: [임시.html](../%EC%9E%84%EC%8B%9C.html)

**메타 설명**

설정 없음

**현재 본문 텍스트**

```text
CELDYQUE
Valentine's Special Launch
A Gift for Your True Skin
We are meticulously refining our digital experience for a more romantic encounter with your skin. Returning this Valentine's Day.
00
Days
00
Hours
00
Mins
00
Secs
Coming: Feb 14, 2026, 18:00 KST
```

**본문의 고유 링크 목적지**


**이미지 소스·대체 설명**


</details>

## 부록 B. 조사·검증 범위

- HTML 26파일과 공통 partial 2개를 읽고 텍스트·메타데이터·링크·이미지 속성을 추출했다.
- 운영 제품은 사이트맵·Shop·검색 카탈로그의 14제품을 기준으로 구분했다.
- 제품별 FAQ 44개와 공통 FAQ 21개를 별도 기록했다.
- 웹 가이드의 일반 원칙은 향후 계획 문서의 공식 링크로 연결했다. 사이트 코드의 문구와 외부 가이드 내용을 혼합해 사실로 취급하지 않았다.
- 이미지 OCR, 제조사 사양 검증, 실시간 가격·재고, 외부 계정 화면, 전체 운영 배포 대조, 새 브라우저 시각 검수는 포함하지 않았다.
- 이 문서 작성은 문서 추가만 수행했다. 기존 HTML·CSS·JavaScript·추적 코드·배포 설정을 수정하지 않았다.

### 이번 작성 시 실행한 확인

- 2026-10-12: `python -B scripts/check_seo.py` 통과 — 21페이지·14제품·64 이미지 참조·영상 1개.
- 문서 내 로컬 파일 링크, 14제품 레코드·구매 링크, 공통 FAQ 21개, 전체 26페이지 아카이브, 코드 블록 짝 확인 통과.
- 운영 제품 14페이지의 페이지 내부 `#fragment` 링크가 실제 ID를 가리키는지 정적으로 확인했으며 누락을 발견하지 않았다.
- 기존 추적 파일의 변경 없음. 이번 추가 파일은 `docs/`의 MD 2개뿐이다.
- 문서 작업이므로 브라우저 테스트·전체 단위 테스트는 새로 실행하지 않았다. 이전 대화의 검사 결과와 이번 실행을 구분한다.

<!-- GENERATED_INVENTORY_END -->
