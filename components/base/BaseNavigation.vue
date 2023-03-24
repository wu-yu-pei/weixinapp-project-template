<template>
	<view class="base-navbar">
		<u-navbar
		:placeholder="true"
		:bgColor="bgColor"
		:textColor="textColor"
		:border="true"
		:autoBack="true"
		>
			<view class="left" slot="left" :style="{color:textColor}">
				<slot name="left">{{name}}</slot>
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
			},
			bgColor:{
				type:String,
				default:'#fff'
			},
			textColor:{
				type:String,
				default:'#000'
			}
		},
	}
</script>

<style lang="less" scoped>
	.base-navbar {
		.left {
			font-size: 35rpx;
			font-weight: 700;
			letter-spacing: 5rpx;
		}
	}
</style>