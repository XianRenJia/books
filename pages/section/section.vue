<template>
	<view id="content" class="content" >
		<view class="bakcground"></view>
		<view class="l-head" :class="{'l-head-dark':dark}">
			<!-- {{list[list.length-1].page_name}} -->
			{{title}}
		</view>
		<!-- //文本的主要内容 -->
		<view class="scrollbar"  @scroll.native="appScroll" :class="{'content-dark':dark}">
			<view class="scrollbarCt" >
				<view class="l-placeholder"></view>
				<view class="l-body" @click="catalogue()">
					<view v-for='item in list'>
						<view style="padding:0rpx 32rpx 60rpx;">
							<h3 v-html='item.page_name'></h3>
							<view class="font_content" v-html='item.page_content'></view>
						</view>
					</view>
					<text class="loading-text">
						{{loadingType === 0 ? contentText.contentdown:(loadingType === 1 ? contentText.contentrefresh : contentText.contentnomore)}}
					</text>
					<view class="l-placeholder"></view>
				</view>
			</view>
		</view>
		<view class="header_out" v-show="showSet" :class="{'header_out_dark':dark}">
			<image class="l-icon-more" src="../../static/return.png" @click="navigateBack()">
		</view>
		<view class="foot_operation" :class="{'foot_operation_dark':dark}" v-show="showSet">
			 <view>
				 <view class="foot_center" @click="navtoComment">
					 <image src="../../static/icon/catalog.png"></image>
					 <view>目录</view>
				 </view>
			 </view>
			 <view>
				 <view class="foot_center" @click="clickDark()">
					 <image src="../../static/icon/nightMode.png"></image>
					 <view>夜间</view>
				 </view>
			 </view>
			 <view>
				 <view class="foot_center" @click="set()">
					 <image src="../../static/icon/set.png"></image>
					 <view>设置</view>
				 </view>
			 </view>
			 <view>
				 <view class="foot_center" @click="navto_books()">
					 <image src="../../static/icon/synopsis.png"></image>
					 <view>简介</view>
				 </view>
			 </view>
		</view>
		<view class="set_view" v-if="false">
			<view>
				<text>间距</text>
				<text>
					<view>
						
					</view>
				</text>
			</view>
		</view>
	</view>
</template>

<script>
	var self;
	export default {
		data() {
			return {
				showSet : false,
				list:[],
				dark : false,
				NumSerial:undefined,
				contentText: {			 //显示上拉加载
					contentdown: "上拉显示更多",
					contentrefresh: "正在加载...",
					contentnomore: "没有更多数据了"
				},
				loadingType: 0, //加载更多状态
				nextID : undefined,
				page : undefined,
				title : ''
			}
		},
		onLoad(res){
			self = this;
			if(res.NumSerial){
				self.NumSerial = res.NumSerial;
			} 
		},
		onShow() {
			
			self.list = [];
			self.page = uni.getStorageSync('page_'+self.NumSerial).ID;
			if(self.page){
				self.getRequst(self.page);
			}else{
				
				this.$request.getRequst('/read_query?NumSerial='+self.NumSerial).then(res=>{
					self.getRequst(res.content[0].page_id);
				}).catch(err=>{
					self.getRequst(self.page);
				});
			}
		},
		onReachBottom(){
			this.getRequst(this.nextID);
		},
		methods:{
			appScroll(){
				//获取元素顶部
				let scrollbar = this.$el.querySelector('.scrollbar');
				let scrollbarCt = this.$el.querySelector('.scrollbarCt');
				let scrollTop = scrollbar.scrollTop;
				if(scrollbarCt.offsetHeight==scrollbar.offsetHeight+scrollTop){
					this.getRequst(this.nextID);
				}
				if(this.showSet){
					this.retrues();
				}
			},
			getRequst(page){
				this.$request.getRequst('/read?page='+page+'&NumSerial='+self.NumSerial).then(res=>{
					if(res.result==1){
						let pageData = {
							NumSerial : self.NumSerial,
							ID : page
						}
						uni.setStorage({
							key:'page_'+self.NumSerial,
							data: pageData
						});
						self.list.push(res.content.read_info);
						self.title = res.content.read_info.page_name;
						self.NumSerial = res.content.read_info.NumSerial;
						self.nextID = res.content.read_info.nextID;
					}
				});
				let data = {
					page : page,
					NumSerial : self.NumSerial
				}
				this.$request.postRequst('/read_record',data).then(res=>{
				})
			},
			catalogue(){
				this.showSet = !this.showSet;
			},
			retrues(){
				this.showSet = false;
			},
			navigateBack(){
				uni.navigateBack();
			},
			clickDark(){
				this.dark = !this.dark;
			},
			navtoComment() {
				this.$store.state.books_type = 1;
				uni.navigateTo({
					url: `/pages/pageNav/pageNav?NumSerial=${self.NumSerial}`
				})
			},
			navto_books(){
				uni.navigateTo({
					url: `/pages/detail/detail?NumSerial=${self.NumSerial}`
				})
			},
			set(){
				
			}
		},
		destroyed() {
			var self = this;
		  document.removeEventListener('scroll', self.appScroll)
		}
	}
</script>

<style scoped>
	.content-dark{
		background: #000000;
		color:#999;
	}
	.foot_operation{
		position: fixed;
		bottom: 0;
		height: 120rpx;
		width: 100%;
		z-index: 101;
		overflow: hidden;
		background-color:#fff;
		box-shadow:0rpx -5rpx 20rpx #C0C0C0;
		animation: myfirst 0.5s;
		-webkit-animation: myfirst 0.5s; /* Safari 与 Chrome */
		color: #999;
	}
	.foot_operation_dark{
		background-color: #000;
	}
	.foot_operation>view{
		float: left;
		width: 25%;
		height: 120rpx;
		text-align: center;
		position: relative;
	}
	.foot_operation image{
		width:60rpx;
		height: 60rpx;
		/* background-color: #ddd; */
	}
	.foot_operation>view .foot_center{
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%,-50%);
	}
	.l-placeholder{
		height: 60rpx;
	}
	.l-head{
		height: 60rpx;
		bottom: 0;
		position: fixed;
		background-color: #fff;
		width: 100%;
		z-index: 100;
		color: #999;
	}
	.l-head-dark{
		background-color: #000;
	}
	.l-body {
		padding: 0;
		font-size: 32rpx;
		/* color: #D1D1D6; */
		line-height: 50rpx;
		
	}
	.l-body>view{
		/* padding: 32rpx; */
	}
	h3 {
		/* font-size: 50rpx; */
		margin-bottom: 20rpx;
		font-weight: normal;
	}
	.read-section p{
		 text-indent:32px;
		 padding-bottom: 30rpx;
	}
	.header_out{
		position: fixed;
		top: 0;
		width: 100%;
		height:120rpx;
		background-color: #fff;
		z-index: 101;
		line-height: 70rpx;
		box-shadow: 0rpx 5rpx 10rpx #C0C0C0;
		overflow: hidden;
		animation: mysecomed 0.5s;
		-webkit-animation: mysecomed 0.5s; /* Safari 与 Chrome */
	}
	.header_out_dark{
		background-color: #000;
	}
	.header_out image{
		width: 22rpx;
		height: 40rpx;
		position: absolute;
		top: 60upx;
		left: 2%;
		/* transform: translateY(-50%); */
	}
	@keyframes myfirst
	{
	    from {height: 0;}
	    to {height: 120rpx;}
	}
	 
	@-webkit-keyframes myfirst /* Safari 与 Chrome */
	{
	    from {height: 0;}
	    to {height: 120rpx;}
	}
	@keyframes myfirst1
	{
	    from {height: 120rpx;}
	    to {height: 0rpx;}
	}
	 
	@-webkit-keyframes myfirst1 /* Safari 与 Chrome */
	{
	    from {height: 120rpx;}
	    to {height: 0rpx;}
	}
	@keyframes mysecomed
	{
	    from {height: 0;}
	    to {height: 120rpx;}
	}
	 
	@-webkit-keyframes mysecomed /* Safari 与 Chrome */
	{
	    from {height: 0;}
	    to {height: 120rpx;}
	}
	@keyframes mysecomed1
	{
	    from {height: 70rpx;}
	    to {height: 0rpx;}
	}
	 
	@-webkit-keyframes mysecomed1 /* Safari 与 Chrome */
	{
	    from {height: 70rpx;}
	    to {height: 0rpx;}
	}
	.loading-text{
		width: 100%;
		height: 50upx;
		line-height: 50upx;
		font-size: 30upx;
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		color: #999;
	}
	.scrollbar{
		
	}
	::-webkit-scrollbar{
		display: none;
	}
	.font_content >>> p{
		text-indent: 60rpx;
		padding: 10rpx 0;
	} 
	.set_view{
		position: fixed;
		bottom: 0;
		width: 100%;
		left: 0;
		padding: 30upx;
		background-color: #fff7f6;
		z-index: 100;
	}
</style>
