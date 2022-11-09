<template>
  <div class="container">
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
            <input placeholder="رقم الهاتف" v-model="Phone" />
          </div>
           <div class="element">
            <label>الجنسية</label>
            <input placeholder="الجنسية" v-model="Nationality" />
          </div>
          <div class="element">
            <label>القسم</label>
            <select v-model="Dept">
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
            <input placeholder="تاريخ إنتهاء البطاقة المدنية" v-model="Civil_ID_expire_date" />
          </div>
          <div class="element">
            <label>تاريخ إنتهاء تصريح نفظ الكويت</label>
            <input placeholder="تاريخ إنتهاء تصريح نفظ الكويت" v-model="KOC_expire_date" />
          </div>
       
          <div class="element">
            <label>تاريخ إنتهاء تصريح شعيبة الصناعية</label>
            <input placeholder="تاريخ إنتهاء تصريح شعيبة الصناعية" v-model="Shuaiba_Expire_date" />
          </div>
           <div class="element">
            <label>ملاحظات</label>
            <input placeholder="ملاحظات" v-model="Notes" />
          </div>
        </div>
      </div>
       <div class="image-container">
        <img @click="openDialog()" :src="photoSrc" />
      </div>
    </div>
    <button class="save-button" @click="add()">إضافة موظف</button>
    <input @change="onFileChange" type="file" style="display: none" ref="photoUpload" />
  </div>
</template>

<script>
//import Swal from "sweetalert2";
import Swal from "sweetalert2"
export default {
  data() {
    return {
      ID: "",
      Name: "",
      Dept: "",
      Job: "",
      Civil_ID_expire_date: "",
      KOC_expire_date: "",
      Shuaiba_Expire_date: "",
      photoSrc: this.$store.state.photosPath + "add.jpg",
    }
  },
  mounted() {},
  methods: {
    onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files
      console.log(files[0].path)
      if (this.ID.length == 12) {
        if (!files.length) return
        else window.api.send("photoToCopy", { photoPath: files[0].path, photoName: this.ID + ".jpg" })
        console.log({ photoPath: files[0].path, photoName: this.ID + ".jpg" })
        this.photoSrc = files[0].path
      } else {
        Swal.fire({
          icon: "error",
          title: "حصل خطأ",
          text: "الرجاء التأكد من الرقم المدني",
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
      }
    },
    openDialog() {
      console.log("upload")
      this.$refs.photoUpload.click()
    },
    add() {
      if (this.ID.length != 12) {
        Swal.fire({
          icon: "error",
          title: "حصل خطأ",
          text: "الرجاء التأكد من الرقم المدني",
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
      for (var i = 0; i < this.$store.state.db.length; i++) {
        if (this.$store.state.db[i].ID == this.ID) {
          Swal.fire({
            icon: "error",
            title: "حصل خطأ",
            text: "يوجد موظف بنفس الرقم المدني في قاعدة البيانات",
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
      }
      this.$store.state.db.push({ ID: this.ID, Name: this.Name, Dept: this.Dept, Job: this.Job, "Civil ID expire date": this.Civil_ID_expire_date, "KOC expire date": this.KOC_expire_date, "Shuaiba Expire date": this.Shuaiba_Expire_date })
      window.api.send("toMain", JSON.stringify(this.$store.state.db))
      Swal.fire({
        icon: "success",
        title: "نجاح!",
        text: "تم إضافة الموظف بنجاح",
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
    getPhoto() {
      return "add"
    },
  },
  computed: {},
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
img {
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
  margin-bottom:5px;
}

label {
  color: white;
  font-family: "Cairo";
  font-size: 12px;
  display: block;
  flex:.5;
  text-align: center;
}
input,select {
  flex:1;
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
  background: #62d868;
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
</style>
