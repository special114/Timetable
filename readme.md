Author: Rafał Surdej

## Basic description:
A client-server application that lets us create a school timetable. It is made using Spring Boot 2 and therefore
it has an embedded Tomcat server. The server part uses Spring MVC and Spring DATA REST to retrieve data from MySQL
database and serve it to the client in JSON format. The client is made using JavaScript and React library.
It uses React-Bootstrap for formatting, React-Router for routing between pages and Axios for obtaining data from
the server. I implemented JSON Web Token authentication which filters all the request and allows changing the
database only if the request has proper permission token. Usernames and their passwords are stored in database
where are encrypted with the bcypt function.


## How to run:
1. Clone the repository
2. Create MySql database using SQL script 'crate_db.sql' form /starter
3. Log into your root user and run 'create_user.sql' script from /starter to create new user
    or change /src/main/resources/application.properties file for your custom user
4. Open terminal, go to project directory and run following command depending on your operating system:
    Windows: mvnw.cmd spring-boot:run
    Linux / MacOs: ./mvnw spring-boot:run
5. Open internet browser and go to localhost:8080

## To do:
1. Administrator panel:
    a. Adding new items to teachers, groups and rooms
    b. Validating input of those items
    c. Registering new accounts for the system
2. Exception handling:
    a. Custom page for 404 response status.
    b. Internal server exception handler for validating incorrect incoming data


## References:
1. https://bezkoder.com/spring-boot-react-jwt-auth/
2. https://spring.io/guides/tutorials/react-and-spring-data-rest/

### Some screenshots presenting how the app works:


![tt1](https://user-images.githubusercontent.com/51239039/110319920-d5841500-800f-11eb-926e-97b59fa773b6.PNG)
![tt4](https://user-images.githubusercontent.com/51239039/110320297-5c38f200-8010-11eb-9ad7-15e04c13f602.PNG)

To log in use 'admin' as username and 'test' as password.

![tt5](https://user-images.githubusercontent.com/51239039/110320087-15e39300-8010-11eb-9cdc-1fda6ad65e54.PNG)

After logging in all the timetable slots become active and they redirect to the edit form that is connected with this slot.

![tt6](https://user-images.githubusercontent.com/51239039/110320141-2bf15380-8010-11eb-9262-00b8d0c47927.PNG)
![tt13](https://user-images.githubusercontent.com/51239039/110321210-a40c4900-8011-11eb-91a7-563c8b121df0.PNG)

After submitting the selected data is saved in the database and the timetable is updated.

![tt8](https://user-images.githubusercontent.com/51239039/110320185-3875ac00-8010-11eb-8fcc-3f26d53eaf4f.PNG)
![tt11](https://user-images.githubusercontent.com/51239039/110320203-3dd2f680-8010-11eb-83ad-a83ee58a1e59.PNG)

Selecting occupied slot allows to delete the data that is stored in this certain slot.

![tt9](https://user-images.githubusercontent.com/51239039/110320219-44616e00-8010-11eb-9143-5ae0fbee9956.PNG)
![tt10](https://user-images.githubusercontent.com/51239039/110320232-46c3c800-8010-11eb-81fb-dca1b228689c.PNG)
