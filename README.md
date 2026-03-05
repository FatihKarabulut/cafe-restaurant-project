# 📂 Project Structure

```
project
│
├── controller
│   └── app.js        # All API endpoints
│   ├── endpoint.js
│   └── generator.js  // token
│   ├── global.js
│   └── middleware.js
│
├── dataService
│   └── service.js   # Database operations
│   ├── getuserArrayJson.js
│   └── dataServiceTest.js        
│
├── middleware
│   └── middleware.js      # verifyToken, role authorization
│
├── auth
│   ├── generator.js       # JWT token generators
│   └── global.js          # Token cookie names
│
├── public                 # Admin panel frontend
│   ├── index.html
│   └── login.html
│
├── app.js
└── package.json
```

---

# 🔐 Authentication System

The API uses **JWT authentication with HTTP-only cookies**.

When a user logs in:

1. Server verifies username and password
2. Generates two tokens

```
Access Token
Refresh Token
```

3. Tokens are stored in cookies:

```
ACCESS_TOKEN
REFRESH_TOKEN
```

### Access Token

* Short lifetime
* Used for protected endpoints

### Refresh Token

* Longer lifetime
* Used to generate a new access token

Endpoint:

```
GET /refreshToken
```

---

# 🛡 Authorization

The system uses middleware for role control.

### verifyToken

Validates the JWT token.

### isUserAndAdmin

Allows access to:

```
admin
user
```

### isAdmin

Allows access only to:

```
admin
```

---

# 📡 API Endpoints

## Authentication

```
POST /login
GET  /refreshToken
GET  /logout
```

---

## Products

```
POST   /products
GET    /findByProduct
GET    /findByProductName
GET    /findByCategoryName
PATCH  /updatePrice
DELETE /deleteByName
DELETE /DeleteProduct
```

---

## Users

```
POST   /userSave
GET    /findByUser
PATCH  /updateUserPassword
PATCH  /updateUserNameAndPassword
DELETE /deleteByUserName
```

---

# ▶ Running the Project

Install dependencies

```
npm install
```

Run server

```
cd demlik/controler
```

```
npm start
```

Server will start:

```
localhost:7272
```

---

# 👨‍💻 Author

Fatih Karabulut

GitHub
https://github.com/FatihKarabulut
