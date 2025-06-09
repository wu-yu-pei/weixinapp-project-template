<template>
  <view class="container">
    <!-- 自定义导航栏 -->
    <view class="custom-nav" :style="{ paddingTop: statusBarHeight + 'px', opacity: opacity2  }">
		<u-icon name="home" color="#000" size="20" :bold="true" @click="backHome"></u-icon>
		<text class="nav-title" @click="backHome">HAPPY GET</text>
    </view>
	
	<view class="custom-nav hidden" :style="{ paddingTop: statusBarHeight + 'px', opacity }">
		<u-icon name="home" color="#000" size="20" :bold="true" @click="backHome"></u-icon>
		<text class="nav-title" @click="backHome">{{detail.name}}</text>
	</view>

	<view class="detail-wrapper" v-if="detail">
		<view class="content">
			<u-parse :content="detail.content"></u-parse>
		</view>
	</view>
  </view>
</template>

<script>

export default {
  data() {
    return {
      statusBarHeight: 0,
      detail: null,
	  customNavHeight: 0,
	  opacity: 0,
	  opacity2: 1
    }
  },
  async onLoad(options) {
	let interstitialAd = null
	
	// 在页面onLoad回调事件中创建插屏广告实例
	if (wx.createInterstitialAd) {
	  interstitialAd = wx.createInterstitialAd({
	    adUnitId: 'adunit-504eec5e6c7c245a'
	  })
	  interstitialAd.onLoad(() => {})
	  interstitialAd.onError((err) => {
	    console.error('插屏广告加载失败', err)
	  })
	  interstitialAd.onClose(() => {})
	}
	
	// 在适合的场景显示插屏广告
	if (interstitialAd) {
	  interstitialAd.show().catch((err) => {
	    console.error('插屏广告显示失败', err)
	  })
	}
    this.setStatusBarHeight()
    await this.getDetailById(options.id)
	
	
  },
  onReady() {
  	uni.createSelectorQuery().select('.custom-nav').boundingClientRect((data) => {
		this.customNavHeight = data.height
	}).exec()
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
		console.log(111);
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
  onPageScroll(e) {
	this.opacity =  (e.scrollTop * 2) / this.customNavHeight
	this.opacity2 = e.scrollTop < 0 ? 1 : this.customNavHeight / (e.scrollTop * 10)
  }
}
</script>

<style lang="scss">
.container {
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #FFFFFF;
}

.custom-nav {
  display: flex;
  gap: 0 10rpx;
  background-color: #ffff00;
  align-items: center;
  color: #000000;
  padding-bottom: 10px;
  padding-left: 10rpx;
  position: relative;
  z-index: 999;
}

.hidden{
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	background-color: #ffff00;
}

.custom-nav-image {
	width: 30px;
	height: 20px;
}


.nav-title {
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  line-height: 44px;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}

.detail-wrapper {
	
}

.title {
	display: flex;
	font-weight: bold;
	font-size: 18px;
	gap: 0 10rpx;
	color: #00000f;
}

.title .u-icon {
	z-index: 0;
}

.content {
	padding: 20rpx;
}
</style>
