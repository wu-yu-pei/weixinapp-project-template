<template>
	<view class="page">
		<BaseNavigation bgColor="#2a79f9" textColor="#fff">
			<template slot="left">企友圈</template>
		</BaseNavigation>
	</view>
</template>

<script>
	import BaseNavigation from '@/components/base/BaseNavigation.vue'

	export default {
		components:{
			BaseNavigation
		},
		data() {
			return {

			}
		},
		mounted() {
			
		},
		methods: {

		}
	}
</script>

<style lang="less" scoped>
	// 修改深层样式
	// navbar border
	/deep/ .u-navbar .u-navbar__content {
		border-bottom: 1rpx solid #ccc;
	}
</style>
