<template>
	<view class="content">
		<!-- l-head -->
		<view style="height: 60upx;width: 100%;"></view>
		<view class="l-head">
			<view class="l-logo"><image src="../../static/bookslogo.png"></image></view>
			<view class="l-search" @tap="search_navto()">
				<image class="l-icon-search" src="../../static/l-icon-search.png" mode=""></image>
				<input type="text" class="l-search-input" disabled="" value="" placeholder="搜索作者、书名" placeholder-class="l-holder" />
			</view>
		</view>

		<view class="l-body">

			<!-- l-swiper -->

			<swiper class="l-swiper" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="500" indicator-color="var(--c-bg-2)"
			 indicator-active-color="#41bdb2" circular @tap="$toast(`轮播图`)">
				<swiper-item v-for="item in img">
					<view class="l-swiper-item">
						<image class="l-carousel-img" :src="item.img" mode="aspectFill"></image>
					</view>
				</swiper-item>
			</swiper>

			<view class="l-body-tab">
				<view class="l-tab-item" @tap="crunchies()">
					<image class="l-tab-item-img l-tab-item-img-1" src="../../static/book-mall/l-icon-book-mall-1.png" mode=""></image>
					<view class="l-tab-item-value">
						榜单
					</view>
				</view>
				<view class="l-tab-item" @tap="new_book()">
					<image class="l-tab-item-img l-tab-item-img-2" src="../../static/book-mall/l-icon-book-mall-2.png" mode=""></image>
					<view class="l-tab-item-value">
						新书
					</view>
				</view>
				<view class="l-tab-item" @tap="boutique()">
					<image class="l-tab-item-img l-tab-item-img-3" src="../../static/book-mall/l-icon-book-mall-3.png" mode=""></image>
					<view class="l-tab-item-value">
						精品
					</view>
				</view>
				<view class="l-tab-item" @tap="navtoClssify">
					<image class="l-tab-item-img l-tab-item-img-4" src="../../static/book-mall/l-icon-book-mall-4.png" mode=""></image>
					<view class="l-tab-item-value">
						分类
					</view>
				</view>
			</view>

		</view>
		<view class="l-view">
			<view class="l-h3">
				<text class="l-h3-title">新书抢先</text>
				<view class="<l-h3-more></l-h3-more>" @tap="new_book()">查看更多<image class="l-icon-more" src="../../static/l-icon-more.png"
					 mode="widthFix"></image>
				</view>
			</view>
			<view class="l-dl-view" v-for="item in newBooks" @tap="navtoDetail(item)">
				<view class="l-dl-content">
					<image class="l-dt-view" :src="item.picture" mode="aspectFill"></image>
					<view class="l-dd-view">
						<view class="l-dd-view-content">
							<view class="l-dd-view-title">
								<view class="l-dd-view-ta">
									{{item.name}}
								</view>
							</view>
						</view>
						<view class="l-dd-view-footer">
							{{item.synopsis}}
						</view>
						<view class="l-dd-view-tb">
							{{item.author}}
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="l-view" v-for="items in typeBooks">
			<view class="l-h3">
				<text class="l-h3-title">{{items.name}}</text>
				<view class="<l-h3-more></l-h3-more>" @tap="type_navto(items.ID)">查看更多<image class="l-icon-more" src="../../static/l-icon-more.png"
					 mode="widthFix"></image>
				</view>
			</view>
			<view class="l-dl-view" v-for="item in items.content" @tap="navtoDetail(item)">
				<view class="l-dl-content">
					<image class="l-dt-view" :src="item.picture" mode="aspectFill"></image>
					<view class="l-dd-view">
						<view class="l-dd-view-content">
							<view class="l-dd-view-title">
								<view class="l-dd-view-ta">
									{{item.name}}
								</view>
							</view>
						</view>
						<view class="l-dd-view-footer">
							{{item.synopsis}}
						</view>
						<view class="l-dd-view-tb">
							{{item.author}}
						</view>
					</view>
				</view>
			</view>
		</view>	
		<view class="l-view l-view-not-border">
			<view class="l-h3">
				<text class="l-h3-title">猜你喜欢</text>
				<!-- <view class="l-h3-more" @tap="navtoClssify">全部分类<image class="l-icon-more" src="../../static/l-icon-more.png" mode="widthFix"></image>
				</view> -->
			</view>
			<view class="l-dl-view" v-for="item in guess"  @tap="navtoDetail(item)">
				<view class="l-dl-content">
					<image class="l-dt-view" :src="item.picture" mode="aspectFill"></image>
					<view class="l-dd-view">
						<view class="l-dd-view-content">
							<view class="l-dd-view-title">
								<view class="l-dd-view-ta">
									{{item.name}}
								</view>
								<view class="l-dd-grade">{{item.grade}}<span>分</span></view>
							</view>
						</view>
						<view class="l-dd-view-footer">
							{{item.synopsis}}
						</view>
						<view class="l-dd-view-tb">
							{{item.author}}
						</view>
					</view>
				</view>
			</view>
			<view class="scroll">{{scrool_view==0?'下拉加载':'没有跟多数据了'}}</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello',
				img : [{
					img : `http://yg-hh.cn/web/poster/斗罗大陆海报.jpg`,
					url : ``
				},{
					img : `http://yg-hh.cn/web/poster/斗罗大陆海报.jpg`,
					url : ``
				}],
				bookimg: `../../static/152b74dd6eb4c583fd8921a3f634b5dc.jpg`,
				cover: `../../static/152b74dd6eb4c583fd8921a3f634b5dc.jpg`,
				list : [
					{
						NumSerial: 100007,
						name : '三体死神用神',
						synopsis : '士大夫十大尴尬收到反馈速度发货及时发到',
						url : '/static/152b74dd6eb4c583fd8921a3f634b5dc.jpg',
						author : '刘鑫吃'
					}
				],
				newBooks:[],
				guess : [],
				typeBooks : [],
				scrool_view : 1,
				page : 1,
			}
		},
		onLoad() {
			let that = this;
			this.$request.getRequst('/header').then(res=>{
				that.newBooks = res.content.newBooks;
				that.guess = res.content.guess;
				that.typeBooks = res.content.typeBooks;
			})
		},
		onReachBottom(){
			if(this.scrool_view == 1){
				return 0;
			}
			this.page = this.page+1;
			this.requestGuess();
		},
		methods: {
			requestGuess(){
				let that = this;
				this.$request.getRequst('/guess?page='+this.page).then(res=>{
					if(res.content.length<10){
						that.scrool_view = 1;
					}else{
						that.scrool_view = 0;
					}
					that.guess = that.guess.concat(res.content);
				});
			},
			navto() {
				uni.navigateTo({
					url: `/pages/book-mall/book-mall`
				})
			},
			navtoClssify() {
				uni.switchTab({
					url: `/pages/classify/classify`
				})
			},
			navtoDetail(item) {
				uni.navigateTo({
					url: `/pages/detail/detail?NumSerial=${item.NumSerial}`
				})
			},
			type_navto(ID){
				uni.navigateTo({
					url: `/pages/idea/idea?ID=${ID}`
				})
			},
			search_navto(){
				uni.navigateTo({
					url: `/pages/search/search`
				})
			},
			boutique(){
				uni.navigateTo({
					url: `/pages/boutique/boutique`
				})
			},
			crunchies(){
				uni.navigateTo({
					url: `/pages/crunchies/crunchies`
				})
			},
			new_book(){
				uni.navigateTo({
					url: `/pages/newBooks/newBooks`
				})
			}
		}
	}
</script>

<style scoped>
	/* l-body-tab */
	.content{
		/* padding-top: 50rpx; */
	}
	.l-body-tab {
		display: flex;
		margin: 20rpx 0 0;
		align-items: center;
		white-space: nowrap;
		justify-content: space-around;
	}

	.l-tab-item-img {
		margin-bottom: 10rpx;
	}

	.l-tab-item-img-3,
	.l-tab-item-img-1 {
		width: 60rpx;
		height: 58rpx;
	}

	.l-tab-item-img-2 {
		width: 52rpx;
		height: 56rpx;
	}

	.l-tab-item-img-4 {
		width: 54rpx;
		height: 54rpx;
	}

	.l-tab-item-value {
		text-align: center;
		font-size: 26rpx;
		color: var(--c-txt-2);
	}

	/* l-view */

	.l-view {
		padding: 30rpx var(--pad-lr);
		/* border-bottom: 1rpx solid #222337; */
	}

	.l-view-not-border {
		padding-bottom: 0;
		border-bottom: none;
	}

	.l-h3 {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.l-h3-title {
		font: normal var(--f-size-4) normal;
	}

	.l-h3-more {
		display: flex;
		align-items: center;
		color: var(--c-bg-2);
	}

	.l-icon-refresh {
		width: 33rpx;
		height: 25rpx;
		margin-left: 12rpx;
	}

	.l-icon-dot {
		width: 30rpx;
		margin-top: 10rpx;
	}

	.l-dl {
		margin-top: 32rpx;
		display: flex;
		width: 100%;
		height: 224rpx;
	}

	.l-dt {
		width: 160rpx;
		height: 100%;
		border-radius: 10rpx;
		margin-right: 24rpx;
	}

	.l-dd {
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.l-dd-title {
		color: var(--c-txt-3);
		font: var(--f-size-3) normal;
	}

	.l-dd-content,
	.l-dd-footer {
		color: var(--c-txt-2);
		font: var(--f-size-2)/var(--f-size-4) normal;
	}

	.l-dd-view-footer,
	.l-dd-content {
		width: 100%;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.l-dd-view-footer {
		color: #878787;
		height: 76rpx;
		font-size: var(--f-size-1);
		-webkit-line-clamp: 2;
		line-height: 38rpx;
		overflow: hidden;
	}

	.l-dd-content {
		-webkit-line-clamp: 3;
	}

	.l-dd-footer {
		display: flex;
		align-items: center;
	}

	.l-dd-img {
		width: 40rpx;
		height: 40rpx;
		border-radius: 50%;
		margin-right: 6rpx;
	}


	/* l-dl-view */

	.l-dl-view {
		position: relative;
		/* height: 282rpx; */
		margin-top: 32rpx;
	}

	.l-dl-bg {
		height: 250rpx;
		/* background: rgba(34, 35, 55, 1); */
		/* box-shadow: 0px 30px 60px 0px rgba(17, 21, 26, 0.1); */
		border-radius: 20rpx;
		position: absolute;
		top: 32rpx;
		left: 0;
		width: 100%;
	}

	.l-dl-content {
		position: relative;
		z-index: 1;
		display: flex;
		/* padding: 0 48rpx; */
	}

	.l-dt-view {
		width: 134rpx;
		height: 200rpx;
		/* border-radius: 10rpx; */
		margin-right: 30rpx;
	}

	.l-dd-view {
		width: calc(100% - 150rpx);
		/* padding: 62rpx 0 14rpx;
		display: flex; */
		flex-direction: column;
		justify-content: space-between;
	}

	.l-dd-view-content {
		display: flex;
		justify-content: space-between;
		padding-bottom:20rpx;
		position: relative;
	}

	.l-dd-view-title {
		width: calc(100% - 62rpx);
		/* border-bottom: 1rpx solid #5D637C; */
	}

	.l-dd-view-ta,
	.l-dd-view-tb {
		width: 100%;
		overflow: hidden;
		white-space: normal;
		text-overflow: ellipsis;
		letter-spacing: 4rpx;
		font-weight: normal;
	}

	.l-dd-view-ta {
		font: bold var(--f-size-3) normal;
	}

	.l-dd-view-tb {
		color: #878787;
		padding: 14rpx 0 25rpx;
		font-size: var(--f-size-1);
	}
	.l-dd-grade{
		position: absolute;
		right: 10rpx;
		top: -3rpx;
		font-size: 34rpx;
		font-weight: bold;
		color: #c00;
	}
	.l-dd-grade span{
		font-weight: normal;
		font-size: 26rpx;
	}
	/* l-classify */

	/* l-logo */
	.l-logo{
		width: 100rpx;
		height: 50rpx;
		font-size: 35rpx;
		letter-spacing: 2rpx;
		padding-right: 20rpx;
	}
	.l-logo image{
		width: 100%;
		height: 100%;
	}
</style>
