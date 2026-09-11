# 🍽️ Intelligent Bistro

Intelligent Bistro is an AI-powered restaurant ordering application built with React Native, Node.js, and Groq.

Users can browse a dynamically loaded vegetarian menu, add items to their cart manually, or simply tell the AI what they want to order.

For example:

> "Add 2 Baingan Bharta"

> "Change the quantity of Dal Fry to 3"

> "Remove Baingan Bharta"

The AI understands the request and converts it into structured cart actions.

The application also includes a complete checkout flow using Stripe test payments.

---

## ✨ Features

### 🤖 AI-Powered Ordering

Users can manage their cart using natural language.

The AI currently supports:

- Adding menu items
- Removing menu items
- Updating quantities
- Clearing the cart

The user's message, current menu, and current cart are sent to the LLM as context.

The LLM returns structured actions such as:

```json
{
  "intent": "cart_update",
  "reply": "Added 2 items to your cart.",
  "actions": [
    {
      "type": "ADD_ITEM",
      "itemId": "52807",
      "itemName": "Baingan Bharta",
      "quantity": 2
    }
  ]
}
```

Before an action is used, the backend validates it against the actual menu.

This prevents invalid menu items or quantities returned by the AI from being added to the cart.

---

### 🥗 Dynamic Menu

The menu is loaded dynamically using TheMealDB API instead of keeping all menu items hardcoded in the application.

The backend fetches vegetarian meals and converts the external API response into the format used by Intelligent Bistro.

For example:

```js
{
  id,
  name,
  image,
  category,
  description,
  price
}
```

The same menu is used by both the React Native interface and the AI ordering system.

This keeps the menu shown to the user and the menu understood by the AI consistent.

---

### 🛒 Cart Management

The cart can be modified in two different ways:

**Using the UI**

Users can manually add items and change quantities.

**Using the AI assistant**

Users can describe what they want using normal language.

Both flows update the same global cart state using Zustand.

This keeps the cart synchronized across the application.

---

### 💳 Stripe Checkout

The application includes a Stripe test-mode payment flow.

Users can:

- Review their order
- See subtotal, tax, and total
- Proceed to payment
- Complete a test payment using Stripe PaymentSheet
- View an order confirmation after successful payment

The Stripe secret key is stored only on the backend.

The frontend does not decide the amount that Stripe should charge.

Instead, the frontend sends the cart to the backend.

The backend validates each item against the current menu, gets the trusted price, calculates the subtotal and tax, and then creates the Stripe PaymentIntent.

This prevents a modified frontend request from changing the actual payment amount.

---

### 📦 Order Storage

Completed orders can be stored in MongoDB.

An order contains information such as:

```js
{
  orderId,
  items,
  subtotal,
  tax,
  total,
  paymentStatus,
  createdAt
}
```

This also provides the foundation for features such as order history and reordering in the future.

---

## 🧠 How the AI Ordering Works

The AI ordering flow looks like this:

```text
User enters a message
        ↓
React Native sends message + cart
        ↓
Node.js backend
        ↓
Backend loads current menu
        ↓
Menu + cart + user request are provided to Groq
        ↓
LLM understands the request
        ↓
LLM returns structured JSON actions
        ↓
Backend validates the actions
        ↓
React Native receives valid actions
        ↓
Zustand updates the cart
```

For the current menu size, the menu is provided directly to the LLM as context.

Embeddings or a vector database are not necessary for this version because the menu is small.

For a much larger system containing thousands of menu items or multiple restaurants, semantic search and embeddings could be introduced to retrieve only the most relevant items before calling the LLM.

---

## 💳 How the Payment Flow Works

```text
Cart
  ↓
Checkout
  ↓
Frontend sends cart to backend
  ↓
Backend validates menu items
  ↓
Backend gets trusted prices
  ↓
Backend calculates total
  ↓
Stripe PaymentIntent
  ↓
Client secret returned to app
  ↓
Stripe PaymentSheet
  ↓
Test payment
  ↓
Order confirmation
```

The frontend calculates the subtotal and total for display purposes.

The backend calculates them again before creating the payment because frontend values should not be trusted for payment processing.

---

## 🏗️ Project Architecture

```text
                 TheMealDB API
                       ↓
                Node.js Backend
                 /           \
                ↓             ↓
         Dynamic Menu      Groq LLM
                ↓             ↓
                └──────┬──────┘
                       ↓
                 React Native
                       ↓
                    Zustand
                       ↓
                     Cart
                       ↓
                   Checkout
                       ↓
                Node.js Backend
                       ↓
                    Stripe
                       ↓
              Order Confirmation
                       ↓
                    MongoDB
```

---

## 🛠️ Tech Stack

### Frontend

- React Native
- Expo
- TypeScript
- Expo Router
- Zustand
- Axios
- Stripe React Native SDK

### Backend

- Node.js
- Express.js
- Groq SDK
- Stripe SDK
- MongoDB
- Mongoose

### External Services

- TheMealDB API – meal and menu data
- Groq – natural language order processing
- Stripe – test payment processing

---

## 📁 Project Structure

```text
intelligent-bistro/
│
├── frontend/
│   ├── app/
│   │   ├── index.tsx
│   │   ├── checkout.tsx
│   │   └── order-success.tsx
│   │
│   ├── components/
│   │   ├── AIAssistantCard.tsx
│   │   ├── CartSection.tsx
│   │   ├── MenuCard.tsx
│   │   ├── Header.tsx
│   │   └── HeroCard.tsx
│   │
│   ├── services/
│   │   └── api.ts
│   │
│   ├── store/
│   │   └── cartStore.ts
│   │
│   └── constants/
│       └── theme.ts
│
└── backend/
    ├── routes/
    │   ├── aiRoutes.js
    │   ├── menuRoutes.js
    │   ├── paymentRoutes.js
    │   └── orderRoutes.js
    │
    ├── services/
    │   ├── aiParser.js
    │   └── menuServices.js
    │
    ├── models/
    │   └── Order.js
    │
    └── server.js
```

> The exact structure may change as the project continues to evolve.

---

## 🚀 Running the Project

### 1. Clone the repository

```bash
git clone <repository-url>
cd intelligent-bistro
```

### 2. Install backend dependencies

```bash
cd backend
npm install
```

Create a `.env` file inside the backend folder.

```env
GROQ_API_KEY=your_groq_api_key
STRIPE_SECRET_KEY=your_stripe_test_secret_key
MONGO_URI=your_mongodb_connection_string
```

Do not commit the `.env` file to GitHub.

Start the backend:

```bash
node server.js
```

---

### 3. Install frontend dependencies

Open another terminal:

```bash
cd frontend
npm install
```

Start Expo:

```bash
npx expo start
```

The application can then be opened using an Android emulator or a supported Expo development environment.

---

## 🧪 Testing Stripe

The project uses Stripe **test mode** during development.

A Stripe test card can be used to simulate a successful payment.

```text
Card Number: 4242 4242 4242 4242
Expiry: Any future date
CVC: Any valid 3-digit number
ZIP: Any valid ZIP code
```

No real payment is made while using Stripe test mode.

---

## 🔐 Security Decisions

A few important decisions were made while building the application:

- Groq and Stripe secret keys are kept on the backend.
- LLM output is validated before cart actions are executed.
- Menu items returned by the AI must exist in the actual menu.
- Quantities must be valid positive integers.
- Payment prices are taken from the backend menu instead of trusting prices sent by the frontend.
- The backend calculates the final Stripe payment amount.

---

## 🔮 Future Improvements

Some features I would like to add next include:

- User authentication
- User-specific order history
- Reorder previous orders
- Stripe webhook verification
- Menu caching
- Better meal descriptions and details
- Search and category filtering
- Favorites
- Order status tracking
- Admin order management

For a larger menu or multi-restaurant version, semantic search and embeddings could also be added instead of sending the entire menu to the LLM.

---

## 💡 What I Learned

This project helped me understand how a traditional full-stack application can be combined with an LLM without allowing the LLM to directly control application state.

Some of the main concepts I worked with were:

- Converting natural language into structured application actions
- Providing application context to an LLM
- Validating LLM-generated output
- Managing shared state with Zustand
- Integrating an external REST API
- Normalizing third-party API data
- Building backend APIs with Node.js and Express
- Integrating Stripe PaymentIntents and PaymentSheet
- Keeping sensitive API keys on the backend
- Validating payment amounts server-side
- Persisting application data with MongoDB

---

## 👩‍💻 Author

**Vaishnavi Rai**

Built as a personal full-stack and AI engineering project.
