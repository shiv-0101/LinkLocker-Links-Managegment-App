linklocker/
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── LoadingSpinner.jsx
│   │   ├── boards/
│   │   │   ├── BoardCard.jsx
│   │   │   ├── BoardGrid.jsx
│   │   │   ├── CreateBoardModal.jsx
│   │   │   └── EditBoardModal.jsx
│   │   ├── links/
│   │   │   ├── LinkCard.jsx
│   │   │   ├── LinkGrid.jsx
│   │   │   ├── QuickAddBar.jsx
│   │   │   └── EditLinkModal.jsx
│   │   └── discover/
│   │       ├── DiscoverBoardCard.jsx
│   │       └── CopyLinkModal.jsx
│   ├── pages/
│   │   ├── LandingPage.jsx
│   │   ├── Dashboard.jsx
│   │   ├── BoardView.jsx
│   │   ├── Discover.jsx
│   │   └── Profile.jsx
│   ├── config/
│   │   ├── clerk.js
│   │   ├── supabase.js
│   │   └── api.js
│   ├── hooks/
│   │   ├── useAuth.js
│   │   ├── useBoards.js
│   │   └── useLinks.js
│   ├── utils/
│   │   ├── metadataFetcher.js
│   │   └── formatters.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── server/
│   ├── index.js
│   ├── routes/
│   │   ├── boards.js
│   │   ├── links.js
│   │   └── metadata.js
│   └── utils/
│       └── fetchMetadata.js
├── public/
├── .env.local
├── .gitignore
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── vite.config.js