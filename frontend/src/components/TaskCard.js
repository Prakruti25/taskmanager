import React from 'react';

const PRIORITY_COLORS = { low: '#10b981', medium: '#f59e0b', high: '#ef4444' };
const STATUS_OPTIONS  = ['todo', 'in_progress', 'done'];

export default function TaskCard({ task, onDelete, onEdit, onStatusChange }) {
  return (
    <div style={styles.card}>
      <div style={styles.topRow}>
        <span style={{ ...styles.priority, background: PRIORITY_COLORS[task.priority] }}>
          {task.priority}
        </span>
        <div style={styles.actions}>
          <button style={styles.editBtn} onClick={() => onEdit(task)}>✏️</button>
          <button style={styles.deleteBtn} onClick={() => onDelete(task.id)}>🗑️</button>
        </div>
      </div>

      <h4 style={styles.title}>{task.title}</h4>
      {task.description && <p style={styles.desc}>{task.description}</p>}
      {task.due_date && (
        <p style={styles.due}>📅 {new Date(task.due_date).toLocaleDateString()}</p>
      )}

      <select
        style={styles.select}
        value={task.status}
        onChange={e => onStatusChange(task, e.target.value)}
      >
        {STATUS_OPTIONS.map(s => (
          <option key={s} value={s}>{s.replace('_', ' ')}</option>
        ))}
      </select>
    </div>
  );
}

const styles = {
  card:      { background: '#fafafa', border: '1px solid #eee', borderRadius: '8px', padding: '12px', marginBottom: '10px' },
  topRow:    { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' },
  priority:  { fontSize: '11px', color: '#fff', padding: '2px 8px', borderRadius: '12px', textTransform: 'uppercase', fontWeight: 'bold' },
  actions:   { display: 'flex', gap: '4px' },
  editBtn:   { background: 'none', border: 'none', cursor: 'pointer', fontSize: '14px' },
  deleteBtn: { background: 'none', border: 'none', cursor: 'pointer', fontSize: '14px' },
  title:     { margin: '0 0 4px', fontSize: '14px', fontWeight: '600', color: '#333' },
  desc:      { margin: '0 0 6px', fontSize: '12px', color: '#888' },
  due:       { margin: '0 0 8px', fontSize: '12px', color: '#666' },
  select:    { width: '100%', padding: '4px', borderRadius: '4px', border: '1px solid #ddd', fontSize: '12px', cursor: 'pointer' },
};