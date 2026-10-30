# 실판매 데이터 준비표

dev 스토어 테스트와 실제 판매 전환은 별도 단계입니다. 이 문서를 채워도 운영 사이트가 자동 변경되지 않습니다.

## 지금 전달할 자료

1. 아마존 담당자에게 미국 FBA 상품 목록을 요청합니다. 상품명·용량·Seller SKU(MSKU)·ASIN·판매 가능 재고·개별 판매 단위의 포장 포함 무게가 있으면 됩니다. 고객 주문이나 개인정보 자료는 필요하지 않습니다.
2. 아래 상품별 자사몰 판매가(USD)를 정합니다. Amazon 가격과 같게 할지 다르게 할지는 별도 결정이며, 현재 $19.99는 테스트 가격입니다.
3. 담당자에게 미국 MCF 출고 비용과 예상 배송 기간을 확인한 뒤 고객 배송비를 정합니다. 현재 $4.99는 테스트 값입니다.

SKU는 제품을 연결하는 코드입니다. Amazon Seller SKU와 ASIN은 다른 값이므로 각각 구분해서 보내주세요. 바코드·ASIN만으로 실제 출고 SKU를 추정하지 않습니다. 여러 SKU가 같은 상품에 연결되면 담당자가 실제 사용할 미국 FBA SKU를 지정해야 합니다.

아래 빈칸은 미확정 상태입니다. 모르는 값은 공란으로 두세요. 기존 엑셀이나 Amazon 재고 내보내기 파일로 전달해도 됩니다. 원본 담당자 자료는 공개 GitHub 저장소에 올리지 않습니다.

| 상품 | 용량 | 자사몰 가격 USD | Amazon Seller SKU | ASIN | 판매 단위 포장 무게 g |
|---|---|---|---|---|---|
| Volufiline 100% Concentrate | 10 ml | | | | |
| Blue Copper Peptide Bakuchiol Serum | 30 ml | | | | |
| Bakuchiol Volume Collagen Cream | 50 ml | | | | |
| 9-Peptide Scalp Care Serum Roll-On | 40 ml | | | | |
| Bakuchiol 30,000ppm Serum | 30 ml | | | | |
| PDRN 250,000ppm Concentrate | 30 ml | | | | |
| PDRN 12% + EGF Peptide Serum | 30 ml | | | | |
| PDRN 12% + EGF Peptide Cream | 50 ml | | | | |
| ArbutXA Glow Cream | 50 ml | | | | |
| Gentle Cleanser Purifying Touch | 150 ml | | | | |
| Pore Purifying Cleansing Oil | 200 ml | | | | |
| Glutathione Glow Serum 30,000 ppm | 30 ml | | | | |
| Azelaic Acid 12% Topical Serum | 30 ml | | | | |
| Niacinamide 20% Pore Minimizer Serum | 30 ml | | | | |

## 배송·반품 결정

| 항목 | 작성할 내용 |
|---|---|
| 배송 지역 | 미국 본토만 / 알래스카·하와이 포함 여부 / PO Box 허용 여부 |
| 고객 배송비 | 고정 배송비 $___ 또는 주문 금액 $___ 이상 무료배송 |
| 배송 소요 기간 | 담당자가 확인한 처리 기간과 배송 기간 |
| 반품 조건 | 수령 후 ___일, 미개봉/개봉 제품 처리, 불량·파손 처리 |
| 반품 접수·주소 | 실제 접수 이메일과 미국 반품 주소; FBA 창고를 임의 지정하지 않음 |
| CS 이메일 | 현재 홈페이지 team@celdyque.com과 checkout의 별도 연락처 중 고객에게 노출할 공식 주소 확정 |

## 담당자에게 요청할 문장

> Shopify 자사몰의 미국 판매를 준비 중입니다. 상품별 상품명/용량, 미국 FBA Seller SKU(MSKU), ASIN, 현재 판매 가능 재고, 판매 단위 포장 무게 자료를 부탁드립니다. 자사몰 주문을 Amazon MCF로 출고할 때의 1개/복수 상품 주문 비용, 예상 배송 기간, 배송 불가 지역과 반품 처리 방식도 확인 부탁드립니다. 현재는 개발 테스트 단계이므로 실제 출고나 자동 출고 설정은 진행하지 말아 주세요.

## 자료를 받으면 진행할 작업

- Shopify 상품과 Amazon SKU를 대조하고 상품별 확정 가격·무게를 입력합니다.
- 재고는 담당자 수치를 참고해 매칭을 검증한 뒤 Amazon 연동으로 확인합니다. 현재 합성 테스트 재고를 실재고로 사용하지 않습니다.
- 확정된 배송·반품 정책과 고객 연락처를 상세 페이지, FAQ, checkout에 일치시킵니다.
- 한국 사업자용 실제 결제 수단과 정산 계정 설정은 별도 진행합니다. dev 테스트 성공은 실제 결제·세금·MCF 출고 검증을 의미하지 않습니다.
- Amazon 연결 전 기존 테스트 주문 #1001, #1002, #1003이 출고 대상으로 넘어가지 않도록 제외 상태를 확인합니다.
- 운영 전환 시점은 별도 승인 후 결정합니다. 기존 사이트와 main은 유지합니다.
