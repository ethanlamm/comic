<template>
	<view class="home-container">
		<!-- 轮播图 -->
		<!-- <view class="banner-container">
			<swiper :autoplay="true" :interval="3000" :duration="1000" class="swiper-container">
				<template v-for="item in list">
					<swiper-item class="swiper-item" :key="item.comicId">
						<navigator url="">
							<image class="image" :src="item.cover" mode="aspectFill"></image>
							<view class="title">{{item.title}}</view>
						</navigator>
					</swiper-item>
				</template>
			</swiper>
		</view> -->
		
		
		<!-- 搜索框 -->
		<navigator url="/searchpkg/search/search" class="search">
				<uni-icons class="icon" type="search" color="white" size="30"></uni-icons>
				<text class="text" >关键字搜索</text>
		</navigator>
		
		<!-- 底部图片 -->
		<view class="image">
			<image src="../../static/images/image-home.png" mode=""></image>
		</view>
	</view>
</template>

<script>
	import {bannerlist} from '@/constant/index.js'
	export default {
		data() {
			return {
				list:bannerlist
			};
		},
		onLoad() {
			
		}
	}
</script>

<style lang="scss">
	.home-container {
		position: relative;
		width: 100%;
		height: 100vh;
		overflow: hidden;
		// background-color: #fff;
		// background: linear-gradient(to bottom, #bfe6ba, 70%,#ffffff);
		background: linear-gradient(to bottom,#6ebfb1,60%,#ffffff);
		// background: linear-gradient(to bottom, #006f48,60%, #ffffff);

		// 轮播图
		.banner-container {
			width: 88%;
			height: 500rpx;
			border-radius: 10%;
			// box-shadow: 0 0 13px #888888;
			margin: 160rpx auto 0;
			overflow: hidden;

			.swiper-container {
				width: 100%;
				height: 100%;
				
				.swiper-item {
					position: relative;
					width: 100%;
					height: 100%;
					
					.image{
						width: 100%;
						height: 100%;
					}
					.title{
						position: absolute;
						left:50%;
						bottom: 0;
						width: 100%;
						transform: translateX(-50%);
						background-color: rgba(0, 0, 0, 0.7);
						text-align: center;
						padding: 5px 0;
						color: #fff;
						font-size: 20px;
						font-weight: 700;
					}
				}
			}

		}
		
		// 搜索框
		.search{
			position: relative;
			width: 88%;
			height: 100rpx;			
			background-color: #252525;
			border-radius:15px ;
			// 有轮播图的margin
			margin: 60rpx auto 0;
			// 无轮播图的margin
			margin: 300rpx auto 0;
		
			.icon{
				position: absolute;
				top:10px;
				left: 10px;
			}
			
			.text{
				position: absolute;
				top:10px;
				left: 45px;
				font-size: 20px;
				color: #fff;
			}
			
		}
		
		// 底部图片
		.image{
			position: absolute;
			bottom: 0;
			width: 100%;
			height: 450rpx;
			
			image{
				width: 100%;
				// height: 100%;
			}
		}
	}
</style>
