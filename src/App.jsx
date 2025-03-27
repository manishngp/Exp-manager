import { Box, Container } from '@chakra-ui/react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Routes, Route } from 'react-router-dom'
import { ref, onValue } from 'firebase/database'
import { db } from './firebase/config'
import { setTransactions, setLoading, setError } from './redux/actions/transactionActions'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Dashboard from './pages/Dashboard'
import Transactions from './pages/Transactions'
import Analytics from './pages/Analytics'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setLoading(true))
    const transactionsRef = ref(db, 'transactions')
    
    const unsubscribe = onValue(transactionsRef, (snapshot) => {
      try {
        const data = snapshot.val()
        const transactionsArray = data ? Object.entries(data).map(([id, transaction]) => ({
          id,
          ...transaction
        })) : []
        
        dispatch(setTransactions(transactionsArray))
      } catch (error) {
        console.error('Error fetching transactions:', error)
        dispatch(setError(error.message))
      }
    })

    return () => unsubscribe()
  }, [dispatch])

  return (
    <Box minH="100vh" display="flex">
      <Sidebar />
      <Box flex="1">
        <Header />
        <Container maxW="container.xl" py={8}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/analytics" element={<Analytics />} />
          </Routes>
        </Container>
      </Box>
    </Box>
  )
}

export default App