import { useState } from "react";
import {
  Box,
  Heading,
  Text,
  Img,
  Flex,
  Center,
  useColorModeValue,
  HStack,
} from "@chakra-ui/react";
import { BsArrowUpRight, BsHeartFill, BsHeart } from "react-icons/bs";
import ArchitectDetail from "./ArchitectDetails";

export default function PostWithLike({
  img,
  title,
  description,
  tags,
}: {
  img: string;
  title: string;
  description: string;
  tags: string[];
}) {
  const [liked, setLiked] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);

  return (
    <Center py={6}>
      <Box
        w="xs"
        rounded={"sm"}
        my={5}
        mx={[0, 5]}
        overflow={"hidden"}
        bg="white"
        border={"1px"}
        borderColor="black"
        boxShadow={useColorModeValue("6px 6px 0 black", "6px 6px 0 cyan")}
      >
        <Box h={"200px"} borderBottom={"1px"} borderColor="black">
          <Img
            src={img}
            roundedTop={"sm"}
            objectFit="cover"
            h="full"
            w="full"
            alt={"Blog Image"}
          />
        </Box>
        <Box p={4}>
          {tags && tags.length > 0
            ? tags.map((tag: string, index: number) => (
                <Box
                  key={tag + index}
                  bg="black"
                  display={"inline-block"}
                  px={2}
                  py={1}
                  color="white"
                  mb={2}
                >
                  <Text fontSize={"xs"} fontWeight="medium">
                    {tag}
                  </Text>
                </Box>
              ))
            : ""}

          <Heading color={"black"} fontSize={"2xl"} noOfLines={1}>
            {title}
          </Heading>
          <Text color={"gray.500"} noOfLines={3}>
            {description}
          </Text>
        </Box>
        <HStack borderTop={"1px"} color="black">
          <Flex
            p={4}
            alignItems="center"
            justifyContent={"space-between"}
            roundedBottom={"sm"}
            cursor={"pointer"}
            w="full"
            onClick={() => setDetailsOpen(true)}
          >
            <Text fontSize={"md"} fontWeight={"semibold"}>
              View more
              <ArchitectDetail
                img={img}
                title={title}
                description={description}
                tags={tags}
                isOpen={detailsOpen}
                handleClose={() => setDetailsOpen(false)}
              />
            </Text>
            <BsArrowUpRight />
          </Flex>
          <Flex
            p={4}
            alignItems="center"
            justifyContent={"space-between"}
            roundedBottom={"sm"}
            borderLeft={"1px"}
            cursor="pointer"
            onClick={() => setLiked(!liked)}
          >
            {liked ? (
              <BsHeartFill fill="red" fontSize={"24px"} />
            ) : (
              <BsHeart fontSize={"24px"} />
            )}
          </Flex>
        </HStack>
      </Box>
    </Center>
  );
}
