import {
  Badge,
  Box,
  Button,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  chakra,
  Thead,
  Tr,
  useToast,
  Wrap,
  WrapItem,
  Avatar,
  Flex,
  Text,
} from "@chakra-ui/react";
import React, { Suspense, useState } from "react";
import { useEffect } from "react";
import { AiOutlineReload } from "react-icons/ai";

import Base from "../../Components/Base";
import CustomLoader from "../../Components/CustomLoader";
import { getUsers, blockUser, unBlockUser } from "../../Helpers/Admin";

export default function CustomerComponent() {
  const [userlist, setUserList] = useState([]);

  const getUserFunction = async () => {
    const res = await getUsers();
    if (res.success === true) {
      setUserList(res.data);
    } else {
      setUserList([]);
    }
  };

  const unBlockUserFunction = async (id) => {
    const res = await unBlockUser(id);
    if (res.success === true) {
      getUserFunction();
    } else {
      ErrorToast({
        title: "Error",
        description: "Some error occured. Please try again.",
      });
    }
  };

  const blockUserFunction = async (id) => {
    const res = await blockUser(id);
    if (res.success === true) {
      getUserFunction();
    } else {
      ErrorToast({
        title: "Error",
        description: "Some error occured. Please try again.",
      });
    }
  };

  const toast = useToast();

  const ErrorToast = ({
    title = "Mismatch Password.",
    description = "Your both passwords must match.",
  }) => {
    toast({
      position: "top-right",
      title,
      description,
      status: "error",
      duration: 9000,
      isClosable: true,
    });
  };

  useEffect(() => {
    getUserFunction();
  }, []);
  return (
    <>
      <Suspense fallback={<CustomLoader />}>
        <Base>
          <Box margin="5px 10px">
            <chakra.h1 fontSize={"4xl"} py={10} fontWeight={"bold"}>
              Customers
              <Button
                ml={5}
                variant="solid"
                bg="gray.200"
                onClick={() => {
                  getUserFunction();
                }}
              >
                <AiOutlineReload />
              </Button>
            </chakra.h1>

            <TableContainer bg="white" p={5}>
              <Table size="sm">
                <Thead>
                  <Tr>
                    <Th fontWeight="extrabold" fontSize="sm">
                      #ID
                    </Th>
                    <Th fontSize="sm">Name</Th>
                    <Th fontSize="sm">Email</Th>
                    <Th fontSize="sm">Status</Th>
                    <Th fontSize="sm">Action</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {userlist.length > 0 &&
                    userlist.map((item, index) => (
                      <Tr key={index}>
                        <Td>{item.id}</Td>
                        <Td>
                          <Flex alignItems="center">
                            <Wrap>
                              <WrapItem>
                                <Avatar
                                  size="md"
                                  name="Dan Abrahmov"
                                  src={`https://joeschmoe.io/api/v1/${item.firstname}`}
                                  // src={`https://i.pravatar.cc/300`}
                                />
                              </WrapItem>
                            </Wrap>
                            <Text pl="5">
                              {item.firstname + " " + item.lastname}
                            </Text>
                          </Flex>
                        </Td>
                        <Td>{item.email}</Td>
                        <Td>
                          {item.is_blocked ? (
                            <Badge
                              colorScheme="red"
                              variant="subtle"
                              px={2}
                              py={1}
                            >
                              Inactive
                            </Badge>
                          ) : (
                            <Badge
                              colorScheme="green"
                              variant="subtle"
                              px={2}
                              py={1}
                            >
                              Active
                            </Badge>
                          )}
                        </Td>
                        <Td>
                          {item.is_blocked ? (
                            <Button
                              variant="solid"
                              color="green"
                              onClick={() => unBlockUserFunction(item.id)}
                            >
                              unblock
                            </Button>
                          ) : (
                            <Button
                              variant="solid"
                              color="red"
                              onClick={() => blockUserFunction(item.id)}
                            >
                              block
                            </Button>
                          )}
                        </Td>
                      </Tr>
                    ))}
                </Tbody>
              </Table>
            </TableContainer>
          </Box>
        </Base>
      </Suspense>
    </>
  );
}
