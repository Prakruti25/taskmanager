from extensions import db
from datetime import datetime

class Task(db.Model):
    __tablename__ = "tasks"
    id          = db.Column(db.Integer, primary_key=True)
    title       = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text, default="")
    status      = db.Column(db.String(20), default="todo")   # todo | in_progress | done
    priority    = db.Column(db.String(10), default="medium") # low | medium | high
    due_date    = db.Column(db.DateTime, nullable=True)
    created_at  = db.Column(db.DateTime, default=datetime.utcnow)
    user_id     = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)