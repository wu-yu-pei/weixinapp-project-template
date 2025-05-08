<template>
  <view class="container">
    <!-- 自定义导航栏 -->
    <view class="custom-nav" :style="{ paddingTop: statusBarHeight + 'px' }">
      <text class="nav-title">HAPPY GET</text>
    </view>

	<view class="list-container" v-if="list.length">
		<view class="list">
		  <view 
			class="list-item" 
			v-for="(item, index) in list" 
			:key="index"
			@click="handleItemClick(item)"
		  >
			<image class="item-image" :src="'http://8.141.63.127:7899' + item.image" mode="aspectFill" />
			<view class="item-content">
			  <text class="item-title">{{ item.name }}</text>
			  <text class="item-desc">{{ item.desc }}</text>
			  <view class="item-footer">
				<text class="item-views">{{ item.viewCount }}次浏览</text>
				<text class="item-time">{{ formatDate(item.updatedAt) }}</text>
			  </view>
			</view>
		  </view>
		</view>
	</view>
		
	<view class="empty" v-else>
	  <view class="empty-container">
		<!-- 有趣的插画容器 -->
		<view class="empty-illustration">
		  <!-- 黄色主题的放大镜元素 -->
		  <view class="magnifying-glass">
			<view class="glass-circle"></view>
			<view class="glass-handle"></view>
		  </view>
		  <!-- 黑色小元素 -->
		  <view class="dots">
			<view class="dot dot1"></view>
			<view class="dot dot2"></view>
			<view class="dot dot3"></view>
		  </view>
		</view>
		
		<!-- 文字提示 -->
		<view class="empty-text">
		  <view v-if="isSearchIng" class="start-text">SEARCHING...</view>
		  <view v-else-if="hasSearched">
		    <view v-if="list.length" class="start-text">READY!</view>
		    <view v-else class="start-text">NOT FOUND!</view>
		  </view>
		  <view v-else class="start-text">READY!</view>
		</view>
	  </view>
	</view>
	
	<view class="search-container" :style="{ bottom: keyboardHeight + 'px' }" v-if="!pre_keyword">
		<view class="search-box" :class="{ 'search-box-active': isKeyboardShow }">
		  <input 
			:focus="autoFocus"
			class="search-input" 
			type="text" 
			v-model="keyword" 
			:adjust-position="false"
			placeholder="搜索掘金小册、IT资源..."
			placeholder-class="placeholder"
			@focus="onFocus"
			@blur="onBlur"
		  />
		  <view class="search-icon">
			<!-- <image src="/static/search-icon.png" mode="aspectFit" class="icon-image" /> -->
		  </view>
		</view>
    </view>
  </view>
</template>

<script>
import keyboard from '../../uni_modules/uview-ui/libs/config/props/keyboard';
export default {
  data() {
    return {
      pre_keyword: '',
	  keyword:'',
      statusBarHeight: 0,
      keyboardHeight: 0,
      isKeyboardShow: false,
	  autoFocus: false ,// 初始不聚焦
	  list: [],
	  isSearchIng:false,
	  hasSearched: false
    }
  },
  onReady() {
  	this.autoFocus = true;
  },
  onLoad(options) {
    this.setStatusBarHeight()
    // 监听键盘高度变化
    uni.onKeyboardHeightChange(res => {
      if (res.height > 0) {
        this.keyboardHeight = res.height
        this.isKeyboardShow = true
      } else {
        this.keyboardHeight = 0
        this.isKeyboardShow = false
      }
    })
	if (options.keyword) {
	  this.pre_keyword = decodeURIComponent(options.keyword)
	  this.getList(this.pre_keyword)
	}
  },
  onUnload() {
    // 页面卸载时取消监听
    uni.offKeyboardHeightChange()
  },
  watch: {
	keyword(newVal, oldVal) {
	  if(newVal.length === 0) {
		this.hasSearched = false
	  }
	}
  },
  
  methods: {
    setStatusBarHeight() {
      const systemInfo = uni.getSystemInfoSync()
      this.statusBarHeight = systemInfo.statusBarHeight
    },
    onFocus() {
      // 键盘弹出时触发
      if (!this.isKeyboardShow) {
        // 如果键盘还没显示，先设置一个默认高度
        this.keyboardHeight = 300 // 默认高度，实际会根据键盘变化调整
      }
    },
    async onBlur() {
      // 键盘收起时恢复到底部
      this.keyboardHeight = 0
      this.isKeyboardShow = false
	  this.isClickSearch = true
	  if(this.keyword) {
		await this.getList(this.keyword)
		if(this.list.length) {
			this.pre_keyword = this.keyword
			this.keyword = ''
		}
	  }else {
		uni.navigateBack()  
	  }
    },
	async getList(keyword) {
		this.isSearchIng = true
		this.hasSearched = true // 标记已执行搜索
		uni.showLoading({
			title:"加载中",
		})
		this.list = await this.$api.getCategory({ keyword })
		uni.hideLoading()
		this.isSearchIng = false
	},
	formatDate(dateString) {
	  // Implement your date formatting logic here
	  return new Date(dateString).toLocaleDateString();
	},
	handleItemClick(item) {
	  uni.navigateTo({
		url: `/pages/detail/index?id=${item.id}`
	  })
	}
  }
}
</script>

<style lang="scss">
.container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #FFFFFF;
  position: relative;
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

.empty {
  padding-top: 100px;
  flex: 1;
  padding-bottom: 60px; /* 给搜索框留出空间 */
  font-size: 14px;
  color: #b9b6b6;
  text-align: center;
  letter-spacing: 2px;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  view {
	  font-size: 20px;
	  margin-bottom: 10px;
	  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  }
}


.list-container {
	flex: 1;
	padding: 10rpx 20rpx;
}

.list {
  display: flex;
  flex-direction: column;
  gap: 24rpx;
}

.list-item {
  display: flex;
  background: #fff;
  border-radius: 16rpx;
  padding-left: 10rpx;
  overflow: hidden;
  box-shadow: 0 4rpx 12rpx rgba(103, 58, 183, 0.1);
  transition: transform 0.2s ease;
}

.list-item:active {
  transform: scale(0.98);
}

.item-image {
  width: 200rpx;
  height: 180rpx;
  flex-shrink: 0;
  border-radius: 10px;
}

.item-content {
  flex: 1;
  padding: 20rpx;
  display: flex;
  flex-direction: column;
}

.item-title {
  font-size: 32rpx;
  font-weight: 600;
  color: #333;
  margin-bottom: 8rpx;
}

.item-desc {
  font-size: 26rpx;
  color: #666;
  margin-bottom: 16rpx;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.item-footer {
  display: flex;
  justify-content: space-between;
  margin-top: auto;
}

.item-views {
  font-size: 24rpx;
  color: #888;
}

.item-time {
  font-size: 24rpx;
  color: #cece6b; /* Matching theme color */
}

// :enabled
.empty {
  padding-top: 100px;
  flex: 1;
  padding-bottom: 60px;
  text-align: center;
}

.empty-container {
  animation: bounceIn 0.8s ease;
}

@keyframes bounceIn {
  0% { transform: scale(0.8); opacity: 0; }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); opacity: 1; }
}

.empty-illustration {
  position: relative;
  width: 200rpx;
  height: 200rpx;
  margin: 0 auto 40rpx;
}

/* 黄色放大镜设计 */
.magnifying-glass {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
}

.glass-circle {
  width: 120rpx;
  height: 120rpx;
  border: 8rpx solid #ffff00;
  border-radius: 50%;
  background-color: rgba(255, 255, 0, 0.1);
}

.glass-handle {
  position: absolute;
  right: -30rpx;
  bottom: -20rpx;
  width: 60rpx;
  height: 20rpx;
  background-color: #ffff00;
  transform: rotate(45deg);
  border-radius: 10rpx;
}

/* 黑色小圆点动画 */
.dots {
  position: absolute;
  width: 100%;
  height: 100%;
}

.dot {
  position: absolute;
  width: 24rpx;
  height: 24rpx;
  background-color: #000;
  border-radius: 50%;
  opacity: 0;
}

.dot1 {
  top: 20%;
  left: 30%;
  animation: float 3s infinite ease-in-out;
}

.dot2 {
  top: 60%;
  left: 20%;
  animation: float 3s infinite 0.5s ease-in-out;
}

.dot3 {
  top: 40%;
  left: 70%;
  animation: float 3s infinite 1s ease-in-out;
}

@keyframes float {
  0% { transform: translateY(0); opacity: 0; }
  50% { transform: translateY(-20rpx); opacity: 1; }
  100% { transform: translateY(0); opacity: 0; }
}

/* 文字样式 */
.empty-text {
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}

.start-text {
  font-size: 48rpx;
  font-weight: bold;
  color: #000;
  margin-bottom: 20rpx;
  text-shadow: 2rpx 2rpx 0 #ffff00;
  letter-spacing: 2rpx;
}

.hint-text {
  font-size: 32rpx;
  color: #666;
  margin-bottom: 16rpx;
  letter-spacing: 1rpx;
}

.funny-text {
  font-size: 28rpx;
  color: #888;
  margin-top: 30rpx;
}

.highlight {
  color: #ffff00;
  background-color: #000;
  padding: 4rpx 12rpx;
  border-radius: 8rpx;
  margin: 0 6rpx;
  font-weight: bold;
}

/* 搜索框容器 */
.search-container {
  position: fixed;
  width: 100%;
  padding: 20rpx 30rpx;
  bottom: 0;
  left: 0;
  background: linear-gradient(to top, #fff 70%, rgba(255,255,255,0));
  z-index: 100;
  transition: all 0.3s ease;
}

/* 搜索框主体 */
.search-box {
  width: 100%;
  height: 80rpx;
  background: #fff;
  border-radius: 40rpx;
  display: flex;
  align-items: center;
  padding: 0 30rpx;
  box-shadow: 0 4rpx 16rpx rgba(0,0,0,0.08);
  border: 2rpx solid #eee;
  transition: all 0.3s ease;
}

/* 激活状态 */
.search-box-active {
  border-color: #ffff00;
  box-shadow: 0 4rpx 20rpx rgba(255, 255, 0, 0.2);
}

/* 输入框 */
.search-input {
  flex: 1;
  height: 100%;
  font-size: 28rpx;
  color: #333;
  padding-right: 20rpx;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}

/* 占位符样式 */
.placeholder {
  color: #bbb;
  font-size: 28rpx;
}

/* 搜索图标 */
.search-icon {
  width: 60rpx;
  height: 60rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon-image {
  width: 40rpx;
  height: 40rpx;
}

/* 键盘弹出时的调整 */
@media (max-height: 600px) {
  .search-container {
    padding-bottom: 10rpx;
  }
  .search-box {
    height: 70rpx;
  }
}
</style>