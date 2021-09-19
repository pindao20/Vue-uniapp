<template>
	<view >
		<view class="content">
			<view class="uni-flex">
				<view class="icon-image">
					<image style="width: 20px; height: 20px; background-color: #eeeeee;" :mode="scaleToFill" src="../../static/ym.jpeg"></image>
				</view>
				<view class="text-area">
					<text class=" uni-label ">{{name}}</text>
				</view>
			</view>
		</view>
		<view class="uni-padding-wrap uni-common-mt">
			<button type="primary" @click="goReportPage()">今日健康上报</button>
		</view>
		
		<view class="text-area">
			<text class="uni-text-small">{{current.toDateString()}}</text>
		</view>
		<view class="uni-form-item uni-flex">
			<text class="uni-label">健康状态:</text>
			<label class="label-2-text uni-badge-default" v-for="item in health">{{item}}</label>
		</view>
		<view class="uni-form-item uni-flex">
			<text class="uni-label">行程排查:</text>
			<view>
			<text class="text-area " v-for="item in trip">
				<text class="uni-text-small">行程</text>
				<text class="uni-text-small uni-bold uni-text-red">{{item.name}}</text>
				<text class="uni-text-small" v-if="item.riskLevel === 'confirmed'">存在确诊病患，建议健康检查</text>
				<text class="uni-text-small" v-if="item.riskLevel === 'potential'">存在潜在病患，建议自我观察</text>
			</text>
			</view>
		</view>
	</view>
</template>

<script lang="ts">
	
	
	export default {
		data() {
			return {
				name: '张三',
				current: new Date(),
				health: ['发热','咳嗽'],
				trip:[
						{name:'G8888',riskLevel:'confirmed'},
						{name:'艺术学院',riskLevel:'potential'}
					]
			}
		},
		onLoad() {
			let summary: Summary;
			wx.cloud.callFunction({
				name: 'healthReport',
				data: {
					type: 'getSummary'
				}
				
			}).then((res) => {
				summary = res.result.data[0];
				this.$store.commit('updateSummaryId', summary._id);
				this.reportCount= summary.reportCount;
				this.healthy= summary.statusSummary.healthy;
				this.fever= summary.statusSummary.fever;
				this.otherSymptoms= summary.statusSummary.otherSymptoms
			})
		},
		methods: {
			goReportPage(){
				const url = "/pages/health-report/health-report";
				uni.navigateTo({
					url: url
				})
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
