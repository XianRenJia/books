<template>
	<view>
		<view :class="{'hover':pageNum==item.page_num}" v-for="(item,index) in list" style="padding-left: 30rpx;line-height: 70rpx;" @click="read(item,index)" >
			{{item.name}}
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list : [],
				pageNum : 0,	
				NumSerial : undefined,
				type : 0
			}
		},
		methods: {
			read(item,index){
				let self = this;
				this.pageNum = item.page_num; 
				uni.setStorage({
					key: 'page_' + self.NumSerial,
					data: {
						'NumSerial' : self.NumSerial,
						'ID' :  self.pageNum
					},
					complete() {
						if(self.$store.state.books_type==1){
							uni.navigateBack({})
						}else{
							uni.redirectTo({
								url: `/pages/section/section?NumSerial=${self.NumSerial}`
							})
						}
						
					}
				});
			},
			getcontent(){
				let self = this;
				self.$request.getRequst('/pageNav?NumSerial='+self.NumSerial).then(res=>{
					if(res.result==1){
						self.list = res.content.concat(self.list);
					}
				})
			}
		},
		onLoad(res) {
			var self =this;
			self.NumSerial = res.NumSerial;
			self.type = res.type
			let name = 'page_'+res.NumSerial;
			if(res.NumSerial){
				let page ='';
				self.getcontent();
				uni.getStorage({
					key: name,
					success:function(res){
						if(res.data){
						  self.pageNum = res.data.ID;
						}
					}
				})
			}else{
				//获取信息失败请返回后重新进入
			}
		},
		updated() {
			uni.createSelectorQuery().select(".hover").boundingClientRect(res=>{
				uni.pageScrollTo({
					duration:0,
					scrollTop:res.top
				})
			}).exec();
		}
	}
</script>

<style scoped>
.hover{
	color: #F0AD4E;
}
</style>
