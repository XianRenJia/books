<template>
	<view class="content">
		<view class="account" style="border: 0;" @click="chooseImg()">
			<image :src="headimg"></image>
		</view>
		<view class="account">
			<view class="left">用户名</view>
			<view class="right">
				<input :value="name" @input="onKeyUserNameInput"/>
			</view>
		</view>
		<view class="account">
			<view class="left">手机号</view>
			<view class="right">
				<input :value="phone" disabled/>
			</view>
		</view>
		<view style="position: fixed;bottom: 0;width: 100%;">
			<button @tap="preservation()">保存修改</button>
		</view>
	</view>
</template>	

<script>
	export default {
		data() {
			return {
				headimg: ``,
				phone : '',
				name : '',
				ID : ''
			}
		},
		onShow() {
			let that = this;
			this.$request.getRequst('/userInfo').then(res=>{
				if(!res.content[0].user_picture){
					res.content[0].user_picture = '../../static/defaultAvatar.png'
				}
				that.headimg = res.content[0].user_picture;
				that.phone = res.content[0].user_account;
				that.name = res.content[0].user_name;
				that.ID = res.content[0].ID;
			});
		},
		methods:{
			chooseImg(){
				var that = this;
				uni.chooseImage({
					count: 1,
					success(res) {
						that.headimg = res.tempFilePaths[0];
					}
				})
			},
			preservation(){
				let that =this;
				uni.uploadFile({
					url : 'http://152.136.126.31/uploadImg',
					filePath : that.headimg,
					name: 'file',
					formData:{
						name : that.name,
						ID : that.ID
					},
					success:function(res){
						console.log(res);
						res.data = JSON.parse(res.data);
						if(res.data.result==1){
							uni.showToast({
								title:'修改成功',
								icon:'none',
								success() {
									setTimeout(function(){
										uni.navigateBack({
											
										})
									},1000)
								}
							})
						}
					}
				})
			},
			onKeyUserNameInput(event){
				this.name = event.detail.value
			}
		}
	}
</script>

<style>
	.content{
		font-size: 34upx;
	}
	.account{
		margin: 30upx;
		overflow: hidden;
		border-bottom: 1px solid #ddd;
		padding-bottom: 20upx;
		text-align: center;
	}
	.left{
		float: left;
		width: 25%;
		text-align: left;
	}
	.right{
		float: right;
		width: 75%;
		text-align: right;
	}
	.account image{
		width: 200upx;
		height: 200upx;
	}
	button{
		background-color: #DD524D;
		color: #fff;
		font-size: 32upx;
		border-radius: 0;
	}
</style>
