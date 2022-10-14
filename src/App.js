import "./styles.css";
import { Container } from "@chakra-ui/react";
import { Form } from "./Components/Form";
import { AllRoutes } from "./Components/AllRoutes";

export default function App() {
  // Reqres :  https://reqres.in/api/login
  // JSON-Server : https://fakestoreproducts.herokuapp.com/heroku
  return (
    <Container minW="100%">
      <AllRoutes />
    </Container>
  );
}
