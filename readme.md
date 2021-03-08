Author: Rafał Surdej

A client-server application that lets us create a school timetable. It is made using Spring Boot 2 and therefore
    it has an embedded Tomcat server. The server part uses Spring MVC and Spring DATA REST to retrieve data from MySQL
    database and serve it to the client in JSON format. The client is made using JavaScript and React library.
    It uses React-Bootstrap for formatting, React-Router for routing between pages and Axios for obtaining data from
    the server. I implemented JSON Web Token authentication which filters all the request and allows changing the
    database only if the request has proper permission token. Usernames and their passwords are stored in database
    where are encrypted with the bcypt function.


How to run:
1. Clone the repository
2. Create MySql database using SQL script 'crate_db.sql' form /starter
3. Log into your root user and run 'create_user.sql' script from /starter to create new user
    or change /src/main/resources/application.properties file for your custom user
4. Open terminal, go to project directory and run following command depending on your operating system:
    Windows: mvnw.cmd spring-boot:run
    Linux / MacOs: ./mvnw spring-boot:run
5. Open internet browser and go to localhost:8080

To do:
1. Administrator panel:
    a. Adding new items to teachers, groups and rooms
    b. Validating input of those items
    c. Registering new accounts for the system
2. Exception handling:
    a. Custom page for 404 response status.
    b. Internal server exception handler for validating incorrect incoming data


References:
1. https://bezkoder.com/spring-boot-react-jwt-auth/
2. https://spring.io/guides/tutorials/react-and-spring-data-rest/
