import { EditIcon, LockIcon, SettingsIcon, UnlockIcon } from "@chakra-ui/icons";
import {
  Badge,
  Box,
  Button,
  HStack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  chakra,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useEffect } from "react";
import { AiOutlineReload } from "react-icons/ai";

import Base from "../../Components/Base";
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

          <TableContainer>
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
                      <Td>{item.firstname + " " + item.lastname}</Td>
                      <Td>{item.email}</Td>
                      <Td>
                        {item.is_blocked ? (
                          <Badge colorScheme="red" variant="subtle">
                            Inactive
                          </Badge>
                        ) : (
                          <Badge colorScheme="green" variant="subtle">
                            Active
                          </Badge>
                        )}
                      </Td>
                      <Td>
                        {item.is_blocked ? (
                          <Button
                            variant="outline"
                            color="green"
                            onClick={() => unBlockUserFunction(item.id)}
                          >
                            unblock
                          </Button>
                        ) : (
                          <Button
                            variant="ghost"
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
    </>
  );
}
