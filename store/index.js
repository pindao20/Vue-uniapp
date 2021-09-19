import { createStore } from 'vuex'
const store = createStore({
	state: {
		reportCount: 5,
		healthy: 3,
		fever: 1,
		otherSymptoms: 1,
		reportList:[
					{status:'healthy',trip:'out_dorm',place:['主教学楼','第二食堂']},
					{status:'healthy',trip:'out_dorm',place:['艺术学院','第二食堂']},
					{status:'fever',trip:'out_dorm',place:['艺术学院','7号寝室','其他']},
					{status:'cough',trip:'out_dorm',place:['7号寝室','第二食堂','其他']},
					{status:'healthy',trip:'in_dorm',place:[]}
				   ]
	},
	mutations: {
		report(state, reportItem) {
			state.reportCount ++;
			state.reportList.push({
				status: reportItem.status,
				trip: reportItem.trip,
				place: reportItem.place
			});
			let h_n = 0;
			let f_n = 0;
			reportItem.status == 'healthy'? h_n++ :h_n;
			reportItem.status == 'fever'? f_n++ :f_n;
			state.healthy += h_n;
			state.fever += f_n;
			state.otherSymptoms += ((h_n + f_n) === 0 ? 1 :0);
		},
		
		refreshReport(state, list){
			state.reportList = list;
		}
	},
	getters: {
		summarizeByPlace: (state, getters) => {
			var placeReport = new Array;
			getters.getPlaceList.filter(item => {
				let healtHyCount = 0;
				let feverCount = 0;
				let otherCount = 0;
				for(let r =0; r< state.reportList.length;r ++)
				{
					if(state.reportList[r].place.some(p => p===item) 
						&& state.reportList[r].status === 'healthy')
					{
						healtHyCount++;
						
					}
					else if(state.reportList[r].place.some(p => p===item) 
						&& state.reportList[r].status === 'fever')
					{
						feverCount++;
					}
					else if(state.reportList[r].place.some(p => p===item))
					{
						otherCount++;
					}
					
				}
				placeReport.push({place: item, healthy: healtHyCount, fever:feverCount, other:otherCount});
			})
			return placeReport;
		},
		getPlaceList: state => {
			var placeList = new Array();
			for(let i =0; i< state.reportList.length; i++){
				let rItem = state.reportList[i];
				let place = rItem.place;
				 for(let j=0; j< place.length;j++)
				{
					let item = place[j];
					if(!placeList.some(p => p === item))
					{
						placeList.push(item);
					}
				}
			}
			return placeList;
		}
		
		
	},
	actions: {
	}
})

export default store
