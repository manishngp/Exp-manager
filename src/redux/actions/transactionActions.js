export const setTransactions = (transactions) => ({
  type: 'SET_TRANSACTIONS',
  payload: transactions
});

export const setLoading = (loading) => ({
  type: 'SET_LOADING',
  payload: loading
});

export const setError = (error) => ({
  type: 'SET_ERROR',
  payload: error
});