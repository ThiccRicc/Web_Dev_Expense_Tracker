# Full-Stack Expense Tracker (MERN)

Professional developement project for web dev exploration. Back-end is complete, Front-end in progress.

A RESTful expense tracking API that supports secure user authentication and expense management.

## Tech Stack
* **Front-End:** HTML5, CSS3, JavaScript (ES6+ / Client Fetch Architecture)
* **Back-End:** Node.js, Express.js
* **Database:** MongoDB (via Mongoose ODM)
* **Authentication:** JSON Web Tokens (JWT) & Bcrypt hashing

---

## Database & Data Modeling

This application utilizes **MongoDB Atlas** for secure cloud storage and **Mongoose** to enforce schema-level structural rules and object validation.

### Expense Model Schema (`server/models/Expense.js`)
```javascript
const expenseSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: [true, 'Please add a transaction title'],
    trim: true
  },
  amount: {
    type: Number,
    required: [true, 'Please add a financial amount']
  },
  category: {
    type: String,
    required: [true, 'Category specification required'],
    enum: ['Food', 'Rent', 'Utilities', 'Entertainment', 'Salary', 'Misc']
  },
  date: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });
```

---

##  System Architecture & Folder Layout

The project uses a structured **Monorepo Architecture** to separate user interface elements from core data schemas:

```text
📁 Web_Dev_Expense_Tracker
   ├── 📁 client/             # Frontend Layout, Assets & UI Styles
   ├── 📁 server/             # Express.js REST API Architecture
   │   ├── 📁 config/         # Database Connections & Initializations
   │   ├── 📁 controllers/    # Route Handlers & Database Queries
   │   ├── 📁 middleware/     # JWT Verification & Exception Handlers
   │   ├── 📁 models/         # Mongoose Collection Schemas
   │   └── 📁 routes/         # Express Router Endpoints
   ├──   .gitignore          # Environment & Dependency Blocklists
   └──   README.md           # Documentation Landing Page
```

---

## 💻 REST API Endpoint Reference

### Authentication Services
* `POST /api/auth/register` - Registers a new user account & hashes passwords with Bcrypt.
* `POST /api/auth/login` - Authenticates credentials and returns a secure JWT string.

### Core Financial Tracker Services
* `GET /api/expenses` - Retrieves all stored entries matching the active user token.
* `POST /api/expenses` - Records a new validated item into the MongoDB collection.
* `DELETE /api/expenses/:id` - Removes a targeted database entry securely by object identifier.

---

##  Getting Started Locally

### 1. Environment Variable Setup
Create a `.env` configuration file within your **`/server`** subdirectory and structure the input as follows:
```text
PORT=5000
MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/expense_db
JWT_SECRET=your_custom_jwt_secret_signing_phrase
```

### 2. Launch Sequence
Navigate to the root directory and execute these terminal allocations:

```bash
# Set up and boot backend services
cd server
npm install
npm start

# In a separate terminal panel, serve your front end
cd ../client
# Run your local client deployment command here (e.g., npm run dev or open live server)
```
