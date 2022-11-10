<template>
  <div v-if="$store.state.found.ID.length > 0" class="container">
    <div class="main-container">
      <div class="element-containers-container">
        <div class="element-container">
          <div class="element">
            <label>الرقم المدني</label>
            <input placeholder="الرقم المدني" v-model="ID" />
          </div>
          <div class="element">
            <label>الإسم</label>
            <input placeholder="اسم الموظف" v-model="Name" />
          </div>
          <div class="element">
            <label>التلفون</label>
            <input placeholder="رقم الهاتف" v-model="Phone_Number" />
          </div>
          <div class="element">
            <label>الجنسية</label>
            <input placeholder="الجنسية" v-model="Country" />
          </div>
          <div class="element">
            <label>القسم</label>
            <select v-model="Department">
              <option value="قسم البطاريات">قسم البطاريات</option>
              <option value="قسم صيانة المعدات">قسم صيانة المعدات</option>
              <option value="قسم المحولات">قسم المحولات</option>
              <option value="قسم الوقاية">قسم الوقاية</option>
              <option value="قسم الإطفاء">قسم الإطفاء</option>
              <option value="قسم أعمال المدني">قسم أعمال المدني</option>
              <option value="الإدارة">الإدارة</option>
            </select>
          </div>

          <div class="element">
            <label>الوظيفة</label>
            <input placeholder="الوظفية" v-model="Job" />
          </div>
          <div class="element">
            <label>تاريخ إنتهاء البطاقة المدنية</label>
            <input v-model="Civil_ID_EXP" placeholder="تاريخ إنتهاء البطاقة المدنية"  />
          </div>
          <div class="element">
            <label>تاريخ إنتهاء تصريح نفظ الكويت</label>
            <input placeholder="تاريخ إنتهاء تصريح نفظ الكويت" v-model="KOC_GP_EXP" />
          </div>

          <div class="element">
            <label>تاريخ إنتهاء تصريح شعيبة الصناعية</label>
            <input placeholder="تاريخ إنتهاء تصريح شعيبة الصناعية" v-model="ISHUAIBA_GP_EXP" />
          </div>
          <div class="element">
            <label>ملاحظات</label>
            <input placeholder="ملاحظات" v-model="Notes" />
          </div>
          <div @click="openRegistration()" class="element registration-element">
            <label class="registration-label"> </label>
            <span class="registration-link">عرض وإضافة تصاريح الموظف</span>
          </div>
        </div>
      </div>
      <div class="image-container">
        <img @click="openDialog()" class="photo" @error="$store.state.noPhoto = true" :src="photoSrc" />
        <!-- <object class="photo" :data="`./assets/photos/${$store.state.found.ID}.jpg`" type="image/jpeg">
          <img class="photo" src="`./assets/photos/no_photo.jpg`" />
        </object> -->
      </div>
    </div>
    <button class="save-button" @click="save()">حفظ التغييرات</button>

    <input @change="onFileChange" type="file" style="display: none" ref="photoUpload" accept="image/jpeg" />
  </div>
  <div class="no-search" v-else>
    <p>{{ $store.state.findViewText }}</p>
  </div>
  <Modal  v-show="$store.state.isModalVisible" @close="closeModal" />
</template>

<script>
import Swal from "sweetalert2"
import Modal from "./Modal.vue"
// window.api.receive("registrationFiles", (obj) => {
//   console.log("this is files", obj)
//   //this.$store.dispatch("setPhotosPath", obj);
//   vm.$data.registrationPhotos = obj
//   $data.isModalVisible = true
// })
export default {
  components: {
    Modal,
  },
  data() {
    return {
      
      photoSrc: this.$store.state.photosPath + this.$store.state.found.ID + ".jpg",
      dataPhotoUrl: null,
    }
  },

  mounted() {
    
    
    
    console.log(this.$store.state.photosPath + this.$store.state.found.ID + ".jpg")
    if (this.$store.state.searchTerm == "") {
      this.$store.state.findViewText = "الرجاء البحث باستخدام الرقم المدني"
    }
  },
  methods: {
    closeModal() {
     this.$store.dispatch("updateIsModalVisibile",false);
    },
    openRegistration() {
      window.api.send("requestRegistration", this.$store.state.found.ID)
    },
    onFileChange(e) {
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
        window.api.send("photoToCopy", { photoPath: files[0].path, photoName: this.$store.state.found.ID + ".jpg" })
        this.photoSrc = files[0].path
      }
      console.log({ photoPath: files[0].path, photoName: this.$store.state.found.ID + ".jpg" })
    },
    openDialog() {
      console.log("upload")
      this.$refs.photoUpload.click()
    },
    save() {
      console.log(this.$store.state.found)
      this.$store.dispatch("saveDbChanges")
      window.api.send("toMain", JSON.stringify(this.$store.state.db))
      Swal.fire({
        icon: "success",
        title: "نجاح!",
        text: "تم تحديث بيانات الموظف بنجاح",
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
    },
  },
  watch: {
    "$store.state.noPhoto": function () {
      if (this.$store.state.noPhoto == false) {
        //return this.$store.state.found.ID
        this.photoSrc = this.$store.state.photosPath + this.$store.state.found.ID + ".jpg"
      } else {
        this.photoSrc = this.$store.state.photosPath + "no_photo" + ".jpg"
      }
    },
    "$store.state.found": function () {
      this.photoSrc = this.$store.state.photosPath + this.$store.state.found.ID + ".jpg"
    },
  },
  computed: {
    // photoUrl: {
    //   get() {
    //     if (this.$store.state.noPhoto == false) {
    //       //return this.$store.state.found.ID
    //       return this.$store.state.photosPath + this.$store.state.found.ID + ".jpg";
    //     } else {
    //       return this.$store.state.photosPath + "no_photo" + ".jpg";
    //     }
    //   },
    //   set(value){

    //   }
    // },
    // noPhoto: {
    //   get() {
    //     return this.$store.state.noPhoto;
    //   },
    //   set(value) {
    //     this.$store.dispatch("updateNoPhoto", value);
    //   },
    // },
    Civil_ID_EXP: {
      get() {
        return this.$store.state.found["Civil ID EXP"]
      },
      set(value) {
        this.$store.dispatch("updateFoundCivil_ID_EXP", value)
      },
    },
    ID: {
      get() {
        return this.$store.state.found.ID
      },
      set(value) {
        this.$store.dispatch("updateFoundID", value)
      },
    },
    Name: {
      get() {
        return this.$store.state.found.Name
      },
      set(value) {
        this.$store.dispatch("updateFoundName", value)
      },
    },
    Department: {
      get() {
        return this.$store.state.found.Department
      },
      set(value) {
        this.$store.dispatch("updateFoundDepartment", value)
      },
    },
    Job: {
      get() {
        return this.$store.state.found.Job
      },
      set(value) {
        this.$store.dispatch("updateFoundJob", value)
      },
    },
    
    KOC_GP_EXP: {
      get() {
        return this.$store.state.found["KOC GP EXP"]
      },
      set(value) {
        this.$store.dispatch("updateFoundKOC_GP_EXP", value)
      },
    },
    ISHUAIBA_GP_EXP: {
      get() {
        return this.$store.state.found["ISHUAIBA GP EXP"]
      },
      set(value) {
        this.$store.dispatch("updateFoundISHUAIBA_GP_EXP", value)
      },
    },
    Phone_Number: {
      get() {
        return this.$store.state.found['Phone Number']
      },
      set(value) {
        this.$store.dispatch("updateFoundPhone_Number", value)
      },
    },
    Country: {
      get() {
        return this.$store.state.found['Country']
      },
      set(value) {
        this.$store.dispatch("updateFoundCountry", value)
      },
    },
    Notes: {
      get() {
        return this.$store.state.found['Notes']
      },
      set(value) {
        this.$store.dispatch("updateFoundNotes", value)
      },
    },
  },
}
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
  margin-bottom: 20px;
  align-items: center;
  justify-content: center;
  text-align: center;
}
.main-container {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}
.photo {
  width: 200px;
  border-radius: 20px;
  cursor: pointer;
}

.image-container {
  flex: auto;
}
.element-containers-container {
  flex: 10;
}
.element {
  flex: 1;
  display: flex;
  align-items: baseline;
  margin-bottom: 5px;
}

label {
  color: white;
  font-family: "Cairo";
  font-size: 13px;
  display: block;
  flex: 0.5;
  text-align: center;
}
input,
select {
  flex: 1;
  /* border-radius: 5px; */
  color: white;
  border: none;
  width: 90%;
  direction: rtl;
  text-align: right;
  outline: none;
  /* padding: 5px; */
  background: #1e1f23;
  font-size: 12px;
  font-family: "Tajawal";
  border-bottom: 1px solid #3b3b3b;
}
.save-button {
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
  margin-top: 70px;
  margin-bottom: 30px;
  cursor: pointer;
}
.save-button:hover {
  background: white;
  color: black;
}
.no-search {
  width: 100%;
  margin-top: 200px;
  text-align: center;
  font-size: 30px;
  color: #3b3b3b;
  font-family: "Cairo";
}
.registration-label {
  color: #d6d862;
}
.registration-link {
  text-decoration: none;
  font-size: 14px;
  font-family: "Cairo";
  text-align: center;
}
.registration-element {
  text-align: center;
  color: #d6d862;
  border: 1px solid #3b3b3b;
  cursor: pointer;
  padding: 5px;
}
.registration-element:hover {
  background: white;
  color: black;
}
</style>
