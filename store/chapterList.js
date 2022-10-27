export default {
	namespaced:true,
	
	state:()=>({
		count:0,
		data:{},
		totalChapterList:[],
		showList:[],
		recordList:[]
	}),
	
	getters:{},
	
	actions:{
		async getChapterList({commit},params){
			let {page,size,comicId}=params
			let res= await uni.$http.get(`/comicChapter/search/${comicId}`)
			if(res.statusCode!==200) return uni.$showMsg()
			commit('GETCHAPTERLIST',{data:res.data,page,size})
		}
	},
	
	mutations:{
		GETCHAPTERLIST(state,{data,page,size}){
			state.count=data.count
			state.data=data.data
			state.totalChapterList=data.data.chapterList
			// 获取showList
			this.commit('chapterList/GETSHOWLIST',{page,size})
		},
		// 截取的showList
		GETSHOWLIST(state,{page,size}){
			let {count,totalChapterList}=state
			let tempList=[]
			if(page*size<count){
				tempList=totalChapterList.slice((page-1)*size, page*size)
				for(let i=(page-1)*size;i<page*size;i++){
					tempList[i-((page-1)*size)].chapterNum=i
				}
			}else{
				tempList=totalChapterList.slice((page-1)*size)
				for(let i=(page-1)*size;i<(page-1)*size+tempList.length;i++){
					tempList[i-((page-1)*size)].chapterNum=i
				}
			}
			state.showList=[...state.showList,...tempList]
		},
		CLEARSTATE(state){
			state.count=0
			state.data={}
			state.totalChapterList=[]
			state.showList=[]
		},
		SETRECORD(state,options){
			let index=state.recordList.findIndex(item=>item.comicId===options.comicId)
			if(index!==-1) state.recordList.splice(index,1)
			state.recordList.push(options)
		}
	}
}