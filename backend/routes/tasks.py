from flask import Blueprint, request, jsonify
from extensions import db
from models.task import Task
from flask_jwt_extended import jwt_required, get_jwt_identity
from datetime import datetime

tasks_bp = Blueprint("tasks", __name__)

@tasks_bp.route("/", methods=["GET"])
@jwt_required()
def get_tasks():
    user_id  = int(get_jwt_identity())
    status   = request.args.get("status")
    priority = request.args.get("priority")

    query = Task.query.filter_by(user_id=user_id)
    if status:
        query = query.filter_by(status=status)
    if priority:
        query = query.filter_by(priority=priority)

    tasks = query.order_by(Task.created_at.desc()).all()
    return jsonify([task_to_dict(t) for t in tasks]), 200


@tasks_bp.route("/", methods=["POST"])
@jwt_required()
def create_task():
    user_id = int(get_jwt_identity())
    data    = request.get_json()

    if not data.get("title"):
        return jsonify({"error": "Title is required"}), 400

    due_date = None
    if data.get("due_date"):
        due_date = datetime.fromisoformat(data["due_date"])

    task = Task(
        title       = data["title"],
        description = data.get("description", ""),
        status      = data.get("status", "todo"),
        priority    = data.get("priority", "medium"),
        due_date    = due_date,
        user_id     = user_id
    )
    db.session.add(task)
    db.session.commit()
    return jsonify(task_to_dict(task)), 201


@tasks_bp.route("/<int:task_id>", methods=["PUT"])
@jwt_required()
def update_task(task_id):
    user_id = int(get_jwt_identity())
    task    = Task.query.filter_by(id=task_id, user_id=user_id).first()

    if not task:
        return jsonify({"error": "Task not found"}), 404

    data = request.get_json()
    task.title       = data.get("title", task.title)
    task.description = data.get("description", task.description)
    task.status      = data.get("status", task.status)
    task.priority    = data.get("priority", task.priority)

    if data.get("due_date"):
        task.due_date = datetime.fromisoformat(data["due_date"])

    db.session.commit()
    return jsonify(task_to_dict(task)), 200


@tasks_bp.route("/<int:task_id>", methods=["DELETE"])
@jwt_required()
def delete_task(task_id):
    user_id = int(get_jwt_identity())
    task    = Task.query.filter_by(id=task_id, user_id=user_id).first()

    if not task:
        return jsonify({"error": "Task not found"}), 404

    db.session.delete(task)
    db.session.commit()
    return jsonify({"message": "Task deleted"}), 200


def task_to_dict(task):
    return {
        "id":          task.id,
        "title":       task.title,
        "description": task.description,
        "status":      task.status,
        "priority":    task.priority,
        "due_date":    task.due_date.isoformat() if task.due_date else None,
        "created_at":  task.created_at.isoformat()
    }