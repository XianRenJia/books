<template>
	<view class="content">
		<view class="conditions">
			<scroll-view  class="type" scroll-x="true" >
				<text :class="{'hover':item.ID==conditions_click.type.ID}" v-for="item in conditions.all_type" @click="type_click(item,1)">{{item.name}}</text>
			</scroll-view>
			<scroll-view  class="type" scroll-x="true" >
				<text :class="{'hover':item.ID==conditions_click.label.ID}" v-for="item in conditions.all_label" @click="type_click(item,2)">{{item.name}}</text>
			</scroll-view>
			<scroll-view  class="type" scroll-x="true">
				<text :class="{'hover':item.ID==conditions_click.font_number.ID}" v-for="item in conditions.all_font_number" @click="type_click(item,3)">{{item.name}}</text>
			</scroll-view>
			<!-- <scroll-view  class="type" scroll-x="true">
				<text v-for="item in 20">全部</text>
			</scroll-view> -->
		</view>
		<view class="booksList">
			<view class="booksOne"  v-for="item in booksList" @click="navtoDetail(item)">
				<view class="booksImg">
					<image :src="item.picture"></image>
				</view>
				<view class="booksInfo">
					<view class="title">{{item.name}}</view>
					<view class="synopsis">
						{{item.synopsis}}
					</view>
					<view class="author_type">
						<view class="author">{{item.author}}</view>
						<view class="type">
							<text>完结</text>
							<text>{{item.navtype_name}}</text>
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
		data(){
			return {
				booksList : [],
				ID  : '',
				scrool_view : 0,
				conditions :{
					all_type : [],
					all_label :[],
					all_font_number : [{
						ID : -1,
						name : '全部'
					},{
						ID : 0,
						name : '30万字以下'
					},{
						ID : 1,
						name : '30万-50万字'
					},{
						ID : 2,
						name : '50万-100万字'
					},{
						ID : 3,
						name : '100万-200万字'
					},{
						ID : 4,
						name : '200万字以上'
					}]
				},
				conditions_click : {
					type :{
						ID : -1,
						name : '全部分类'
					},
					label : {
						ID : -1,
						name : '全部标签'
					},
					font_number : {
						ID : -1,
						name : '全部'
					}
				},
				page_num : 1
			}
		},
		onLoad(res) { 
			let that = this;
			console.log(res);
			this.ID = res.ID;
			this.$request.getRequst('/type/info?ID='+this.ID).then(res=>{
				uni.setNavigationBarTitle({
					title:res.data.name
				})
				that.conditions.all_type = res.data.all_type; 
				that.conditions.all_label = res.data.all_label;
			})
			this.booksList = [];
			this.requestBooks();
		},
		onReachBottom(){
			if(this.scrool_view == 1){
				return 0;
			}
			this.page_num = this.page_num+1;
			this.requestBooks();
		},
		methods:{
			//获取书籍
			requestBooks(){
				var that = this;
				let data = {
					ID : this.ID,
					conditions : this.conditions_click,
					page : this.page_num
				}
				this.$request.postRequst('/type/details',data).then(res=>{
					if(res.data.booksList[0]){
						if(res.data.booksList[0].NumSerial){
							if(res.data.booksList.length<10){
								that.scrool_view = 1;
							}else{
								that.scrool_view = 0;
							}
							that.booksList =that.booksList.concat(res.data.booksList);
						}
					}else{
						that.booksList = [];
						that.scrool_view = 1;
					}
				})
			},
			type_click(item, type){
				let that = this;
				if(type==1){
					this.conditions_click.type = item;
					this.conditions_click.label = {
						ID : -1,
						name : '全部标签'
					}
					this.$request.getRequst('/type/info?ID='+this.ID+'&navsmalltpye_id='+this.conditions_click.type.ID).then(res=>{
						that.conditions.all_label = res.data.all_label;
					})
				}else if(type==2){
					this.conditions_click.label = item;
				}else if(type==3){
					this.conditions_click.font_number = item;
				}
				this.booksList = [];
				this.requestBooks()
			},
			navtoDetail(item) {
				uni.navigateTo({
					url: `/pages/detail/detail?NumSerial=${item.NumSerial}`
				})
			},
			show_hover(){
				console.log(1)
			}
		}
	}
</script>

<style scoped>
	.conditions{
		padding-right:30upx;
		font-size: 26upx;
	}
	.conditions .type{
		white-space: nowrap;
		width: 100%;
		height: 60upx;
		line-height: 60upx;
		margin: 10upx 0;
		border-right: 1px solid #ddd;
	}
	.conditions .type text{
		padding-left: 30upx;
	}
	.conditions .type text.hover{
		color: #d39477;
	}
	/deep/::-webkit-scrollbar {
		/* 隐藏滚动条，但依旧具备可以滚动的功能 */
		display: none;
		width: 0 !important;
		height: 0;
	}
	.booksList{
		
	}
	.booksOne{
		display: -webkit-box; /* 老版本语法: Safari, iOS, Android browser, older WebKit browsers. */
		display: -moz-box; /* 老版本语法: Firefox (buggy) */
		display: -ms-flexbox; /* 混合版本语法: IE 10 */
		display: -webkit-flex; /* 新版本语法: Chrome 21+ */
		padding:  30upx;
	}
	.booksOne.hover{
		background-color: #ddd;
		opacity: 0.5;
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
	.booksInfo{
		width: 540upx;
		padding-left: 20upx;
		color: #898989;
		font-size: 24upx;
	}
	.booksInfo .title{
		font-size: 32upx;
		color: #000;
		line-height: 60upx;
	}
	.synopsis{
		text-overflow: -o-ellipsis-lastline;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		-webkit-box-orient: vertical;
		margin: 10upx 0;
	}
	.author_type{
		overflow: hidden;
		padding: 20upx 0 10upx;
	}
	.author_type .author{
		float: left;
	}
	.author_type .type{
		float: right;
	}
	.author_type .type text{
		padding: 5upx 10upx;
		border: 3upx solid #ddd;
		border-radius: 5upx;
		margin-left: 20upx ;
	}
</style>
