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
		
		<view class="content" v-if="detail.id === 3 || detail.id >= 100">
			<u-parse v-if="isLookEnd" :content="detail.linkContent"></u-parse>
			<view v-else class="link">
				<view class="link-title" >链接 </view> <br />
				<view class="lock">
					<u-icon name="close-circle" size="30" color="#515767"></u-icon>
					点击下方按钮 解锁～
				</view>
			</view>
		</view>
	</view>
	
	<view class="fotter" @click="showad">
		<u-icon name="play-right-fill"></u-icon>
		看广查看~
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
	  opacity2: 1,
	  videoAd: null,
	  isLookEnd: false
    }
  },
  async onLoad(options) {
	// 在页面onLoad回调事件中创建激励视频广告实例
	if (wx.createRewardedVideoAd) {
	  this.videoAd = wx.createRewardedVideoAd({
		adUnitId: 'adunit-487ba8820fc3e91a'
	  })
	  this.videoAd.onLoad(() => {})
	  this.videoAd.onError((err) => {
		console.error('激励视频光告加载失败', err)
	  })
	  this.videoAd.onClose((res) => {
		  // 用户点击了【关闭广告】按钮
		  if (res && res.isEnded) {
		    // 正常播放结束，可以下发游戏奖励
			this.isLookEnd = true
		  } else {
		    // 播放中途退出，不下发游戏奖励
			uni.showToast({
				icon:'none',
				title: '完整观看广告后才可以查看哦 ～'
			});
		  }
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
	},
	sub() {
		  wx.requestSubscribeMessage({
			tmplIds: ['77W22ia2xoPss5padQtJIzSb-dmePOzkPWAihuSqPLo'],
			success (res) {
				console.log(res)
			}
		  })
	},
	showad() {
		// 用户触发广告后，显示激励视频广告
		if (this.videoAd) {
		  this.videoAd.show().catch(() => {
			// 失败重试
			this.videoAd.load()
			  .then(() => this.videoAd.show())
			  .catch(err => {
				console.error('激励视频 广告显示失败', err)
			  })
		  })
		}
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
	flex: 1;
	padding-bottom: 150rpx;
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

.more {
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 28rpx;
	color: #8a919f;
}

.fotter {
	display: flex;
	justify-content: center;
	align-items: center;
	position: fixed;
	bottom: 0;
	width: 100%;
	padding: 30rpx;
	height: 100rpx;
	border-top: 1px solid #ffff00;
	background-color: #FFFF00;
	color: #000 !important;
	font-size: 30rpx !important;
	font-weight: 500;
	letter-spacing: 10rpx;
}
.fotter:active {
	opacity: 0.8;
}
.link {
	padding: 0 30rpx;
	background-color:white;
	border-radius:6px;
	padding:15px;
	box-shadow:0 1px 3px rgba(0,0,0,0.1);
}

.link-title {
	color: #515767;
	font-weight: 500;
}
.lock {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: 30rpx 0;
	font-size: 30rpx !important;
	gap: 20rpx 0;
	color: #515767;
}
</style>
