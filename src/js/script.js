import * as view from './view'
import * as model from './model'

const render = function () {
  //render chart
  view.getChart()
  //add category
  view.addCategory(model.state.category)
}

const addExpenseTomoel = function (expense) {
  model.addExpense(expense)
  console.log(model.state.expense)
}

function init() {
  view.submitExpenseHandler(addExpenseTomoel)
  render()
}
init()
