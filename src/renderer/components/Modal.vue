<script>
export default {
  name: "Modal",
  data() {
    return {
      //isgImgSrc: `'url(${this.$store.state.photosPath + this.$store.state.found.ID}/isg${this.$store.state.found.ID}.jpg)'`,
    }
  },
  computed: {
    kocImgSrc() {
      return `background-image:url("${this.$store.state.photosPath + this.$store.state.found.ID}/koc${this.$store.state.found.ID}.jpg")`
    },
    isgImgSrc() {
      return `background-image:url("${this.$store.state.photosPath + this.$store.state.found.ID}/isg${this.$store.state.found.ID}.jpg")`
    },
  },

  mounted() {
    console.log(this.$store.state.registrationPhotos)
    console.log(this.kocImgSrc)
  },
  methods: {
    close() {
      console.log(this.$store.state.found)
      console.log(this.kocImgSrc)
      this.$emit("close")
    },
    openDialog(type) {
      console.log("upload")
      if(type=="koc") this.$refs.photoUploadKoc.click();
      else this.$refs.photoUploadIsg.click()
      
    },
    onFileChangeKoc(e) {
      var files = e.target.files || e.dataTransfer.files
      console.log(files[0].path)
      if (files[0].path.slice(-4) != ".jpg") {
        Swal.fire({
          icon: "error",
          title: "حصل خطأ",
          text: "الرجاء التأكد ان نوع الملف .jpg",
          confirmButtonText: "حسنا",
          backdrop: false,
          customClass: {
            container: "alert-container",
            popup: "alert-popup",
            header: "alert-header",
            title: "alert-title",
            icon: "alert-icon",

            htmlContainer: "alert-html-container",
            confirmButton: "alert-confirm-button",
          },
        })
        return
      }

      console.log(files[0].path)
      if (!files.length) return
      else {
        window.api.send("copyKoc", { photoPath: files[0].path, photoName: 'koc' + this.$store.state.found.ID + ".jpg",id:this.$store.state.found.ID })
        this.photoSrc = files[0].path
      }
      //console.log({ photoPath: files[0].path, photoName: this.$store.state.found.ID + ".jpg" })
    },
     onFileChangeIsg(e) {
      var files = e.target.files || e.dataTransfer.files
      console.log(files[0].path)
      if (files[0].path.slice(-4) != ".jpg") {
        Swal.fire({
          icon: "error",
          title: "حصل خطأ",
          text: "الرجاء التأكد ان نوع الملف .jpg",
          confirmButtonText: "حسنا",
          backdrop: false,
          customClass: {
            container: "alert-container",
            popup: "alert-popup",
            header: "alert-header",
            title: "alert-title",
            icon: "alert-icon",

            htmlContainer: "alert-html-container",
            confirmButton: "alert-confirm-button",
          },
        })
        return
      }

      console.log(files[0].path)
      if (!files.length) return
      else {
        window.api.send("copyIsg", { photoPath: files[0].path, photoName: 'isg' + this.$store.state.found.ID + ".jpg",id:this.$store.state.found.ID })
        this.photoSrc = files[0].path
      }
      //console.log({ photoPath: files[0].path, photoName: this.$store.state.found.ID + ".jpg" })
    },
  },
}
</script>

<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div class="modal" role="dialog" aria-labelledby="modalTitle" aria-describedby="modalDescription">
        <header class="modal-header" id="modalTitle">تصاريح الموظف: {{ $store.state.found.Name }}</header>

        <section class="modal-body" id="modalDescription">
          <div class="img-element">
            <div class="img koc-image" :style=" kocImgSrc "> a</div>
            <div @click="openDialog('koc')" class="btns koc-button">رفع تصريح نفط الكويت</div>
          </div>
          <div class="img-element">
            <div class="img isg-image" :style="isgImgSrc">a </div>
            <div @click="openDialog('isg')" class="btns isg-button">رفع تصريح شعيبة الصناعية</div>
          </div>
        </section>

        <div class="close-btn-container">
          <button type="button" class="btn-green" @click="close" aria-label="Close modal">إغلاق</button>
        </div>
      </div>
       <input @change="onFileChangeKoc" type="file" style="display: none" ref="photoUploadKoc" accept="image/jpeg" />
    <input @change="onFileChangeIsg" type="file" style="display: none" ref="photoUploadIsg" accept="image/jpeg" />
    </div>
   
  </transition>
</template>

<style>
.modal-backdrop {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  /* background-color: rgba(0, 0, 0, 0.3); */
  backdrop-filter: blur(2px);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: #1e1f23;
  /* box-shadow: 2px 2px 20px 1px; */
  overflow-x: auto;
  border-radius: 5px;
  /* width:800px; */
  border: 1px solid #d6d862;
  display: flex;
  flex-direction: column;
  font-family: "Cairo";
  text-align: center;
}

.modal-header,
.modal-footer {
  padding: 15px;
  display: flex;
  color: white;
}

.modal-header {
  position: relative;
  border-bottom: 1px solid #eeeeee;
  color: white;
  justify-content: space-between;
}

.modal-footer {
  border-top: 1px solid #eeeeee;
  flex-direction: column;
}
.close-btn-container {
  text-align: center;
}
.modal-body {
  position: relative;
  padding: 20px 10px;
  display: flex;
  padding: 5px;
  align-content: center;
  align-items: center;
  justify-content: center;
}
.img-element {
  text-align: center;
  flex: 1;
  max-width: 300px;
  margin: 10px;
}
.img {
  width: 300px;
  height: 400px;
  border: 1px solid #3b3b3b;
  border-radius: 5px;
  background-size: cover;
}
.btns {
  flex: 1;
  border: 1px solid white;
  color: white;
  text-align: center;
  cursor: pointer;
  padding: 5px;
  margin: 5px;
}
.btns:hover {
  background: white;
  color: black;
}

.btn-close {
  font-size: 20px;
  margin: 10px;
  padding: 10px;
  cursor: pointer;
  font-weight: bold;
  color: #4aae9b;
  background: transparent;
  cursor: pointer;
  font-family: "Cairo";
}

.btn-green {
  color: white;
  width: 50%;
  font-family: "Cairo";
  background: #4aae9b;
  border: 1px solid #4aae9b;
  border-radius: 2px;
  margin: 0 auto 0 auto;
  margin: 10px;
}

.modal-fade-enter,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.5s ease;
}
</style>
