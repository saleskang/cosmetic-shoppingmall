# Cosmetics Shopping Mall

화장품 쇼핑몰 웹사이트입니다. React + Vite 프론트엔드와 Node.js + Express 백엔드로 구성되어 있습니다.

## 🚀 프로젝트 구조

```
cosmetics-site/
├── src/                 # React 프론트엔드
├── server/              # Node.js 백엔드
│   ├── server.js       # 메인 서버 파일
│   ├── routes/         # API 라우트
│   └── package.json    # 서버 의존성
└── package.json        # 프론트엔드 의존성
```

## 🛠️ 설치 및 실행

### 1. 전체 의존성 설치
```bash
# 프론트엔드 의존성 설치
npm install

# 백엔드 의존성 설치
npm run install:server
```

### 2. 개발 서버 실행

#### 프론트엔드만 실행
```bash
npm run dev
```

#### 백엔드만 실행
```bash
npm run server
```

#### 프론트엔드 + 백엔드 동시 실행
```bash
npm run dev:full
```

### 3. 프로덕션 빌드
```bash
# 프론트엔드 빌드
npm run build

# 백엔드 실행
npm run server:start
```

## 📡 API 엔드포인트

- `GET /api/health` - 서버 상태 확인
- `GET /api/products` - 전체 제품 목록
- `GET /api/products/:id` - 특정 제품 정보
- `GET /api/products/category/:category` - 카테고리별 제품

## 🔧 기술 스택

### 프론트엔드
- React 19
- Vite
- Tailwind CSS
- React Router
- Axios

### 백엔드
- Node.js
- Express.js
- CORS
- Helmet (보안)
- Morgan (로깅)

## 🌐 접속 URL

- 프론트엔드: http://localhost:5173
- 백엔드 API: http://localhost:3001
- 헬스체크: http://localhost:3001/api/health

## 📝 환경 변수 설정

서버 디렉토리에서 `.env` 파일을 생성하고 다음 내용을 추가하세요:

```env
PORT=3001
NODE_ENV=development
```

## 🚀 배포

### Vercel 배포
프로젝트 루트의 `vercel.json` 파일을 참조하여 Vercel에 배포할 수 있습니다.

### 기타 배포
1. `npm run build`로 프론트엔드 빌드
2. 서버 디렉토리의 `server.js`를 실행
3. 정적 파일은 `dist` 폴더에서 제공
