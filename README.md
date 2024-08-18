# Dashboard Application

## Project Overview

This project is a dynamic dashboard application built using React. It allows users to manage categories and widgets, add or remove widgets, and store the state of these actions using Redux.

## Features

- Dynamic Widgets: Add and remove widgets within categories.
- Persistent State: Widget states are managed locally using Redux.
- Customizable Dashboard: Users can manage categories and customize the dashboard interface.
- Search Functionality: Easily search for widgets across categories.


## Demo Link

You can view a live demo of the dashboard application at: [Dashboard Demo](https://dashboardcloud.netlify.app/)

## Installation

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (which includes npm)
- [Git](https://git-scm.com/) (optional, for cloning the repository)


1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/yasar56/Dashboard.git

2. Navigate to the project directory:

   ```bash
    cd dashboard

## Installing React and Dependencies


1. Initialize the React Project (if not already done):
   If you don't have the create-react-app tool installed, you can install it globally using npm:

     ```bash
     npm install -g create-react-app

2. Install Project Dependencies:

   Make sure you are in the project directory, then install all required dependencies:

   ```bash
    npm install

3. Run the Application:
    
    Start the development server
    
    The application will be available at http://localhost:3000/.


    ```bash
    npm start

### Usage

#### 1. Adding Widgets:

- Navigate to a category.
- Click the '+Add Widget' button.
- Enter the widget name and description, and it will be added to the category.

#### 2. Removing Widgets:

- Click the 'Remove' button on the widget to remove it from the dashboard.
- The corresponding checkbox in the sidebar will be unchecked.

#### 3. Managing Categories:

- Use the sidebar to check or uncheck widgets. Click the 'Confirm' button to apply changes.



## Directory Structure

    ```plaintext
    src/
    ├── components/
    │   ├── dash.jsx
    │   ├── sidebar.jsx
    │   ├── data/
    │   │   └── data.json
    ├── css/
    │   ├── dash.css
    ├── store.js
    ├── App.js
    ├── index.js
    ├── index.css
    └── app.css


### Contact

#### For any inquiries or support, please contact:

- Mohamed Javed Yasar
- Email: yasarm0024@gmail.com