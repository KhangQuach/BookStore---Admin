<script setup>
import axios from 'axios';
import { reactive, ref } from 'vue';
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import { defineProps } from 'vue';
import { UserAddOutlined } from '@ant-design/icons-vue';
const props = defineProps({
  dataSource : Array
})

const form = reactive({
  username: '', password: '', fullname: '',
  role: '', email: '', phone: '', birthday: null,
  age: null, gender: '', address1: '',
  address2: '', address3: '', description: '',
});
const rules = {
  username: [{required:true,message: 'Please enter user name'}],
  password: [{required:true,message: 'please enter password'}],
  fullname: [{required:true,message: 'Please enter full name'}],
  role: [{required:true,message: 'Please choose role'}],
  email: [{required:true,message: 'Please enter email'}],
  phone: [{required:true,message: 'Please enter phone '}],
  birthday: [{required:true,message: 'Please choose Birth Day',type: 'object',}],
  age: [{required:true,message: 'Please enter age'}],
  gender: [{required:true,message: 'Please choose gender'}],
  address1: [{message: 'Please enter address '}],
  address2: [{message: 'Please enter address'}],
  address3: [{message: 'Please enter address'}],
  description: [{message: 'Please enter url description'}]
};
const open = ref(false);
const showDrawer = () => {
  open.value = true;
};
const onClose = () => {
  open.value = false;
};
const onSubmit = async () =>{
  if(form.username && form.password && form.fullname && form.role && form.email && form.phone && form.birthday && form.age && form.gender){
    try{
      const { data } = await axios.post('http://localhost:3000/user',form)
      if(data.success === false){
        toast("Failed to add user!", {
          "type": "error",
          "position": "bottom-left",
          "transition": "slide",
          "dangerouslyHTMLString": true
        })
      }
      else{
        toast("User added successfully!", {
          "type": "success",
          "position": "bottom-left",
          "transition": "slide",
          "dangerouslyHTMLString": true
        })
        open.value = false;
      }
      props.dataSource = [...props.dataSource, data.result]
    }
    catch(e){
      console.log(e.message)
    }
  }
  else{
    toast("Please fill out form!", {
      "type": "error",
      "position": "bottom-left",
      "transition": "slide",
      "dangerouslyHTMLString": true
    })
  }
}
</script>
<template>
  <a-button @click="showDrawer" class="flex items-center">
    <template #icon><UserAddOutlined /></template>
    Add user
  </a-button>
  <a-drawer
    title="Create a new account"
    :width="620"
    :open="open"
    :body-style="{ paddingBottom: '80px' }"
    :footer-style="{ textAlign: 'right' }"
    @close="onClose"
  >
    <a-form :model="form" :rules="rules" layout="vertical">
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item label="Username" name="username">
            <a-input v-model:value="form.username" placeholder="Please enter user name" />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="Password" name="password">
            <a-input-password v-model:value="form.password" placeholder="Please enter password" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item label="Full name" name="fullname">
            <a-input  v-model:value="form.fullname" placeholder="Please enter Full name" />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="Role" name="role">
            <a-select v-model:value="form.role" placeholder="Select role">
              <a-select-option value="user">User</a-select-option>
              <a-select-option value="admin">Admin</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item label="Email" name="email">
            <a-input v-model:value="form.email" placeholder="Please enter email" />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="Phone Number" name="phone">
            <a-input v-model:value="form.phone" placeholder="Please enter phone" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="8">
          <a-form-item label="Birth Day" name="birthday">
            <a-date-picker
              v-model:value="form.birthday"
              style="width: 100%"
              :get-popup-container="trigger => trigger.parentElement"
            />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="Age" name="age">
            <a-input-number class="w-full" v-model:value="form.age" placeholder="Please enter age" :min="1" :max="100" />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="Gender" name="gender">
            <a-select v-model:value="form.gender" placeholder="Please choose gender">
              <a-select-option value="male">Male</a-select-option>
              <a-select-option value="female">Female</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="24">
          <a-form-item label="Address 1" name="address1">
            <a-input v-model:value="form.address1" placeholder="Please enter address 1" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="24">
          <a-form-item label="Address 2" name="address2">
            <a-input v-model:value="form.address2" placeholder="Please enter address 2" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="24">
          <a-form-item label="Address 3" name="address3">
            <a-input v-model:value="form.address3" placeholder="Please enter address 3" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="24">
          <a-form-item label="Description" name="description">
            <a-textarea
              v-model:value="form.description"
              :rows="4"
              placeholder="please enter url description"
            />
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
    <template #extra>
      <a-space>
        <a-button @click="onClose">Cancel</a-button>
        <a-button type="primary" @click="onSubmit">Submit</a-button>
      </a-space>
    </template>
  </a-drawer>
</template>
