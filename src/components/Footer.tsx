import { Flex, HStack, Link, Text } from '@chakra-ui/react';

export const Footer = () => (
  <Flex
    as="footer"
    w="100%"
    maxW={1480}
    h="20"
    mx="auto"
    mt="4"
    px="6"
    py="4"
    align="center"
    justify="center"
    flexDir="column"
  >
    <Text>Created By Matheus Braun</Text>
    <Text size="sm" color="gray.300">
      matheus@mbraun.dev
    </Text>
    <HStack>
      <Link
        href="https://github.com/matheeusbl"
        title="Github"
        color="purple.500"
        target="_blank"
      >
        Github
      </Link>
      <Link
        href="https://www.linkedin.com/in/matheus-braun"
        title="LinkedIn"
        color="purple.500"
        target="_blank"
      >
        LinkedIn
      </Link>
    </HStack>
  </Flex>
);
