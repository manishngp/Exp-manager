import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  Badge
} from '@chakra-ui/react'
import { useSelector } from 'react-redux'

function TransactionList() {
  const transactions = useSelector(state => state.transactions.transactions)

  return (
    <Box w="full" overflowX="auto">
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Date</Th>
            <Th>Category</Th>
            <Th>Type</Th>
            <Th isNumeric>Amount</Th>
          </Tr>
        </Thead>
        <Tbody>
          {transactions.length === 0 ? (
            <Tr>
              <Td colSpan={4}>
                <Text textAlign="center">No transactions yet</Text>
              </Td>
            </Tr>
          ) : (
            transactions.map((transaction) => (
              <Tr key={transaction.id}>
                <Td>{transaction.date}</Td>
                <Td>{transaction.category}</Td>
                <Td>
                  <Badge
                    colorScheme={transaction.type === 'income' ? 'green' : 'red'}
                  >
                    {transaction.type}
                  </Badge>
                </Td>
                <Td isNumeric>
                  {new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD'
                  }).format(transaction.amount)}
                </Td>
              </Tr>
            ))
          )}
        </Tbody>
      </Table>
    </Box>
  )
}

export default TransactionList