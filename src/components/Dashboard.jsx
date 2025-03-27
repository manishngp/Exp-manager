import { SimpleGrid, Stat, StatLabel, StatNumber, StatArrow } from '@chakra-ui/react'
import { useSelector } from 'react-redux'

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

  return (
    <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} w="full">
      <Stat
        px={4}
        py={2}
        shadow="base"
        borderWidth="1px"
        borderRadius="lg"
        textAlign="center"
      >
        <StatLabel fontSize="lg">Income</StatLabel>
        <StatNumber color="green.500">
          ${income.toFixed(2)}
          <StatArrow type="increase" />
        </StatNumber>
      </Stat>

      <Stat
        px={4}
        py={2}
        shadow="base"
        borderWidth="1px"
        borderRadius="lg"
        textAlign="center"
      >
        <StatLabel fontSize="lg">Expenses</StatLabel>
        <StatNumber color="red.500">
          ${expenses.toFixed(2)}
          <StatArrow type="decrease" />
        </StatNumber>
      </Stat>

      <Stat
        px={4}
        py={2}
        shadow="base"
        borderWidth="1px"
        borderRadius="lg"
        textAlign="center"
      >
        <StatLabel fontSize="lg">Balance</StatLabel>
        <StatNumber color={balance >= 0 ? "green.500" : "red.500"}>
          ${balance.toFixed(2)}
        </StatNumber>
      </Stat>
    </SimpleGrid>
  )
}

export default Dashboard