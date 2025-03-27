import { Box, SimpleGrid, Stat, StatLabel, StatNumber, StatArrow, Heading, VStack } from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import TransactionForm from '../components/TransactionForm'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

function Dashboard() {
  const transactions = useSelector(state => state.transactions.transactions)

  const calculateTotals = () => {
    return transactions.reduce(
      (acc, transaction) => {
        if (transaction.type === 'income') {
          acc.income += Number(transaction.amount)
        } else {
          acc.expenses += Number(transaction.amount)
        }
        return acc
      },
      { income: 0, expenses: 0 }
    )
  }

  const { income, expenses } = calculateTotals()
  const balance = income - expenses

  // Prepare data for chart
  const chartData = [
    { name: 'Income', amount: income },
    { name: 'Expenses', amount: expenses },
  ]

  return (
    <VStack spacing={8} align="stretch">
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
        <Stat
          px={4}
          py={5}
          shadow="base"
          borderWidth="1px"
          borderRadius="lg"
          bg="white"
        >
          <StatLabel fontSize="lg">Income</StatLabel>
          <StatNumber color="green.500">
            ${income.toFixed(2)}
            <StatArrow type="increase" />
          </StatNumber>
        </Stat>

        <Stat
          px={4}
          py={5}
          shadow="base"
          borderWidth="1px"
          borderRadius="lg"
          bg="white"
        >
          <StatLabel fontSize="lg">Expenses</StatLabel>
          <StatNumber color="red.500">
            ${expenses.toFixed(2)}
            <StatArrow type="decrease" />
          </StatNumber>
        </Stat>

        <Stat
          px={4}
          py={5}
          shadow="base"
          borderWidth="1px"
          borderRadius="lg"
          bg="white"
        >
          <StatLabel fontSize="lg">Balance</StatLabel>
          <StatNumber color={balance >= 0 ? "green.500" : "red.500"}>
            ${balance.toFixed(2)}
          </StatNumber>
        </Stat>
      </SimpleGrid>

      <Box p={5} shadow="base" borderRadius="lg" bg="white" h="300px">
        <Heading size="md" mb={4}>Income vs Expenses</Heading>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="amount" fill="#4299E1" />
          </BarChart>
        </ResponsiveContainer>
      </Box>

      <Box>
        <Heading size="md" mb={4}>Add New Transaction</Heading>
        <TransactionForm />
      </Box>
    </VStack>
  )
}

export default Dashboard