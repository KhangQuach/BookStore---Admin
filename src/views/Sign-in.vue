
<template>
  <div class="absolute w-[420px] h-fit h-52 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 py-16 px-12 rounded-md border shadow-md">
    <h1 class="text-center mb-7 font-bold text-[22px] text-blue-500">BOOK CORNER</h1>
    <a-form
    :model="formState"
    name="normal_login"
    class="login-form"
    @finish="onFinish"
    @finishFailed="onFinishFailed"
  >
    <a-form-item
      label="Username"
      name="username"
      :rules="[{ required: true, message: 'Please input your username!' }]"
    >
      <a-input v-model:value="formState.username">
        <template #prefix>
          <UserOutlined />
        </template>
      </a-input>
    </a-form-item>

    <a-form-item
      label="Password"
      name="password"
      :rules="[{ required: true, message: 'Please input your password!' }]"
    >
      <a-input-password v-model:value="formState.password">
        <template #prefix>
          <LockOutlined  />
        </template>
      </a-input-password>
    </a-form-item>

    <a-form-item >
      <a-form-item name="remember" no-style>
        <a-checkbox v-model:checked="formState.remember">Remember me</a-checkbox>
      </a-form-item>
      <a class="login-form-forgot" href="">Forgot password</a>
    </a-form-item>

    <a-form-item>
      <a-button :disabled="disabled" type="primary" html-type="submit" class="login-form-button w-full">
        Log in
      </a-button>
      Or
      <a href="">register now!</a>
    </a-form-item>
  </a-form>
  </div>
</template>
<script setup>
import { LockOutlined, UserOutlined } from '@ant-design/icons-vue'
import axios from 'axios'
import { reactive, computed } from 'vue'
import router from '../routes'
import { toast } from 'vue3-toastify';
const formState = reactive({
  username: '',
  password: '',
})
const onFinish = async (values) => {
  try{
    const response =  await axios.post('http://localhost:3000/login', formState)
    console.log(response)
    if(response.data.success) {
      toast("Login successfully!", {
        "type": "success",
        "position": "bottom-left",
        "transition": "slide",
        "dangerouslyHTMLString": true
      })
      setTimeout(() => {
        localStorage.setItem("id", response.data.id)
        localStorage.setItem('token', response.data.token)
        router.push('/')
      }, 3000);
    }
    else {
      toast.error("Invalid credentials.", {
        "type": "error",
        "position": "bottom-left",
        "transition": "slide",
        "dangerouslyHTMLString": true
      })
    }
  }
  catch(e){
    toast.error("Oops! Something went wrong.", {
      "type": "error",
      "position": "bottom-left",
      "transition": "slide",
      "dangerouslyHTMLString": true
    })
    return;
  }
}
const onFinishFailed = errorInfo => {
  console.log('Failed:', errorInfo)
}
const disabled = computed(() => {
  return !(formState.username && formState.password)
})
</script>
<style scoped>
#components-form-demo-normal-login .login-form-forgot {
  float: right
}
</style>
