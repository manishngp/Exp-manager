import { Box, VStack, Icon, Text, Link as ChakraLink, useColorMode } from '@chakra-ui/react'
import { Link, useLocation } from 'react-router-dom'
import { FiHome, FiDollarSign, FiPieChart } from 'react-icons/fi'

function Sidebar() {
  const { colorMode } = useColorMode()
  const location = useLocation()

  const NavItem = ({ icon, children, to }) => {
    const isActive = location.pathname === to
    return (
      <ChakraLink
        as={Link}
        to={to}
        w="full"
        p={3}
        borderRadius="md"
        bg={isActive ? (colorMode === 'light' ? 'blue.100' : 'blue.900') : 'transparent'}
        _hover={{
          bg: colorMode === 'light' ? 'gray.100' : 'gray.700',
          textDecoration: 'none'
        }}
        display="flex"
        alignItems="center"
      >
        <Icon as={icon} boxSize={5} mr={3} />
        <Text fontWeight={isActive ? 'bold' : 'normal'}>{children}</Text>
      </ChakraLink>
    )
  }

  return (
    <Box
      as="nav"
      h="100vh"
      w="250px"
      bg={colorMode === 'light' ? 'white' : 'gray.800'}
      borderRightWidth="1px"
      p={5}
    >
      <VStack spacing={4} align="stretch" mt={8}>
        <NavItem icon={FiHome} to="/">Dashboard</NavItem>
        <NavItem icon={FiDollarSign} to="/transactions">Transactions</NavItem>
        <NavItem icon={FiPieChart} to="/analytics">Analytics</NavItem>
      </VStack>
    </Box>
  )
}

export default Sidebar