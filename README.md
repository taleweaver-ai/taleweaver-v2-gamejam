# Tale Weaver

<img width="1280" alt="blobertselection" src="https://github.com/taleweaver-ai/taleweaver-v2-gamejam/assets/90188544/44516438-7dce-46b8-8cb8-0bcda8da6dbc">

![image](https://github.com/taleweaver-ai/taleweaver-v2-gamejam/assets/90188544/7453a5a9-8f39-4f89-86ee-bb0713c623ed)
![image](https://github.com/taleweaver-ai/taleweaver-v2-gamejam/assets/90188544/2b2e3c43-b3a1-4b5b-b06b-edf93c24c34b)



## Warning
This project will not function without the proper API keys and .env configuration. Please contact us for further details or to obtain the necessary keys.

## Clone the Repository

To get started, clone this repository to your local machine using the following command in your terminal:

```bash
git clone https://github.com/taleweaver-ai/taleweaver-v2-gamejam.git && cd taleweaver-v2-gamejam
```

## Server Setup

Follow these steps to set up the server:

1. **Start the Server:**

   Navigate to the server directory and install the necessary dependencies:

   ```bash
   cd backend-gamejam
   npm install
   ```

2. **Add .env File:**

   An `.env` file is required to configure API keys and other important settings. You can contact us to get the keys or you can add your own.

   Example `.env` content which has to be in the backend-gamejam directory root:

   ```
   ARK_API_KEY=your_api_key_here
   ```

   To start the server, run:

   ```bash
   node src/server.js
   ```

   *Note: This server will only allow access from `localhost:3001`. If the frontend is running on a different URL, please change this port in the `server.js` file on line 16.*

3. **Open a New Terminal and Navigate to the Project Root:**

   ```bash
   cd taleweaver-ts-main-v2 && bun install
   ```

4. **Add .env File and allow CORSanywhere:**

   Similar to the backend setup, an `.env` file is needed for the frontend. The .env of this part of the project is divided in two:

      -Information obtained from generating a world using Dojo and slot, which has this information:
      
   ``` 
   VITE_MASTER_ACCOUNT_ADDRESS=
   VITE_MASTER_ACCOUNT_PRIVATE_KEY=
   VITE_MASTER_ACCOUNT_PUBLIC_KEY=
   VITE_PUBLIC_TORII=
   VITE_PUBLIC_RPC=
   ```
   You can look at the documentation on how to deploy a dojo world here: https://book.dojoengine.org/tutorial/deploy-using-slot/main

   
      -And the API_KEYS part that has to be provided by the user and has to have this structure:
   ```
   VITE_OPENAI_API_KEY=
   VITE_PINATA_JWT=
   VITE_PINATA_URL=
   VITE_CORS_PROXY=
   ```

   All this information has to be added to the `.env` file in the root of the taleweaver-ts-main-v2 directory.
   
   Allow CORS-anywhere with this link: https://cors-anywhere.herokuapp.com/ in your browser.

6. **Start Development:**

   To start the development environment, run:

   ```bash
   bun run dev
   ```

This README provides a step-by-step guide on how to clone, set up the backend, and configure the frontend of the taleweaver-v2-gamejam project. Ensure you follow the instructions carefully to avoid setup errors.

