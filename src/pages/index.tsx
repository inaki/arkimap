import { Box, Heading, List, ListItem } from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useCities } from "../lib/hooks";

const Home: NextPage = () => {
  const { cities, isLoading } = useCities();
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <Box padding={20}>
          <Heading>cities</Heading>
          <List mt={10} spacing={3}>
            {isLoading ? (
              <ListItem>Loading...</ListItem>
            ) : (
              cities.map((city) => (
                <Link
                  key={city.id}
                  href={`/map/${city.shortName}?longitude=${city.longitude}&latitude=${city.latitude}`}
                >
                  <ListItem>{city.name}</ListItem>
                </Link>
              ))
            )}
          </List>
        </Box>
      </main>

      {/* <footer className="flex h-24 w-full items-center justify-center border-t">
        <div>with love from iñaki</div>
      </footer> */}
    </div>
  );
};

export default Home;
