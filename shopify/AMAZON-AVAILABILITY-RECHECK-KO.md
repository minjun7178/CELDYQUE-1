# Amazon 판매 상태 재확인 — 2026-11-18

## 결론

- 현재 dev 구성은 단품 14개 + 별도 세트 13개 = 27개다.
- 27개 모두 Amazon 미국 공개 페이지에서 Celdyque_Official의 구매 가능한 오퍼를 재확인했다. 현재 등록된 상품 중 구매 불가로 확인된 상품은 없다.
- 이는 해당 시점의 공개 판매 확인이다. Seller Central의 Active 상태, 실제 FBA 출고 가능 수량, MCF 연동 가능 여부를 확인한 것은 아니다. 자동 재고 동기화도 아니다.
- 기존 홈페이지와 main에는 변경하지 않았다. 기존 홈페이지에는 단품 14개가 있고, 세트 13개는 dev에서만 구현한 상태다.

## 누락·제외·중복 항목

| ASIN | 상품 | 현재 공개 상태 | dev 처리 |
|---|---|---|---|
| B0GR96HTC9 | ArbuTXA 크림 + Glutathione 세럼 | 공식 판매자 $29.99, 구매 가능 | 미등록. 구성품은 이미 있으나 세트는 빠져 있음. 실제 포장 세트/가상 번들 분류를 확인한 뒤 추가할 후보 |
| B0HPN62L9Q | NEW Blue Copper Peptide Serum | 공식 판매자 $19.99, 구매 가능 | 미등록. 기존 B0H6DCQPN8도 공식 판매 중. 별도 상품인지 교체 ASIN인지 확인 필요 |
| B0HQGWXRKG | PDRN 12% Serum 1+1 — 엑셀 표기 | Currently unavailable | 미등록 유지. 아마존 페이지의 구성·사용법 정보 오류도 담당자 확인 필요 |
| B0GR4GWS9W | Kojic Acid Capsule Serum | Currently unavailable | 미등록 유지 |
| B0CP6X4LD8 | Retinal Serum | Currently unavailable | 미등록 유지. 엑셀 32개 외 기존 공개 스토어 조사 항목 |
| B0H4V1RC65 | 구형 Bakuchiol Duo | B0HCMZJDDB로 이동 | 별도 등록하지 않음. 이동 대상 듀오는 이미 dev에 있음 |

아마존에서 구매 가능하다는 이유만으로 새 ASIN을 자동 등록하지 않았다. 엑셀 32개와 기존 스토어 조사 항목을 대조한 범위이며, 계정 내 비공개·새로 생성된 리스팅까지 완전성을 보증하지 않는다.

## 판매자 구분

PDRN 크림 B0FJY6SCPX의 첫 오퍼는 CrediThink $16.99, Gentle Cleanser B0FGPXK14C는 CrediThink $11.99였다. 두 상품 모두 Other sellers 패널에서 Celdyque_Official의 구매 오퍼를 별도로 확인했다.

- PDRN 크림: 공식 판매가 $17.99 유지.
- Gentle Cleanser: 공식 판매가 $12.99 유지.
- 다른 25개: 메인 구매 오퍼의 판매자가 Celdyque_Official이었다.
- 쿠폰·정기배송 할인가를 기준가로 바꾸지 않았다.

## 같은 페이지에서 번들 선택

- 기존 단품 페이지의 디자인과 상세 콘텐츠를 유지한다.
- 일반 선택 시 URL 이동 없이 사진, 가격, 세트 구성, 수량 라벨, 실제 장바구니 variant를 변경한다.
- Shopify가 렌더링한 가격·판매 가능 여부·variant ID를 사용한다. 브라우저에서 임의 가격을 보내지 않는다.
- JavaScript를 사용할 수 없을 때에는 기존 상품 링크로 이동하는 대체 경로를 유지한다.
- 세트 재고는 여전히 독립 테스트 재고다. 실제 Amazon SKU나 MCF 출고는 연결하지 않았다.

## 확인한 동작

- 8개 단품 페이지의 선택지 총 23회 전환: URL 유지, 가격 전환, 선택 표시 하나, 사진 표시 확인. 세트 13종 전체를 포함한다.
- Oil 단품 페이지에서 Duo 선택 후 장바구니: Double Cleanse Duo $21.99.
- Duo 선택 후 다시 Oil 단품 선택하고 장바구니: Oil $13.99.
- Volufiline 2-Pack 2세트: $29.99 × 2 = $59.98, 세트당 2병 표시.
- 추가한 테스트 항목만 제거하고 기존 장바구니 3개와 수량·가격을 보존했다.
- 모바일 390px에서 PDRN Trio의 키보드 선택, 3개 사진, $39.99, 세트 구성, 가로 넘침 없음 확인.
- 로컬 9개 테스트 통과. 14개 원본 제품 스타일·FAQ와 63개 이미지 보존 검사 통과.

## 기록과 다음 확인

- 공개 판매 확인 데이터: `amazon-availability-2026-11-18.json` — 33개 ASIN.
- 상세 내부 SKU 대조: 로컬 `evidence/CELDYQUE-SKU-REVIEW-2026-11-18.xlsx`. 실제 MSKU는 공개 저장소에 올리지 않는다.
- CI에서 현재 dev 27개가 검토된 판매 목록과 일치하는지 검사한다. 이 검사는 아마존 재고의 실시간 변화를 감지하지 않는다.
- 담당자에게 확인할 것: **NEW 구리펩타이드와 기존 상품의 관계**, **ArbuTXA + Glutathione 세트의 실제 포장/가상 번들 여부**. 실제 판매 전에는 Seller Central의 Active 및 FBA/MCF 출고 가능 상태도 확인해야 한다.
