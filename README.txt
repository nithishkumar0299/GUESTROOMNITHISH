Guest Room Management System using MERN Stack:

-> Introduction:

Welcome to the Guest Room Management System  built using the MERN (MongoDB, Express.js, React, Node.js) stack. This application is designed to help house owners and admin
efficiently manage their system operations, including reservations, room management, guest information, and more. This README file will guide you through the setup and usage of the application.

-> install:

1. first install the Nodejs and Reactjs with recommended version.
2. check Nodejs version on command prompt by using npm -v(command)
3. intall the npm on local machine by using npm --install (command)

-> setup:
 
*Create a folder on desktop and create two different file on same folder
1.client
2.server
* open this two folder on vscode and packages 
* client package command for react is npx create-react-app client
* create account on MangoDB and create project and copy the database url for the particular project and connect this url to server.
 
-> Logging In:

1.start the server:command
cd ../server
npm start
2.start the client application:
cd ../client
npm start
3.Open your web browser and go to http://localhost:3000.
4.Log in using your admin credentials.

-> Dashboard:

Once logged in, you will be directed to the dashboard, where you can access various features of the Guest Room Management System.

-> Managing Rooms:

To add new rooms, navigate to the "Manage Rooms" section, where you can add room details, such as room number, type, capacity, and price per night.

-> Making Reservations:

In the "Reservations" section, you can make new reservations by selecting the desired room, specifying guest information, check-in, and check-out dates.

-> Features:

*User authentication for admins.
*Room management, including adding, updating, and deleting rooms.
*Reservation management, allowing guests to make reservations and admins to view and modify them.
*Guest management, including a list of all guests and their reservation history.

