export default {
	namespaced:true,
	
	state:()=>({
		list:[],
		count:0
	}),
	
	getters:{},
	
	actions:{},
	
	mutations:{
		async getList(state,params){
			let {type,key,page,size}=params
			let res=await uni.$http.get(`/comic/search/${type}/${key}/${page}/${size}`)
			if(res.statusCode!==200) return uni.$showMsg()
			let {data}=res
			if(data.count==0) return uni.$showMsg('暂无数据')
			if(page==1){
				this.commit('searchList/clearList')
			}
			state.list=[...state.list,...data.data]
			state.count=data.count
		},
		clearList(state){
			state.list=[]
			state.count=0
		}
	}
}