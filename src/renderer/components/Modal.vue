<script>
export default {
  name: "Modal",
  
  mounted(){
    console.log(this.$store.state.registrationPhotos);
  },
  methods: {
    close() {
      this.$emit("close")
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
          <slot name="body"> This is the default body! </slot>
        </section>

        <footer class="modal-footer">
          This is the default footer!

          <button type="button" class="btn-green" @click="close" aria-label="Close modal">إغلاق</button>
        </footer>
      </div>
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
  
  border: 1px solid #d6d862;
  display: flex;
  flex-direction: column;
  font-family: "Cairo";
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

.modal-body {
  position: relative;
  padding: 20px 10px;
}

.btn-close {
  position: absolute;
  top: 0;
  right: 0;
  border: none;
  font-size: 20px;
  padding: 10px;
  cursor: pointer;
  font-weight: bold;
  color: #4aae9b;
  background: transparent;
  font-family: "Cairo";
}

.btn-green {
  color: white;
  font-family: "Cairo";
  background: #4aae9b;
  border: 1px solid #4aae9b;
  border-radius: 2px;
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
