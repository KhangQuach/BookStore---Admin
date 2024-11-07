<script setup>
import axios from 'axios';
import { reactive, ref } from 'vue';
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import { defineProps } from 'vue';
import { SettingOutlined } from '@ant-design/icons-vue';
import { handleStringDate, handleObjectDate } from '../../utils/helpers/handleDate.js'
import dayjs from 'dayjs'
const props = defineProps({
  record_id : String
})
const form = reactive({
  price: '', rate: '', author: '',
  typeBook: [], part: [], publishDate: null, publisher: '',
  language: '', pageNumber: '', description: '',
  category: '',name: ''
});
const rules = {
  price: [{required:true,message: 'Please enter price'}],
  rate: [{required:true,message: 'please enter rate'}],
  author: [{required:true,message: 'Please enter author'}],
  typeBook: [{required:true, message: 'Please choose type', type: 'array'}],
  part: [{required:true,message: 'Please choose part', type: 'array'}],
  publishDate: [{required:true,message: 'Please enter phone ',type: 'object'}],
  publisher: [{required:true,message: 'Please enter publisher'}],
  language: [{required:true,message: 'Please choose language'}],
  pageNumber: [{required:true,message: 'Please enter page number'}],
  description: [{required:true,message: 'Please enter description '}],
  category: [{required:true,message: 'Please choose category'}],
  name: [{required:true,message: 'Please enter name'}]
};
const open = ref(false);
const showDrawer = async () => {
  try{
    const {data} = await axios.get(`http://localhost:3000/book/${props.record_id}`)
    if(data){
      open.value = true
      form.value = data
      form.value.data.publishDate = dayjs(handleObjectDate(form.value.data.publishDate))
    }
  }
  catch(e){
    console.log(e)
  }
};
const onClose = () => {
  open.value = false;
};
const onSubmit = async () =>{
  try{
    console.log(form.value)
    const result = await axios.patch(`http://localhost:3000/book/${props.record_id}`,form.value.data)
    console.log(result)
    if(result.data.success === true){
      open.value = false
      toast("Updated! Please refresh page", {
        "type": "success",
        "position": "bottom-left",
        "transition": "slide",
      })
    }
    else{
      toast("Cant Update!", {
      "type": "error",
      "position": "bottom-left",
      "transition": "slide",
      "dangerouslyHTMLString": true
    })
    }
  }
  catch(e){
    console.log(e)
  }
}
const partOptions = []
for (let i = 1; i < 500; i++) {
  const value = `Part ${i}`;
  partOptions.push({value});
}
</script>
<template>
  <a-button @click="showDrawer" type="primary" class="flex justify-center items-center   px-4 ">
    <SettingOutlined/>
  </a-button>
  <a-drawer
    title="Update book"
    :width="620"
    :open="open"
    :body-style="{ paddingBottom: '80px' }"
    :footer-style="{ textAlign: 'right' }"
    @close="onClose"
  >
  <a-form :model="form" :rules="rules" layout="vertical">
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item label="Name" name="name">
            <a-input v-model:value="form.value.data.name" placeholder="Please enter name" />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="Price" name="price">
            <a-input v-model:value="form.value.data.price" placeholder="Please enter price" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item label="Author" name="author">
            <a-input  v-model:value="form.value.data.author" placeholder="Please enter author" />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="Language" name="role">
            <a-select v-model:value="form.value.data.language" placeholder="Select language">
              <a-select-option value="vietnamese">Vietnamese</a-select-option>
              <a-select-option value="english">English</a-select-option>
              <a-select-option value="china">China</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item label="Publisher" name="publisher">
            <a-input v-model:value="form.value.data.publisher" placeholder="Please enter publisher" />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="Publish Date" name="publicDate">
            <a-date-picker
              v-model:value="form.value.data.publishDate"
              style="width: 100%"
              :get-popup-container="trigger => trigger.parentElement"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item label="Category" name="category">
            <a-select v-model:value="form.value.data.category" placeholder="Select category">
              <a-select-option value="children">Children</a-select-option>
              <a-select-option value="cookbook">Cook Book</a-select-option>
              <a-select-option value="horror">Horror</a-select-option>
              <a-select-option value="mystery">Mystery</a-select-option>
              <a-select-option value="romance">Romance</a-select-option>
              <a-select-option value="thriller">Thriller</a-select-option>
              <a-select-option value="travel">Travel</a-select-option>
              <a-select-option value="other">Other</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="Page Number" name="pageNumber">
            <a-input-number class="w-full" v-model:value="form.value.data.pageNumber" placeholder="Please enter page number" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item label="Rate" name="rate">
            <a-input v-model:value="form.value.data.rate" placeholder="Please enter email" />
          </a-form-item>
        </a-col>
        
        <a-col :span="12">
          <a-form-item
            name="part"
            label="Part"
          >
            <a-select
              v-model:value="form.value.data.part"
              mode="multiple"
              placeholder="Please select parts"
              :options="partOptions"
            >
            </a-select>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="24">
          <a-form-item
            name="typeBook"
            label="Type Book"
          >
            <a-select
              v-model:value="form.value.data.typeBook"
              mode="multiple"
              placeholder="Please select type book!"
            >
              <a-select-option value="hardcover">Hardcover</a-select-option>
              <a-select-option value="ebook">eBook</a-select-option>
              <a-select-option value="audiobook">Audio Book</a-select-option>
              <a-select-option value="audiocd">Audio CD</a-select-option>
              <a-select-option value="physicalbook">Physical Book</a-select-option>
              
            </a-select>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="24">
          <a-form-item label="Description" name="description">
            <a-textarea
              v-model:value="form.value.data.description"
              :rows="4"
              placeholder="please enter description"
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
