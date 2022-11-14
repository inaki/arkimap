import { Box, Flex, Text, Icon } from "@chakra-ui/react";
import React from "react";
import { HiOutlineUserCircle, HiOutlineMoon } from "react-icons/hi2";

type LayoutProps = {
  children: React.ReactNode;
};

const Header = () => {
  return (
    <Flex
      as="header"
      justifyContent={"space-between"}
      zIndex={"100"}
      position="fixed"
      w="100%"
      padding={4}
    >
      <Text>Brandname</Text>
      <Flex>
        <Icon as={HiOutlineMoon} w={8} h={8} mr={4} />
        <Icon as={HiOutlineUserCircle} w={8} h={8} />
      </Flex>
    </Flex>
  );
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <Box>
      <Header />
      {children}
    </Box>
  );
};

export default Layout;
