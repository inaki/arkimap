import { Box, Flex, Input, Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FC, useState } from "react";
import { useSWRConfig } from "swr";
import { auth } from "../lib/mutations";

export const AuthForm: FC<{ mode: "signin" | "signup" }> = ({ mode }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    let user = auth(mode, { email, password });
    user.then((res) => {
      if (res.auth === false) {
        setError(true);
      } else {
        router.push("/admin");
      }
    });
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
          {error ? (
            <Box mt={4} color="red.500">
              Invalid email or password
            </Box>
          ) : null}
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
      borderRadius="8px"
      justifyContent={"center"}
      border="1px solid white"
      margin={"auto"}
      p={8}
      my={64}
      direction="column"
    >
      {renderForm(isLoading)}
    </Flex>
  );
};

export default AuthForm;
