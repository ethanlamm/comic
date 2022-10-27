<template>
	<view class="content-container" v-if="list.length">
		<template v-for="img in list">
			<image class="img" :src="img" mode="widthFix" :key="img"></image>
		</template>
		<view class="pre-next-container">
			<view class="pre" @click="switchTo('pre')">上一章</view>
			<view class="addBook" @click="openDialog()" v-if="isAdded<0">加入书架</view>
			<view class="addBook" v-else>已在书架</view>
			<view class="next"  @click="switchTo('next')">下一章</view>
		</view>
		<uni-popup ref="alertDialog" type="dialog">
			<uni-popup-dialog 
				type="info"
				cancelText="取消"
				confirmText="确定"
				title="提示"
				content="确定加入书架吗？"
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
				list:[],
				comicId:null,
				show:false,
				chapterId:'',
				comicId:'',
				chapterNum:0,
				__totalChapterList:[],
				fromBook:false,
				__data:{}
			};
		},
		computed:{
			...mapState('chapterList',['totalChapterList','data']),
			...mapState('book',['bookList']),
			isAdded(){
				return this.bookList.findIndex(item=>item.comicId===this.comicId)
			}
		},
		onLoad(options) {
			let {chapterId,comicId,chapterNum}=options
			this.chapterId=chapterId
			this.comicId=comicId
			this.chapterNum=parseInt(chapterNum)
			this.getContent(chapterId)
			this.$store.commit('chapterList/SETRECORD',options)
			// 判断是否从书架过来
			if(options.fromBook){
				// 从书架过来的
				this.fromBook=options.fromBook
				let findResult=this.bookList.find(item=>item.comicId===this.comicId)
				if(findResult){
					this.__totalChapterList=findResult.data.chapterList
					this.__data=findResult.data
				}
			}else{
				this.__totalChapterList=this.totalChapterList
				this.__data=this.data
			}
		},
		onUnload() {
			let {chapterId,comicId,chapterNum}=this
			this.$store.commit('book/UPDATEBOOK',{chapterId,comicId,chapterNum})
		},
		methods:{
			async getContent(chapterId){
				let res =await uni.$http.get(`/comicContent/search/${chapterId}`)
				if(res.statusCode!==200) return uni.$showMsg()
				let {data} =res
				this.list=data.data
			},
			// 上一章、下一章
			switchTo(type){
				let {chapterNum,__totalChapterList,comicId}=this
				let goChapter=null
				if(type==='pre'){
					goChapter=parseInt(chapterNum-1)
					if(goChapter<0) return uni.$showMsg('已经是第一章啰~')
				}else{
					goChapter=parseInt(chapterNum)+1
					if(goChapter>__totalChapterList.length) return uni.$showMsg('看完辣~')
				}
				let {chapterId}=__totalChapterList[goChapter]
				if(!this.fromBook){
					uni.redirectTo({
						url:`/comicpkg/content/content?chapterId=${chapterId}&chapterNum=${goChapter}&comicId=${comicId}`
					})
				}else{
					uni.redirectTo({
						url:`/comicpkg/content/content?chapterId=${chapterId}&chapterNum=${goChapter}&comicId=${comicId}&fromBook=${true}`
					})
				}
				
			},
			// 加入书架
			openDialog() {
				this.$refs.alertDialog.open()
			},
			dialogConfirm(){
				let {chapterId,comicId,chapterNum}=this
				this.$store.commit('book/ADDBOOK',{chapterId,comicId,chapterNum,data:this.__data})
				uni.$showMsg('加入书架成功')
				this.$store.commit('searchList/clearList')
				// 跳转至书架页？
				uni.switchTab({
					url:'/pages/book/book'
				})
			},
		}
	}
</script>

<style lang="scss">
.content-container{
	.img{
		width: 100%;
	}
	
	.pre-next-container{
		display: flex;
		justify-content: space-around;
		align-items: center;
		background-color: #fff;
		height: 80px;
		
		.pre,.next,.addBook{
			flex: 1;
			box-sizing: border-box;
			height: 100%;
			line-height: 80px;
			font-size: 25px;
			font-weight: 700;
			text-align: center;
		}
		.addBook{
			border-left: 1px solid #e4e4e4;
			border-right: 1px solid #e4e4e4;
		}
	}
}
</style>
