import { Button, Input, Text, useToast, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetpassword } from "../../redux/features/auth/actions";

export const ResetForm = ({onClose}) => {
  const [resetemail, setresetemail] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();
  const handleSubmitreset = () => {
    dispatch(resetpassword(resetemail, toast, navigate));
    onClose();
  };
  return (
    <>
      <VStack
        w={["95%", "95%", "85%", "85%", "85%", "85%"]}
        mx={"auto"}
        gap={"15px"}
      >
        <Text color={"gray"} textAlign={"center"}>
          OTP Will Be sent To Your Email.
          <br /> For Reseting Your Password.
        </Text>

        <Input
          type={"email"}
          value={resetemail}
          onChange={(e) => setresetemail(e.target.value)}
          variant={"filled"}
          placeholder="Enter your email address"
        />

        <Button
          backgroundColor={"black"}
          _hover={{ backgroundColor: "#1e1e1e" }}
          color={"white"}
          w={"100%"}
          onClick={handleSubmitreset}
        >
          Submit
        </Button>
      </VStack>
    </>
  );
};
