Expense Management API
  This is a scalable RESTful API built with Node.js, Express, and MongoDB for managing expenses. The API supports features such as advanced filtering, sorting, pagination, JWT-based authentication, role-based access control, and bulk operations (via JSON and CSV upload).

- Features
  - CRUD Operations: Create, Read, Update, and Delete expenses.
  - Bulk Operations: Add expenses in bulk via CSV upload or JSON payload.
  - Advanced Filtering: Filter expenses by category, payment method, amount, and date range.
  - Sorting and Pagination: Sort expenses by amount or date and paginate results.
  - JWT Authentication: Secure the API with JWT tokens.
  - Role-Based Access Control (RBAC): Differentiate access between regular users and admin users.
  - MongoDB Aggregation: Generate statistics, like monthly expenses and category-wise breakdown.
  - Caching: Redis caching for frequently accessed data (optional).

- Technologies Used
  - Node.js: JavaScript runtime for building the backend.
  - Express: Web framework for creating the API.
  - MongoDB: NoSQL database for storing expense data.
  - Mongoose: MongoDB object modeling tool.
  - JWT: JSON Web Tokens for secure user authentication.
  - Bcrypt: Secure password hashing.
  - Multer: File upload handling for CSVs.
  - Redis: Optional caching layer to improve performance for frequently accessed data.

- Environment Variables
  - PORT
  - MONGO_URI
  - JWT_SECRET


- Role-Based Access Control (RBAC)
  - Regular users can create, view, update, and delete their own expenses.
  - Admin users can manage all users’ expenses and perform administrative actions.
  - Caching with Redis (Optional)
  - To enable caching for frequently accessed data:

- Ensure Redis is installed and running.
  - The getExpenses endpoint can cache results for commonly used queries.
  - MongoDB Aggregation for Statistics
  - Category-wise breakdown: The API uses the MongoDB aggregation framework to calculate totals and breakdowns of expenses per category.
  - Monthly expense summaries: Get total expenses per month.

- Error Handling
  - The API returns proper status codes for various scenarios:
  - 400: Bad request or validation errors.
  - 401: Unauthorized access (missing or invalid JWT).
  - 403: Forbidden (insufficient rights).
  - 404: Not found.
  - 500: Server errors.

- Security
  - JWT Authentication: All protected routes require a valid JWT token.
  - Password Hashing: Passwords are hashed using bcrypt before storage.
  - Input Validation: Input is validated to prevent common security issues like SQL injection.

- Conclusion
  - This project provides a full-fledged expense management solution with modern web API features like authentication, filtering, sorting, pagination, and bulk operations. Feel free to extend it as per your requirements!
