# Task Manager App

A full-stack task management application built with Flask, PostgreSQL, and React. Features JWT authentication, a Kanban-style board, and full CRUD task management.

🔗 **Live Demo:** https://taskmanager-two-liart.vercel.app  
📁 **GitHub:** https://github.com/Prakruti25/taskmanager

---

## Features

- JWT Authentication (register & login)
- Create, update, and delete tasks
- Kanban board with 3 columns: Todo / In Progress / Done
- Filter tasks by priority (Low / Medium / High)
- Set due dates and priority levels per task
- Fully responsive dashboard UI
- RESTful API with auto-reloading

---

## Tech Stack

### Backend
| Technology | Purpose |
|---|---|
| Python 3 | Core language |
| Flask | Web framework |
| PostgreSQL | Relational database |
| SQLAlchemy | ORM |
| Flask-Migrate | Database migrations |
| Flask-JWT-Extended | Authentication |
| Gunicorn | Production server |

### Frontend
| Technology | Purpose |
|---|---|
| React | UI framework |
| React Router | Client-side routing |
| Axios | HTTP requests |
| Context API | Auth state management |

### Deployment
| Service | Purpose |
|---|---|
| Render | Backend + PostgreSQL hosting |
| Vercel | Frontend hosting |

---

## Architecture

```
task-manager/
├── backend/
│   ├── app.py              # App factory
│   ├── config.py           # Configuration
│   ├── extensions.py       # Flask extensions
│   ├── models/
│   │   ├── user.py         # User model
│   │   └── task.py         # Task model
│   ├── routes/
│   │   ├── auth.py         # Register & login
│   │   └── tasks.py        # CRUD endpoints
│   └── requirements.txt
└── frontend/
    └── src/
        ├── pages/
        │   ├── Login.js
        │   ├── Register.js
        │   └── Dashboard.js
        ├── components/
        │   ├── TaskCard.js
        │   └── TaskModal.js
        ├── context/
        │   └── AuthContext.js
        └── services/
            └── api.js
```

---

## API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/register` | ❌ | Register new user |
| POST | `/api/auth/login` | ❌ | Login & get token |
| GET | `/api/tasks/` | ✅ | Get all tasks |
| POST | `/api/tasks/` | ✅ | Create a task |
| PUT | `/api/tasks/<id>` | ✅ | Update a task |
| DELETE | `/api/tasks/<id>` | ✅ | Delete a task |

---

## Running Locally

### Prerequisites
- Python 3.8+
- Node.js 16+
- PostgreSQL

### Backend Setup
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

Create a `.env` file in the `backend/` folder:
```
DATABASE_URL=postgresql://taskuser:taskpass@localhost/taskmanager
JWT_SECRET_KEY=your-secret-key
```

Run migrations and start the server:
```bash
flask db upgrade
python app.py
```

### Frontend Setup
```bash
cd frontend
npm install
npm start
```

App runs at `http://localhost:3000`

---

## Screenshots

### Login Page
Clean authentication screen with register/login flow.

### Kanban Dashboard
Three-column board (Todo / In Progress / Done) with priority color coding and task filtering.

### Task Modal
Create and edit tasks with title, description, priority, status, and due date.

---

## Author

**Prakruti Patel**  
GitHub: [@Prakruti25](https://github.com/Prakruti25)