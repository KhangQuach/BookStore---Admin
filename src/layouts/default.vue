<script setup>
 import Header from "../components/Header/index.vue"
 import Sidebar from "../components/Sidebar/index.vue"
 import Footer from "../components/Footer/index.vue"
</script>

<template>
  <div class="" style="height: 2000px">
    <Sidebar/>
    <div class="h-full">
      <Header />
      <div class="pt-16 ml-60">
        <router-view/>
      </div>
    </div>
    
  </div>
</template>
