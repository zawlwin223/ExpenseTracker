import Chart, { DoughnutController } from 'chart.js/auto'
const ctx = document.getElementById('myChart')
const submit = document.querySelector('button[type=submit]')
const expenseName = document.querySelector('.expenseName')
const amount = document.querySelector('.amount')
const category = document.querySelector('.category')
const date = document.querySelector('.date')
const categoryFilter = document.querySelector('.categoryFilter')
export const getChart = function () {
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [
        {
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
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
    categoryFilter.innerHTML += `<option value=${el}>${el}</option>`
  })
}

export const submitExpense = function () {
  submit.addEventListener('click', function (e) {
    e.preventDefault()
    console.log('This is not testing')
    const expense = {
      expenseName: expenseName.value,
      amount: amount.value,
      category: category.value,
      date: date.value,
    }
    expenseName.value = ''
    amount.value = ''
    category.value = ''
    date.value = ''
  })
}
submitExpense()
