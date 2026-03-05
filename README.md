# ☕ Cafe / Restaurant Backend API

A **Node.js & Express based backend service** for managing a cafe or restaurant system.
This project provides a RESTful API that allows administrators to manage products such as **hot drinks, cold drinks, desserts, and meals**.

The backend communicates with a **PostgreSQL database** and provides endpoints for retrieving and managing product data.

---

# 🚀 Features

* RESTful API architecture
* Product management system
* Category-based product filtering
* PostgreSQL database integration
* Secure backend structure
* Admin dashboard support
* JSON API responses
* Scalable service-based architecture

---

# 🛠️ Technologies Used

* **Node.js**
* **Express.js**
* **PostgreSQL**
* **JavaScript (ES6 Modules)**
* **REST API**
* **CSS / HTML (Admin Panel Frontend)**

---

# 📂 Project Structure

```
project-root
│
├── controller
│   └── endpoint.js
│
├── services
│   └── productService.js
│
├── database
│   └── connection.js
│
├── public
│   ├── index.html
│   ├── admin
│   │   ├── dashboard.html
│   │   ├── products.html
│   │   └── login.html
│
├── routes
│   └── productRoutes.js
│
├── server.js
└── package.json
```

---

# 📦 Installation

Clone the repository

```bash
git clone https://github.com/yourusername/project-name.git
```

Go to project directory

```bash
cd project-name
```

Install dependencies

```bash
npm install
```

Start the server

```bash
node server.js
```

Server will run at

```
http://localhost:7272
```

---

# 🗄️ Database Schema

```sql
create table if not exists products(
    products_id serial primary key,
    products_img text not null,
    products_name varchar(500) unique not null,
    products_price numeric(10,2) check(products_price > 0) not null,
    products_category varchar(50) not null 
    check(products_category in ('hot','cold','dessert','meal'))
);
```

---

# 📡 API Endpoints

### Get all products

```
GET /findByProduct
```

---

### Get products by category

```
GET /findByCategory?category=hot
GET /findByCategory?category=cold
GET /findByCategory?category=dessert
GET /findByCategory?category=meal
```

---

# 📸 Example Response

```json
[
  {
    "products_id": 1,
    "products_name": "Espresso",
    "products_price": 45.00,
    "products_img": "https://image-url",
    "products_category": "hot"
  }
]
```

---

# 🔐 Admin Panel

The project also includes a simple **Admin Dashboard** for:

* Managing products
* Viewing product list
* Adding new products
* Updating existing products
* Deleting products

Admin panel files are located in:

```
/public/admin
```

---

# ⚠️ Notes

* Images are stored using **external image URLs**
* Backend uses **Express static middleware** to serve frontend files
* Ensure PostgreSQL is running before starting the server

---

# 📌 Future Improvements

* JWT Authentication
* Role-based admin system
* Order management
* Payment integration
* Analytics dashboard
* Docker support

---

# 👨‍💻 Author

Developed by **Fatih Karabulut**

---

# ⭐ Support

If you find this project useful, consider giving it a **star on GitHub** ⭐
