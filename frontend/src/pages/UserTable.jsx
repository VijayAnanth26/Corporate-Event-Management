
import EventSideNav from "../components/EventSideNav";
import Pagination from "../components/Pagination";

const users = [
  { id: 1, username: 'admin', email: 'admin@example.com', role: 'Admin' },
  { id: 2, username: 'john_doe', email: 'john.doe@example.com', role: 'User' },
  { id: 3, username: 'jane_doe', email: 'jane.doe@example.com', role: 'User' },
  { id: 4, username: 'alice_smith', email: 'alice.smith@example.com', role: 'User' },
  { id: 5, username: 'bob_jackson', email: 'bob.jackson@example.com', role: 'User' },
];

const UserTable = () => {
  return (
    <div className="user-table-container">
      <div className="sidenav">
        <EventSideNav />
      </div>
      <div className="content">
        <h2>User Table</h2>
        <table id="userTable">
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination />
      </div>
    </div>
  );
};

export default UserTable;
