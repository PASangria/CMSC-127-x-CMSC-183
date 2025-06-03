# Digitalizing OSA Records

The Digitalized System of Records for the Guidance Counselor Office aims to replace the current manual, paper-based record-keeping system with a secure, efficient, and accessible digital platform.


## 👨🏻‍💻 Tech Stack
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
cd backend
pip install -r requirements.txt
```

### 🎨 Frontend (React + Vite)

#### 1. Install dependencies
```bash
cd ..
cd frontend
npm install
```

### ⚙️ Environment Variables
#### 1. Create a .env file in your root directory.

### 🛠️ Development Server

### 1. Run the Django development server
Inside the backend directory, type this in the terminal
```bash
python manage.py runserver
```
The backend will be available at: http://127.0.0.1:8000/

#### 2. Start the Vite dev server
Inside the frontend directory, type this in the terminal
```bash
npm run dev
```
The frontend will be available at: http://localhost:5173/

Make sure your React app is calling the Django API (e.g., http://127.0.0.1:8000/api/...)

### 🐳 Docker 

### 1. Configure the .env File
Modify the DATABASE_URL based on you environment 

```bash
# For Docker
DATABASE_URL=postgres://user:password@db:5432/dbname

# For Local Development
DATABASE_URL=postgres://user:password@localhost:5432/dbname
```

### 2. Add wait-for-it.sh Scripts

This ensures the backend waits for the database to be ready.
Run this from the root directory (or adjust path as needed):
```bash
curl -o backend/wait-for-it.sh https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh
```

### 3. Build Docker Containers
Use the --no-cache flag for a clean build
```bash
docker-compose build --no-cache
```

#### 4. Run Database Migrations
In a separate terminal, run:
```bash
docker exec -it cmsc-127-x-cmsc-183-backend python manage.py migrate
```
Then start the app:
```bash
docker-compose up --build
```
### 5. Create a superuser (optional)

### Common Commands:
Start the application
```bash
docker-compose up
```

Stop all Docker containers 
```bash
docker-compose down
```

### 📁 Project Structure (WIP)
```bash
osa/
├── backend/
│   ├── OSA/          # Django project root
│   ├── users/        # app directory for registering and logging in users
|   |__ forms/
|   |__ analytics/
│   └── manage.py
│   └── requirements.txt
|   |__ .dockerignore
|   |__ Dockerfile
├── frontend/
│   ├── components/
│   ├── src/
│   └── index.html
|   |__ .dockerignore
|   |__ Dockerfile
├── README.md
└── .gitignore
|__ docker-compose.yml
```

### 🧪 Notes for Developers
Backend requirements: pip freeze > requirements.txt
