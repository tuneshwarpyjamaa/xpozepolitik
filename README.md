# Karnataka MP Tracker

This is a full-stack web application that provides a directory of Members of Parliament from Karnataka.

## Project Structure

-   `/frontend`: A Next.js application.
-   `/backend`: A FastAPI application.

## Setup and Running

### Backend

1.  **Navigate to the backend directory:**
    ```bash
    cd backend
    ```
2.  **Create a virtual environment and install dependencies:**
    ```bash
    python3 -m venv venv
    source venv/bin/activate
    pip install -r requirements.txt
    ```
3.  **Create a `.env` file and set the `API_KEY`:**
    ```bash
    echo "API_KEY=your-secret-key" > .env
    ```
4.  **Start the server:**
    ```bash
    uvicorn main:app --host 0.0.0.0 --port 8000
    ```

### Frontend

1.  **Navigate to the frontend directory:**
    ```bash
    cd frontend
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Start the development server:**
    ```bash
    npm run dev
    ```

The application will be available at `http://localhost:3000`.
