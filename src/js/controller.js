import * as view from './view'
import * as model from './model'
console.log('Ho la it is not working')
const render = function () {
  //render chart
  view.getChart()
  //add category
  view.addCategory(model.state.category)
}

function init() {
  console.log('Everything is not working')
  render()
}
init()
