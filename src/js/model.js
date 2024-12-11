export const state = {
  category: ['food', 'transport', 'entertainment', 'other'],
  expense: JSON.parse(localStorage.getItem('expense')) || [],
}
export const addExpense = function (expense) {
  state.expense.push(expense)
  localStorage.setItem('expense', JSON.stringify(state.expense))
  console.log(state.expense)
}

export const deleteExpense = function (id) {
  const getIndex = state.expense.findIndex((exp) => exp.id === id)
  state.expense.splice(getIndex, 1)
  localStorage.setItem('expense', JSON.stringify(state.expense))
  if (!state.expenseSortByDate) return
  const getIndexSorted = state.expenseSortByDate.findIndex(
    (exp) => exp.id === id
  )
  state.expenseSortByDate.splice(getIndexSorted, 1)
}

export const addUserSelectedDate = function (date) {
  state.date = date
  const expenseSortByDate = state.expense.filter(
    (expense) => expense.date === state.date
  )
  state.expenseSortByDate = expenseSortByDate
  console.log(state.expenseSortByDate)
}
