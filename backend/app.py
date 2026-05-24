from flask import Flask
from flask_cors import CORS
from config import Config
from extensions import db, jwt, migrate

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})
    db.init_app(app)
    jwt.init_app(app)
    migrate.init_app(app, db)

    from models.user import User
    from models.task import Task

    from routes.auth import auth_bp
    from routes.tasks import tasks_bp
    app.register_blueprint(auth_bp, url_prefix="/api/auth")
    app.register_blueprint(tasks_bp, url_prefix="/api/tasks")

    return app

if __name__ == "__main__":
    app = create_app()
    app.run(debug=True, port=5001)
