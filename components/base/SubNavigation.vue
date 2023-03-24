<template>
	<view class="sub-navbar">
		<u-navbar
		:placeholder="true"
		bgColor="#2A79FA"
		:border="true"
		:autoBack="true"
		>
			<view class="left" slot="left">
				<u-icon name="arrow-left" size="40rpx" color="#fff"></u-icon>
				{{name}}
			</view>
		</u-navbar>
	</view>
	
</template>

<script>
	export default {
		name:"NBaseavigation",
		props:{
			name:{
				type:String,
				default:'Title'
			}
		}
	}
</script>

<style lang="less" scoped>
	.sub-navbar {
		.left {
			display: flex;
			align-items: center;
			font-size: 35rpx;
			letter-spacing: 5rpx;
			color: #fff;
		}
	}
</style>