# React + TypeScript + Vite
My Personal Project


foodshare-frontend/
├── public/
│   └── favicon.ico
├── src/
│   ├── assets/
│   │   └── logo.png
│
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── ProtectedRoute.tsx
│   │   └── FoodCard.tsx
│
│   ├── hooks/
│   │   └── useAuth.ts
│
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── Login.tsx
│   │   ├── Register.tsx
│   │   ├── Foods.tsx
│   │   ├── AddFood.tsx
│   │   ├── MyFoods.tsx
│   │   ├── SingleFood.tsx
│   │   ├── ClaimFood.tsx
│   │   ├── Profile.tsx
│   │   └── NotFound.tsx
│
│   ├── services/
│   │   └── api.ts         <-- axios instance using VITE_API_URL
│
│   ├── types/
│   │   └── index.ts       <-- food, user, auth types
│
│   ├── utils/
│   │   ├── jwtHelper.ts   <-- decode token, isExpired etc
│   │   └── imagePreview.ts
│
│   ├── App.tsx
│   ├── main.tsx
│   ├── router.tsx         <-- React Router DOM routes
│   └── index.css
│
├── .env
├── tailwind.config.js
├── postcss.config.js
├── tsconfig.json
├── vite.config.ts
└── package.json
