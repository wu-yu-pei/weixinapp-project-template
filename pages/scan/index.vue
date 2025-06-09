<template>
  <view class="container">
    <view class="custom-nav" :style="{ paddingTop: statusBarHeight + 'px' }">
      <text class="nav-title">HAPPY GET</text>
    </view>

    <view class="content">
      <view class="content-search">
        <view class="content-search-title">
          输入你的IP,开始吧~
        </view>
        <view class="content-search-search">
          <u--input
            placeholder="192.168.0.1"
            border="surround"
            v-model="ipAddress"
            @change="validateIP"
            :customStyle="inputStyle"
          ></u--input>
        </view>
        <view 
          class="confirm-button"
          :class="{ 'active-button': isValidIP }"
          @click="handleSearch"
        >
          确定
        </view>
        <view class="error-message" v-if="showError">
          请输入有效的IP地址
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
      ipAddress: '',
      isValidIP: false,
      showError: false,
      inputStyle: {
        textAlign: 'center',
        fontFamily: 'serif',
        letterSpacing: '5px',
        height: '60px',
        borderRadius: '16px',
        border: '4px solid #000000',
        boxShadow: '0 5px 10px #FFFF00'
      }
    }
  },
  onLoad() {
    this.setStatusBarHeight()
  },
  methods: {
    setStatusBarHeight() {
      const systemInfo = uni.getSystemInfoSync()
      this.statusBarHeight = systemInfo.statusBarHeight
    },
    validateIP() {
      // IP地址正则校验
      const ipRegex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
      this.isValidIP = ipRegex.test(this.ipAddress)
      this.showError = this.ipAddress !== '' && !this.isValidIP
    },
    async handleSearch() {
      if (!this.isValidIP) {
        this.showError = true
        uni.showToast({
          title: '请输入有效的IP地址',
          icon: 'none'
        })
        return
      }
      // 有效的IP地址，执行搜索逻辑
      console.log('搜索IP:', this.ipAddress)
	  await this.$api.addIp({ ip: this.ipAddress })
	  uni.showToast({
	    title: '添加成功',
	    icon: 'none'
	  })
	  setTimeout(() => {
		  uni.redirectTo({
		  	url:'/pages/index/index'
		  })
	  }, 800)
      // 这里可以添加实际的搜索逻辑
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
  padding-bottom: 40px;
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
}

.confirm-button {
  width: 80%;
  height: 50px;
  background-color: #e0e0e0;
  color: #999;
  border-radius: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  font-weight: bold;
  margin-top: 20px;
  transition: all 0.3s ease;
}

.active-button {
  background-color: #000;
  color: #ffff00;
  box-shadow: 0 5px 10px rgba(255, 255, 0, 0.3);
}

.error-message {
  color: #ff4d4f;
  font-size: 12px;
  margin-top: 5px;
  height: 20px;
}

/deep/ .u-input .u-input__content input {
  text-align: center !important;
  font-family: serif;
  letter-spacing: 5px !important;
}
</style>