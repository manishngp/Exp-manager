import { Box, Heading, VStack } from '@chakra-ui/react'
import TransactionList from '../components/TransactionList'

function Transactions() {
  return (
    <VStack spacing={8} align="stretch">
      <Heading size="lg">Transaction History</Heading>
      <Box bg="white" p={6} borderRadius="lg" shadow="base">
        <TransactionList />
      </Box>
    </VStack>
  )
}

export default Transactions