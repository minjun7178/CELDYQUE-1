# GitHub → Shopify dev 미리보기

2026-10-30 연결 완료: Theme Access 키를 GitHub 환경 Secret에 저장했고, [자동 검사·백업·업로드 실행](https://github.com/minjun7178/CELDYQUE-1/actions/runs/41009715069)이 성공했습니다. 아래 최초 인증 연결 항목은 재설정 시 참고용입니다. 키 값은 문서나 저장소에 기록하지 않습니다.

## 반영 경로

`codex/shopify-liquid-pilot` 브랜치의 `shopify/theme/` 코드를 GitHub에 push하면 검사 후 **celdyque-dev-test.myshopify.com의 미게시 테마 189650600047**에만 업로드합니다.

- 운영 `main`으로 merge하거나 push하지 않습니다. PR도 자동으로 만들지 않습니다.
- 기존 `.github/workflows/deploy.yml`과 GitHub Pages 설정은 그대로 둡니다.
- 현재 게시된 dev Horizon도 변경하지 않습니다.
- 상품 가격/재고, 주문, 결제, 배송 설정은 테마 배포에 포함되지 않습니다.

## 안전장치

1. 워크플로 트리거와 작업 조건 모두 전용 브랜치에 고정합니다.
2. GitHub `shopify-dev` 환경도 이 브랜치만 허용합니다. 인증키는 이 환경에만 보관합니다.
3. 배포 스크립트에서 저장소/브랜치/이벤트를 다시 검사합니다.
4. store와 theme ID는 코드에 고정하며 실행 인자로 다른 대상을 받지 않습니다.
5. 업로드 직전 대상이 `unpublished`인지 확인합니다. 게시된 테마이면 중단합니다.
6. `--publish`, `--allow-live`를 사용하지 않습니다. GitHub 권한은 `contents: read`뿐입니다.
7. 업로드 전에 기존 dev 테마를 내려받아 Actions artifact로 14일 보관합니다.

이는 이 워크플로의 실수 방지 장치입니다. 저장소 관리자가 나중에 직접 main에 병합하거나 설정을 바꾸는 행위까지 차단하는 것은 아닙니다.

## 최초 인증 연결

자동 실행은 개인 PC의 Shopify CLI 로그인 세션을 재사용하지 않습니다.

1. **dev store에서만** 공식 Theme Access 앱으로 테마용 비밀번호를 발급합니다.
2. GitHub 저장소 Settings → Environments → `shopify-dev` → Environment secrets에 `SHOPIFY_DEV_THEME_TOKEN` 이름으로 저장합니다.
3. 비밀번호를 채팅, 코드, CSV, 문서, 저장소 파일에 넣지 않습니다. 일반 storefront 비밀번호나 Shopify 로그인 비밀번호도 사용하지 않습니다.
4. 전용 브랜치의 실패한 Actions 실행을 다시 실행하여 실제 업로드를 확인합니다.

Theme Access 권한은 스토어의 테마 접근 권한입니다. 특정 테마만의 권한이라고 간주하지 않습니다. 운영 스토어 키를 넣지 말고, 이 스크립트의 대상/상태 검사를 유지해야 합니다.

대표자 확인 등으로 앱 설치가 막히면 인증을 우회하지 않고 보류합니다. 인증키가 없으면 워크플로는 업로드 전에 명확한 오류로 중단합니다.

## 평소 수정 방법

현재 자동 배포 대상은 **커밋된 `shopify/theme/` 결과물**입니다. CI가 빌더를 실행해 직접 수정한 테마 파일을 덮어쓰지 않습니다.

- 테마 파일을 직접 고친 경우: 검사하고 해당 결과물을 커밋합니다.
- 원본 HTML 또는 변환 스크립트를 고친 경우: `node shopify/build-theme.cjs`로 결과물을 다시 만든 뒤 원본과 생성 결과를 함께 커밋합니다. 빌더는 테마 파일을 재생성하므로 지속할 변경은 빌더에도 반영합니다.
- 상품 순서를 바꿀 때 홈페이지/목록의 해당 마크업 순서를 수정합니다. 가격과 실제 재고는 Shopify 상품 데이터이므로 코드 순서와 별개입니다.

```powershell
git branch --show-current
node --test shopify/test-deploy-dev.cjs
node shopify/validate-theme.cjs
# 변경 파일을 확인해서 필요한 파일만 add/commit합니다.
git push origin HEAD:refs/heads/codex/shopify-liquid-pilot
```

`git push origin main`, `git push --all`, 운영 브랜치 merge는 사용하지 않습니다.

## 복원

원하는 이전 버전으로 **전용 브랜치의 코드만** 되돌려 새 커밋을 push하면 같은 dev 미리보기 테마에 반영됩니다. 업로드 전 테마 ZIP은 Actions 실행의 `shopify-dev-before-*` artifact에서도 확인할 수 있습니다. 기존 로컬 백업은 `shopify/evidence/`에 유지합니다.

공식 참고: https://shopify.dev/docs/storefronts/themes/tools/cli/ci-cd
