# Food Delivery App — Backend

Backend API for the ElifTech Food Delivery web application where users can order food delivery from various shops.


## Tech Stack

- Node.js + Express
- MongoDB + Mongoose
- REST API

## Getting Started

### Prerequisites

- Node.js (v18+)
- MongoDB Atlas account or local MongoDB instance

### Installation

```bash
git clone <repository-url>
cd eliftech-delivery-backend
npm install
```

### Environment Variables

Create a `.env` file in the root directory:

```
MONGO_URI=<your-mongodb-connection-string>
PORT=5000
```

### Seed the Database

```bash
node src/seed.js
```

### Run the Server

```bash
# Development
npm run dev

# Production
npm start
```

## API Endpoints

### Shops

| Method | Endpoint          | Description         |
|--------|-------------------|---------------------|
| GET    | /api/shops        | Get all shops       |
| GET    | /api/shops/:id    | Get shop by ID      |
| POST   | /api/shops        | Create a shop       |
| PUT    | /api/shops/:id    | Update a shop       |
| DELETE | /api/shops/:id    | Delete a shop       |

### Products

| Method | Endpoint                    | Description              |
|--------|-----------------------------|--------------------------|
| GET    | /api/products/shop/:shopId  | Get products by shop     |
| GET    | /api/products/:id           | Get product by ID        |
| POST   | /api/products               | Create a product         |
| PUT    | /api/products/:id           | Update a product         |
| DELETE | /api/products/:id           | Delete a product         |

### Orders

| Method | Endpoint           | Description         |
|--------|--------------------|---------------------|
| GET    | /api/orders        | Get all orders      |
| GET    | /api/orders/:id    | Get order by ID     |
| POST   | /api/orders        | Create an order     |
| PUT    | /api/orders/:id    | Update an order     |
| DELETE | /api/orders/:id    | Delete an order     |

### Coupons

| Method | Endpoint                       | Description         |
|--------|--------------------------------|---------------------|
| GET    | /api/coupons                   | Get all coupons     |
| GET    | /api/coupons/validate/:code    | Validate a coupon   |
| POST   | /api/coupons                   | Create a coupon     |
| PUT    | /api/coupons/:id               | Update a coupon     |
| DELETE | /api/coupons/:id               | Delete a coupon     |

