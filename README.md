# user-management-dashboard

<h1>User Management Web Application</h1>

This is a simple User Management Web Application built with HTML, CSS, and JavaScript (Vanilla JS). It allows users to view, add, edit, and delete user details using the JSONPlaceholder API.

<h2>Features</h2>

Fetch and display users from the mock API.
Add new users (simulated).
Edit existing users.
Delete users.
Responsive design for a better user experience.
Error handling for API requests.

<h1>How to Use</h1>

View Users: The user list is automatically fetched from the API.
Add User: Click the "Add User" button, fill in the form, and click "Save".
Edit User: Click the "Edit" button next to a user, modify the details, and save.
Delete User: Click the "Delete" button to remove a user.

<h2>API Used</h2>
https://jsonplaceholder.typicode.com/users
GET - Fetch users.
POST - Add a user (simulated).
PUT - Edit a user.
DELETE - Remove a user.

<h1>Challenges & Improvements</h1>

<h2>Challenges Faced</h2>

JSONPlaceholder does not persist data, so adding, editing, and deleting users only simulate changes.
Had to handle user name splitting (firstName, lastName).

<h2>Possible Improvements</h2>
Implement a real backend with Node.js & Express for actual data persistence.
Add pagination for better user experience.
Improve form validation to prevent invalid inputs.
