import { createStore } from 'vuex'

// Create a new store instance.
const store = createStore({
  state () {
    return {
      searchTerm:"",
      db:[],
      noPhoto:false,
      found:{ID:"",Name:"Name",Dept:"Dept",Job:"Job",'Civil ID expire date':"Civil_ID_expire_date",'KOC expire date':"KOC_expire_date",'Shuaiba Expire date':"Shuaiba_Expire_date"},
      foundIndex:0,
      findViewText:"الرجاء البحث باستخدام الرقم المدني",
      photosPath:"./photos/",
    }
  },
  mutations: {
    updateSearchTerm (state,payload) {
      state.searchTerm = payload;
    },
    updateDb (state,payload) {
      state.db = payload;
      console.log("THIS IS DB",payload);
    },
    search (state) {
      console.log("FOUND ID",state.found.ID)
      if(state.searchTerm.length < 12) {
        console.log(state.db);
        state.found = {ID:"",Name:"Name",Dept:"Dept",Job:"Job",'Civil ID expire date':"Civil_ID_expire_date",'KOC expire date':"KOC_expire_date",'Shuaiba Expire date':"Shuaiba_Expire_date"};
        return;
      }
      console.log(state.db);
      for (var i = 0; i < state.db.length; i++) {
        //console.log(i);
        if (state.db[i].ID ==state.searchTerm) {
          state.found = state.db[i];
          console.log("THIS IS THE FOUND ",state.found);
          state.foundIndex = i;
          return;
        }
      }
      console.log("NOT FOUND ANYTHING");
      state.findViewText = "لم يتم إيجاد الموظف، الرجاء التأكد من الرقم المدني"
      state.found = {ID:"",Name:"Name",Dept:"Dept",Job:"Job",'Civil ID expire date':"Civil_ID_expire_date",'KOC expire date':"KOC_expire_date",'Shuaiba Expire date':"Shuaiba_Expire_date"};
    },
    saveDbChanges(state){
     
        state.db[state.foundIndex] = state.found;
      
     
     
    },
    updateNoPhoto (state,payload) {
      state.noPhoto = payload;
    },
    updateFoundID (state,payload) {
      state.found.ID = payload;
    },
    updateFoundName (state,payload) {
      state.found.Name = payload;
    },
    updateFoundDept (state,payload) {
      state.found.Dept  = payload;
    },
    updateFoundJob (state,payload) {
      state.found.Job = payload;
    },
    updateFoundCivil_ID_expire_date (state,payload) {
      state.found['Civil ID expire date'] = payload;
    },
    updateFoundKOC_expire_date (state,payload) {
      state.found['KOC expire date'] = payload;
    },
    updateFoundShuaiba_Expire_date (state,payload) {
      state.found['Shuaiba Expire date'] = payload;
    },
    setPhotosPath (state,payload) {
      state.photosPath = payload;
    },
  },
  actions:{
    updateSearchTerm(context,payload){
      context.commit('updateSearchTerm',payload);
    },
    updateDb(context,payload){
      context.commit('updateDb',payload);
    },
    search(context){
      
      context.commit('search');
    },
    saveDbChanges(context){
     
      context.commit('saveDbChanges');
    
    },

    updateNoPhoto(context,payload){
      context.commit('updateNoPhoto',payload);
    },
    updateFoundID(context,payload){
      context.commit('updateFoundID',payload);
    },
    updateFoundName(context,payload){
      context.commit('updateFoundName',payload);
    },
    updateFoundDept(context,payload){
      context.commit('updateFoundDept',payload);
    },
    updateFoundJob(context,payload){
      context.commit('updateFoundJob',payload);
    },
    updateFoundCivil_ID_expire_date(context,payload){
      context.commit('updateFoundCivil_ID_expire_date',payload);
    },
    updateFoundKOC_expire_date(context,payload){
      context.commit('updateFoundKOC_expire_date',payload);
    },
    updateFoundShuaiba_Expire_date(context,payload){
      context.commit('updateFoundShuaiba_Expire_date',payload);
    },
    setPhotosPath(context,payload){
      context.commit('setPhotosPath',payload);
    },
  }
})
export default store;