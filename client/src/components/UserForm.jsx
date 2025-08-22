import React, { useState } from 'react';

const styles = {
  form: {
    display: 'flex',
    gap: '12px',
    alignItems: 'center',
    margin: '24px 0',
    padding: '20px',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  input: {
    padding: '10px 14px',
    border: '1px solid #ddd',
    borderRadius: '6px',
    fontSize: '16px',
    minWidth: '200px',
    outline: 'none',
    transition: 'border-color 0.3s, box-shadow 0.3s',
    ':focus': {
      borderColor: '#3498db',
      boxShadow: '0 0 0 2px rgba(52, 152, 219, 0.2)',
    },
    ':disabled': {
      backgroundColor: '#f0f0f0',
      color: '#999',
    }
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.3s, transform 0.2s',
    ':hover:not(:disabled)': {
      backgroundColor: '#2980b9',
    },
    ':active:not(:disabled)': {
      transform: 'scale(0.98)',
    },
    ':disabled': {
      backgroundColor: '#bdc3c7',
      cursor: 'not-allowed',
    }
  },
  error: {
    color: '#e74c3c',
    fontSize: '14px',
    margin: '8px 0 0',
    width: '100%',
    textAlign: 'center',
  }
};

export default function UserForm({ onAdd }) {
  const [name, setName] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    const trimmed = name.trim();
    if (!trimmed) {
      setError('Name is required');
      return;
    }
    setSubmitting(true);
    try {
      await onAdd(trimmed);
      setName('');
    } catch (err) {
      setError(err.message || 'Failed to add user');
    } finally {
      setSubmitting(false);
    }
  }

  // Inline styles with pseudo-classes need to be handled differently
  const inputStyle = {
    ...styles.input,
    ...(name && !submitting ? { borderColor: '#3498db' } : {})
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <input
        placeholder="Enter user name"
        value={name}
        onChange={e => setName(e.target.value)}
        disabled={submitting}
        aria-label="User name"
        style={inputStyle}
        onFocus={(e) => {
          e.target.style.borderColor = '#3498db';
          e.target.style.boxShadow = '0 0 0 2px rgba(52, 152, 219, 0.2)';
        }}
        onBlur={(e) => {
          e.target.style.borderColor = '#ddd';
          e.target.style.boxShadow = 'none';
        }}
      />
      <button 
        type="submit" 
        disabled={submitting}
        style={{
          ...styles.button,
          ...(submitting ? styles.button[':disabled'] : {})
        }}
        onMouseOver={(e) => {
          if (!submitting) {
            e.target.style.backgroundColor = '#2980b9';
          }
        }}
        onMouseOut={(e) => {
          if (!submitting) {
            e.target.style.backgroundColor = '#3498db';
          }
        }}
      >
        {submitting ? 'Adding...' : 'Add User'}
      </button>
      {error && <div style={styles.error}>{error}</div>}
    </form>
  );
}