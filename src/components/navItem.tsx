import { Flex, FlexProps, Icon } from "@chakra-ui/react";
import Link from "next/link";
import { IconType } from "react-icons";

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: string;
  href: {
    pathname: string;
    query: {
      section: string;
    };
  };
}
const NavItem = ({ icon, children, href, ...rest }: NavItemProps) => {
  return (
    <Link href={href} style={{ textDecoration: "none" }}>
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "cyan.400",
          color: "white",
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

export default NavItem;
