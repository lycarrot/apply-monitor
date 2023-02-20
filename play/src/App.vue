<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
var obj = {}
function a(){
for (var i = 0; i < 1000; i++) {
obj[i] = new Array(100000)
}
}

setInterval(()=>{
a()
},5000)

</script>

<template>
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <HelloWorld msg="Vite + Vue" />
  <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
  <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
  <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
  <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
  <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
  <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
