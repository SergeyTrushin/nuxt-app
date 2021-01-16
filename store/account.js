
export const state = () => ({
	status: JSON.parse(localStorage.getItem('status')) || false
})

export const mutations =  {
	updateStatus(state, value) {
		localStorage.setItem('status', JSON.stringify(value))
		state.status = value
	},
}

export const actions = {
	switchStatus({commit}, value) {
		commit('updateStatus', value)
	}
}

export const getters = {
	status: s => s.status
}