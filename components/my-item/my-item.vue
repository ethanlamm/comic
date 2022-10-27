<template>
	<view class="my-item-container" @click="goDetail">
		<view class="img">
			<image :src="item.cover" class="image"></image>
		</view>
		<view class="content">
			<view class="title">{{item.title}}</view>
			<view class="gray">
				<view>{{item.author}}</view>
				<view class="descs">{{item.descs}}</view>
			</view>
			<view>
				<text class="comicType">{{item.comicType}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"my-item",
		data() {
			return {
				
			};
		},
		props:['item'],
		methods:{
			goDetail(){
				uni.navigateTo({
					url:`/comicpkg/detail/detail?comicId=${this.item.comicId}`
				})
			}
		},
	}
</script>

<style lang="scss">
.my-item-container{
	display: flex;
	justify-content: space-between;
	height: 280rpx;
	margin: 30px 0;
	
	.img{
		flex: 1;
		border-radius: 20rpx;
		overflow: hidden;
		margin-right: 20px;
		
		.image{
			width: 100%;
			height: 100%;
		}
	}
	.content{
		flex: 2;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		padding-bottom: 5px;
		
		.title{
			font-size: 18px;
			font-weight: 550;
		}
		.gray{
			color: #999;
			
			.descs{
				margin-top: 5px;
				overflow:hidden;
				display:-webkit-box;
				-webkit-box-orient:vertical;
				-webkit-line-clamp:1;
			}
		}
		
		.comicType{
			border: 2px solid #6ebfb1;
			border-radius: 10px;
			padding: 0 5px;
			color: #6ebfb1;
		}
	}
}
</style>