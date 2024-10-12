<script setup>
import axios from 'axios';
import { reactive, ref, computed } from 'vue';
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import { defineProps } from 'vue';
import { PlusOutlined  } from '@ant-design/icons-vue';
import { validateAddBook } from '../../utils/helpers/validate';

const OPTIONS = ['Apples', 'Nails', 'Bananas', 'Helicopters'];
const selectedItems = ref([]);
const filteredOptions = computed(() => OPTIONS.filter(o => !selectedItems.value.includes(o)));

const props = defineProps({
  dataSource : Array
})

const form = reactive({
  price: '', rate: '', author: '',
  typeBook: [], part: [], publishDate: null, publisher: '',
  language: '', pageNumber: '', description: '',
  category: '',name: ''
});
const resetForm = (form) => {
  form.price = '';
  form.rate = '';
  form.author = '';
  form.typeBook = [];
  form.part = [];
  form.publishDate = null;
  form.publisher = '';
  form.language = '';
  form.pageNumber = '';
  form.description = '';
  form.category = '';
  form.name = '';
};
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
const showDrawer = () => {
  open.value = true;
};
const onClose = () => {
  open.value = false;
};
const onSubmit = async () => {
  console.log(form);
  const errors = validateAddBook(form);
  
  if (Object.keys(errors).length) {
    toast(`${errors[Object.keys(errors)[0]]}`, {
      "type": "error",
      "position": "bottom-left",
      "transition": "slide",
      "dangerouslyHTMLString": true
    }) 
    console.log('Validation failed', errors);
  } else {
    console.log('Form is valid');
    try{
      const { data } = await axios.post('http://localhost:3000/book',form)
      if(data.success === false){
        toast("Failed to add book!", {
          "type": "error",
          "position": "bottom-left",
          "transition": "slide",
          "dangerouslyHTMLString": true
        })
      }
      else{
        toast("Book added successfully!", {
          "type": "success",
          "position": "bottom-left",
          "transition": "slide",
          "dangerouslyHTMLString": true
        })
        open.value = false;
        resetForm(form);
      }
    }
    catch(e){
      console.log(e.message)
    }
  }
}

const partOptions = []
for (let i = 1; i < 500; i++) {
  const value = `Part ${i}`;
  partOptions.push({value});
}

</script>
<template>
  <a-button @click="showDrawer" class="flex items-center">
    <template #icon><PlusOutlined /></template>
    Add book
  </a-button>
  <a-drawer
    title="Create a new book"
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
            <a-input v-model:value="form.name" placeholder="Please enter name" />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="Price" name="price">
            <a-input v-model:value="form.price" placeholder="Please enter price" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item label="Author" name="author">
            <a-input  v-model:value="form.author" placeholder="Please enter author" />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="Language" name="role">
            <a-select v-model:value="form.language" placeholder="Select language">
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
            <a-input v-model:value="form.publisher" placeholder="Please enter publisher" />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="Publish Date" name="publicDate">
            <a-date-picker
              v-model:value="form.publishDate"
              style="width: 100%"
              :get-popup-container="trigger => trigger.parentElement"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item label="Category" name="category">
            <a-select v-model:value="form.category" placeholder="Select category">
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
            <a-input-number class="w-full" v-model:value="form.pageNumber" placeholder="Please enter page number" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item label="Rate" name="rate">
            <a-input v-model:value="form.rate" placeholder="Please enter email" />
          </a-form-item>
        </a-col>
        
        <a-col :span="12">
          <a-form-item
            name="part"
            label="Part"
          >
            <a-select
              v-model:value="form.part"
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
              v-model:value="form.typeBook"
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
              v-model:value="form.description"
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
