# Inventory and Data Management System

A backend-only BCA project built with Node.js, Express.js, MongoDB, Mongoose and dotenv. It provides REST APIs to manage a store or warehouse product catalogue.

## 1. Requirements

Install:
- Node.js (LTS version)
- MongoDB Community Server, or a MongoDB Atlas database
- Postman (to test APIs)
- VS Code (recommended)

## 2. Setup

1. Extract the project ZIP and open this folder in VS Code.
2. Open the terminal in this folder.
3. Install packages:

   ```bash
   npm install
   ```

4. Make a copy of `.env.example` and name it `.env`.
5. In `.env`, set your MongoDB connection string:

   ```env
   PORT=5000
   MONGO_URI=mongodb://127.0.0.1:27017/inventory_management
   NODE_ENV=development
   ```

   If using MongoDB Atlas, replace the local connection string with your Atlas connection string. Do not share your `.env` file or database password.

6. Make sure MongoDB is running if using a local database.
7. Start the server:

   ```bash
   npm run dev
   ```

   Or:

   ```bash
   npm start
   ```

8. Open `http://localhost:5000` in your browser. You should see an API welcome message.

## 3. Project structure

```text
inventory-data-management-system/
├── config/
│   └── db.js
├── controllers/
│   └── productController.js
├── middleware/
│   └── errorHandler.js
├── models/
│   └── Product.js
├── routes/
│   └── productRoutes.js
├── .env.example
├── .gitignore
├── package.json
├── README.md
└── server.js
```

## 4. API endpoints

Base URL: `http://localhost:5000/api/products`

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/` | Create a product |
| GET | `/` | Get products |
| GET | `/:id` | Get one product |
| PUT | `/:id` | Update product details |
| DELETE | `/:id` | Delete a product |
| PATCH | `/:id/restock` | Increase stock |
| PATCH | `/:id/sale` | Decrease stock safely |
| GET | `/reports/low-stock` | Low-stock report |
| GET | `/reports/category-summary` | Category-wise aggregation |

## 5. Test the APIs in Postman

### A. Create a product

- Method: `POST`
- URL: `http://localhost:5000/api/products`
- Body → raw → JSON:

```json
{
  "name": "Wireless Mouse",
  "sku": "WM-101",
  "category": "Electronics",
  "description": "Wireless optical mouse",
  "price": 599,
  "quantity": 20,
  "minStockLevel": 5,
  "supplier": "ABC Suppliers"
}
```

Expected result: HTTP `201 Created`, with the saved product and its MongoDB ID.

### B. Get all products

- Method: `GET`
- URL: `http://localhost:5000/api/products`

### C. Search, filter, sort and paginate

Examples:

```text
GET /api/products?search=mouse
GET /api/products?category=Electronics
GET /api/products?minPrice=100&maxPrice=1000
GET /api/products?sortBy=price&order=asc
GET /api/products?page=1&limit=5
```

You can combine parameters:

```text
GET /api/products?category=Electronics&sortBy=price&order=asc&page=1&limit=5
```

Allowed `sortBy` fields: `name`, `price`, `quantity`, `createdAt`. Order can be `asc` or `desc`.

### D. Get one product

Replace `PRODUCT_ID` with the `_id` returned when you created a product:

```text
GET /api/products/PRODUCT_ID
```

### E. Update a product

- Method: `PUT`
- URL: `http://localhost:5000/api/products/PRODUCT_ID`
- Body → raw → JSON:

```json
{
  "price": 649,
  "description": "Updated wireless optical mouse"
}
```

### F. Restock a product

- Method: `PATCH`
- URL: `http://localhost:5000/api/products/PRODUCT_ID/restock`
- Body:

```json
{
  "quantity": 10
}
```

This adds 10 to the current stock.

### G. Record a sale

- Method: `PATCH`
- URL: `http://localhost:5000/api/products/PRODUCT_ID/sale`
- Body:

```json
{
  "quantity": 3
}
```

This subtracts 3 from stock. The API rejects the sale if there is not enough stock, so quantity cannot become negative.

### H. Low-stock report

```text
GET http://localhost:5000/api/products/reports/low-stock
```

Returns products whose quantity is at or below their `minStockLevel`.

### I. Category-wise inventory summary

```text
GET http://localhost:5000/api/products/reports/category-summary
```

Uses a MongoDB aggregation pipeline to calculate product count, total units and total inventory value for each category.

### J. Delete a product

- Method: `DELETE`
- URL: `http://localhost:5000/api/products/PRODUCT_ID`

## 6. Main concepts used

- **Node.js:** Runs JavaScript on the server.
- **Express.js:** Creates API routes and handles HTTP requests.
- **MongoDB:** Stores product data in a database.
- **Mongoose:** Defines the product schema, validation rules and database queries.
- **dotenv:** Loads configuration such as the database URL from `.env`.
- **CRUD:** Create, Read, Update and Delete operations.
- **Middleware:** Handles request processing and centralized errors.
- **Pagination:** Divides a large product list into smaller pages.
- **Aggregation:** Calculates category-wise inventory reports.

## 7. Important notes

- Use a unique SKU for every product.
- Replace `PRODUCT_ID` with a real MongoDB document ID.
- Keep your `.env` file private.
- The project has not been connected to your personal MongoDB database. Configure your own local MongoDB or Atlas URI before running it.
