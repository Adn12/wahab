<template>
  <div id="app">
    <div class="title-bar">
      <div @click="close()" class="title-button x-button">x</div>
      <div @click="minimize()" class="title-button minimize-button">-</div>
      <div class="empty-title"><p class="title">قاعدة بيانات الموظفين</p></div>
    </div>
    <div v-if="loggedIn">
      <div class="heading">
        <router-link @click="putLine(1)" class="menu-item" to="/"
          >البحث
          <hr class="underline" v-if="oneActive"
        /></router-link>
        <router-link @click="putLine(2)" class="menu-item" to="/add"
          >الإضافة
          <hr class="underline" v-if="twoActive"
        /></router-link>
        <div class="menu-item"><input maxlength="120" @keyup.enter="search()" placeholder="الرقم المدني" v-model="searchTerm" class="search" /><img class="search-icon" @click="search()" src="./assets/search.svg" /></div>
      </div>
      <hr class="heading-divider" />
      <router-view></router-view>
    </div>
    <div class="login-container" v-else>
      <label class="login-label">الرجاء ادخال كلمة السر</label>
      <input v-model="password" @keyup="checkPassword()" class="password-input" type="password" />
    </div>
  </div>
</template>

<script>
//import FindView from "./components/FindView.vue"
//import Swal from "sweetalert2"
export default {
  data() {
    return {
      name: "adnan",
      found: "",
      id: null,
      i: null,
      db: [],
      oneActive: true,
      twoActive: false,
      loggedIn: false,
      password: null,
    }
  },
  mounted() {
    window.api.receive("fromMain", (obj) => {
      console.log(obj)
      this.$store.dispatch("updateDb", obj)
    })
  },
  computed: {
    searchTerm: {
      get() {
        return this.$store.state.searchTerm
      },
      set(value) {
        this.$store.dispatch("updateSearchTerm", value)
      },
    },
  },
  methods: {
    checkPassword() {
      if (this.password == "123456") {
        this.loggedIn = true
      }
    },
    close() {
      window.api.send("closeApp")
    },
    minimize() {
      window.api.send("minimizeApp")
    },
    putLine(x) {
      if (x == 1) {
        this.oneActive = true
        this.twoActive = false
      }
      if (x == 2) {
        this.oneActive = false
        this.twoActive = true
      }
    },
    search() {
      console.log("search")
      this.$store.dispatch("updateNoPhoto",false);
      this.$store.dispatch("search")
      this.oneActive = true
      this.twoActive = false
      this.$router.push("/")
    },
  },
  //components: { FindView },
}
</script>
<style>
.title-bar {
  display: flex;

  background: #62d8ca;
  /* border:1px solid #62D8CA;
  border-top-left-radius: 20px;
border-top-right-radius: 20px; */
}
.title-button {
  flex: 1;
  text-align: center;
  font-size: 20px;
  font-family: "Cairo";
  font-weight: 400;
  color: white;
  cursor: pointer;
  user-select: none;
  z-index: 99;
}
.login-container{
  text-align: center;
  margin-top:200px;
}
.login-label{
color:#62d8ca;
font-family: "Cairo";
display:block;
font-size:20px;
}
.password-input{
  margin-top:10px;
border-radius: 5px;
  color: white;
  border: none;
  width: 200px;
  outline: none;
  text-align: center;
  padding: 10px;
  background: #000000;
  font-size: 16px;
  font-family: "Tajawal";
  border: 1px solid #62d8ca;
}
.empty-title {
  flex: 20;

  -webkit-app-region: drag;
}
.title {
  color: white;
  font-family: "Cairo";
  font-size: 14px;
  position: absolute;
  margin-left: auto;
  margin-right: auto;
  width: auto;
  left: 0;
  top: -9px;
  right: 0;
  text-align: center;
}
.x-button {
}
.x-button:hover {
  background: #2f6962;
}
.minimize-button:hover {
  background: #2f6962;
}
.heading {
  margin-top: 20px;
  display: flex;
  width: 100%;
}
.menu-item {
  font-family: "Cairo";
  color: #2f6962;
  font-size: 20px;
  font-weight: 400;
  text-decoration: none;
  flex: 1;
  text-align: center;
  outline: none;
}
.search-icon {
  fill: white;
  width: 20px;
  position: absolute;
  left: 20px;
  top: 73px;
  cursor: pointer;
}
.router-link-active {
  color: #62d8ca;
}
.underline {
  border: none;
  border-bottom: 2px solid #62d8ca;
  margin-top: 0;
  width: 10%;
}
.search {
  border-radius: 5px;
  color: white;
  border: none;
  width: 90%;
  outline: none;
  padding: 10px;
  background: #000000;
  font-size: 16px;
  text-align: center;
  font-family: "Tajawal";
  border: 1px solid #2f6962;
}
body {
  background: transparent;
  padding: 0 0 0 0;
  margin: 0 0 0 0;
}
body {
}
#app {
  padding: 0 0 0 0;
  background: #1e1f23;
  height: 100%;
  box-shadow: 0 0 2px 0px #62d8ca inset, 0 0 2px 0px #62d8ca;
  border: 1px solid #62d8ca;
  min-height: 650px;
  box-sizing: border-box;
  overflow: hidden;
  border-radius: 20px;
}
.heading-divider {
  border: none;
  border-top: 1px solid #d6d862;
}
</style>
