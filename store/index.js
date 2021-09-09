import { createStore } from 'vuex'
const store = createStore({
	state: {
		reportCount: 0,
		healthy: 0,
		fever: 0,
		otherSymptoms: 0,
		reportList:[
					{status:'healthy',trip:'in_dorm',place:['主教学楼','第二食堂']},
					{status:'healthy',trip:'in_dorm',place:['艺术学院','第二食堂']},
					{status:'fever',trip:'in_dorm',place:['艺术学院','7号寝室','其他']},
					{status:'cough',trip:'in_dorm',place:['7号寝室','第二食堂','其他']}
				   ]
		testvuex: false,
		colorIndex: 0,
		colorList: ['#FF0000', '#00FF00', '#0000FF'],
		noMatchLeftWindow: true,
		active: 'componentPage',
		leftWinActive: '/pages/component/view/view',
		activeOpen: '',
		menu: [],
		univerifyErrorMsg: ''
	},
	mutations: {
		login(state, provider) {
			state.hasLogin = true;
			state.loginProvider = provider;
		},
		logout(state) {
			state.hasLogin = false
			state.openid = null
		},
		setOpenid(state, openid) {
			state.openid = openid
		},
		setTestTrue(state) {
			state.testvuex = true
		},
		setTestFalse(state) {
			state.testvuex = false
		},
		setColorIndex(state, index) {
			state.colorIndex = index
		},
		setMatchLeftWindow(state, matchLeftWindow) {
			state.noMatchLeftWindow = !matchLeftWindow
		},
		setActive(state, tabPage) {
			state.active = tabPage
		},
		setLeftWinActive(state, leftWinActive) {
			state.leftWinActive = leftWinActive
		},
		setActiveOpen(state, activeOpen) {
			state.activeOpen = activeOpen
		},
		setMenu(state, menu) {
			state.menu = menu
		},
		setUniverifyLogin(state, payload) {
			typeof payload !== 'boolean' ? payload = !!payload : '';
			state.isUniverifyLogin = payload;
		},
		setUniverifyErrorMsg(state,payload = ''){
			state.univerifyErrorMsg = payload
		}
	},
	getters: {
		currentColor(state) {
			return state.colorList[state.colorIndex]
		}
	},
	actions: {
		// lazy loading openid
		getUserOpenId: async function({
			commit,
			state
		}) {
			return await new Promise((resolve, reject) => {
				if (state.openid) {
					resolve(state.openid)
				} else {
					uni.login({
						success: (data) => {
							commit('login')
							setTimeout(function() { //模拟异步请求服务器获取 openid
								const openid = '123456789'
								console.log('uni.request mock openid[' + openid + ']');
								commit('setOpenid', openid)
								resolve(openid)
							}, 1000)
						},
						fail: (err) => {
							console.log('uni.login 接口调用失败，将无法正常使用开放接口等服务', err)
							reject(err)
						}
					})
				}
			})
		},
		getPhoneNumber: function({
			commit
		}, univerifyInfo) {
			return new Promise((resolve, reject) => {
				uni.request({
					url: 'https://97fca9f2-41f6-449f-a35e-3f135d4c3875.bspapp.com/http/univerify-login',
					method: 'POST',
					data: univerifyInfo,
					success: (res) => {
						const data = res.data
						if (data.success) {
							resolve(data.phoneNumber)
						} else {
							reject(res)
						}

					},
					fail: (err) => {
						reject(res)
					}
				})
			})
		}
	}
})

export default store
