import { Box, Flex, Input, Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FC, useState } from "react";
import { useSWRConfig } from "swr";
import { auth } from "../lib/mutations";

export const AuthForm: FC<{ mode: "signin" | "signup" }> = ({ mode }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = () => {
    setIsLoading(true);
    auth(mode, { email, password });
    // router.push("/");
    setIsLoading(false);
  };

  const renderForm = (loading) => {
    if (loading) {
      return <Button w="100%" isLoading={true} />;
    } else {
      return (
        <>
          <Box mt={4}>
            <Input
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              type="email"
            />
          </Box>
          <Box mt={4}>
            <Input
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              type="password"
            />
          </Box>
          <Button onClick={handleSubmit} mt={4} colorScheme="teal">
            {mode === "signin" ? "Sign in" : "Sign up"}
          </Button>
        </>
      );
    }
  };

  return (
    <Flex
      as="form"
      width="full"
      maxWidth="500px"
      bg="white"
      borderRadius="8px"
      p={8}
      my={12}
      direction="column"
    >
      {renderForm(isLoading)}
    </Flex>
  );
};

export default AuthForm;
