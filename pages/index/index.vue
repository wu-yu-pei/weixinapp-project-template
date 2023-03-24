<template>
	<view class="page">
		<BaseNavigation>
			<template slot="left">首页</template>
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

		onLoad() {

		},

		computed:{

		},

		methods:{

		}
	}
</script>

<style lang="less" scoped>
    // 深层样式修改
    // navbar border
    /deep/ .u-navbar .u-navbar__content {
    	border-bottom: 1rpx solid #ccc;
    }
</style>
