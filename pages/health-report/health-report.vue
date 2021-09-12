<template>
	<view class="content">
		<view class="">
			<uni-group title="今日身体状况(可多选)">
				<radio-group @change="healthSelected">
					<label class="uni-text-small">
						<radio  value="healthy" style="transform:scale(0.6)"></radio>良好
					</label>
					<label class="uni-text-small">
						<radio  value="fever" style="transform:scale(0.6)"></radio>发热
					</label>
					<label class="uni-text-small">
						<radio  value="cough" style="transform:scale(0.6)"></radio>咳嗽
					</label>
					<label class="uni-text-small">
						<radio  value="other" style="transform:scale(0.6)"></radio>其他
					</label>
				</radio-group>
			</uni-group>
		</view>
		<view class="uni-list">
			<uni-group title="今日行程">
				<radio-group @change="tripSelected">
					<label class="uni-text-small uni-list-cell uni-list-cell-pd">
						<radio  value="in_dorm" style="transform:scale(0.6)"></radio>未出寝室
					</label>
					<label class="uni-text-small uni-list-cell uni-list-cell-pd">
						<radio  value="out_dorm" style="transform:scale(0.6)"></radio>出过寝室
					</label>
					
				</radio-group>
			</uni-group>
		</view>
		<view class="">
			<uni-group title="选择去过的地方(可多选)">
				<checkbox-group @change="placeSelected">
					<view>
						<label class="uni-text-small">
							<checkbox value="主教学楼" style="transform:scale(0.6)"></checkbox>主教学楼
						</label>
						<label class="uni-text-small">
							<checkbox value="艺术学院" style="transform:scale(0.6)"></checkbox>艺术学院
						</label>
						<label class="uni-text-small">
							<checkbox value="第二食堂" style="transform:scale(0.6)"></checkbox>第二食堂
						</label>
					</view>
					<view>
						<label class="uni-text-small">
							<checkbox value="7号寝室" style="transform:scale(0.6)"></checkbox>7号寝室
						</label>
						<label class="uni-text-small">
							<checkbox  value="其他" style="transform:scale(0.6)"></checkbox>其他
						</label>
					</view>
				</checkbox-group>
			</uni-group>
		</view>
		<view class="uni-padding-wrap uni-common-mt">
			<button type="primary" @click="report()">提交</button>
		</view>
	</view>
</template>

<script lang="ts">
	export default {
		data() {
			return {
				healthyChecked:'',
				placeChecked:[],
				tripChecked:''
			};
		},
		methods:{
			report(){
				this.$store.commit('report',{
					status: this.healthyChecked,
					trip: this.tripChecked,
					place: this.placeChecked
				});
				uni.switchTab({
					url:'/pages/index/index'
				});
			},
			healthSelected(evt){
				this.healthyChecked = evt.detail.value;
			},
			tripSelected(evt){
				this.tripChecked = evt.detail.value;
			},
			placeSelected(evt){
				this.placeChecked = evt.detail.value;
			}
		}
	}
</script>

<style>

</style>
