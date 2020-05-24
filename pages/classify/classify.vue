<template>
	<view class="content">
		<view class="nav">
			<view class="type" :class="get_sex==0?'hover':''"  @click="clicks(0)">男生</view>
			<view class="type" :class="get_sex==1?'hover':''" @click="clicks(1)">女生</view>
		</view>
		<view class="booksList">
			<view style="margin-bottom: 80upx;overflow: hidden;">
				<view class="oneBookstype" v-for="item in booksList" @click="jumpIdea(item.ID)">
					<image :src="item.picture"></image>
					<text>{{item.name}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return {
				booksList : [],
				get_sex : 0
			}
		},
		onLoad() {
			this.request();
		},
		methods : {
			request(){
				let that = this;
				this.$request.getRequst('/type?sex='+this.get_sex).then(res=>{
					that.booksList = res.data;
				})
			},
			jumpIdea(ID){
				uni.navigateTo({
					url: '../idea/idea?ID=' + ID
				})
			},
			clicks(sex){
				this.get_sex = sex;
				this.request();
			}
		}
	}
</script>

<style>
	.nav{
	  width: 20%;
	  height: 100%;
	  position: fixed;
	  background: #fafafa;
	  left: 0;
	  font-size: 30upx;
	  /* top: 80upx; */
	}
	.nav .type{
		text-align: center;
		line-height: 60upx;
		padding: 20upx 0;
	}
	.type.hover{
		color: #CC0000;
	}
	.booksList{
		width: 80%;
		height: 100%;
		position: fixed;
		right: 0;
		padding: 20upx;
		box-sizing: border-box;
		overflow: auto;
		/* top: 60upx; */
	}
	.oneBookstype{
		width: 50%;
		display: flex;
		float: left;
		margin: 20upx 0;
	}
	.oneBookstype image{
		width: 80upx;
		height: 110upx;
		background-color: #ddd;
	}
	.oneBookstype text{
		line-height: 110upx;
		padding-left: 20rpx;
	}
</style>
