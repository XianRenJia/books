<template>
	<view class="content">
		<!-- l-head -->
		<view class="l-head">
			<image class="l-icon-more" src="../../static/return.png" @click="navigateBack()">
			<view class="l-search"> 
				<image class="l-icon-search" src="../../static/l-icon-search.png" mode=""></image>
				<input focus @input="search_input" type="text" class="l-search-input" @confirm="confirm" value="" placeholder="搜索作者、书名" placeholder-class="l-holder" />
			</view>
			<text style="width:60rpx;padding-right: 20rpx;font-size: 30rpx;"  @click="search_requst()">搜索</text>
		</view>
		<view class="nosearch" v-if="noSearch">
			<image src="../../static/noSearch.png" mode="widthFix" style="width: 100%;"></image>
		</view>
		<view class="l-view" v-if="!noSearch">
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
	</view>
	
</template>

<script>
	export default {
		data() {
			return {
				search_val : '',
				newBooks : [],
				noSearch : false
			}
		},
		onLoad() {
			
		},
		
		methods: {
			navigateBack(){
				uni.navigateBack();
			},
			search_input(val){
				this.search_val =val.detail.value;
			},
			search_requst(){
				let that = this;
				if(this.search_val){
					this.$request.postRequst('/search',{val : this.search_val}).then(res=>{
						that.newBooks = res.content;
						if(!res.content[0]){
							that.noSearch = true;
						}
					})
				}
			},
			navtoDetail(item) {
				uni.navigateTo({
					url: `/pages/detail/detail?NumSerial=${item.NumSerial}`
				})
			},
			confirm(){
				this.search_requst();
			}
		}
	}
</script>

<style scoped>
	.l-icon-more{
		height: 40rpx;
		width: 22rpx;
		margin-right:22rpx;
		margin-left:  20upx;
	}
	.l-head{
		padding: 0;
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
</style>
