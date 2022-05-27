// Сделайте игру. Суть - дана таблица с числами, распаложенными 
// в случайном порядке в ячейках таблицы. Числа идут по порядку от 1 до N. 
// Все числа разного размера и цвета. Играющему необходимо по порядку 
// кликать по числам - сначала 1, потом 2 и так далее до N. 
// Когда он кликает на правильную ячейку - она активируется и делает красный фон 
// (предыдущие правильные ячейки не снимают выделение). 
// Должен тикать таймер, на игру дается M секунд. 
// Если не успел найти все числа по порядку - проиграл.

const table = document.getElementById('table')
const btn = document.getElementById('btn')
const start = document.getElementById('start')
const timerDiv = document.getElementById('timerDiv')
const timeEL = document.getElementById('time')
const mask = document.getElementById('mask')
const modal = document.getElementById('modal')
const modal2 = document.getElementById('modal2')
const input1 = document.getElementById('input1')
const input2 = document.getElementById('input2')

let row = null
let column = null
function getTable(rows, columns) {
	for (i = 0; i < rows; i++) {
		row = document.createElement('div')
		row.classList.add('row')
		for (j = 0; j < columns; j++) {
			column = document.createElement('div')
			column.classList.add('column')
			row.appendChild(column)
		}
		table.appendChild(row)
	}
}

getTable(4, 5)

let columns = document.querySelectorAll('.column')
let counter = 1
function getCounter() {
	table.onclick = function () {
		counter += 1
		if (counter === columns.length + 1) {
			mask.style.opacity = 1
			mask.style.zIndex = 5
			modal2.style.opacity = 1
			modal.style.opacity = 0
		}
	}
}
getCounter()
function getRandomNums() {
	let colors = [
		'red', 'green', 'black', 'gray', 'blue',
		'OrangeRed', 'DarkMagenta', 'SaddleBrown',
		'Lime', 'DarkGoldenRod', 'NavajoWhite',
		'DarkSlateBlue', 'Orchid', 'DarkCyan',
		'YellowGreen'
	]
	let array = []
	let array2 = []
	for (i = 0; i < columns.length; i++) {
		array.push(columns[i])
	}
	function shuffle(array) {
		array.sort(() => Math.random() - 0.5);
	}
	shuffle(array)

	for (j = 0; j < array.length; j++) {
		let element = array[j]
		element.innerHTML = j + 1
	}
	let getNum = array.map(function (element, index) {
		element.onclick = function () {
			console.log(counter);
			// element.style.background = 'red'
			// element.style.color = 'white'
			if (element.innerHTML === String(counter)) {
				console.log('asf');
				element.style.background = 'red'
				element.style.color = 'white'
			} else {
				mask.style.opacity = 1
				mask.style.zIndex = 5
				modal.style.opacity = 1
				modal2.style.opacity = 0
			}
		}
	})
	let change = array.map(function (elem) {
		elem.style.color = colors[Math.floor(Math.random() * colors.length)]

	})
}
function getTime(timer) {
	let timeFunc = setInterval(() => {
		timer -= 1
		timeEL.innerHTML = Number(timer)
		if (timer === 0) {
			mask.style.opacity = 1
			mask.style.zIndex = 5
			modal.style.opacity = 1
			modal2.style.opacity = 0
			timeEL.innerHTML = ''
			clearInterval(timeFunc)
		}
	}, 1000);
}

btn.onclick = function () {
	mask.style.opacity = 0
	mask.style.zIndex = -1
	modal.zIndex = -1
	timerDiv.style.opacity = 1
	btn.style.display = 'none'
	getTime(15)
	getRandomNums()

}




