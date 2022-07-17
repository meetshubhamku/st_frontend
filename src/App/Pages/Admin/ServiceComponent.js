import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import * as Yup from "yup";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { AiOutlineReload } from "react-icons/ai";
import { getServicesCategory } from "../../Helpers/ServiceCategory";
import {
  addService,
  updateService,
  getServices,
  deleteService,
} from "../../Helpers/Service";
import { AddIcon, DeleteIcon, EditIcon, SpinnerIcon } from "@chakra-ui/icons";

export default function ServiceComponent() {
  const [categoryList, setCategoryList] = useState([]);
  const [serviceList, setServiceList] = useState([]);
  const [service, setService] = useState({
    id: "",
    name: "",
    description: "",
    price: 0,
    category_id: "",
    updating: false,
  });
  const { isOpen, onOpen, onClose } = useDisclosure();

  const serviceSchema = Yup.object().shape({
    name: Yup.string()
      .required("Service name Required")
      .matches(/^[a-zA-Z_ ]*$/, "Invalid service name"),
    description: Yup.string()
      .required("Service description Required")
      .matches(/^[a-zA-Z_ ]*$/, "Invalid service description"),
    price: Yup.string()
      .required("Service price required")
      .matches(/^[0-9]*$/, "Invalid service price"),
    category_id: Yup.number().required("Service required"),
  });

  const formik = useFormik({
    initialValues: service || {
      id: "",
      name: "",
      description: "",
      price: 0,
      category_id: "",
      updating: false,
    },
    validationSchema: serviceSchema,
    enableReinitialize: true,
    onSubmit: async (values, onSubmitProp) => {
      if (values.updating === true) {
        const res = await updateService({
          id: values.id,
          name: values.name,
          description: values.description,
          category_id: values.category_id,
          price: values.price,
        });
        if (res.success === true) {
          getServiceList();
          onClose();
          SuccessToast({
            title: "Success",
            description: "Service updated successfully.",
          });
        } else {
          ErrorToast({
            title: "Error",
            description: "Some error occured. Please try again.",
          });
        }
      } else {
        const res = await addService({
          name: values.name,
          description: values.description,
          category_id: values.category_id,
          price: values.price,
        });

        if (res.success === true) {
          getServiceList();

          onClose();

          SuccessToast({
            title: "Success",
            description: "Service added successfully.",
          });
        } else {
          ErrorToast({
            title: "Error",
            description: "Some error occured. Please try again.",
          });
        }
      }
      onSubmitProp.resetForm();
      resetServiceState();
    },
  });

  const resetServiceState = () => {
    setService({
      ...service,
      id: "",
      name: "",
      description: "",
      price: "",
      category_id: "",
      updating: false,
    });
  };

  const getCategories = async () => {
    const res = await getServicesCategory();

    if (res.success === true) {
      setCategoryList(res.data);
    } else {
      setCategoryList([]);
    }
  };

  const getServiceList = async () => {
    const res = await getServices();
    console.log("service res : ", res);
    if (res.success === true) {
      setServiceList(res.data);
    } else {
      setServiceList([]);
    }
  };

  const populateService = (item) => {
    setService({
      ...service,
      id: item.id,
      name: item.name,
      description: item.description,
      price: item.price,
      category_id: item.category_id,
      updating: true,
    });
  };

  const toast = useToast();

  const SuccessToast = ({
    title = "Account created.",
    description = "We've created your account for you.",
  }) => {
    toast({
      position: "top-right",
      title,
      description,
      status: "success",
      duration: 9000,
      isClosable: true,
    });
  };
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
    getCategories();
    getServiceList();
  }, []);
  return (
    <>
      <Box margin="10px 10px">
        <Button onClick={onOpen} mr={3} bg="green.100" leftIcon={<AddIcon />}>
          Service
        </Button>
        <Button
          variant="solid"
          bg="gray.200"
          onClick={() => {
            getCategories();
            getServiceList();
          }}
        >
          <AiOutlineReload />
        </Button>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Service</ModalHeader>
            <ModalCloseButton />
            <form onSubmit={formik.handleSubmit}>
              <ModalBody>
                <FormControl mt={2} isRequired>
                  <FormLabel htmlFor="name">Name</FormLabel>
                  <Input
                    id="name"
                    name="name"
                    onChange={formik.handleChange}
                    value={formik.values.name}
                    placeholder="Service name"
                  />
                  {formik.errors.name ? (
                    <FormHelperText color="red">
                      {formik.errors.name}
                    </FormHelperText>
                  ) : null}
                </FormControl>
                <FormControl mt={2} isRequired>
                  <FormLabel htmlFor="description">Description</FormLabel>
                  <Input
                    name="description"
                    onChange={formik.handleChange}
                    value={formik.values.description}
                    id="description"
                    placeholder="Service description"
                  />
                  {formik.errors.description ? (
                    <FormHelperText color="red">
                      {formik.errors.description}
                    </FormHelperText>
                  ) : null}
                </FormControl>
                <FormControl mt={2} isRequired>
                  <FormLabel htmlFor="category">Category</FormLabel>
                  <Select
                    id="category"
                    name="category_id"
                    onChange={formik.handleChange}
                    value={formik.values.category_id}
                    placeholder="Select category"
                  >
                    {categoryList.length > 0 &&
                      categoryList.map((item, index) => (
                        <option key={index} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                  </Select>
                  {formik.errors.category_id ? (
                    <FormHelperText color="red">
                      {formik.errors.category_id}
                    </FormHelperText>
                  ) : null}
                </FormControl>

                <FormControl mt={2} isRequired>
                  <FormLabel htmlFor="price">Price</FormLabel>
                  <Input
                    name="price"
                    onChange={formik.handleChange}
                    value={formik.values.price}
                    id="price"
                    placeholder="Service price"
                  />
                  {formik.errors.price ? (
                    <FormHelperText color="red">
                      {formik.errors.price}
                    </FormHelperText>
                  ) : null}
                </FormControl>
              </ModalBody>
              <ModalFooter>
                <Button
                  disabled={
                    !(formik.dirty && formik.isValid) || formik.isSubmitting
                  }
                  mr={2}
                  loadingText={<SpinnerIcon />}
                  isLoading={formik.isSubmitting}
                  type="submit"
                  bg="green.100"
                >
                  Save
                </Button>
                <Button variant="ghost" onClick={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </form>
          </ModalContent>
        </Modal>

        <Box margin="20px 10px">
          <TableContainer bg="white" py={5}>
            <Table size="sm">
              <Thead>
                <Tr>
                  <Th fontWeight="extrabold" fontSize="sm">
                    #ID
                  </Th>
                  <Th fontWeight="extrabold" fontSize="sm">
                    Name
                  </Th>
                  <Th fontWeight="extrabold" fontSize="sm">
                    Description
                  </Th>
                  <Th fontWeight="extrabold" fontSize="sm">
                    Price
                  </Th>
                  <Th fontWeight="extrabold" fontSize="sm">
                    Category
                  </Th>
                  <Th fontWeight="extrabold" fontSize="sm">
                    Action
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {serviceList.length > 0 &&
                  serviceList.map((item, index) => (
                    <Tr key={index}>
                      <Td>{item.id}</Td>
                      <Td>{item.name}</Td>
                      <Td>{item.description}</Td>
                      <Td>{item.price}</Td>
                      <Td>{item.category.name}</Td>
                      <Td>
                        <HStack spacing={3}>
                          <Button
                            variant="ghost"
                            onClick={() => {
                              populateService(item);
                              onOpen();
                            }}
                          >
                            <EditIcon />
                          </Button>
                          <AlertDialogExample
                            id={item.id}
                            getservices={getServiceList}
                            item={item}
                          />
                        </HStack>
                      </Td>
                    </Tr>
                  ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </>
  );
}

const AlertDialogExample = ({ id, getservices, item }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();

  const deleteServiceFunction = async (id) => {
    const res = await deleteService(id);

    if (res.success === true) {
      SuccessToast({
        title: "Success",
        description: "Service deleted successfully.",
      });
    } else {
      ErrorToast({
        title: "Error",
        description: "Some error occured. Please try again.",
      });
    }
    onClose();
    getservices();
  };

  const toast = useToast();

  const SuccessToast = ({
    title = "Account created.",
    description = "We've created your account for you.",
  }) => {
    toast({
      position: "top-right",
      title,
      description,
      status: "success",
      duration: 9000,
      isClosable: true,
    });
  };
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
  return (
    <>
      <Button variant="ghost" onClick={onOpen}>
        <DeleteIcon color="red" />
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Service
            </AlertDialogHeader>

            <AlertDialogBody>
              <Text fontSize="md" mb={3}>
                Are you sure? <br /> You can't undo this action afterwards.
              </Text>
              <Text fontSize="sm">Service : {item.name}</Text>
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={() => deleteServiceFunction(id)}
                ml={3}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};
