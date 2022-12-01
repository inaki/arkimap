import {
  Box,
  useColorModeValue,
  BoxProps,
  Flex,
  Text,
  CloseButton,
} from "@chakra-ui/react";
import { FiHome, FiUser, FiFlag, FiSettings } from "react-icons/fi";
import { IconType } from "react-icons";
import NavItem from "./navItem";

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

interface LinkItemProps {
  name: string;
  icon: IconType;
}

const LinkItems: Array<LinkItemProps> = [
  { name: "home", icon: FiHome },
  { name: "architects", icon: FiUser },
  { name: "projects", icon: FiHome },
  { name: "cities", icon: FiFlag },
  { name: "settings", icon: FiSettings },
];

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Arkimap
        </Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem
          key={link.name}
          href={{
            pathname: "/admin",
            query: {
              section: link.name,
            },
          }}
          icon={link.icon}
        >
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

export default SidebarContent;
