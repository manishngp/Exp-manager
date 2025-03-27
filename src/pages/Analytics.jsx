import { Box, Heading, VStack } from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'

function Analytics() {
  const transactions = useSelector(state => state.transactions.transactions)

  // Calculate category totals for expenses
  const categoryTotals = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, transaction) => {
      const { category, amount } = transaction
      acc[category] = (acc[category] || 0) + Number(amount)
      return acc
    }, {})

  const pieData = Object.entries(categoryTotals).map(([name, value]) => ({
    name,
    value
  }))

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8']

  return (
    <VStack spacing={8} align="stretch">
      <Heading size="lg">Spending Analytics</Heading>
      
      <Box bg="white" p={6} borderRadius="lg" shadow="base" h="400px">
        <Heading size="md" mb={4}>Expenses by Category</Heading>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={150}
              fill="#8884d8"
              label
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </Box>
    </VStack>
  )
}

export default Analytics