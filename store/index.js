import Vue from 'vue'
import Vuex from 'vuex'

// 引入词典仓库
import book from './book.js'
import searchList from './searchList.js'
import chapterList from './chapterList.js'

Vue.use(Vuex)

const store=new Vuex.Store({
	modules:{
		book,
		searchList,
		chapterList
	}
})

export default store