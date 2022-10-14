import { background, Box, Button, Input, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  loginFailure,
  loginRequest,
  loginSuccess
} from "../Redux/AuthReducer/action";
import axios from "axios";
import { useNavigate } from "react-router";
import { useToast } from "@chakra-ui/react";

export const Form = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  const [form, setForm] = useState({
    email: "eve.holt@reqres.in",
    password: "cityslicka",
    name: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.name) {
      const payload = {
        email: form.email,
        password: form.password
      };
      dispatch(loginRequest());
      axios
        .post("https://reqres.in/api/login", payload)
        .then((res) => {
          dispatch(loginSuccess());
          toast({
            title: "Login Succesfull",
            description: `Hey ${form.name} You're Succesfully Logged In`,
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "top"
          });
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("name", form.name);
          navigate("/mainPage");
        })
        .catch((err) => dispatch(loginFailure()));
    } else {
      toast({
        title: "Missing Details",
        description: "Please Enter your Name With All Details",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top"
      });
    }
  };

  return (
    <>
      <Box
        style={{
          textAlign: "center",
          width: "500px",
          margin: "auto",
          padding: "20px",
          borderRadius: "8px",
          marginTop: "20px",
          backgroundColor: "RGB(170 187 204)"
        }}
      >
        <form onSubmit={(e) => handleSubmit(e)}>
          <Box>
            <Text
              style={{
                fontSize: "20px",
                fontStyle: "italic"
              }}
            >
              Teacher's Name
            </Text>
            <Input
              style={{
                fontSize: "20px",
                fontStyle: "italic"
              }}
              w="300px"
              data-testid="login-email"
              placeholder="Enter Your Name"
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
            />{" "}
            <br /> <br />
            <Text
              style={{
                fontSize: "20px",
                fontStyle: "italic"
              }}
            >
              Teacher's Email
            </Text>
            <Input
              style={{
                fontSize: "20px",
                fontStyle: "italic"
              }}
              w="300px"
              data-testid="login-email"
              placeholder="Enter Your Email"
              type="email"
              value={form.email}
              onChange={handleChange}
            />
          </Box>{" "}
          <br />
          <Box>
            <Text
              style={{
                fontSize: "20px",
                fontStyle: "italic"
              }}
            >
              Teacher's Password
            </Text>

            <Input
              style={{
                fontSize: "20px",
                fontStyle: "italic"
              }}
              w="300px"
              data-testid="login-password"
              placeholder="Enter Your Password"
              type="password"
              value={form.password}
              onChange={handleChange}
            />
          </Box>{" "}
          <br />
          <Button
            title="Click To Login"
            style={{
              fontSize: "20px",

              width: "200px",
              backgroundColor: "RGB(204 0 95)",
              color: "white"
            }}
            type="submit"
            data-testid="login-submit"
          >
            Login
          </Button>
        </form>
      </Box>
    </>
  );
};
