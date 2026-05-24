from extensions import db
import bcrypt

class User(db.Model):
    __tablename__ = "users"
    id       = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email    = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)
    tasks    = db.relationship("Task", backref="owner", lazy=True)

    def set_password(self, raw):
        self.password = bcrypt.hashpw(raw.encode(), bcrypt.gensalt()).decode()

    def check_password(self, raw):
        return bcrypt.checkpw(raw.encode(), self.password.encode())