<template>
	<view class="search-container">
		<!-- 搜索 -->
		<view class="search-bar-container">
			<uni-data-select
			  class="select"
			  v-model="value"
			  :localdata="range"
			  :clear="false"
			></uni-data-select>
			<uni-search-bar
				:showInit="true"
				:showSyncInit="true"
				radius="100"
				placeholder="请输入搜索内容"
				clearButton="auto"
				cancelButton="none"
				class="input"
				@input="input"
				@clear="clear"
				v-model="key"
			></uni-search-bar>
		</view>
		
		<view class="content">
			<!-- 展示列表 -->
			<view class="list" v-if="list.length">
				<template v-for="item in list">
					<my-item :item="item" :key="item.comicId"></my-item>
				</template>
			</view>
		</view>
		
		<view class="goTop" v-if="isShow" @click="goTop">
			<uni-icons type="top" size="30" color="#6ebfb1"></uni-icons>
		</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	export default {
		data() {
			return {
				value: 'title',
				range: [
					{ value:'title', text: "标题" },
					{ value:'author', text: "作者" },
					{ value:'comicType', text: "分类" },
				],
				timer:null,
				page:1,
				size:10,
				key:null,
				isShow:false
			};
		},
		computed:{
			...mapState('searchList',['list','count']),
		},
		onUnload() {
			this.$store.commit('searchList/clearList')
		},
		methods:{
			input(res){
				clearTimeout(this.timer)
				this.timer=setTimeout(()=>{
					this.key=res
					// 发请求
					if(!this.key) return this.clear()
					this.getList()
				},800)
			},
			clear(){
				this.page=1
				this.$store.commit('searchList/clearList')
			},
			// 请求数据
			getList(){
				let params={
					type:this.value,
					key:this.key,
					page:this.page,
					size:this.size
				}
				this.$store.commit('searchList/getList',params)
			},
			// 回到顶部
			goTop(){
				uni.pageScrollTo({
					scrollTop:0,
					duration:1000
				})
			},
		},
		onPageScroll(e) {
			// 200
			// console.log(e.scrollTop);
			if(e.scrollTop>200){
				this.isShow=true
			}else{
				this.isShow=false
			}
		},
		onReachBottom() {
			if(this.page * this.size<this.count){
				this.page++
				// 再次发请求
				this.getList()
			}else{
				uni.$showMsg('没有数据啦~')
			}
			
		},
		watch:{
			value(){
				// 清空
				this.key=null
				this.clear()
			}
		}
	}
</script>

<style lang="scss">
	page{
		height: 100%;
	}
.search-container{
	position: relative;
	padding: 0 5px;
	height: 100vh;
	background-color: #fff;
	
	.search-bar-container{
		position: sticky;
		top: 0;
		z-index: 9;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: #fff;
		
		
		.select{
			width: 200rpx;
			
		}
		
		.input{
			flex: 1;
		}
	}
	
	.content{
		padding-bottom: 20px;
		background-color: #fff;
		.list{
			background-color: #fff;
		}
		
		.noData{
			
		}
	}
	
	
	.goTop{
		position: fixed;
		right: 20px;
		bottom: 20px;
		z-index: 10;
		// padding: 3px;
		border: 2px solid #6ebfb1;
		border-radius: 20px;
	}
}

</style>
