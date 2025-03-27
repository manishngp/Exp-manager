import { 
  Box, 
  Button, 
  FormControl, 
  FormLabel, 
  Input, 
  Select, 
  NumberInput,
  NumberInputField,
  VStack,
  useToast
} from '@chakra-ui/react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { ref, push } from 'firebase/database'
import { db } from '../firebase/config'
import { setTransactions, setError } from '../redux/actions/transactionActions'

function TransactionForm() {
  const [formData, setFormData] = useState({
    type: 'expense',
    amount: '',
    category: '',
    date: new Date().toISOString().split('T')[0]
  })
  const toast = useToast()
  const dispatch = useDispatch()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      // Create a new transaction reference
      const transactionRef = ref(db, 'transactions')
      
      // Push the new transaction to Firebase
      const newTransactionRef = await push(transactionRef, {
        ...formData,
        amount: Number(formData.amount),
        timestamp: Date.now()
      })

      // Add the new transaction ID to the data
      const newTransaction = {
        id: newTransactionRef.key,
        ...formData,
        amount: Number(formData.amount)
      }

      // Update Redux state
      dispatch(setTransactions([newTransaction]))

      // Reset form
      setFormData({
        type: 'expense',
        amount: '',
        category: '',
        date: new Date().toISOString().split('T')[0]
      })

      // Show success message
      toast({
        title: 'Transaction added successfully',
        status: 'success',
        duration: 2000,
        isClosable: true,
      })
    } catch (error) {
      console.error('Error adding transaction:', error)
      dispatch(setError(error.message))
      toast({
        title: 'Error adding transaction',
        description: error.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
  }

  return (
    <Box w="full" maxW="md" p={4} borderWidth="1px" borderRadius="lg">
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormControl isRequired>
            <FormLabel>Type</FormLabel>
            <Select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            >
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </Select>
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Amount</FormLabel>
            <NumberInput min={0}>
              <NumberInputField
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              />
            </NumberInput>
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Category</FormLabel>
            <Select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              placeholder="Select category"
            >
              <option value="Food">Food</option>
              <option value="Rent">Rent</option>
              <option value="Salary">Salary</option>
              <option value="Travel">Travel</option>
              <option value="Shopping">Shopping</option>
            </Select>
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Date</FormLabel>
            <Input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            />
          </FormControl>

          <Button type="submit" colorScheme="blue" w="full">
            Add Transaction
          </Button>
        </VStack>
      </form>
    </Box>
  )
}

export default TransactionForm