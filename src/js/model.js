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
  console.log('Hello World')
  const getIndex = state.expense.findIndex((exp) => exp.id === id)
  state.expense.splice(getIndex, 1)

  console.log(state.expense)
  localStorage.setItem('expense', JSON.stringify(state.expense))
}

export const addUserSelectedDate = function (date) {
  state.date = date
}
