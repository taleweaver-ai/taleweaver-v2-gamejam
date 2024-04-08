# taleweaver-v2-gamejam

## Warning
This project will not function without the proper API keys and .env configuration. Please contact us for further details or to obtain the necessary keys.

## Clone the Repository

To get started, clone this repository to your local machine using the following command in your terminal:

git clone https://github.com/taleweaver-ai/taleweaver-v2-gamejam.git && cd taleweaver-v2-gamejam
## Server Setup

Follow these steps to set up the server:

1. Start the Server:

   Navigate to the server directory and install the necessary dependencies:

  
   cd backend-gamejam
   npm install
   
2. Add .env File:

   An .env file is required to configure API keys and other important settings. You can contact us to get the keys or you can add your own.

   Example .env content:

  
   API_KEY=your_api_key_here
   
   To start the server, run:

  
   node src/server.js
   
   *Note: This server will only allow access from localhost:3001. If the frontend is running on a different URL, please change this port in the server.js file on line 16.*

3. Open a New Terminal and Navigate to the Project Root:

  
   cd taleweaver-ts-main-v2 && npm install
   
   If there are conflicts while installing dependencies, run:

  
   npm install --legacy-peer-deps
   
4. Add .env File:

   Similar to the backend setup, an .env file is needed for the frontend. You can contact us to get the keys or add your own.

5. Start Development:

   To start the development environment, run:

  
   npm run dev
   
This README provides a step-by-step guide on how to clone, set up the backend, and configure the frontend of the taleweaver-v2-gamejam project. Ensure you follow the instructions carefully to avoid setup errors.
