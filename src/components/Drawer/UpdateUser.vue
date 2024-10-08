<script setup>
import axios from 'axios';
import { reactive, ref } from 'vue';
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import { defineProps } from 'vue';
import { SettingOutlined } from '@ant-design/icons-vue';
import { handleStringDate, handleObjectDate } from '../../utils/helpers/handleDate.js';
const props = defineProps({
  record_id : String
})
const form = reactive({})
const rules = {
  username: [{required:true,message: 'Please enter user name'}],
  password: [{required:true,message: 'please enter password'}],
  fullname: [{required:true,message: 'Please enter full name'}],
  role: [{required:true,message: 'Please choose role'}],
  email: [{required:true,message: 'Please enter email'}],
  phone: [{required:true,message: 'Please enter phone '}],
  birthday: [{required:true,message: 'Please choose Birth Day'}],
  age: [{required:true,message: 'Please enter age'}],
  gender: [{required:true,message: 'Please choose gender'}],
  address1: [{message: 'Please enter address '}],
  address2: [{message: 'Please enter address'}],
  address3: [{message: 'Please enter address'}],
  description: [{message: 'Please enter url description'}]
};
const open = ref(false);
const showDrawer = async () => {
  try{
    const {data} = await axios.get(`http://localhost:3000/user/${props.record_id}`)
    form.value = data
    open.value = true;
  }
  catch(e){
    console.log(e)
  }
};
const onClose = () => {
  open.value = false;
};
const onSubmit = async () =>{
  console.log(form.value.birthday)
  // console.log(props.record_id)
}
</script>
<template>
  <a-button @click="showDrawer" type="primary" class="flex justify-center items-center   px-4 ">
    <SettingOutlined/>
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
            <a-input v-model:value="form.value.username" placeholder="Please enter user name" />
            
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="Password" name="password">
            <a-input-password v-model:value="form.value.password" placeholder="Please enter password" />
            
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item label="Full name" name="fullname">
            <a-input  v-model:value="form.value.fullname" placeholder="Please enter Full name" />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="Role" name="role">
            <a-select v-model:value="form.value.role" placeholder="Select role">
              <a-select-option value="user">User</a-select-option>
              <a-select-option value="admin">Admin</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item label="Email" name="email">
            <a-input v-model:value="form.value.email" placeholder="Please enter email" />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="Phone Number" name="phone">
            <a-input v-model:value="form.value.phone" placeholder="Please enter phone" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="8">
          <a-form-item label="Birth Day" name="birthday">
            <a-date-picker
              v-model:value="form.value.birthday"
              style="width: 100%"
              :get-popup-container="trigger => trigger.parentElement"
            />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="Age" name="age">
            <a-input-number class="w-full" v-model:value="form.value.age" placeholder="Please enter age" :min="1" :max="100" />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="Gender" name="gender">
            <a-select v-model:value="form.value.gender" placeholder="Please choose gender">
              <a-select-option value="male">Male</a-select-option>
              <a-select-option value="female">Female</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="24">
          <a-form-item label="Address 1" name="address1">
            <a-input v-model:value="form.value.address1" placeholder="Please enter address 1" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="24">
          <a-form-item label="Address 2" name="address2">
            <a-input v-model:value="form.value.address2" placeholder="Please enter address 2" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="24">
          <a-form-item label="Address 3" name="address3">
            <a-input v-model:value="form.value.address3" placeholder="Please enter address 3" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="24">
          <a-form-item label="Description" name="description">
            <a-textarea
              v-model:value="form.value.description"
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
