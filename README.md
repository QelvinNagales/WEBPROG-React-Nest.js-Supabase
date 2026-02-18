# WEBPROG-React-Nest.js-Supabase

A personal profile website with a guestbook built using React, NestJS, and Supabase.

## 🚀 Features

- **Personal Profile Page**: A simple profile landing page
- **Guestbook**: Visitors can leave messages with full CRUD operations
  - **GET**: View all guestbook entries
  - **POST**: Create a new guestbook entry
  - **PUT**: Update an existing entry
  - **DELETE**: Remove an entry
- **React Frontend**: Modern React 19 with Vite for fast development
- **NestJS Backend**: Scalable Node.js framework with TypeScript
- **Supabase Database**: PostgreSQL backend with real-time capabilities

## 📁 Project Structure

```
my-profile/
├── backend/                 # NestJS backend
│   ├── api/                 # Vercel serverless functions
│   │   └── index.ts
│   ├── src/
│   │   ├── app.controller.ts
│   │   ├── app.module.ts
│   │   ├── app.service.ts
│   │   ├── guestbook.controller.ts  # GET, POST, PUT, DELETE endpoints
│   │   ├── guestbook.service.ts     # Supabase integration
│   │   └── main.ts
│   ├── package.json
│   ├── tsconfig.json
│   └── vercel.json
├── frontend/                # React frontend
│   ├── public/
│   ├── src/
│   │   ├── App.jsx         # Main component with guestbook UI
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── package.json
└── vercel.json
```

## 🛠️ Setup Instructions

### 1. Supabase Setup

1. Go to [Supabase](https://supabase.com/) and create a new project
2. In the SQL Editor, run this query to create the guestbook table:

```sql
CREATE TABLE guestbook (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (optional but recommended)
ALTER TABLE guestbook ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows all operations for now
CREATE POLICY "Allow all operations" ON guestbook
  FOR ALL
  USING (true)
  WITH CHECK (true);
```

3. Go to Project Settings > API to get your:
   - **SUPABASE_URL**: Your project URL
   - **SUPABASE_KEY**: Your anon/public key

### 2. Backend Setup

```bash
cd my-profile/backend
npm install
```

Create a `.env` file in the backend folder:

```env
SUPABASE_URL=your_supabase_project_url
SUPABASE_KEY=your_supabase_anon_key
```

Start the backend:

```bash
npm run start:dev
```

Backend runs on `http://localhost:3000`

### 3. Frontend Setup

```bash
cd my-profile/frontend
npm install
```

Create a `.env` file in the frontend folder (optional, for custom API URL):

```env
VITE_API_URL=http://localhost:3000/guestbook
```

Start the frontend:

```bash
npm run dev
```

Frontend runs on `http://localhost:5173`

## 🌐 API Endpoints

| Method | Endpoint           | Description              |
|--------|-------------------|--------------------------|
| GET    | `/guestbook`       | Get all guestbook entries |
| POST   | `/guestbook`       | Create a new entry       |
| PUT    | `/guestbook/:id`   | Update an entry by ID    |
| DELETE | `/guestbook/:id`   | Delete an entry by ID    |

### Request/Response Examples

**POST /guestbook**
```json
{
  "name": "John Doe",
  "message": "Hello! Great website!"
}
```

**PUT /guestbook/:id**
```json
{
  "name": "John Doe",
  "message": "Updated message"
}
```

## 🚀 Deployment (Vercel)

1. Push your code to GitHub
2. Import your repository in [Vercel](https://vercel.com/)
3. Add environment variables in Vercel:
   - `SUPABASE_URL`
   - `SUPABASE_KEY`
4. Deploy!

## 📝 Technologies Used

- **Frontend**: React 19, Vite
- **Backend**: NestJS 11, TypeScript
- **Database**: Supabase (PostgreSQL)
- **Deployment**: Vercel