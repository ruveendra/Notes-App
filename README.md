Post it notes application using MERN stack

A web application that helps students write, store, and view post-it notes in a single place. The application is developed using a four-key technology stack known as MERN. And it revolves around two main user’s, admin and the student. Admin is responsible for creating student accounts and emailing the temporary account credentials for the students. Once a student account is created by the admin student can login to the system using the temporary password and update it back to a preferred password. Once the student account is created students can successfully engage in application features such as creating, saving, editing, and viewing their notes.


Implementation

-JWT token based authentication

-Login/Registration 

-Create, update, view and delete notes

-Form validation

-Search student by email (Admin)

-Pagination (Admin)

-User details pop-up

-Load indicators

-Seed file to add the admin directly into the database


How to run the project:

1) Go to the project directory and run the command "npm dev start" to run the development server of the node application (Back End)
2) Go to the project directory {"project file name"}/client and run the command "npm start" to run the development server of the react application (Front End)
3) Once the react server starts you will be directed to the login page of the web application. 
4) In order to add a new admin go to directory {"project file name"}/seeder and open the file and add the admin cridentials using a text editor and run the command "node seederAdmin.js" within the directory

Student account credentials:
email- example13@gmail.com
password-123

Admin account credentials:
exmail- admin@gmail.com
password- 123


Packages

-React: axios, bootstrap, react-bootstrap, react-router-dom, timeago.js

-Node: bcrypt, cors, dotenv, express, jsonwebtoken, mongoose


Possible Errors

-On refresh the webpage will direct you back to the login page. This is because when returning the status of the token sometimes route breaks. possibly due to caching beacuse the error is present even when the relevant back-end function is commented.

(* The above issue can be fixed by rearranging the "router.get("/verify", userCtrl.verifiedToken);" route above the "router.get("/:id", userCtrl.getUser);" route in the userRouter.js file.)

-Pagination buttons need some work 



