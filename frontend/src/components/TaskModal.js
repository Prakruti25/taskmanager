import React, { useState } from 'react';
import API from '../services/api';

export default function TaskModal({ task, onClose }) {
  const [form, setForm] = useState({
    title:       task?.title       || '',
    description: task?.description || '',
    priority:    task?.priority    || 'medium',
    status:      task?.status      || 'todo',
    due_date:    task?.due_date    ? task.due_date.slice(0, 10) : '',
  });
  const [error, setError] = useState('');

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      const payload = { ...form, due_date: form.due_date || null };
      if (task) {
        await API.put(`/tasks/${task.id}`, payload);
      } else {
        await API.post('/tasks/', payload);
      }
      onClose();
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong');
    }
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <div style={styles.modalHeader}>
          <h3 style={styles.modalTitle}>{task ? 'Edit Task' : 'New Task'}</h3>
          <button style={styles.closeBtn} onClick={onClose}>✕</button>
        </div>

        {error && <p style={styles.error}>{error}</p>}

        <form onSubmit={handleSubmit}>
          <label style={styles.label}>Title *</label>
          <input style={styles.input} name="title" value={form.title}
            onChange={handleChange} required placeholder="Task title" />

          <label style={styles.label}>Description</label>
          <textarea style={styles.textarea} name="description" value={form.description}
            onChange={handleChange} placeholder="Optional description" rows={3} />

          <div style={styles.row}>
            <div style={styles.half}>
              <label style={styles.label}>Priority</label>
              <select style={styles.input} name="priority" value={form.priority} onChange={handleChange}>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            <div style={styles.half}>
              <label style={styles.label}>Status</label>
              <select style={styles.input} name="status" value={form.status} onChange={handleChange}>
                <option value="todo">Todo</option>
                <option value="in_progress">In Progress</option>
                <option value="done">Done</option>
              </select>
            </div>
          </div>

          <label style={styles.label}>Due Date</label>
          <input style={styles.input} name="due_date" type="date"
            value={form.due_date} onChange={handleChange} />

          <div style={styles.modalFooter}>
            <button type="button" style={styles.cancelBtn} onClick={onClose}>Cancel</button>
            <button type="submit" style={styles.submitBtn}>{task ? 'Update' : 'Create'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}

const styles = {
  overlay:     { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 },
  modal:       { background: '#fff', borderRadius: '10px', padding: '1.5rem', width: '460px', maxWidth: '90vw', boxShadow: '0 8px 32px rgba(0,0,0,0.2)' },
  modalHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' },
  modalTitle:  { margin: 0, fontSize: '18px', color: '#333' },
  closeBtn:    { background: 'none', border: 'none', fontSize: '18px', cursor: 'pointer', color: '#888' },
  label:       { display: 'block', fontSize: '13px', fontWeight: '600', color: '#555', marginBottom: '4px' },
  input:       { width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #ddd', marginBottom: '1rem', fontSize: '14px', boxSizing: 'border-box' },
  textarea:    { width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #ddd', marginBottom: '1rem', fontSize: '14px', boxSizing: 'border-box', resize: 'vertical' },
  row:         { display: 'flex', gap: '1rem' },
  half:        { flex: 1 },
  modalFooter: { display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '0.5rem' },
  cancelBtn:   { padding: '8px 16px', borderRadius: '6px', border: '1px solid #ddd', background: '#fff', cursor: 'pointer' },
  submitBtn:   { padding: '8px 16px', borderRadius: '6px', border: 'none', background: '#4f46e5', color: '#fff', cursor: 'pointer', fontWeight: 'bold' },
  error:       { color: 'red', fontSize: '13px', marginBottom: '1rem' },
};