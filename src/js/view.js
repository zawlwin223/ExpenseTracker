import Chart from 'chart.js/auto'
import generateUniqueId from 'generate-unique-id'
import { TabulatorFull as Tabulator } from 'tabulator-tables'
const ctx = document.getElementById('myChart')
const submit = document.querySelector('.submit')
const expenseName = document.querySelector('.expenseName')
const amount = document.querySelector('.amount')
const category = document.querySelector('.category')
const date = document.querySelector('.date')
const filterDate = document.querySelector('.filterDate')
const myTable = document.querySelector('#example-table')
const price = document.querySelector('.price')

let myChart
let rowId

const addSelectOptionToCategory = function () {
  const selectCategory = document.createElement('option')
  // newOption.value = '1';
  selectCategory.textContent = 'Select Category'

  // Insert the new option as the first child
  category.insertBefore(selectCategory, category.firstChild)
}

export const removeSelectOption = function () {
  category.addEventListener('click', function (e) {
    // Remove the first <option>
    if (this.options.length > 0) {
      if (this.options[0].textContent === 'Select Category') {
        this.options[0].remove()
      }
    }
  })
}

export const categoryChangeHandler = function (control) {
  control()
  // removeSelectOptionFromCategory()
}
export const addPrice = function (state) {
  let initialPrice = 0
  state.forEach((exp) => {
    initialPrice += +exp.amount
    price.innerHTML = initialPrice
  })
}

export const addExpenseToTable = function (tableData = 'No Data Yet') {
  tableData.forEach((data) => (data['Delete'] = 'Delete'))
  console.log(tableData)
  new Tabulator(myTable, {
    data: tableData,
    layout: 'fitColumns',
    columns: [
      {
        title: 'ExpenseName',
        field: 'expenseName',
      },
      { title: 'Amount', field: 'amount' },
      { title: 'category', field: 'category' },
      { title: 'date', field: 'date' },
      {
        title: 'Delete',
        field: 'Delete',
        cellClick: function (e, cell) {
          const button = e.target.closest(
            ".tabulator-cell[tabulator-field='Delete'] "
          )
          if (!button) return
          rowId = button.parentElement.dataset.id
          cell.getRow().delete() // Delete the row
        },
      },
    ],
    rowFormatter: function (row) {
      // Add a custom attribute to each row
      const element = row.getElement() // Get the HTML element of the row
      element.setAttribute('data-id', row.getData().id) // Set an attribute with a value
    },
  })
}

export const deleteHandler = function (deleteControl) {
  document.body.addEventListener('click', function (e) {
    if (e.target.closest(".tabulator-cell[tabulator-field='Delete'] ")) {
      deleteControl(rowId)
    }
  })
}

export const getChart = function (category) {
  const initialExpense = category.map((_) => 0)
  myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: category,
      datasets: [
        {
          label: '# of Votes',
          data: initialExpense, //state.expense.count,
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  })
}

export const addCategory = function (categoryOptions) {
  categoryOptions.forEach((el) => {
    category.innerHTML += `<option value=${el}>${el}</option>`
    // categoryFilter.innerHTML += `<option value=${el}>${el}</option>`
  })
}

export const submitExpenseHandler = function (control) {
  submit.addEventListener('click', function (e) {
    if (
      expenseName.value === '' ||
      amount.value === '' ||
      category.value === '' ||
      date.value === ''
    )
      return

    e.preventDefault()
    const id = generateUniqueId()
    const expense = {
      id,
      expenseName: expenseName.value,
      amount: amount.value,
      category: category.value,
      date: date.value,
    }
    expenseName.value = ''
    amount.value = ''
    category.value = ''
    date.value = ''
    console.log(expense)
    control(expense)
    addSelectOptionToCategory()
  })
}

export const filterDateHandler = function (control) {
  filterDate.addEventListener('change', function () {
    control(this.value)
  })
}

export const updateChart = function (state) {
  const initialExpense = state.category.reduce((arr, cete) => {
    arr[cete] = 0
    return arr
  }, {})

  const expenseSortByDate = state.expense.filter(
    (expense) => expense.date === state.date
  )
  addPrice(expenseSortByDate)
  const expenseArray = expenseSortByDate
    .map((expense) => expense.category)
    .reduce((acc, item) => {
      acc[item] = (acc[item] || 0) + 1
      return acc
    }, {})

  Object.entries(expenseArray).forEach((expense) => {
    initialExpense[expense[0]] = expense[1]
  })

  const finalArray = Object.values(initialExpense)
  myChart.data.datasets[0].data = finalArray
  myChart.update()
}
