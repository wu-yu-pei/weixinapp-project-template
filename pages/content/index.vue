<template>
  <view class="container">
    <!-- 自定义导航栏 -->
    <view class="custom-nav" :style="{ paddingTop: statusBarHeight + 'px' }">
		<u-icon name="home" color="#000" size="20" :bold="true"></u-icon @click="backHome">
		<text class="nav-title" @click="backHome">HAPPY GET</text>
    </view>

	<view class="detail-wrapper" v-if="detail">
	  <view class="card">
		<image class="cover" :src="'https://ad-api.wuyupei.top' + detail.image" mode="aspectFill"></image>
		<view class="info">
		  <view class="title">{{ detail.name }}</view>
		  <view class="description">{{ detail.des }}</view>
		  <view class="meta">
			<text class="views">👁️ {{ detail.viewCount }} 次浏览</text>
			<text class="date">{{ formatDate(detail.createdAt) }}</text>
		  </view>
		</view>
	  </view>

	  <u-parse v-if="detail.content" :content="detail.content"></u-parse>
	</view>
  </view>
</template>

<script>

export default {
  data() {
    return {
      statusBarHeight: 0,
      detail: null
    }
  },
  async onLoad(options) {
    this.setStatusBarHeight()
    await this.getDetailById(options.id)
  },
  methods: {
    setStatusBarHeight() {
      const systemInfo = uni.getSystemInfoSync()
      this.statusBarHeight = systemInfo.statusBarHeight
    },
    async getDetailById(id) {
      const res = await this.$api.getDetail(id)
	  console.log(res)
      this.detail = res|| {}
	  console.log(this.detail)
    },
    formatDate(dateStr) {
      const date = new Date(dateStr)
      return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
    },
	backHome() {
		uni.redirectTo({
			url: "/pages/index/index"
		})
	}
  },
  onShareAppMessage() {
    return {
      title: this.detail?.name || 'HAPPY GET',
      path: `/pages/content/index?id=${this.detail?.id}`,
      imageUrl: 'https://ad-api.wuyupei.top' + this.detail?.image
    }
  },
  onShareTimeline() {
    return {
      title: this.detail?.name || 'HAPPY GET',
      query: `id=${this.detail?.id}`,
      imageUrl: 'https://ad-api.wuyupei.top' + this.detail?.image
    }
  },
}
</script>

<style lang="scss">
.container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #FFFFFF;
}

.custom-nav {
  display: flex;
  gap: 0 10rpx;
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
.detail-wrapper {
  padding: 20rpx;
}

.card {
  display: flex;
  background: #f9f9f9;
  border-radius: 16rpx;
  overflow: hidden;
  margin-bottom: 30rpx;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.05);
}

.cover {
  width: 180rpx;
  height: 180rpx;
  flex-shrink: 0;
  border-radius: 12rpx 0 0 12rpx;
}

.info {
  padding: 20rpx;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.title {
  font-size: 32rpx;
  font-weight: bold;
  margin-bottom: 10rpx;
  color: #333;
}

.description {
  color: #666;
  font-size: 26rpx;
  margin-bottom: 10rpx;
  line-height: 1.4;
}

.meta {
  font-size: 22rpx;
  color: #999;
  display: flex;
  justify-content: space-between;
}

</style>
