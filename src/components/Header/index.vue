<script setup>

</script>

<template>
  <div class="h-16  fixed w-full bg-white z-10 border-b-2 flex flex-row-reverse items-center gap-2">
    <a-avatar :size="40" class="mr-4">
        <template #icon><UserOutlined /></template>
    </a-avatar>
    <a-button>Alert</a-button>
    <a-button>Profile</a-button>
    <a-input-search
      v-model:value="value"
      placeholder="input search text"
      enter-button
      @search="onSearch"
      class="w-60"
    />
  </div>
</template>