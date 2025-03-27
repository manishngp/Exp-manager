import { Flex, Heading, IconButton, useColorMode,  HStack } from '@chakra-ui/react'
import { FiMoon, FiSun, FiBell } from 'react-icons/fi'

function Header() {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <Flex
      as="header"
      align="center"
      justify="space-between"
      p={4}
      bg={colorMode === 'light' ? 'white' : 'gray.800'}
      borderBottomWidth="1px"
      shadow="sm"
    >
      <Heading size="lg">Expense Tracker</Heading>
      <HStack spacing={4}>
        <IconButton
          icon={<FiBell />}
          aria-label="Notifications"
          variant="ghost"
        />
        <IconButton
          icon={colorMode === 'light' ? <FiMoon /> : <FiSun />}
          onClick={toggleColorMode}
          aria-label="Toggle color mode"
          variant="ghost"
        />
      </HStack>
    </Flex>
  )
}

export default Header