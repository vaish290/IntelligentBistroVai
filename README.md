# Intelligent Bistro 🍽️🤖

An AI-powered restaurant ordering mobile application built using React Native (Expo) and Node.js.

Users can browse a vegetarian menu, manage their shopping cart manually, and also interact with an AI assistant using natural language commands like:
    
  - “Add two Paneer Tikka Wrap”
  -  “Remove Mango Smoothie”
  -  “Make Mango Smoothie quantity 4”
  -  “Clear cart”

The AI backend processes the message and returns structured cart actions which update the frontend cart state in real time.

## Tech Stack
### Frontend
    React Native (Expo)
    TypeScript
    Zustand (State Management)
### Backend
    Node.js
    Express.js
### Features
 - Menu Browsing
 - Browse vegetarian food items
 - View item details and prices
 - Cart Management
 - Add items
 - Remove items
 - Increase/decrease quantity
 - Clear cart
 - Checkout flow
 - AI Ordering Assistant

Supports natural language ordering such as:

 - Add two Paneer Tikka Wrap
 - Remove Mango Smoothie
 - Make Mango Smoothie quantity 4
 - Clear cart
 - AI Backend

The backend processes user messages and returns structured JSON actions such as:

    {
      "type": "ADD_ITEM",
      "quantity": 2
    }

### Supported actions:
- ADD_ITEM
-  REMOVE_ITEM
-  UPDATE_QUANTITY
-  CLEAR_CART
  
## Project Structure
    frontend/
      app/
      components/
      constants/
      data/
      services/
    
    backend/
      routes/
      services/
      data/
    State Management

The app uses Zustand for global cart state management.

### The same cart state is updated through:

- Manual UI interactions
- AI-generated backend actions
## Running the Project
### Frontend
    cd frontend
    npm install
    npx expo start
### Backend
    cd backend
    npm install
    node server.js
### API Endpoint
    POST /api/ai/order

Example Request:

    {
      "message": "Add two Paneer Tikka Wrap"
    }

## AI Tools Used

AI coding tools were used during development for:

 - UI iteration
 - Debugging
 - Backend integration
 - Faster development workflow

### Tools used:

 - ChatGPT
 - GitHub Copilot
 - Claude
 - Demo

## The app demonstrates:

- Conversational ordering
- Real-time cart updates
- Frontend + backend integration
- AI-driven user experience

## Author
### Vaishnavi Rai
