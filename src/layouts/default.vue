<script setup>
 import Header from "../components/Header/index.vue"
 import Sidebar from "../components/Sidebar/index.vue"
 import Footer from "../components/Footer/index.vue"
import router from "../routes";
 const id = localStorage.getItem("id")
 const token = localStorage.getItem("token")
 if(!id || !token){
  router.push("/sign-in")
 }
</script>

<template>
  <div class="">
    <Sidebar/>
    <div class="h-full">
      <Header />
      <div class="pt-16 ml-60 bg-gray-100 z-10 h-fit h-screen">
        <router-view/>
      </div>
    </div>
    
  </div>
</template>
