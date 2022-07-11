import {
  Avatar,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Tag,
  TagLabel,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { AiOutlineMenu, AiOutlineLogout } from "react-icons/ai";
import { Box } from "@chakra-ui/react";
import { isAuthenticated, signout } from "../Helpers/Auth";
import NavmenuObject from "./NavmenuObject";
import { Link, useHistory } from "react-router-dom";
const Navbar = () => {
  const navigate = useHistory();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const user = isAuthenticated().user || undefined;
  const returnMenu = () => {
    if (user) {
      switch (user.role) {
        case 2:
          return NavmenuObject.admin;
        case 1:
          return NavmenuObject.employee;
        default:
          return NavmenuObject.customer;
      }
    }
  };
  const NavMenu = returnMenu();

  const returnUserType = () => {
    if (user) {
      switch (user.role) {
        case 2:
          return "Admin";
        case 1:
          return "Employee";
        default:
          return "Customer";
      }
    }
  };

  return (
    <>
      <Box width="100%" bg="green.100">
        <Button
          bg="green.100"
          onClick={onOpen}
          variant="solid"
          _hover="green.100"
          leftIcon={<AiOutlineMenu />}
        >
          The Scissor Tales
        </Button>
        <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerHeader borderBottomWidth="1px">Scissor Tales</DrawerHeader>

            <DrawerBody>
              <Box padding="10px 0">
                <Text fontWeight="extrabold">
                  {user.firstname + " " + user.lastname}
                </Text>
                <Text>
                  <Tag size="lg" colorScheme="red" borderRadius="full">
                    <Avatar
                      src={`https://bit.ly/${returnUserType()}`}
                      size="xs"
                      name={returnUserType()}
                      ml={-1}
                      mr={2}
                    />
                    <TagLabel fontSize="sm">{returnUserType()}</TagLabel>
                  </Tag>
                </Text>
              </Box>
              <Box padding="10px 0" marginTop="3">
                <Text fontWeight="extrabold" fontSize="md">
                  Menu
                </Text>
                <Box marginTop="2">
                  {NavMenu.menu.map((item, index) => (
                    <Text fontSize="sm" key={index} marginTop="1">
                      <Link to={item.to}>{item.label}</Link>
                    </Text>
                  ))}
                </Box>
              </Box>
            </DrawerBody>
            <DrawerFooter borderTopWidth="1px">
              <Button
                variant="outline"
                bg="red.100"
                leftIcon={<AiOutlineLogout />}
                onClick={() => {
                  signout(() => {
                    navigate.replace("/");
                  });
                }}
              >
                Logout
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </Box>
    </>
  );
};

export default Navbar;
