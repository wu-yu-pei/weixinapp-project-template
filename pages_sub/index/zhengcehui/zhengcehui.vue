<template>
	<view class="page">
		<SubNavigation name="政策惠"></SubNavigation>
	</view>
</template>

<script>
	import SubNavigation from '@/components/base/SubNavigation.vue'

	export default {
		components:{
			SubNavigation
		},
		data() {
			return {

			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style scoped lang="less">
// 修改深层样式
// navbar border
/deep/ .u-navbar .u-navbar__content {
	border-bottom: 1rpx solid #ccc;
}

</style>
