<template>
	<view class="book-container">
		<view class="list" v-if="bookList.length">
			<view class="item" v-for="item in bookList" :key="item.comicId" @click="goContent(item)" @longpress="deleteBook(item)">
				<view class="img-container">
					<image :src="item.data.cover" class="img" mode="widthFix"></image>
					<view class="history">上次阅读到第 {{item.chapterNum}} 章</view>
				</view>
				<view class="title">{{item.data.title}}</view>
			</view>
		</view>
		<view class="noData" v-else>暂无书籍添加至书架，赶快去添加吧~</view>
		<uni-popup ref="alertDialog" type="dialog">
			<uni-popup-dialog 
				type="info"
				cancelText="取消"
				confirmText="确定"
				title="提示"
				content="确定从书架中删除吗？"
				@confirm="dialogConfirm"
			></uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	export default {
		data() {
			return {
				comicId:''
			};
		},
		computed:{
			...mapState('book',['bookList']),
		},
		methods:{
			// 点击阅读
			goContent(item){
				let {chapterId,chapterNum,comicId}=item
				uni.navigateTo({
					url:`/comicpkg/content/content?chapterId=${chapterId}&chapterNum=${chapterNum}&comicId=${comicId}&fromBook=${true}`
				})
			},
			// 长按--弹窗
			deleteBook(item){
				this.$refs.alertDialog.open()
				this.comicId=item.comicId
			},
			// 确认删除
			dialogConfirm(){
				this.$store.commit('book/DELETEBOOK',this.comicId)
			}
		}
	}
</script>

<style lang="scss">
.book-container{
	width: 100%;
	height: 100vh;
	background-color: #fff;
	
	.list{
		display: flex;
		flex-wrap: wrap;
		width: 100%;
		padding: 5px 0;
		
		.item{
			box-sizing: border-box;
			width: 375rpx;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 5px;
			
			.img-container{
				position: relative;
				width: 90%;
				border-radius: 8px;
				overflow: hidden;
				
				.img{
					width: 100%;
				}
				
				.history{
					position: absolute;
					left: 0;
					bottom: 0;
					width: 100%;
					background-color: rgba(0, 0, 0, 0.3);
					color: #fff;
					font-size: 18px;
					text-align: center;
				}
			}
			
			.title{
				font-size: 20px;
				text-align: center;
			}
		}
	}

	.noData{
		text-align: center;
		margin-top: 200px;
	}
}
</style>
