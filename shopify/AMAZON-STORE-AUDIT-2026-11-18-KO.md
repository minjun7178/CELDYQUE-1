# CELDYQUÉ Amazon 전체 구성·가격 조사

후속 업데이트: 사용자가 가격·구성을 승인하여 신규 13개 세트를 dev 테스트 상품으로 등록했습니다. 아래는 당시 조사 기록입니다. 최신 구현 범위는 [개발 구현 기록](BUNDLE-DEV-IMPLEMENTATION-KO.md)을 확인하세요.

확인일: 2026-11-18 (한국시간) · 통화: USD · 조사와 계획만 수행. 기존 승인 단품 가격, Shopify 설정, 기존 홈페이지, main은 이번 조사에서 변경하지 않았습니다.

[사용자가 지정한 Amazon 스토어](https://www.amazon.com/stores/page/D0FB532E-9A9B-4C3B-A6D5-3A58A4D534F0)를 시작으로 10개 탐색 메뉴와 상품별 구매 옵션을 대조했습니다.

## 조사 범위와 결론

- All Products 목록: 19 ASIN. 다른 메뉴까지 합친 직접 연결 상품: 23 ASIN. 상품 선택 옵션에서 5 ASIN을 추가 발견하여 **총 28 ASIN**을 직접 열었습니다.
- 기존 단품 14 + 동일 제품 묶음 5 + 서로 다른 제품 세트 8 + 현재 판매 불가 Retinal 1.
- 공식 판매자 Celdyque_Official의 1회 구매 가격을 27개에서 확인했습니다. 단품 14개는 앞서 승인·dev 반영한 가격과 모두 같습니다.
- 기존 Shopify는 단품 14개만 등록되어 있으므로 추가 판매 구성은 13개입니다. Retinal은 가격·재고·판매 재개 여부 확인 전 보류합니다.
- 공개 스토어와 노출 옵션 기준으로 대조했습니다. Seller Central의 비공개·판매중지·미노출 상품까지 전부 확인했다는 의미는 아닙니다. 최종 출고 목록은 담당자의 FBA SKU 목록과 대조해야 합니다.

## 1. 기존 단품 14개 — 공식 가격 재확인

| 상품 | 용량 | 공식 판매가 USD | 확인 출처 |
|---|---|---:|---|
| Volufiline 100% Concentrate | 10 ml × 1 | $17.99 | [ASIN B0CPLDVTFP](https://www.amazon.com/dp/B0CPLDVTFP) |
| Blue Copper Peptide Bakuchiol Serum | 30 ml × 1 | $19.99 | [ASIN B0H6DCQPN8](https://www.amazon.com/dp/B0H6DCQPN8) |
| Bakuchiol Volume Collagen Cream | 50 ml × 1 | $17.99 | [ASIN B0GXV5RJX5](https://www.amazon.com/dp/B0GXV5RJX5) |
| 9-Peptide Scalp Care Serum Roll-On | 40 ml × 1 | $19.99 | [ASIN B0GGZRNGKL](https://www.amazon.com/dp/B0GGZRNGKL) |
| Bakuchiol 30,000ppm Serum | 30 ml × 1 | $14.99 | [ASIN B0DC6H8MSW](https://www.amazon.com/dp/B0DC6H8MSW) |
| PDRN 250,000ppm Concentrate | 30 ml × 1 | $17.99 | [ASIN B0FMFBGW9N](https://www.amazon.com/dp/B0FMFBGW9N) |
| PDRN 12% + EGF Peptide Serum | 30 ml × 1 | $17.99 | [ASIN B0F1Y8DML3](https://www.amazon.com/dp/B0F1Y8DML3) |
| PDRN 12% + EGF Peptide Cream | 50 ml × 1 | $17.99 | [ASIN B0FJY6SCPX](https://www.amazon.com/dp/B0FJY6SCPX) |
| ArbutXA Glow Cream | 50 ml × 1 | $17.99 | [ASIN B0FWBM5SR8](https://www.amazon.com/dp/B0FWBM5SR8) |
| Gentle Cleanser Purifying Touch | 150 ml × 1 | $12.99 | [ASIN B0FGPXK14C](https://www.amazon.com/dp/B0FGPXK14C) |
| Pore Purifying Cleansing Oil | 200 ml × 1 | $13.99 | [ASIN B0FKM689SK](https://www.amazon.com/dp/B0FKM689SK) |
| Glutathione Glow Serum 30,000 ppm | 30 ml × 1 | $16.99 | [ASIN B0DP4FG8B9](https://www.amazon.com/dp/B0DP4FG8B9) |
| Azelaic Acid 12% Topical Serum | 30 ml × 1 | $13.99 | [ASIN B0DP4FQPDL](https://www.amazon.com/dp/B0DP4FQPDL) |
| Niacinamide 20% Pore Minimizer Serum | 30 ml × 1 | $14.99 | [ASIN B0C2PH12CR](https://www.amazon.com/dp/B0C2PH12CR) |

PDRN 크림의 기본 구매창은 CrediThink $16.99, Gentle Cleanser는 CrediThink $11.99입니다. Other sellers에서 공식 판매자 가격 $17.99 / $12.99를 다시 확인했습니다. 브랜드 스토어에 보이는 가격도 항상 공식 판매자 가격인 것은 아닙니다.

## 2. 동일 제품 묶음 5개 — 신규 등록 후보

아래 신규 13개 가격은 이번 조사 결과이며, 아직 Shopify에 적용하거나 판매가 승인을 받은 상태가 아닙니다.

| 상품 | 구성 | 공식 세트가 USD | 단품 합계 | 차액 | 출처 |
|---|---|---:|---:|---:|---|
| Volufiline 2-Pack | 10ml × 2 | $29.99 | $35.98 | $5.99 | [ASIN B0DCBFQQ64](https://www.amazon.com/dp/B0DCBFQQ64) |
| Bakuchiol 3% Serum 2-Pack | 30ml × 2 | $24.99 | $29.98 | $4.99 | [ASIN B0DHRMMPQT](https://www.amazon.com/dp/B0DHRMMPQT) |
| Blue Copper Peptide Serum 2-Pack | 30ml × 2 | $34.99 | $39.98 | $4.99 | [ASIN B0HCT6W3TY](https://www.amazon.com/dp/B0HCT6W3TY) |
| Niacinamide Serum 2-Pack | 30ml × 2로 해석; 포장 확인 필요 | $19.99 | $29.98 | $9.99 | [ASIN B0C2PGVMC6](https://www.amazon.com/dp/B0C2PGVMC6) |
| Scalp Serum 2-Pack | 40ml × 2 | $29.99 | $39.98 | $9.99 | [ASIN B0H1PZ47YZ](https://www.amazon.com/dp/B0H1PZ47YZ) |

나이아신아마이드·스칼프의 옵션에는 `Pack of 1`이라고 적혀 있지만 대표 이미지는 각각 두 개 제품입니다. 이미지와 총용량을 함께 보고 묶음으로 분류했습니다. 실제 포장 단위와 MSKU는 담당자 확인이 필요하며, 나이아신아마이드의 단품 합계·차액은 현재 30ml 단품과 동일 제품이라는 전제입니다.

## 3. 서로 다른 제품 세트 8개 — 신규 등록 후보

| 세트 | 구성 | 공식 세트가 USD | 단품 합계 | 차액 | 출처 |
|---|---|---:|---:|---:|---|
| Volufiline + Bakuchiol Serum | Volufiline 10ml + Bakuchiol 세럼 30ml | $27.99 | $32.98 | $4.99 | [ASIN B0DHK1ZPV6](https://www.amazon.com/dp/B0DHK1ZPV6) |
| Volufiline + Bakuchiol Cream | Volufiline 10ml + Bakuchiol 크림 50ml | $29.99 | $35.98 | $5.99 | [ASIN B0HCMSRJB7](https://www.amazon.com/dp/B0HCMSRJB7) |
| Bakuchiol Serum + Bakuchiol Cream | Bakuchiol 세럼 30ml + Bakuchiol 크림 50ml | $27.99 | $32.98 | $4.99 | [ASIN B0HCMZJDDB](https://www.amazon.com/dp/B0HCMZJDDB) |
| Blue Copper Peptide Serum + Bakuchiol Cream | Copper Peptide 세럼 30ml + Bakuchiol 크림 50ml | $32.99 | $37.98 | $4.99 | [ASIN B0HGD7BQ3W](https://www.amazon.com/dp/B0HGD7BQ3W) |
| PDRN 12% Duo | PDRN 12% 세럼 30ml + PDRN 12% 크림 50ml | $27.99 | $35.98 | $7.99 | [ASIN B0G4R7N24X](https://www.amazon.com/dp/B0G4R7N24X) |
| PDRN 25% Duo | PDRN 25% 세럼 30ml + PDRN 12% 크림 50ml | $28.99 | $35.98 | $6.99 | [ASIN B0G7CPYW4V](https://www.amazon.com/dp/B0G7CPYW4V) |
| PDRN Trio | PDRN 25% 세럼 30ml + PDRN 12% 세럼 30ml + 크림 50ml | $39.99 | $53.97 | $13.98 | [ASIN B0G8GK8FX4](https://www.amazon.com/dp/B0G8GK8FX4) |
| Double Cleanse Duo | Cleansing Oil 200ml + Gentle Cleanser 150ml | $21.99 | $26.98 | $4.99 | [ASIN B0G6HS2JNG](https://www.amazon.com/dp/B0G6HS2JNG) |

차액은 이번에 확인한 공식 단품 가격 합계와 세트가의 단순 차이입니다. Amazon이 보장하는 할인율이나 정가 대비 할인이라는 뜻은 아니며, 쿠폰·구독·2개 구매 프로모션은 계산에서 제외했습니다.

## 4. 판매 불가 상품

[Retinal Eye Cream Serum — B0CP6X4LD8](https://www.amazon.com/dp/B0CP6X4LD8)은 스토어 Home에 연결되어 있지만 상세 페이지는 `Currently unavailable`로 표시됩니다. 현재 가격·판매자·재입고일은 확인할 수 없었습니다. 근처에 표시된 다른 브랜드 추천 가격은 사용하지 않았습니다. 기존 자사몰 14개 목록에 없으므로 판매 재개/추가 여부를 별도로 결정해야 합니다.

## 5. 이전 조사에서 해소된 모호함

- Volufiline의 `with Bakuchiol 1ea` $29.99는 **Bakuchiol 크림 + Volufiline**입니다. $27.99의 **Bakuchiol 세럼 + Volufiline**과 다른 상품이므로 가격 불일치가 아닙니다.
- Copper Peptide의 `BUNDLE` $32.99는 대표 이미지 기준 **Copper Peptide 세럼 30ml + Bakuchiol 크림 50ml**입니다. 상품 제목과 본문이 세럼 중심이므로 자사몰에는 구성품을 명확히 써야 합니다.
- `2 fl oz / 2.7 fl oz (Pack of 1)`만 읽어 60ml/80ml 대용량 한 개로 등록하지 않습니다.
- 상품 페이지 하단의 타 브랜드 포함 “함께 구매” 추천, 광고, Subscribe & Save, “대상 상품 2개 10% 할인”은 공식 고정 세트와 별개여서 신규 상품 수에 넣지 않았습니다.
- Amazon 효능 문구를 새 사이트 원고로 복사하지 않습니다. 기존 승인 카탈로그 문구를 유지하며 세트 구성·용량·가격 설명만 추가할 계획입니다.

## 6. 메뉴별 조사 범위

| 메뉴 | 직접 노출된 고유 ASIN 수 | 출처 |
|---|---:|---|
| ALL PRODUCTS | 19 | [스토어 페이지](https://www.amazon.com/stores/page/D0FB532E-9A9B-4C3B-A6D5-3A58A4D534F0) |
| CLEANSER DUO | 3 | [스토어 페이지](https://www.amazon.com/stores/page/809BD745-721E-4720-A929-3E6909F66863) |
| BAKUCHIOL DUO | 4 | [스토어 페이지](https://www.amazon.com/stores/page/44A15B79-BF86-4586-BB81-2EC80FD97C71) |
| SKINCARE BOOSTER | 6 | [스토어 페이지](https://www.amazon.com/stores/page/D3497783-DCC6-419D-9192-75F35DCCD3A2) |
| SCALP CARE | 2 | [스토어 페이지](https://www.amazon.com/stores/page/7775008B-734E-4A9C-B88A-AB91ADF92EC0) |
| TONE-UP CARE | 4 | [스토어 페이지](https://www.amazon.com/stores/page/8C5D0E71-3C4D-4198-828C-C5256F6A704A) |
| PDRN SET | 4 | [스토어 페이지](https://www.amazon.com/stores/page/3DD62CEB-A2CC-4EF9-8DAE-944BD75548FD) |
| SERUM | 4 | [스토어 페이지](https://www.amazon.com/stores/page/1DEAE555-DDE5-4E26-AE6C-5AA141111810) |
| CREAM | 3 | [스토어 페이지](https://www.amazon.com/stores/page/4B9FF378-183E-4FA9-A25A-824AB5C5D34E) |
| Home | 13 | [스토어 페이지](https://www.amazon.com/stores/page/176EC99B-F37D-4FC8-BC48-E30CEC0FA252) |

메뉴별 수에는 중복이 있으므로 합산하지 않습니다. 상품별 선택 옵션에서 발견한 추가 5개는 Copper 2-Pack, Copper+크림, Bakuchiol 세럼+크림, PDRN 25% Duo, PDRN Trio입니다.

## 기록 및 다음 단계

- [구현 계획 및 담당자 확인표](BUNDLE-IMPLEMENTATION-PLAN-KO.md)
- [28개 구성의 기계 판독 데이터](amazon-store-audit-2026-11-18.json)
- [기존 단품 가격 승인·적용 기록](AMAZON-PRICES-2026-11-18-KO.md)
- 원문 화면 텍스트는 로컬 `shopify/evidence/amazon-store-audit-2026-11-18-raw.json`에 보관했습니다. 배송지·고객 계정 정보는 조사 데이터에 넣지 않았습니다.
