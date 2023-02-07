import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  Text,
  PinInput,
  PinInputField,
  useToast,
  useColorModeValue,
} from "@chakra-ui/react";
import axios from "axios";
import Cookies from "js-cookie";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  resetpasswordremove,
  showLoginPage,
} from "../../redux/features/auth/actions";
import { setToast } from "../../utils/extraFunctions";

export default function Forgetpassword() {
  const toast = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [resetepass, setresetepass] = useState("");
  const [code, setCode] = useState(null);

  const resetemail = useSelector((state) => state.authReducer.resetemail);

  const handleChange = (e) => {
    console.log(e);
    setCode(e);
  };

  const handlesubmit = async () => {
    let otp = Cookies.get("otp");
    console.log(otp);
    if (otp === code) {
      try {
        let res = await axios.post("/users/resetpassword", {
          data: { email: resetemail, password: resetepass },
        });
        dispatch(resetpasswordremove());
        setToast(toast, res.data, "success");
        Cookies.remove("otp");
        dispatch(showLoginPage());
        navigate("/auth");
      } catch (error) {
        setToast(toast, error.response.data, "error");
      }
    } else {
      if (resetepass === "") {
        setToast(toast, "Enter New Password", "error");
      } else {
        setToast(toast, "OTP Is Incorrect", "error");
      }
    }
  };
  return (
    <>
      <Flex
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack
          w={["100%", "100%", "100%", "100%"]}
          spacing={4}
          mx={"auto"}
          maxW={"lg"}
          py={12}
          px={6}
        >
          <Stack align={"center"}>
            <Heading fontSize={["xl", "xl", "4xl", "4xl"]}>
              Reset Your Password
            </Heading>
            <Text fontSize={["md", "md", "lg", "lg"]} color={"gray.600"}>
              Enter OTP which Was send On Your Email.
            </Text>
          </Stack>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={[0, 0, 0, 8, 8]}
          >
            <Stack spacing={4}>
              <FormControl id="password" isRequired>
                <FormLabel>Enter New Password</FormLabel>
                <Input
                  value={resetepass}
                  onChange={(e) => setresetepass(e.target.value)}
                  type="text"
                  variant={"outline"}
                  border={"1.5px solid"}
                />
              </FormControl>
              <Stack direction={"row"} spacing={[2, 2, 10, 10]}>
                <PinInput otp onChange={(e) => handleChange(e)}>
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                </PinInput>
                <Button
                  backgroundColor={"black"}
                  _hover={{ backgroundColor: "#1e1e1e" }}
                  color={"white"}
                  onClick={handlesubmit}
                >
                  Submit
                </Button>
              </Stack>
              <Box
                justifyContent={"center"}
                alignItems={"center"}
                display={"flex"}
              >
                Return To{" "}
                <Link to={"/"}>
                  <Text ml={1} textDecorationLine={"underline"} color={"black"}>
                    Home
                  </Text>
                </Link>
              </Box>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </>
  );
}
