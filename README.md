# Digitalizing OSA Records

The Digitalized System of Records for the Guidance Counselor Office aims to replace the current manual, paper-based record-keeping system with a secure, efficient, and accessible digital platform.


## Tech Stack
- **Backend:** Django + Django REST Framework
- **Frontend:** React + Vite
- **Database:** PostgreSQL 
- **Containerization (WIP):** Docker
- **Environment Management:** `venv` (Python) + `npm/yarn` (Node)

## 🚀 Getting Started


### 📦 Backend (Django)

#### 1. Set up your virtual environment
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

#### 2. Install dependencies
```bash
pip install -r requirements.txt
```

### 3. Run the development server
```bash
python manage.py runserver
```

The backend will be available at: http://127.0.0.1:8000/

### 🎨 Frontend (React + Vite)

#### 1. Install dependencies
```bash
npm install
```

#### 2. Start the Vite dev server
```bash
npm run dev
```

The frontend will be available at: http://localhost:5173/

Make sure your React app is calling the Django API (e.g., http://127.0.0.1:8000/api/...)

### ⚙️ Environment Variables
#### 1. Create a .env file in your root directory.

### 🐳 Docker (Coming Soon)

Docker setup is currently under development. For now, please use virtual environments for development.

### 📁 Project Structure (WIP)
```bash
osa/
├── backend/
│   ├── OSA/          # Django project root
│   ├── applist/      # Your Django apps
│   └── manage.py
│   └── requirements.txt
├── frontend/
│   ├── components/
│   ├── src/
│   └── index.html
├── README.md
└── .gitignore
```

### 🧪 Notes for Developers
Backend requirements: pip freeze > requirements.txt