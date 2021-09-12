<template>
	<view class="content">
		<view class="uni-card">
			<view class="text-area uni-padding-wrap uni-center">
				<text class="datetime ">{{current.toDateString()}}</text>
			</view>
			<view class="text-area uni-padding-wrap  uni-center">
				<text class="uni-text-small">今日共{{reportCount}}人上报健康状态</text>
			</view>
			<view class="content">
				<view class="uni-badge">
					<text class="uni-bold uni-text">{{healthy}}</text>
					<view class="uni-text-small">健康</view>
				</view>
				<view class="uni-badge">
					<text class="uni-bold uni-text">{{fever}}</text>
					<view class="uni-text-small">发热</view>
				</view>
				<view class="uni-badge">
					<text class="uni-bold uni-text">{{otherSymptoms}}</text>
					<view class="uni-text-small">其他</view>
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
	
	export default {
		data() {
			let placeReports: Array<PlaceReport>;
			placeReports = this.$store.getters.summarizeByPlace;
			return {
				current: new Date(), 
				reportCount: this.$store.state.reportCount,
				healthy: this.$store.state.healthy,
				fever: this.$store.state.fever,
				otherSymptoms: this.$store.state.otherSymptoms,
				placeReport: placeReports
			};
		},
		onShow(){
			this.initPageData();
		},
		methods:{
			initPageData(){
				let placeReports: Array<PlaceReport>;
				placeReports = this.$store.getters.summarizeByPlace;
				this.current= new Date(),
				this.reportCount= this.$store.state.reportCount,
				this.healthy= this.$store.state.healthy,
				this.fever= this.$store.state.fever,
				this.otherSymptoms= this.$store.state.otherSymptoms,
				this.placeReport= placeReports
			}
		}
		
	}
</script>

<style>

</style>
