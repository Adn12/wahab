<template>
  <div>
    Name: <input v-model="name" />
    <button @click="send()">Send</button>

    <hr />

    find: <input v-model="id" />
    <button @click="find()">Send</button>
    <p>{{ found }}</p>
  </div>
</template>

<script>
import Swal from "sweetalert2";

export default {
  data() {
    return {
      name: "adnan",
      found: "",
      id: null,
      i: null,
      db: [],
    };
  },
  computed: {},
  
  mounted() {
    if(this.$store.state.searchTerm.length == 12){
      console.log("COMMENCING SEARCH");
    }
    window.api.receive("fromMain", (obj) => {
      this.db = obj;
      Swal.fire({
        title: "Error!",
        text: "Do you want to continue",
        icon: "error",
        confirmButtonText: "Cool",
      });
    });
  },
  methods: {
    send() {
      this.db[this.i].Name = this.name;
      window.api.send("toMain", JSON.stringify(this.db));
    },
    find() {
      for (var i = 0; i < this.db.length; i++) {
        // look for the entry with a matching `code` value
        if (this.db[i].ID == this.id) {
          this.found = this.db[i];
          this.i = i;
          return;
        }
      }
    },
  },
};
//window.api.receive("fromMain", (obj) => {});
</script>
<style scoped>
div{
  font-family: 'Cairo';
}
</style>