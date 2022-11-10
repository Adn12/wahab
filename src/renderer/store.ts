import { createStore } from 'vuex'

// Create a new store instance.
const store = createStore({
  state () {
    return {
      registrationPhotos:null,
      isModalVisible:false,
      searchTerm:"",
      db:[],
      noPhoto:false,
      found:{ID:"",Name:"Name",Department:"Department",Job:"Job",'Civil ID EXP':"Civil ID EXP",'KOC GP EXP':"KOC GP EXP",'ISHUAIBA GP EXP':"ISHUAIBA GP EXP","Phone Number":"Phone Number","Country":"Country","Notes":"Notes"},
      foundIndex:0,
      findViewText:"الرجاء البحث باستخدام الرقم المدني",
      photosPath:"./photos/",
    }
  },
  mutations: {
    updateRegistrationPhotos(state,payload){
      state.registrationPhotos = payload
    },
    updateIsModalVisibile(state,payload){
      state.isModalVisible = payload;
    },
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
        state.found={ID:"",Name:"Name",Department:"Department",Job:"Job",'Civil ID EXP':"Civil ID EXP",'KOC GP EXP':"KOC GP EXP",'ISHUAIBA GP EXP':"ISHUAIBA GP EXP","Phone Number":"Phone Number","Country":"Country","Notes":"Notes"};
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
      state.found = {ID:"",Name:"Name",Department:"Department",Job:"Job",'Civil ID EXP':"Civil ID EXP",'KOC GP EXP':"KOC GP EXP",'ISHUAIBA GP EXP':"ISHUAIBA GP EXP","Phone Number":"Phone Number","Country":"Country","Notes":"Notes"};
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
    updateFoundDepartment (state,payload) {
      state.found.Department  = payload;
    },
    updateFoundJob (state,payload) {
      state.found.Job = payload;
    },
    updateFoundCivil_ID_EXP (state,payload) {
      state.found['Civil ID EXP'] = payload;
    },
    updateFoundKOC_GP_EXP (state,payload) {
      state.found['KOC GP EXP'] = payload;
    },
    updateFoundISHUAIBA_GP_EXP (state,payload) {
      state.found['ISHUAIBA GP EXP'] = payload;
    },
    updateFoundPhone_Number (state,payload) {
      state.found['Phone Number'] = payload;
    },
    updateFoundCountry (state,payload) {
      state.found['Country'] = payload;
    },
    updateFoundNotes (state,payload) {
      state.found['Notes'] = payload;
    },
    setPhotosPath (state,payload) {
      state.photosPath = payload;
    },
  },
  actions:{
    updateRegistrationPhotos(context,payload){
      context.commit('updateRegistrationPhotos',payload);
    },
    updateIsModalVisibile(context,payload){
      context.commit('updateIsModalVisibile',payload);
    },
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
    updateFoundDepartment(context,payload){
      context.commit('updateFoundDepartment',payload);
    },
    updateFoundJob(context,payload){
      context.commit('updateFoundJob',payload);
    },
    updateFoundCivil_ID_EXP(context,payload){
      context.commit('updateFoundCivil_ID_EXP',payload);
    },
    updateFoundKOC_GP_EXP(context,payload){
      context.commit('updateFoundKOC_GP_EXP',payload);
    },
    updateFoundISHUAIBA_GP_EXP(context,payload){
      context.commit('updateFoundISHUAIBA_GP_EXP',payload);
    },
    updateFoundPhone_Number (context,payload) {
      context.dispatch('updateFoundPhone_Number',payload);
    },
    updateFoundCountry (context,payload) {
      context.commit('updateFoundCountry',payload);
    },
    updateFoundNotes (context,payload) {
      context.commit('updateFoundNotes',payload);
    },
    setPhotosPath(context,payload){
      context.commit('setPhotosPath',payload);
    },
  }
})
export default store;