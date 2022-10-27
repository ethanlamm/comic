<template>
	<view class="detail-container" v-if="data.title">
		<image :src="data.cover" class="image" mode="widthFix"></image>
		<view class="content-container">
			<view class="top-container">
				<view class="title-container">
					<view class="title">{{data.title}}</view>
					<view class="comicType">{{data.comicType}}</view>
				</view>
				<view class="descs">{{data.descs}}</view>
				<view class="author-container">
					<view class="author">{{data.author}}</view>
					<view class="btn"  @click="read(record)">{{record.chapterNum?'继续':'开始'}}阅读</view>
				</view>
			</view>
			
			<view class="catelog-container">
				<view class="label-container">
					<view class="label">目录</view>
					<view class="count">共有 {{count}} 章</view>
				</view>
				<view class="list">
					<view class="item" v-for="item in showList" :key="item.chapterId" @click="goContent(item)">
						<text class="text">{{item.title}}</text>
					</view>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	export default {
		data() {
			return {
				page:1,
				size:10,
				comicId:'',
				record:{}
			};
		},
		computed:{
			...mapState('chapterList',['count','data','showList','totalChapterList','recordList'])
		},
		onLoad({comicId}) {
			this.comicId=comicId
			this.$store.commit('chapterList/CLEARSTATE')
			this.getDetail(comicId)
		},
		onShow() {
			// 找到，继续阅读
			let findResult=this.recordList.find(item=>item.comicId===this.comicId)
			if(findResult){
				this.record=findResult
			}
		},
		methods:{
			getDetail(comicId){
				// 初始-拿到所有的数据
				let {page,size}=this
				this.$store.dispatch('chapterList/getChapterList',{page,size,comicId})
			},
			goContent({chapterId,chapterNum}){
				let {comicId}=this
				uni.navigateTo({
					url:`/comicpkg/content/content?chapterId=${chapterId}&chapterNum=${chapterNum}&comicId=${comicId}`,
				})
				uni.$emit('goContent',{data:this.data})
			},
			read(record){
				let {comicId}=this
				if(record.chapterNum){
					let {chapterId,chapterNum}=record
					uni.navigateTo({
						url:`/comicpkg/content/content?chapterId=${chapterId}&chapterNum=${chapterNum}&comicId=${comicId}`,
					})
				}else{
					let {chapterId}=this.showList[0]
					uni.navigateTo({
						url:`/comicpkg/content/content?chapterId=${chapterId}&chapterNum=0&comicId=${comicId}`,
					})
				}
				uni.$emit('goContent',{data:this.data})
			}
		},
		onReachBottom() {
			if(this.showList.length===this.count) return uni.$showMsg('没有数据啦~')
			this.page++
			let {page,size}=this
			this.$store.commit('chapterList/GETSHOWLIST',{page,size})
		},
	}
</script>

<style lang="scss">
.detail-container{
	position: relative;
	background-color: #fff;
	height: 100vh;
	
	.image{
		width: 100%;
	}
	
	.content-container{
		position: relative;
		background-color: #fff;
		min-height: 300rpx;
		width: 100%;
		border-radius: 20px 20px 0 0;
		transform: translateY(-100px);
		
		.top-container{
			position: relative;
			width: 90%;
			margin: 0 auto;
			background-color: #fff;
			border-radius: 10px;
			box-shadow: 0 0 2px #999999;
			box-sizing: border-box;
			padding: 20px;
			transform: translateY(-80%);
			
			.title-container{
				display: flex;
				justify-content: space-between;
				align-items: center;
				
				.title{
					font-size: 30px;
					font-weight: 400;
				}
				.comicType{
					background-color: #6ebfb1;
					padding: 0 5px;
					color: #fff;
					border-radius: 5px;
				}
			}
			
			.descs{
				margin: 10px 0;
			}
			.author-container{
				display: flex;
				justify-content: space-between;
				align-items: center;
				
				.author{
					flex: 2;
					margin-right: 5px;
				}
				.btn{
					flex: 3;
					background-color: #6ebfb1;
					color: #fff;
					border-radius: 20px;
					font-size: 20px;
					line-height: 40px;
					text-align: center;
				}
			}
			
		}
		
		.catelog-container{
			position: absolute;
			top: 80px;
			width: 100%;
			background-color: #fff;
			padding-bottom: 20px;
			
			.label-container{
				display: flex;
				justify-content: space-between;
				align-items: center;
				
				.label{
					padding-left:5px;
					color: #6ebfb1;
					font-size: 25px;
					font-weight: 500;
				}
				
				.count{
					font-size: 18px;
					margin-right: 20px;
				}
			}
			
			
			.list{
				width: 100%;
				
				.item{
					float: left;
					width: 375rpx;
					height: 40px;
					line-height: 40px;
					text-align: left;
					box-sizing: border-box;
					padding-left: 8px;
					
					.text{
						overflow:hidden;
						display:-webkit-box;
						-webkit-box-orient:vertical;
						-webkit-line-clamp:1;
					}
				}
			}
		}
	}
	
	
	
}
</style>
