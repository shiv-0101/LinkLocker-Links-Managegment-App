# Tech Stack: LinkLocker

## Complete Technology Stack

| Layer | Technology | Version | Purpose |
|-------|------------|---------|---------|
| **Frontend** | React | 18.x | UI components & state management |
| **Build Tool** | Vite | 5.x | Fast development & builds |
| **Styling** | Tailwind CSS | 3.x | Utility-first styling |
| **Routing** | React Router DOM | 6.x | Client-side navigation |
| **HTTP Client** | Axios | 1.x | API requests |
| **Auth** | Clerk | Latest | Authentication & user management |
| **Backend** | Node.js + Express | 18.x / 4.x | API server |
| **Database** | Supabase (PostgreSQL) | Latest | Data storage & real-time |
| **ORM/Query** | Supabase JS Client | Latest | Database operations |
| **Metadata Fetch** | Cheerio + node-fetch | 1.x / 2.x | Scrape OG tags from URLs |
| **Deployment** | Vercel | - | Hosting & CI/CD |
| **Notifications** | react-hot-toast | 2.x | Toast notifications |
| **Icons** | react-icons | 5.x | UI icons |

## Why This Stack?

### React + Vite
- Fast development with HMR
- Optimized production builds
- Large ecosystem of libraries

### Tailwind CSS
- Rapid UI development without leaving HTML
- Consistent design system
- Small production CSS size

### Clerk Authentication
- Pre-built UI components (sign-in, sign-up, user button)
- Handles session management automatically
- Works seamlessly with React and Next.js
- Free tier for hackathon projects

### Supabase (PostgreSQL)
- Real-time subscriptions for live updates
- Built-in Row Level Security (RLS)
- Auto-generated REST API
- Free tier with 500MB database

### Node.js + Express
- Simple to set up API routes
- Works perfectly with Vercel serverless functions
- Easy integration with external APIs

### Vercel Deployment
- One-click deploy from GitHub
- Automatic HTTPS and custom domains
- Environment variables management
- Free tier for hackathon projects

## Environment Variables Required

```env
# Clerk Authentication
VITE_CLERK_PUBLISHABLE_KEY=pk_xxx
CLERK_SECRET_KEY=sk_xxx

# Supabase
VITE_SUPABASE_URL=https://xxx.supabase.co
VITE_SUPABASE_ANON_KEY=xxx

# API (optional, for local dev)
VITE_API_URL=http://localhost:5000