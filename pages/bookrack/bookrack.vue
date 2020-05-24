<template>
	<view class="content">
		<view class="noBooks" v-if="noBooks==1">
			<image src="../../static/noGood.png" mode="widthFix" style="width: 100%;" ></image>
		</view>
		<view class="noBooks"  v-if="noBooks==2">
			<image src="../../static/noUser.png" mode="widthFix" style="width: 100%;" ></image>
		</view>
		<view  v-if="noBooks==0" class="booksList" :key="index" v-for="(item,index) in booksList" @longtap="longtap" @click="navigateTo(item,index)">
			<view class="booksImg">
				<image :src="item.picture"></image>
			</view>
			<view class="info">
				<view class="title">{{item.name}}</view>
				<view class="status">最新:{{item.last_page_name}}</view>
				<view class="readBooks">阅读至:{{item.page_name}}</view>
			</view>
			<checkbox class="check" :checked="item.checkbox" v-if="checkbox"></checkbox>
		</view>
		<view class="delete" v-if="checkbox">
			<text style="left: 40upx;" @click="end()">完成</text>
			<text style="color: #c00;left: 50%;transform: translateX(-50%);"  @click="deletes()">删除</text>
			<text style="right: 40upx;" @click="allCheck()">{{allChecks?'取消全选':'全选'}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello',
				img: `../../static/152b74dd6eb4c583fd8921a3f634b5dc.jpg`,
				bookimg: `../../static/152b74dd6eb4c583fd8921a3f634b5dc.jpg`,
				booksList : [],
				noBooks : 0,
				checkbox : false,
				allChecks : false
			}
		},
		onLoad() {
			
		},
		onPullDownRefresh(){
			this.booksList= [];
			this.getRequst();
		},
		onShow() {
			this.getRequst();
		},
		methods: {
			getRequst(){
				let that = this;
				this.$request.getRequst('/bookrack').then(res=>{
					that.booksList = res.content;
					that.booksList.map(item=>{ 
						item.checkbox = false;
						return item;
					})
					that.noBooks = 0
					uni.stopPullDownRefresh();
					if(!res.content[0]){
						that.noBooks = 1
					}
				}).catch(err=>{
					that.noBooks = 2
					uni.stopPullDownRefresh();
				})
			},
			navtoDetail() {
				uni.navigateTo({
					url: `/pages/detail/detail`
				})
			},
			longtap(){
				this.checkbox = true;
			},
			navigateTo(item,index){
				var that = this;
				if(this.checkbox){
					var booksList = that.booksList[index];
					booksList.checkbox = !booksList.checkbox;
					this.$set(that.booksList,index,booksList);
					return 0;
				}
				var that = this;
				uni.navigateTo({
					url: `/pages/section/section?NumSerial=${item.NumSerial}`
				})
			},
			allCheck(){
				if(this.allChecks){
					this.booksList.map(item=>{
						item.checkbox = false;
					});
				}else{
					this.booksList.map(item=>{
						item.checkbox = true;
					});
				}
				this.allChecks = !this.allChecks
			},
			deletes(){
				var that = this;
				var select = [];
				this.booksList.forEach(item=>{
					console.log(item)
					if(item.checkbox){
						select.push(item.ID);
					}
				})
				this.$request.postRequst('/selectBooks',{select : select}).then(res=>{
					uni.showToast({
						title: '删除成功',
						icon: 'none'
					})
					that.checkbox = false;
					that.booksList = [];
					that.getRequst();
				});
			},
			end(){
				this.checkbox = false;
			}
		}
	}
</script>

<style>
	.content{
		padding: 30upx;
	}
	.booksList{
		display: flex;
		font-size: 25rpx;
		padding: 15upx 0;
	}
	.booksImg{
		width: 150upx;
		height: 200upx;
		
	}
	.booksImg image{
		width: 100%;
		height: 100%;
		background-color: #ddd;
	}
	.info{
		width: 450upx;
		padding-left:20rpx ;
		color: #AAAAAA;
	}
	.info .title{
		color: #000;
		font-size: 35upx;
		line-height: 50upx;
	}
	.info .status{
		padding: 10upx 0;
	}
	.check{
		position: relative;
		top: 80upx;
		height: 60upx;
	}
	.delete{
		position: fixed;
		bottom: 110upx;
		width: 100%;
		height: 80upx;
		left: 0;
		border-top: 1rpx solid #eee;
		border-bottom: 1rpx solid #eee;
		line-height: 80upx;
	}
	.delete text{
		position: absolute;
		width: 110upx;
		text-align: center;
	}
</style>
