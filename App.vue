<script lang="ts">
	export default {
		onLaunch: function() {
			if(!wx.cloud){
				console.log('App Launch')
			}
			else{
				console.log('cloud init')
				wx.cloud.init({
					evn: 'cloud1-3ghrey0y2aab80df',
					traceUser: true
				})
			}
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import './common/uni.css';
</style>
