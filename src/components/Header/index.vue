<script setup>
import { BellOutlined, MailOutlined } from '@ant-design/icons-vue';
import Avatar from "./Avatar/index.vue"
import { ref } from 'vue';
const search = ref("")
const onSearch = () =>{
}
</script>

<template>
  <div class="h-16  fixed w-full bg-white z-10 border-b-2 flex flex-row-reverse items-center gap-3">
    
    <Avatar/>
    <a-badge :count="0">
      <a-button class="flex justify-center items-center">
        <MailOutlined />
      </a-button>
    </a-badge>
    <a-badge :count="32">
      <a-button class="flex justify-center items-center" >
        <BellOutlined />
      </a-button>
    </a-badge>
    <a-input-search
      v-model:value="search"
      placeholder="input search text"
      enter-button
      @search="onSearch"
      class="w-60"
    />
  </div>
</template>