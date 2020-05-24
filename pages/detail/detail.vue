<template>
	<view class="content">
		<view class="l-body">
			<view class="l-dl">
				<image class="l-dt" :src="list.recomment_all.picture" mode="aspectFill"></image>
				<view class="l-dd">
					<view class="l-dd-title">
						{{list.recomment_all.title}}
					</view>
					<view class="l-dd-sub">
						作者：{{list.recomment_all.author}}
					</view>
					<view class="l-dd-sub">
						小说类型：{{list.recomment_all.type}}
					</view>
					<view class="l-dd-footer">
						<image v-for="(s,i) in list.recomment_all.grade" :key="i" class="l-icon-star" lazy-load src="../../static/l-icon-star.png"></image>
						<text class="l-dd-grade">5.0</text>
					</view>
				</view>
			</view>
			<view class="l-list">
				<view class="l-list-view">
					<!-- 与三体文明的战争使人类第一次看到了宇宙黑暗的真相，地球文明像一个恐惧的孩子，熄灭了寻友的篝火，在暗夜中发抖。自以为历经沧桑，其实刚刚蹒跚学步；自以为悟出了生存竞争的秘密，其实还远没有竞争的资格。 -->
					{{list.recomment_all.synopsis}}
				</view>
			</view>

			<view class="l-list">
				<view class="l-h3" @tap="navtoComment">
					<text class="l-h3-title">目录</text>
					<view class="l-h3-more" >
						<span style="font-weight: bold;">连载中·</span>共{{list.recomment_all.page_all}}章<image class="l-icon-more" src="../../static/l-icon-more.png" mode="widthFix"></image>
					</view>
				</view>
			</view>
			<view class="readProbation">
				 <view class="readTitle">
					 正文试读
				 </view>
				 <!-- <view class="readAbout">
					 相关书籍
				 </view> -->
			</view>
			<view class="readContent">
				<view class="readfirstPage">
					<h3 v-html='list.onePage.name' style="line-height: 80rpx;font-weight: normal;"></h3>
					<view v-html='list.onePage.content' class="proofs" style="line-height: 50rpx;padding-bottom: 118rpx;"></view>
				</view>
				<view class="readAbout"></view>
			</view>
		</view>

		<view class="l-body-fixed">
			<view class="l-handle-btn l-look-btn" @click="collection" v-if="!collections">
				收藏
			</view>
			<view class="l-handle-btn l-look-btn" style="color: #999;" v-if="collections">
				已收藏
			</view>
			<view class="l-handle-btn l-buy-btn" @click="navtoSection">
				阅读
			</view>
		</view>
	</view>
</template>

<script>
	var self;
	export default {
		data() {
			return {
				bookimg: `../../static/152b74dd6eb4c583fd8921a3f634b5dc.jpg`,
				isShare: false,
				list:null,
				NumSerial : undefined,
				options :[],
				collections : false
			}
		},
		onLoad(res) {
			self = this;
			self.NumSerial = res.NumSerial;
			if(res.NumSerial){
				this.$request.getRequst('/books?NumSerial='+res.NumSerial).then(res=>{
					self.list = res.content;
					self.collections = !!res.content.recomment_all.collections
				}).catch(err=>{
					uni.showToast({
						title: err.data.msg,
						icon: 'none',
						success() {
							uni.navigateBack({
								delta: 1
							})
						}
					})
				})
			}else{
				//显示没有图书请重新进入
			}
		},
		methods: {
			navtoComment() {
				this.$store.state.books_type = 0;
				uni.navigateTo({
					url: `/pages/pageNav/pageNav?NumSerial=${self.NumSerial}`
				})
			},
			navtoSection() {
				var self = this;
				uni.navigateTo({
					url: `/pages/section/section?NumSerial=${self.NumSerial}`
				})
			},
			share(s) {
				if (s.title === `分享`) {
					this.isShare = !this.isShare
				} else {
					uni.showToast({
						title: `您点了` + s.title,
						icon: 'none'
					})
				}
			},
			collection(){
				let data = uni.getStorageSync('userInfo');
				if(!data){
					uni.showModal({
						title: '提示',
						content:'您还未登录，是否需要去登陆?',
						success(res) {
							if(res.confirm){
								uni.navigateTo({
									url: '/pages/login/login'
								})
							}
						}
					})
				}else{
					let page_info= uni.getStorageSync('page_'+this.NumSerial);
					console.log(page_info);
					let data = {
						NumSerial : this.NumSerial
					};
					if(page_info){
						data.page_id = page_info.ID
					}
					this.$request.postRequst('/books/collection',data).then(res=>{
						console.log(res);
						self.collections = true;
						wx.showToast({
							title: '收藏成功'
						});
					}).catch(err=>{
						wx.showToast({
							title: '添加收藏失败'
						})
					});
				}
			}
		}
	}
</script>

<style>
	.content {
		/* padding-bottom: 108rpx; */
		border-top: 1rpx solid #ddd;
	}

	.l-body-fixed {
		position: fixed;
		bottom: 0;
		left: 0;
		height: 98rpx;
		display: flex;
		width: 100%;
		align-items: center;
		white-space: nowrap;
		background-color: #fff;
		justify-content: space-between;
		box-shadow:0rpx -5rpx 20rpx #C0C0C0;
	}

	.l-look-btn {
		width: 50%;
		background-color: #fff;
	}

	.l-buy-btn {
		width: 50%;
		background-color: #F0AD4E;
		color: #fff;
	}

	.l-handle-btn {
		font-size: 32rpx;
		text-align: center;
		height: 100%;
		line-height: 98rpx;
		letter-spacing: 2rpx;
		
	}

	.l-dl {
		margin-top: 32rpx;
		display: flex;
		width: 100%;
		height: 240rpx;
	}

	.l-dt {
		width: 180rpx;
		height: 100%;
		border-radius: 6rpx;
		margin-right: 24rpx;
	}

	.l-dd {
		flex: 1;
		display: flex;
		padding-bottom: 12rpx;
		flex-direction: column;
		justify-content: space-between;
	}

	.l-dd-title {
		font: bold var(--f-size-5) normal;
		line-height: 80rpx;
	}

	.l-dd-sub {
		color: var(--c-txt-2);
		font: var(--f-size-2)/var(--f-size-4) normal;
		line-height: 50rpx;
	}

	.l-dd-content {
		width: 100%;
		color: #868DAB;
		font: 26rpx normal;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 3;
		overflow: hidden;
	}

	.l-dd-footer {
		display: flex;
		align-items: center;
	}

	.l-dd-view-footer {
		width: 100%;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		overflow: hidden;
		-webkit-line-clamp: 2;
	}

	.l-dd-img {
		width: 40rpx;
		height: 40rpx;
		border-radius: 50%;
		margin-right: 6rpx;
	}

	.l-icon-star {
		width: 30rpx;
		height: 28rpx;
		margin-right: 4rpx;
	}

	.l-dd-grade {
		color: #F9174D;
		margin-left: 28rpx;
		font-size: var(--f-size-5);
	}

	.l-icon-share {
		margin-right: 18rpx;
	}

	.l-icon-share-1 {
		width: 29rpx;
		height: 28rpx;
	}

	.l-icon-share-2 {
		width: 25rpx;
		height: 27rpx;
	}

	.l-icon-share-3 {
		width: 27rpx;
		height: 22rpx;
	}

	.l-icon-share-4 {
		width: 30rpx;
		height: 24rpx;
	}

	.l-body-tab,
	.l-body-select {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.l-body-tab {
		padding: 40rpx 0 12rpx;
	}

	.l-list {
		padding-top: 30rpx;
	}

	.l-h3 {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.l-h3-title {
		font: bold var(--f-size-4) normal;
	}

	.l-h3-more {
		display: flex;
		align-items: center;
		color: var(--c-bg-2);
	}

	/* list */

	.l-list-view {
		padding-top: 0rpx;
		color: var(--c-bg-2);
	}

	.l-icon-like,
	.l-icon-star-blank {
		width: 22rpx;
		height: 20rpx;
		margin-right: 4rpx;
	}

	.l-icon-like {
		margin-right: 12rpx;
	}

	.l-list-content {
		background-color: rgba(245, 247, 249, 0.2);
		border-radius: 16rpx;
		padding: 35rpx 32rpx;
		margin-top: 32rpx;
	}

	.l-list-c-foot-l-name {
		margin-right: 20rpx;
	}

	.l-list-c-head {
		font-size: var(--f-size-3);
		padding-bottom: 25rpx;
	}

	.l-list-c-body {
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
		color: var(--c-txt-2);
		font-size: var(--f-size-1);
		margin-bottom: 35rpx;
	}

	.l-list-c-foot {
		color: var(--c-txt-2);
		font-size: var(--f-size-1);
		display: flex;
		align-items: center;
		justify-content: space-between;
	}


	/* share */

	.l-share {
		position: fixed;
		bottom: 0;
		left: 0;
		width: calc(100% - var(--pad-lr) - var(--pad-lr));
		padding: 32rpx var(--pad-lr);
		z-index: 999;
		background-color: #080932;
	}

	.l-icon-share-list {
		width: 130rpx;
		height: 130rpx;
	}

	.l-share-img {
		display: flex;
		align-items: center;
		justify-content: space-around;
	}

	.l-close {
		text-align: right;
		margin-bottom: 27rpx;
	}

	.l-share-btn {
		padding: 56rpx 70rpx 0;
	}
	.l-share-botton {
		border-radius: 40rpx;
	}
	.readProbation{
		overflow: hidden;
		padding-top:30rpx;
		font-size: 32rpx;
	}
	.readProbation .readTitle{
		float: left;
		margin-right: 40rpx;
		color: #000;
		font-weight: bold;
	}
	.readProbation .readAbout{
		float: left;
		color: #999;
	}
	.proofs >>> p{
		padding: 10rpx 0;
		text-indent: 50rpx;
	}
</style>
