<template>
  <view class="container">
    <view class="custom-nav" :style="{ paddingTop: statusBarHeight + 'px' }">
      <text class="nav-title">HAPPY GET</text>
    </view>

    <view class="content">
      <view class="content-search">
        <view class="content-search-title">
          有你想要的,搜索一下叭~
        </view>
        <view class="content-search-search" @click="toSearch">
          搜索
        </view>
      </view>

      <view class="content-message">
        <view class="marquee-line-wrapper">
          <view
            class="marquee-line"
            :class="['left-to-right']"
            :style="{ animationDuration: line1Duration + 's' }"
          >
            <view class="marquee-content">
              <view class="item" @click="goToSearch('掘金小册')">掘金小册</view>
              <view class="item" @click="goToSearch('IT资源PPT')">IT资源视频</view>
            </view>
          </view>
          <view class="fade-mask"></view>
        </view>

        <view class="marquee-line-wrapper">
          <view
            class="marquee-line"
            :class="['right-to-left']"
            :style="{ animationDuration: line2Duration + 's' }"
          >
            <view class="marquee-content">
              <view class="item" @click="goToSearch('北京理工大学PPT')">北京理工大学PPT...</view>
              <view class="item" @click="goToSearch('看广告得金币')">看广告得金币</view>
            </view>
          </view>
          <view class="fade-mask"></view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      statusBarHeight: 0,
      line1Duration: 5, // 第一行滚动时间，秒
      line2Duration: 10, // 第二行滚动时间，秒
    }
  },
  onLoad() {
    this.setStatusBarHeight()
    this.setRandomSpeed()
  },
  methods: {
    setStatusBarHeight() {
      const systemInfo = uni.getSystemInfoSync()
      this.statusBarHeight = systemInfo.statusBarHeight
    },
    toSearch() {
      uni.navigateTo({
        url: '/pages/search/index'
      })
    },
	 // 跳转到 search 页面并携带 keyword 参数
	goToSearch(keyword) {
	  uni.navigateTo({
		url: `/pages/search/index?keyword=${encodeURIComponent(keyword)}`
	  })
	},
    setRandomSpeed() {
      this.line1Duration = 15  // 8~14秒随机
      this.line2Duration = 15 + Math.random() * 6
    }
  }
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #FFFFFF;
}

.custom-nav {
  background-color: #ffff00;
  color: #000000;
  padding-bottom: 10px;
  padding-left: 10rpx;
}

.nav-title {
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  line-height: 44px;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}

.content {
  position: relative;
  display: flex;
  flex: 1;
  justify-content: center;
}

.content-search {
  position: absolute;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  top: 20%;
  width: 100%;
  height: 100px;
}

.content-search-title {
  font-size: 14px;
  color: #b9b6b6;
  letter-spacing: 2px;
}

.content-search-search {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80%;
  height: 60px;
  border-radius: 16px;
  letter-spacing: 5px;
  border: 4px solid #000000;
  box-shadow: 0 5px 10px #FFFF00;
  text-align: center;
  font-family: serif;
  color: #000;
  font-size: 16px;
}

.content-message {
  position: absolute;
  top: 60%;
  width: 100%;
  height: 120px;
  display: flex;
  flex-direction: column;
  gap: 30rpx;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background-color: #fff;
}

.marquee-line-wrapper {
  position: relative;
  width: 90%;
  overflow: hidden;
}

.marquee-line {
  white-space: nowrap;
  width: 100%;
  position: relative;
  height: 60rpx;
}

.marquee-content {
  display: inline-block;
  white-space: nowrap;
}

.item {
	position: relative;
	display: inline-block;
	margin-right: 60rpx;
	font-size: 28rpx;
	letter-spacing: 3px;
	font-family: serif;
}

.item::after {
  content: " ";
  position: absolute;
  width: 100%;
  height: 5px;
  background-color: #FFFF00;
  bottom: 0;
  left: 0;
  z-index: -1;
}

/* 跑马灯动画 */
@keyframes moveLeft {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(-100%);
  }
}

@keyframes moveRight {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(100%);
  }
}

/* 动画绑定 */
.left-to-right {
  animation-name: moveRight;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  animation-delay: -5s;
}

.right-to-left {
  animation-name: moveLeft;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  animation-delay: 0s;
}

/* 渐隐遮罩 */
.fade-mask {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 100%;
  pointer-events: none;
  background: linear-gradient(to right, 
    #fff 0%, 
    rgba(255,255,255,0) 20%, 
    rgba(255,255,255,0) 80%, 
    #fff 100%);
}
</style>
