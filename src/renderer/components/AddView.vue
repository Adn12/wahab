<template>
  <div id="container">
   Add
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
