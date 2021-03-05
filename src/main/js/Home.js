import React from "react";
import Jumbotron from 'react-bootstrap/Jumbotron';

const Home = () => {
    return (
        <Jumbotron>
            <h1>Timetable </h1>
            <p>
                Welcome to my timetable project. Made using Spring Boot and React.
                <br />
                Author: Rafał Surdej
                <br /><br />
                References:
                <br />
                <a href="https://spring.io/guides/tutorials/react-and-spring-data-rest/">Spring Boot with React tutorial</a>
                <br />
                <a href="https://bezkoder.com/spring-boot-react-jwt-auth/">Spring and React authentication using JWT</a>
            </p>
        </Jumbotron>
    );
};

export default Home;