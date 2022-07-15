import { AddIcon, DeleteIcon, EditIcon, SpinnerIcon } from "@chakra-ui/icons";
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
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { AiOutlineReload } from "react-icons/ai";
import * as Yup from "yup";
import {
  addServiceCategory,
  deleteServicesCategory,
  getServicesCategory,
  updateServiceCategory,
} from "../../Helpers/ServiceCategory";

export default function CategoryComponent() {
  const [categoryList, setCategoryList] = useState([]);
  const [categoryData, setCategoryData] = useState({
    id: "",
    name: "",
    description: "",
    updating: false,
  });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const categoryScheme = Yup.object().shape({
    name: Yup.string()
      .required("Name Required")
      .matches(/^[a-zA-Z_ ]*$/, "Invalid category name"),
    description: Yup.string()
      .required("Description Required")
      .matches(/^[a-zA-Z_ ]*$/, "Invalid category description"),
  });
  const formik = useFormik({
    initialValues: categoryData || {
      id: "",
      name: "",
      description: "",
      updating: false,
    },
    validationSchema: categoryScheme,
    enableReinitialize: true,
    onSubmit: async (values, onSubmitProp) => {
      if (values.updating) {
        const res = await updateServiceCategory(values);

        if (res.success === true) {
          onClose();
          SuccessToast({
            title: "Success",
            description: "Category updated successfully.",
          });
        } else {
          ErrorToast({
            title: "Error",
            description: "Some error occured. Please try again.",
          });
        }
      } else {
        const res = await addServiceCategory({
          name: values.name,
          description: values.description,
        });

        if (res.success === true) {
          onClose();
          SuccessToast({
            title: "Success",
            description: "Category added successfully.",
          });
        } else {
          ErrorToast({
            title: "Error",
            description: "Some error occured. Please try again.",
          });
        }
      }

      onSubmitProp.setSubmitting(false);
      onSubmitProp.resetForm();
      getCategories();
    },
  });

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    const res = await getServicesCategory();
    if (res.success === true) {
      setCategoryList(res.data);
    } else {
      setCategoryList([]);
    }
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

  const populateModal = (item) => {
    setCategoryData({
      ...categoryData,
      id: item.id,
      name: item.name,
      description: item.description,
      updating: true,
    });
  };
  return (
    <>
      <Box margin="10px 10px">
        <Button onClick={onOpen} mr={3} bg="green.100" leftIcon={<AddIcon />}>
          Category
        </Button>
        <Button
          bg="gray.200"
          variant="solid"
          onClick={() => {
            getCategories();
          }}
        >
          <AiOutlineReload />
        </Button>

        <Modal isOpen={isOpen} onClose={onClose}>
          <form onSubmit={formik.handleSubmit}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Category</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <FormControl isRequired>
                  <FormLabel fontWeight="extrabold" htmlFor="name">
                    Name
                  </FormLabel>
                  <Input
                    type="text"
                    name="name"
                    onChange={formik.handleChange}
                    value={formik.values.name}
                    id="name"
                    placeholder="Category name"
                  />
                  {formik.errors.name ? (
                    <FormHelperText color="red">
                      {formik.errors.name}
                    </FormHelperText>
                  ) : null}
                </FormControl>

                <FormControl isRequired mt={5}>
                  <FormLabel fontWeight="extrabold" htmlFor="description">
                    Description
                  </FormLabel>
                  <Input
                    type="text"
                    name="description"
                    onChange={formik.handleChange}
                    value={formik.values.description}
                    id="description"
                    placeholder="Category description"
                  />
                  {formik.errors.description ? (
                    <FormHelperText color="red">
                      {formik.errors.description}
                    </FormHelperText>
                  ) : null}
                </FormControl>
              </ModalBody>

              <ModalFooter>
                <Button
                  disabled={
                    !(formik.dirty && formik.isValid) || formik.isSubmitting
                  }
                  loadingText={<SpinnerIcon />}
                  isLoading={formik.isSubmitting}
                  type="submit"
                  bg="green.100"
                  mr={3}
                >
                  Save
                </Button>
                <Button variant="ghost" onClick={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </ModalContent>
          </form>
        </Modal>
      </Box>

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
                  Action
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {categoryList.length > 0 &&
                categoryList.map((item, index) => (
                  <Tr key={index}>
                    <Td>{item.id}</Td>
                    <Td>{item.name}</Td>
                    <Td>{item.description}</Td>
                    <Td>
                      <HStack spacing={5}>
                        <Button
                          variant="ghost"
                          onClick={() => {
                            populateModal(item);
                            onOpen();
                          }}
                        >
                          <EditIcon />
                        </Button>
                        <AlertDialogExample
                          id={item.id}
                          getCategories={getCategories}
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
    </>
  );
}

const AlertDialogExample = ({ id, getCategories, item }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();

  const deleteCategory = async (id) => {
    const res = await deleteServicesCategory(id);

    if (res.success === true) {
      SuccessToast({
        title: "Success",
        description: "Category deleted successfully.",
      });
    } else {
      ErrorToast({
        title: "Error",
        description: "Some error occured. Please try again.",
      });
    }
    onClose();
    getCategories();
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
              Delete Category
            </AlertDialogHeader>

            <AlertDialogBody>
              <Text fontSize="md" mb={3}>
                Are you sure? <br /> You can't undo this action afterwards.
              </Text>
              <Text fontSize="sm">Category : {item.name}</Text>
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={() => deleteCategory(id)}
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
