<template>
  <div id="app">
    <div class="heading">
      <router-link @click="putLine(1)" class="menu-item" to="/">البحث<hr class="underline" v-if="oneActive"/></router-link>
      <router-link @click="putLine(2)" class="menu-item" to="/add">الإضافة<hr class="underline" v-if="twoActive"/></router-link>
      <div class="menu-item"> <input maxlength="12"  v-model="searchTerm" class=" search"/><img class="search-icon" @click="search()" src="./assets/search.svg"/></div>
    </div>
   
    <router-view></router-view>
  </div>
</template>

<script>
//import FindView from "./components/FindView.vue"
import Swal from "sweetalert2"
export default {
  data() {
    return {
      name: "adnan",
      found: "",
      id: null,
      i: null,
      db: [],
      oneActive:true,
      twoActive:false,
    }
  },
  computed: {
  searchTerm: {
    get () {
      return this.$store.state.searchTerm;
    },
    set (value) {
      this.$store.dispatch('updateSearchTerm', value);
    }
  }
},
  methods:{
    putLine(x){
      if(x ==1) {this.oneActive = true; this.twoActive = false}
      if(x ==2) {this.oneActive = false; this.twoActive = true}
    },
    search(){
     console.log('search');
     
     this.oneActive = true; this.twoActive = false;
     this.$router.push("/");
    }
  }
  //components: { FindView },
}

</script>
<style>
.heading {
  display: flex;
  width: 100%;
}
.menu-item{
  font-family: "Cairo";
  color:#2f6962;
  font-size:20px;
  font-weight: 700;
  text-decoration: none;
  flex:1;
  text-align: center;
  outline: none;
}
.search-icon{
  color:black;
  width:30px;
  position: absolute;
  left:15px;
  top:15px;
  cursor: pointer;

}
.router-link-active{
  color:#62D8CA;
}
.underline{
  border:none;
    border-bottom:2px solid #62D8CA;
    margin-top:0;
width:10%;
}
.search{
  border-radius:5px;
  border:none;
  width:90%;
  outline: none;
  padding:10px;
  background:#00020A;
  font-size:16px;
  font-family: "Tajawal";
 box-shadow: rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px;
  
}
body {
  background: #1E1F23;
}
</style>
