export default{
	namespaced:true,
	
	state:()=>({
		bookList:JSON.parse(uni.getStorageSync('bookList') || '[]')
	}),
	
	getters:{},
	
	actions:{},
	
	mutations:{
		// 添加至书架
		ADDBOOK(state,book){
			// 去重
			let index=state.bookList.findIndex(item=>item.comicId===book.comicId)
			if(index!==-1){
				state.bookList.splice(index,1)
			}
			state.bookList.unshift(book)
			// 存储到本地
			this.commit('book/SAVELOCAL')
		},
		// 更新阅读章节
		UPDATEBOOK(state,record){
			let index=state.bookList.findIndex(item=>item.comicId===record.comicId)
			if(index!==-1){
				let temp=state.bookList[index]
				temp.chapterId=record.chapterId
				temp.chapterNum=record.chapterNum
				state.bookList.splice(index,1)
				state.bookList.unshift(temp)
			}
			// 存储到本地
			this.commit('book/SAVELOCAL')
		},
		// 清空书架
		CLEAR(state){
			state.bookList=[]
			uni.removeStorageSync('bookList')
		},
		// 删除书籍
		DELETEBOOK(state,comicId){
			let index=state.bookList.findIndex(item=>item.comicId===comicId)
			if(index!==-1){
				state.bookList.splice(index,1)
				// 存储到本地
				this.commit('book/SAVELOCAL')
			}
		},
		// 将书架存储到本地
		SAVELOCAL(state){
			uni.setStorageSync('bookList',JSON.stringify(state.bookList))
		}
	}
	
}