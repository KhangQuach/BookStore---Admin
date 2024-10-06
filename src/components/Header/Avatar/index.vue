<template>
  <a-popover v-model:open="visible"  trigger="click" placement="bottomRight" class="mr-5">

    <template #content>
      <div class="p-3">

        <div class="flex gap-4 justify-center items-center">
          <a-avatar :size="40" class=" cursor-pointer">
            <template #icon><UserOutlined /></template>
          </a-avatar>
            <h1 class="font-bold text-[20px]">Quach Thieu Khang</h1>
        </div>

        <div class="mt-6">
          <a-button type="text" class=" flex items-center w-full text-base text-left p-5">
            <ProfileOutlined  class="text-[22px]"/>
            View Profile
          </a-button>
          <a-button type="text" class=" flex items-center w-full text-base text-left p-5" @click="handleLogout">
            <LogoutOutlined class="text-[22px]"/>
            Log out
          </a-button>
        </div>
        
      </div>
      <a @click="hide" class="">Close</a>
    </template>

    <a-avatar :size="40" class="mr-4 cursor-pointer">
      <template #icon><UserOutlined /></template>
    </a-avatar>
  </a-popover>
</template>
<script setup>
import { ref } from 'vue';
import router from '../../../routes';
import { LogoutOutlined, ProfileOutlined } from '@ant-design/icons-vue';
const visible = ref(false);
const hide = () => {
  visible.value = false;
};
const handleLogout = () => {
  router.push("/sign-in")
}
const handleViewProfile = () => {
  // Handle view profile
}
</script>