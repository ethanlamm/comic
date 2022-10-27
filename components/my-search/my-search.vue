<template>
	<view class="my-search-container">
		<uni-data-select
		  class="select"
		  v-model="value"
		  :localdata="range"
		  :clear="false"
		></uni-data-select>
		<uni-search-bar :showInit="true" :showSyncInit="true" radius="100" placeholder="请输入搜索内容" clearButton="auto"
		 cancelButton="none" class="input" @input="input"></uni-search-bar>
	</view>
</template>

<script>
	export default {
		name:"my-search",
		data() {
			return {
				value: 'title',
				range: [
					{ value:'title', text: "标题" },
					{ value:'author', text: "作者" },
					{ value:'comicType', text: "分类" },
				],
				timer:null
			};
		},
		methods:{
			input(res){
				let option=this.value
				clearTimeout(this.timer)
				this.timer=setTimeout(()=>{
					// 发请求
					this.$store.commit('')
				},800)
			}
		}
	}
</script>

<style lang="scss">
.my-search-container{
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 5px;
	
	.select{
		width: 200rpx;
		
	}
	
	.input{
		flex: 1;
	}
}
</style>