<template>
  <div v-if="$store.state.found.ID.length > 0" class="container">
    <div class="main-container">
      <div class="image-container">
      <img class="photo" @error="$store.state.noPhoto = true;"  :src="`./assets/photos/${photoUrl}.jpg`"/>
       <!-- <object class="photo" :data="`./assets/photos/${$store.state.found.ID}.jpg`" type="image/jpeg">
          <img class="photo" src="`./assets/photos/no_photo.jpg`" />
        </object> -->
      </div>
      <div class="element-containers-container">
    <div class="element-container">
      <div class="element">
        <label>الرقم المدني</label>
        <input v-model="ID" />
      </div>
      <div class="element">
        <label>الإسم</label>
        <input v-model="Name" />
      </div>
      <div class="element">
        <label>القسم</label>
        <input v-model="Dept" />
      </div>
    </div>
    <div class="element-container">
      <div class="element">
        <label>الوظيفة</label>
        <input v-model="Job" />
      </div>
      <div class="element">
        <label>تاريخ إنتهاء البطاقة المدنية</label>
        <input v-model="Civil_ID_expire_date" />
      </div>
      <div class="element">
        <label>تاريخ انتهاء الKOC</label>
        <input v-model="KOC_expire_date" />
      </div>
    </div>
    <div class="element-container">
      <div class="element">
        <label>تاريخ انتهاء الشعبة</label>
        <input v-model="Shuaiba_Expire_date" />
      </div>
    </div>
    </div>
   
  </div>
   <button class="save-button" @click="save()">حفظ التغييرات</button>
  </div>
  <div class="no-search" v-else>
    <p>الرجاء البحث باستخدام الرقم المدني</p>
  </div>
</template>

<script>
//import Swal from "sweetalert2";

export default {
  data() {
    return {
     
    };
  },
  mounted() {
    
  },
  methods: {
    save() {
      console.log(this.$store.state.found);
      this.$store.dispatch("saveDbChanges");
     window.api.send("toMain", JSON.stringify(this.$store.state.db));
    },
   
  },
  computed: {
    photoUrl(){
      if(this.$store.state.noPhoto == false){
        return this.$store.state.found.ID;
      }
      else{
        return("no_photo");
      }
    },
    // noPhoto: {
    //   get() {
    //     return this.$store.state.noPhoto;
    //   },
    //   set(value) {
    //     this.$store.dispatch("updateNoPhoto", value);
    //   },
    // },
    ID: {
      get() {
        return this.$store.state.found.ID;
      },
      set(value) {
        this.$store.dispatch("updateFoundID", value);
      },
    },
    Name: {
      get() {
        return this.$store.state.found.Name;
      },
      set(value) {
        this.$store.dispatch("updateFoundName", value);
      },
    },
    Dept: {
      get() {
        return this.$store.state.found.Dept;
      },
      set(value) {
        this.$store.dispatch("updateFoundDept", value);
      },
    },
    Job: {
      get() {
        return this.$store.state.found.Job;
      },
      set(value) {
        this.$store.dispatch("updateFoundJob", value);
      },
    },
    Civil_ID_expire_date: {
      get() {
        return this.$store.state.found["Civil ID expire date"];
      },
      set(value) {
        this.$store.dispatch("updateFoundCivil_ID_expire_date", value);
      },
    },
    KOC_expire_date: {
      get() {
        return this.$store.state.found["KOC expire date"];
      },
      set(value) {
        this.$store.dispatch("updateFoundKOC_expire_date", value);
      },
    },
    Shuaiba_Expire_date: {
      get() {
        return this.$store.state.found["Shuaiba Expire date"];
      },
      set(value) {
        this.$store.dispatch("updateFoundShuaiba_Expire_date", value);
      },
    },
  },
};
//window.api.receive("fromMain", (obj) => {});
</script>
<style scoped>
.container {
  padding: 10px;
  width: 90%;
  margin: 50px auto 0 auto;
  text-align: center;
}
.element-container {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 20px;
  align-items: center;
  justify-content: center;
  text-align: center;
}
.main-container{
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}
.photo{
  width:200px;
  border-radius: 20px;
  
}

.image-container{
  flex:auto;
 
}
.element-containers-container{
  flex:10;
}
.element {
  flex: 1;
}

label {
  color: white;
  font-family: "Cairo";
  font-size: 12px;
  display: block;
}
input {
  border-radius: 5px;
  color: white;
  border: none;
  width: 90%;
  direction: rtl;
  text-align: center;
  outline: none;
  padding: 10px;
  background: #000000;
  font-size: 16px;
  font-family: "Tajawal";
  border: 1px solid #3b3b3b;
}
.save-button{
  border-radius: 10px;
  color: black;
  border: none;
  font-weight: 400;
  width: 90%;
  direction: rtl;
  text-align: center;
  outline: none;
  padding: 10px;
  background: #d6d862;
  font-size: 16px;
  font-family: "Cairo";
  border: 1px solid #3b3b3b;
  margin-top:70px;
  margin-bottom:30px;
  cursor: pointer;
  
}
.save-button:hover{
background:white;
color:black;
}
.no-search{
  width:100%;
  margin-top:200px;
 text-align: center;
 font-size:30px;
 color:#3b3b3b;
 font-family: "Cairo";
}
</style>
