function randomInteger(min, max) {
	let rand = min - 0.5 + Math.random() * (max - min + 1)
	return Math.round(rand)
}

export const state = () => ({
	todos: JSON.parse(localStorage.getItem('todos')) || []
})

export const mutations =  {
	setTodos(state, todos) {
		localStorage.setItem('todos', JSON.stringify(todos))
		state.todos = todos
	},
	updateTodos(state, todos) {
		localStorage.setItem('todos', JSON.stringify(todos))
		state.todos = todos
	}
}

export const actions = {
	async fetch({commit}) {
		const todos = await this.$axios.get('https://jsonplaceholder.typicode.com/todos')
		commit('setTodos', todos.data)
	},
	updateTodos({commit, state}, id) {
		const todos = state.todos.map(todo => {
			if (todo.id == id) {
				todo.complited = !todo.complited
			}
			return todo
		})
		commit('updateTodos', todos)
	}
}

export const getters = {
	getRandomTodos: s => s.todos.slice(0, randomInteger(1, 20))
}