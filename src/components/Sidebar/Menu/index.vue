<template>
  <a-menu
    id="dddddd"
    v-model:openKeys="openKeys"
    v-model:selectedKeys="selectedKeys"
    mode="inline"
    :items="items"
    class="text-base bg-transparent "
    @click="handleClick"
  ></a-menu>
</template>

<script setup>
import { reactive, ref, watch, h } from 'vue'
import { useRoute } from 'vue-router';
import router from '../../../routes';
const route = useRoute()
const selectedKeys = ref([`${route.path}`])
const openKeys = ref(['sub1'])

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  }
}
const items = reactive([
  getItem(
    'data',
    'grp',
    null,
    [
      getItem('Home', '/'),
      getItem('User', '/user'),
      getItem('Book', '/book'),
    ],
    'group'
  ),
])
const handleClick = (e) => {
  router.push(`${e.key}`)
  console.log('click', e)
}
watch(openKeys, val => {
  console.log('openKeys', val)
})
</script>