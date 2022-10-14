import {
  Box,
  Button,
  Image,
  Input,
  Select,
  Text,
  useDisclosure
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { getFailure, getLaoding, getSuccess } from "../Redux/AppReducer/action";
import { Link } from "react-router-dom";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";

export const Main = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const [page, stetPage] = useState(1);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = React.useRef(null);
  const [names, setNames] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [test1, setTest1] = useState("");
  const [test2, setTest2] = useState("");
  const [test3, setTest3] = useState("");
  const [test4, setTest4] = useState("");
  const toast = useToast();

  const searchfunc = () => {
    dispatch(getLaoding());
    axios
      .get(`https://rahimansari.herokuapp.com/rahi?_q=${text}`)
      .then((res) => dispatch(getSuccess(res.data)))
      .catch((err) => dispatch(getFailure()));
  };

  const getData = (page) => {
    dispatch(getLaoding());
    axios
      .get(`https://rahimansari.herokuapp.com/rahi?_limit=5&_page=${page}`)
      .then((res) => dispatch(getSuccess(res.data)))
      .catch((err) => dispatch(getFailure()));
  };
  useEffect(() => {
    getData(page);
  }, [page]);

  const { loading, error, students } = useSelector((state) => {
    return {
      loading: state.App.loading,
      error: state.App.error,
      students: state.App.students
    };
  });

  // console.log(students, loading, error);

  const deleteStudent = (id) => {
    axios
      .delete(`https://rahimansari.herokuapp.com/rahi/${id}`)
      .then((res) => {
        toast({
          title: "Deleted Successfully.",
          description: "You'are Deleted 1 Student Details",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top"
        });
        dispatch(getData());
      })
      .catch((err) => null);
  };
  const name = localStorage.getItem("name");
  const token = localStorage.getItem("token");

  const AddData = () => {
    if ((names, age, gender)) {
      const payload = {
        student: names,
        age: age,
        gender: gender,
        tests: [test1, test2, test3, test4]
      };
      axios
        .post("https://rahimansari.herokuapp.com/rahi", payload)
        .then((res) => {
          toast({
            title: "Added Successfully.",
            description: "You'are Added 1 More Student",
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "top"
          });
          dispatch(getData());
        })
        .catch((err) => console.log(err));
      onClose();
    } else {
      toast({
        title: "Missing Details",
        description: "Please Enter All Details",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top"
      });
    }
  };

  const logout = () => {
    localStorage.removeItem("name");
    localStorage.removeItem("token");
    toast({
      title: "Logged Out Succesfully",
      description: "You're Succesfully LoggedOut",
      status: "success",
      duration: 5000,
      isClosable: true
    });
    navigate("/");
  };
  return loading ? (
    <Image
      style={{ width: "30%", margin: "auto" }}
      src="https://raw.githubusercontent.com/Codelessly/FlutterLoadingGIFs/master/packages/cupertino_activity_indicator.gif"
    />
  ) : error ? (
    <Image src="https://i.gifer.com/origin/78/787899e9d4e4491f797aba5c61294dfc_w200.gif" />
  ) : (
    <>
      {" "}
      <Box
        style={{
          border: "1px Solid grey",
          padding: "10px",
          display: "flex",
          borderRadius: "8px",
          justifyContent: "space-evenly"
        }}
      >
        <Button>{name ? name : "Login Please"}</Button>
        <Button onClick={() => logout()}>Logout</Button>

        <Box>
          <Button mt={4} onClick={onOpen} mt="-1px">
            Add More Students
          </Button>
          <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>ADD MORE STUDENTS</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Text>Enter Student's Name</Text>
                <Input
                  onChange={(e) => setNames(e.target.value)}
                  placeholder="Student's Name"
                />
                <br />
                <br />
                <Text>Enter Student's Age</Text>
                <Input
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="Student's Age"
                />
                <br />
                <br />
                <Text>Student's Gender</Text>
                <Select onChange={(e) => setGender(e.target.value)}>
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </Select>{" "}
                <br /> <br />
                <Text>Student's First Test</Text>
                <Select onChange={(e) => setTest1(e.target.value)}>
                  <option value="First-Test ">First-Test</option>
                  <option value="DSA - E1 1-Auf-2022">DSA - E1</option>
                  <option value="CODING - E1 1-Aug- 2022">CODING - E1</option>
                </Select>{" "}
                <br /> <br />
                <Text>Student's Second Test</Text>
                <Select onChange={(e) => setTest2(e.target.value)}>
                  <option value="Second-Test">Second-Test</option>
                  <option value="DSA - E2 3rd-May-2022">DSA - E2</option>
                  <option value="CODING - E2 3rd-May-2022">CODING - E2</option>
                </Select>{" "}
                <br /> <br />
                <Text>Student's Third Test</Text>
                <Select onChange={(e) => setTest3(e.target.value)}>
                  <option value="Third-Test">Third-Test</option>
                  <option value="DSA - E3 2nd-June-2022">DSA - E3</option>
                  <option value="CODING - E3 2nd-June-2022">CODING - E3</option>
                </Select>{" "}
                <br /> <br />
                <Text>Student's Fourth Test</Text>
                <Select onChange={(e) => setTest4(e.target.value)}>
                  <option value="Fourth-Test">Fourth-Test</option>
                  <option value="DSA - E4 1st-July-2022">DSA - E4</option>
                  <option value="CODING - E4 1st-July-2022">CODING - E4</option>
                </Select>{" "}
                <br /> <br />
              </ModalBody>

              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={onClose}>
                  Close
                </Button>
                <Button onClick={() => AddData()} variant="ghost">
                  Add Student
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Box>

        <Box>
          {" "}
          <Input
            onChange={(e) => setText(e.target.value)}
            placeholder="Search Students"
            w="200px"
          />{" "}
          <Button onClick={() => searchfunc()}>Search</Button>
        </Box>
      </Box>
      <Box w="70%" m="auto" mt="30px">
        <Text>Click On Profile Pic to See All Tests In Tabular Fashion</Text>
      </Box>
      <Box
        style={{
          width: "80%",
          margin: "auto",
          display: "flex",
          justifyContent: "space-evenly",
          border: "1px solid grey",
          padding: "10px",
          borderRadius: "8px",
          marginTop: "20px"
        }}
      >
        <Text>Student Image</Text>
        <Text>Student Name</Text>
        <Text>Student Age</Text>
        <Text>Student Gender</Text>
        <Text>Tests</Text>
        <Text>Remove Student</Text>
      </Box>
      <Box>
        {students &&
          students.map((d) => (
            <Box
              style={{
                width: "80%",
                margin: "auto",
                display: "flex",
                justifyContent: "space-evenly",
                border: "1px solid grey",
                padding: "10px",
                borderRadius: "8px",
                cursor: "pointer"
              }}
            >
              <Link
                to={`/mainPage/${d.id}`}
                key={d.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between"
                }}
              >
                <Image
                  w="50px"
                  src="https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-512.png"
                />
                <Text>{d.student}</Text>{" "}
              </Link>

              <Text>{d.age}</Text>
              <Text>{d.gender}</Text>
              <Text>{d.tests ? d.tests.length : 0}</Text>
              <Image
                onClick={() => deleteStudent(d.id)}
                style={{ cursor: "pointer" }}
                w="40px"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTRpW22V44evyu7oW1lbI-88wEEHKm8aPmCJ7h2hGqMq3xQPf9AYHpE862QlneoMqWdPw&usqp=CAU"
              />
            </Box>
          ))}
      </Box>
      <Box m="auto" mt="50px" w="500px">
        <Button disabled={page == 1} onClick={() => stetPage(1)}>
          1
        </Button>{" "}
        <Button onClick={() => stetPage(2)}>2</Button>{" "}
        <Button onClick={() => stetPage(3)}>3</Button>{" "}
        <Button onClick={() => stetPage(4)}>4</Button>{" "}
        <Button onClick={() => stetPage(5)}>5</Button>{" "}
        <Button onClick={() => stetPage(6)}>6</Button>{" "}
      </Box>
    </>
  );
};
