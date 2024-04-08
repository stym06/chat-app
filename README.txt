# INFORMATION ABOUT PROJECT

1. The project makes use of NodeJS, AngularJS, Socket.IO, and MySQL (knex.js for QueryBuilder).
2. It assumes that Node is installed as well as npm (Node Package manager).
3. The root folder consists of `package.json` file that contains the dependencies required for stable run of the product.
4. The root folder also consists `justdoc.sql` file that contains the database.

## INSTRUCTIONS FOR USE

1. Use XAMPP or any other software for Apache server, and open phpMyAdmin.
2. Make a database with the name `justdoc`.
3. Import the `justdoc.sql` file present in the root folder of the project into the database.
4. Open terminal in the root folder.
5. Type `npm install` (This will install all the dependencies of the project).
6. Type `npm start` to start the server.

The server listens at http://localhost:4000

- Go to http://localhost:4000/doctor for the Doctor-Side of the chat.
- Go to http://localhost:4000/patient for the Patient-Side.

## Note

The workflow was kept as told in the assignment intimation. UI work was minimal. I could make use of AngularMaterial for the "WhatsApp feel", but the time constraint was there. However, all the functionalities are there. I'm listing down the features of the web-app below:

1. Patient opens up his chat window and sees a bunch of questions and a doctor greeting.
2. Patient fills the form and submits it, and waits for the doctor's response.
3. When the form reaches the doctor, he sees all the choices filled by the patient (the data is uploaded in the db too).
4. Doctor clicks on `Start Chat` that sends a notification to the patient that the doctor has joined the chat.
5. The normal chatting follows.

For any queries/errors, please reach out to me at satyammast@gmail.com. Thanks.
