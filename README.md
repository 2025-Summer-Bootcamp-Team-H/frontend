# ClaimBridge Frontend

보험금 산정 자동 서비스 프론트엔드 애플리케이션입니다.

## 🚀 시작하기

### 1. 의존성 설치

```bash
npm install
```

### 2. 환경변수 설정

프로젝트 루트에 `.env` 파일을 생성하고 다음 내용을 추가하세요:

```env
VITE_API_BASE_URL=http://localhost:8000/api/v1
```

### 3. 개발 서버 실행

```bash
npm run dev
```

## 📁 프로젝트 구조

```
src/
├── components/     # 재사용 가능한 컴포넌트
├── pages/         # 페이지 컴포넌트
├── assets/        # 이미지, 폰트 등 정적 파일
├── styles/        # 전역 스타일
└── utils/         # 유틸리티 함수
```

## 🔧 환경변수

- `VITE_API_BASE_URL`: 백엔드 API 서버 URL

## 📝 스크립트

- `npm run dev`: 개발 서버 실행
- `npm run build`: 프로덕션 빌드
- `npm run preview`: 빌드된 파일 미리보기
- `npm run lint`: ESLint 실행

## 🤝 팀원들을 위한 설정

1. `.env.example` 파일을 참고하여 `.env` 파일을 생성하세요
2. 백엔드 서버가 실행 중인지 확인하세요
3. `npm install` 후 `npm run dev`로 개발 서버를 실행하세요
