import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import API from '../services/api';
import TaskCard from '../components/TaskCard';
import TaskModal from '../components/TaskModal';

const COLUMNS = [
  { key: 'todo',        label: '📋 Todo' },
  { key: 'in_progress', label: '⚡ In Progress' },
  { key: 'done',        label: '✅ Done' },
];

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [tasks, setTasks]       = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editTask, setEditTask]   = useState(null);
  const [filter, setFilter]       = useState({ priority: '' });

  const fetchTasks = async () => {
    try {
      const params = {};
      if (filter.priority) params.priority = filter.priority;
      const res = await API.get('/tasks/', { params });
      setTasks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { fetchTasks(); }, [filter]);

  const handleDelete = async (id) => {
    await API.delete(`/tasks/${id}`);
    fetchTasks();
  };

  const handleEdit = (task) => {
    setEditTask(task);
    setShowModal(true);
  };

  const handleStatusChange = async (task, newStatus) => {
    await API.put(`/tasks/${task.id}`, { ...task, status: newStatus });
    fetchTasks();
  };

  const handleModalClose = () => {
    setShowModal(false);
    setEditTask(null);
    fetchTasks();
  };

  const tasksByStatus = (status) => tasks.filter(t => t.status === status);

  return (
    <div style={styles.page}>
      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.logo}>📝 Task Manager</h1>
        <div style={styles.headerRight}>
          <span style={styles.welcome}>Hi, {user.username}!</span>
          <button style={styles.addBtn} onClick={() => setShowModal(true)}>+ New Task</button>
          <button style={styles.logoutBtn} onClick={logout}>Logout</button>
        </div>
      </div>

      {/* Filter Bar */}
      <div style={styles.filterBar}>
        <span style={styles.filterLabel}>Filter by priority:</span>
        {['', 'low', 'medium', 'high'].map(p => (
          <button
            key={p}
            style={{ ...styles.filterBtn, ...(filter.priority === p ? styles.filterBtnActive : {}) }}
            onClick={() => setFilter({ priority: p })}
          >
            {p === '' ? 'All' : p.charAt(0).toUpperCase() + p.slice(1)}
          </button>
        ))}
      </div>

      {/* Kanban Board */}
      <div style={styles.board}>
        {COLUMNS.map(col => (
          <div key={col.key} style={styles.column}>
            <div style={styles.columnHeader}>
              <h3 style={styles.columnTitle}>{col.label}</h3>
              <span style={styles.columnCount}>{tasksByStatus(col.key).length}</span>
            </div>
            <div style={styles.taskList}>
              {tasksByStatus(col.key).length === 0
                ? <p style={styles.empty}>No tasks</p>
                : tasksByStatus(col.key).map(task => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      onDelete={handleDelete}
                      onEdit={handleEdit}
                      onStatusChange={handleStatusChange}
                    />
                  ))
              }
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <TaskModal
          task={editTask}
          onClose={handleModalClose}
        />
      )}
    </div>
  );
}

const styles = {
  page:            { minHeight: '100vh', background: '#f0f2f5', fontFamily: 'sans-serif' },
  header:          { display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#4f46e5', padding: '1rem 2rem', color: '#fff' },
  logo:            { margin: 0, fontSize: '1.4rem' },
  headerRight:     { display: 'flex', alignItems: 'center', gap: '1rem' },
  welcome:         { fontSize: '14px' },
  addBtn:          { padding: '8px 16px', background: '#fff', color: '#4f46e5', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' },
  logoutBtn:       { padding: '8px 16px', background: 'transparent', color: '#fff', border: '1px solid #fff', borderRadius: '6px', cursor: 'pointer' },
  filterBar:       { display: 'flex', alignItems: 'center', gap: '8px', padding: '1rem 2rem', background: '#fff', borderBottom: '1px solid #e5e7eb' },
  filterLabel:     { fontSize: '14px', color: '#666', marginRight: '4px' },
  filterBtn:       { padding: '4px 12px', borderRadius: '20px', border: '1px solid #ddd', background: '#fff', cursor: 'pointer', fontSize: '13px' },
  filterBtnActive: { background: '#4f46e5', color: '#fff', border: '1px solid #4f46e5' },
  board:           { display: 'flex', gap: '1.5rem', padding: '1.5rem 2rem', overflowX: 'auto' },
  column:          { flex: 1, minWidth: '280px', background: '#fff', borderRadius: '8px', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' },
  columnHeader:    { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', borderBottom: '1px solid #f0f0f0' },
  columnTitle:     { margin: 0, fontSize: '15px', fontWeight: '600', color: '#333' },
  columnCount:     { background: '#f0f2f5', borderRadius: '12px', padding: '2px 8px', fontSize: '12px', color: '#666' },
  taskList:        { padding: '0.75rem' },
  empty:           { textAlign: 'center', color: '#bbb', fontSize: '13px', padding: '1rem' },
};