"use client";
import React, { FormEvent, useState } from "react";
import signIn from "@/firebase/signin";
import { useRouter } from "next/navigation";
import { Box, Flex, Input, Button } from "@chakra-ui/react";

function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const router = useRouter();

  const handleForm = async (
    event: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();

    const { result, error } = await signIn(email, password);

    if (error) {
      return console.log(error);
    }

    // else successful
    console.log(result);
    return router.push("/admin");
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
      <form onSubmit={handleForm} className="form">
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
        <Button type="submit" mt={4} colorScheme="teal">
          Singin
        </Button>
      </form>
    </Flex>
  );
}

export default Page;
