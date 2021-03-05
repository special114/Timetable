Author: Rafał Surdej

How to run:
1. Clone the repository
2. Create MySql database using SQL script 'crate_db.sql' form /starter
3. Log into your root user and run 'create_user.sql' script from /starter
    or change /src/main/resources/application.properties file for your custom user
4. Open terminal, go to project directory and run following command depending on your operating system:
    Windows: mvnw.cmd spring-boot:run
    Linux / MacOs: mvnw spring-boot:run
5. Open internet browser and go to localhost:8080