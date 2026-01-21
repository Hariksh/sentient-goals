# Sentient Goals - AI-Powered Goal Achievement Platform  

> **Turn Your Dreams Into Daily Actions**  
DreamPath is a full-stack web application that transforms abstract dreams into actionable, structured roadmaps using AI. The platform helps users break down their aspirations into manageable milestones with progress tracking, community support, and gamification.  

---

## Core Features  

- **AI Roadmap Generation** - Transform dreams into 4-phase action plans.
- **Dream Input** - Category selection with validation (50-500 chars). 
- **Interactive Roadmap** - Visual progress tracking with checkboxes.  
- **Modern UI** - Responsive design with animations

## Technical Features
- **Real-time** - Instant generation with live progress.
- **Type Safe** - Full TypeScript + Zod validation.
- **Mobile Ready** - Responsive across all devices.
- **Error Handling** - Rate limits, API credits, graceful fallbacks.
- **AI Integration.**
- **Smart Generation** - Context-aware, category-specific roadmaps.
- **Realistic Planning** - Timelines, skills, resources, success metrics.
- **Value**: Turn dreams into concrete, actionable plans with AI assistance.

---

##  Project Structure  

```
dream-path/
├── frontend/               # React 18 + TypeScript + Vite
│   ├── src/
│   │   ├── components/     
│   │   ├── pages/         
│   │   ├── services/       
│   │   ├── utils/          
│   │   └── App.jsx
│   └── tailwind.config.js
├── backend/                # Supabase Edge Functions (Deno + TypeScript)
│   ├── controllers/       
│   ├── models/            
│   ├── routes/            
│   ├── middleware/        
│   ├── services/        
│   ├── config/           
│   └── server.js
└── README.md
```

---

##  Tech Stack  

**Frontend**  
- React 18 + TypeScript + Vite
- Tailwind CSS + shadcn/ui + Radix UI 
- TanStack Query + React Hook Form
- React Router + Zod validation

**Backend**  
- Supabase Edge Functions (Deno + TypeScript)
- PostgreSQL (via Supabase)
- Lovable AI API + Google Gemini 2.5 Flash

**Deployment**  
- Frontend → Vercel (Frontend) 
- Supabase (Backend + Database)
- Key Libraries
- 40+ Radix UI components (buttons, forms, modals, etc.)
- Lucide React (icons)
- Sonner (notifications)

---

## Community  

Join our mission to help dreamers achieve their goals.  
Start your journey today → **[Sentient-Goals](https://sentient-goals.vercel.app/)** 
