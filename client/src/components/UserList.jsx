import React from 'react';

const styles = {
  container: {
    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
    maxWidth: '600px',
    margin: '40px auto',
    padding: '8px',
    backgroundColor: '#f8f9fa',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  },
  header: {
    textAlign: 'center',
    color: '#2c3e50',
    // marginBottom: '24px',
    fontSize: '28px',
    fontWeight: '600',
  },
  list: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  item: {
    display: 'flex',
    alignItems: 'center',
    padding: '8px 10px',
    marginBottom: '12px',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  },
  avatar: {
    width: '35px',
    height: '35px',
    borderRadius: '50%',
    backgroundColor: '#3498db',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontSize: '20px',
    fontWeight: 'bold',
    marginRight: '16px',
    flexShrink: 0,
  },
  name: {
    fontSize: '18px',
    fontWeight: '500',
    color: '#2c3e50',
  },
  emptyText: {
    textAlign: 'center',
    color: '#7f8c8d',
    fontSize: '16px',
    padding: '20px',
  }
};

export default class UserList extends React.Component {
  componentDidUpdate(prevProps) {
    if (prevProps.users !== this.props.users) {
      // Example lifecycle hook (no-op, for demonstration)
    }
  }

  render() {
    const { users } = this.props;
    
    return (
      <div style={styles.container}>
        <h2 style={styles.header}>User Directory</h2>
        
        {users.length === 0 ? (
          <p style={styles.emptyText}>No users to display</p>
        ) : (
          <ul style={styles.list}>
            {users.map(user => (
              <li 
                key={user.id} 
                style={styles.item}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 6px rgba(0,0,0,0.05)';
                }}
              >
                <div style={styles.avatar}>
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div style={styles.name}>{user.name}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}