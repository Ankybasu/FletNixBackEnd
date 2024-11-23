# FletNix API

This project is an API server built with Express.js and MongoDB, designed to work with a frontend application. It supports user authentication, data retrieval, and performs basic CRUD operations with CORS handling for secure cross-origin requests.

## Features

- User authentication (login/register)
- Data retrieval and storage
- CORS handling for specific origins
- MongoDB integration for storing data

## Getting Started

Follow these steps to get the project up and running on your local machine.

### Prerequisites

Make sure you have the following installed:

- Node.js (>= 14.x)
- MongoDB (or a MongoDB URI for remote connection)
- NPM or Yarn for managing dependencies

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/fletnix-api.git
    ```

2. Navigate to the project directory:
    ```bash
    cd fletnix-api
    ```

3. Install the required dependencies:
    ```bash
    npm install
    ```

4. Create a `.env` file in the root of the project and add the following variables:
    ```env
    MONGODB_URI=your_mongodb_connection_string
    ```

    Replace `your_mongodb_connection_string` with your MongoDB URI (either local or a remote database).

### Running the Application

Start the server by running:

```bash
npm start
