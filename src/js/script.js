import * as view from './view'
import * as model from './model'

const render = function () {
  //render chart
  view.getChart()
  //add category
  view.addCategory(model.state.category)
}

const addExpenseTomodel = function (expense) {
  model.addExpense(expense)
  view.addExpenseToTable(model.state.expense)
}

function init() {
  view.submitExpenseHandler(addExpenseTomodel)
  render()
}
init()
