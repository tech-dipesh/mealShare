# React + TypeScript + Vite
My Personal Project

  ├── .gitignore
  ├── README.md
  ├── backend
      ├── .gitignore
      ├── config
      │   ├── email.js
      │   ├── jwt.js
      │   └── supabase.js
      ├── controllers
      │   ├── authcontroller.js
      │   ├── categorycontroller.js
      │   ├── claimcontroller.js
      │   ├── foodcontroller.js
      │   ├── ratingcontroller.js
      │   └── usercontroller.js
      ├── middleware
      │   ├── auth.js
      │   ├── errorhandle.js
      │   └── validation.js
      ├── package.json
      ├── routes
      │   ├── auth.js
      │   ├── category.js
      │   ├── claim.js
      │   ├── food.js
      │   ├── rating.js
      │   └── user.js
      ├── server.js
      ├── services
      │   ├── geoService.js
      │   └── uploadService.js
      ├── utils
      │   ├── cloudinary.js
      │   ├── emailService.js
      │   ├── jwtutils.js
      │   ├── passWordutils.js
      │   └── response.js
      └── validation
      │   ├── authvalidation.js
      │   ├── foodvalidation.js
      │   └── uservalidation.js
  └── frontend
      ├── .gitignore
      ├── eslint.config.js
      ├── index.html
      ├── package.json
      ├── public
          └── vite.svg
      ├── src
          ├── App.css
          ├── App.tsx
          ├── assets
          │   ├── mealshare.jpeg
          │   └── react.svg
          ├── components
          │   ├── auth
          │   │   ├── authform.tsx
          │   │   ├── forgetpassword.tsx
          │   │   ├── login.tsx
          │   │   └── register.tsx
          │   ├── common
          │   │   ├── footer.tsx
          │   │   ├── header.tsx
          │   │   ├── loading.tsx
          │   │   └── privateroute.tsx
          │   ├── food
          │   │   ├── createfood.tsx
          │   │   ├── foodcard.tsx
          │   │   ├── foodfilter.tsx
          │   │   ├── foodlist.tsx
          │   │   └── foodstatus.tsx
          │   ├── profile
          │   │   └── editprofilemodal.tsx
          │   ├── rating
          │   │   ├── ratingcomponent.tsx
          │   │   └── reviewList.tsx
          │   └── user
          │   │   ├── profile.tsx
          │   │   └── userPosts.tsx
          ├── constants
          │   └── image.ts
          ├── context
          │   ├── authcontext.tsx
          │   └── foodProvider.tsx
          ├── hooks
          │   ├── useAuth.tsx
          │   ├── useLocation.tsx
          │   ├── useUploadImage.ts
          │   └── useUser.tsx
          ├── index.css
          ├── main.tsx
          ├── pages
          │   ├── auth.tsx
          │   ├── food.tsx
          │   ├── home.tsx
          │   ├── myposts.tsx
          │   ├── notfound.tsx
          │   ├── profile.tsx
          │   └── userprofile.tsx
          ├── services
          │   ├── api.ts
          │   ├── authservice.ts
          │   ├── claimservice.ts
          │   ├── cloudinaryservice.ts
          │   └── foodservice.ts
          ├── types
          │   ├── config
          │   │   └── supabaseClient.ts
          │   ├── food.ts
          │   └── user.ts
          ├── utils
          │   ├── constant.ts
          │   ├── filterUtils.ts
          │   ├── formatdata.ts
          │   └── validators.ts
          └── vite-env.d.ts
      ├── tsconfig.app.json
      ├── tsconfig.json
      ├── tsconfig.node.json
      └── vite.config.ts