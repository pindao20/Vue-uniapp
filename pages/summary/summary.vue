<template>
	<view class="content">
		<view class="uni-card">
			<view class="text-area uni-padding-wrap uni-center">
				<text class="datetime ">{{current.toDateString()}}</text>
			</view>
			<view class="text-area uni-padding-wrap  uni-center">
				<text class="uni-text-small">今日共{{reportCount}}人上报健康状态</text>
			</view>
			<view class="content uni-padding-wrap uni-flex" style="align-content: center;">
				<view class="uni-padding-wrap" style="justify-content: center; padding-left: 30rpx; width: 250rpx;">
				<view class="uni-badge" >
					<text class="uni-bold uni-text">{{healthy}}</text>
					<view class="uni-text-small">健康</view>
				</view>
				</view>
				<view class="uni-padding-wrap" style="justify-content: center; padding-left: 30rpx; width: 250rpx;">
				<view class="uni-badge">
					<text class="uni-bold uni-text">{{fever}}</text>
					<view class="uni-text-small">发热</view>
				</view>
				</view>
				<view class="uni-padding-wrap" style="justify-content: center; padding-left: 30rpx; width: 250rpx;">
				<view class="uni-badge">
					<text class="uni-bold uni-text">{{otherSymptoms}}</text>
					<view class="uni-text-small">其他</view>
				</view>
				</view>
				
			</view>
		</view>
		<view class="">
			<view class="uni-title ">
				<text>校园疫情地图</text>
			</view>
			<view class="" v-for=" p in placeReport">
				<view class="uni-flex">
					<text class="uni-label uni-text-small">{{p.place}}</text>
				</view>
				<view>
					<text class="uni-badge uni-text-small">健康{{p.healthy}}人</text>
					<text class="uni-badge uni-text-small">有发热{{p.fever}}人</text>
					<text class="uni-badge uni-text-small">其他症状{{p.other}}人</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script lang="ts">
	
	interface PlaceReport{
		place: string,
		healthy: 0,
		fever: 0,
		other: 0
	}
	
	interface Summary
	{
		reportCount: number,
		healthStatus: [{healthy: 0}, {fever:0}, {otherSymptoms:0}],
	}
	
	export default {
		data() {
			
			// this.initPageData();
			
			// let placeReports: Array<PlaceReport>;
			let placeReports = new Array<PlaceReport>();
			
			return {
				current: new Date(), 
				reportCount: 0,
				healthy: 0,
				fever: 0,
				otherSymptoms: 0,
				placeReport: placeReports
			};
		},
		onShow(){
			// this.initPageData();
			this.getSummary();
			this.getPlaceSummary().then(res => {
				this.$store.commit('refreshReport', res);
				this.placeReport = this.$store.getters.summarizeByPlace;
			})
		},
		mounted(){
			// this.getPlaceSummary();
		},
		methods:{
			// initPageData(){
			// 	this.getSummary();
			// 	this.getPlaceSummary();
			// 	// let placeReports: Array<PlaceReport>;
			// 	// placeReports = this.$store.getters.summarizeByPlace;
			// 	// this.current= new Date(),
			// 	// this.placeReport= placeReports
			// },
			
			getSummary(){
				let summary: Summary;
				wx.cloud.callFunction({
					name: 'healthReport',
					data: {
						type: 'getSummary'
					}
					
				}).then((res) => {
					summary = res.result.data[0];
					console.log(summary);
					this.$store.commit('updateSummaryId', summary._id);
					this.reportCount= summary.reportCount;
					this.healthy= summary.statusSummary.healthy;
					this.fever= summary.statusSummary.fever;
					this.otherSymptoms= summary.statusSummary.otherSymptoms
				})
			},
			
			getPlaceSummary(){
				return new Promise((resolve, reject) => {
					wx.cloud.callFunction({
						name: 'healthReport',
						data: {
							type: 'getReportList'
						}
						
					}).then((res) => {
						resolve(res.result.data);
						
					})
				})
				
			}
		}
		
	}
</script>

<style>

</style>
