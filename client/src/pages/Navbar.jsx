import {
  Box,
  Center,
  Flex,
  Image,
  Spacer,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { RiHeartLine, RiShoppingBagLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { nikeLogo } from "../components/constants/images";
import { setNavbarPath } from "../redux/features/path/actions";
import { setItemSession } from "../utils/sessionStorage";
import { Auth } from "../components/auth/Auth";
import { Logout } from "../components/auth/Logout";
import { DarkModeBtn } from "../components/darkmode/DarkModeBtn";
import { Category, NavIcon } from "../components/navbar/CategoryAndIcon";
import { SideDrawer } from "../components/navbar/SideDrawer";

export const Navbar = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.authReducer);
  const { orderSummary } = useSelector((state) => state.cartReducer);
  const { colorMode } = useColorMode();

  const handlePath = ({ target: { name } }) => {
    dispatch(setNavbarPath(name));
    setItemSession("path", name);
  };

  return (
    <>
      <Box h={"36px"} bg={colorMode === "light" && "#f5f5f5"}>
        <Center
          h={"36px"}
          justifyContent={"right"}
          mr={"40px"}
          fontSize={"16px"}
          cursor={"pointer"}
        >
          {!token ? <Auth /> : <Logout />}
          <DarkModeBtn />
        </Center>
      </Box>

      <Flex h={"60px"} flexDirection={"row"} px={"20px"}>
        <Box w={"80px"}>
          <Link to={"/"}>
            <Image src={nikeLogo} />
          </Link>
        </Box>

        <Spacer />

        <Box display={["none", "none", "flex", "flex", "flex"]}>
          <Category
            handlePath={handlePath}
            name={"/"}
            text={"Home"}
            link={"/"}
          />
          <Category
            handlePath={handlePath}
            name={"allProducts"}
            text={"All Products"}
            link={"/allProducts"}
          />
          <Category
            handlePath={handlePath}
            name={"men"}
            text={"Men"}
            link={"/men"}
          />
          <Category
            handlePath={handlePath}
            name={"women"}
            text={"Women"}
            link={"women"}
          />
          <Category
            handlePath={handlePath}
            name={"kids"}
            text={"Kids"}
            link={"/kids"}
          />
        </Box>

        <Spacer />

        <Center position={"relative"} mr={"10px"}>
          <Link to={"/favourite"}>
            <NavIcon iconName={RiHeartLine} />
          </Link>
        </Center>

        <Center position={"relative"} mr={"10px"}>
          <Link to={"/cart"}>
            <NavIcon iconName={RiShoppingBagLine} />
            <Box
              position={"absolute"}
              top={0.5}
              right={-0.4}
              borderRadius={"50%"}
              width={"25px"}
              height={"25px"}
              textAlign={"center"}
              zIndex={-1}
              bgGradient='linear(to-l, #7928CA, #FF0080)'
              display={"flex"}
              flexDirection="column"
              alignContent={"center"}
              justifyContent={"center"}
              color={"white"}
              opacity={0.89}
            >
              <Text>{orderSummary.quantity}</Text>
            </Box>
          </Link>
        </Center>

        <Box display={["flex", "flex", "none", "none", "none"]}>
          <Center mr={"10px"}>
            <SideDrawer handlePath={handlePath} />
          </Center>
        </Box>
      </Flex>

      <Box h={["10px", "20px", "30px", "40px", "40px"]}></Box>
    </>
  );
};

export default Navbar;
