<script setup>
import { computed, onMounted, reactive, ref } from 'vue';
import { cloneDeep, result } from 'lodash-es';
import Drawer from "../../Drawer/AddUser.vue"
import axios from 'axios';
import { DeleteOutlined, SettingOutlined, SortAscendingOutlined, SortDescendingOutlined } from '@ant-design/icons-vue';

onMounted( async ()=> {
  const { data } = await axios.get('http://localhost:3000/book')
  dataSource.value = data
})
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    width: '15%',
  },
  {
    title: 'Price',
    dataIndex: 'price',
    width: '3%'
  },
  {
    title: 'Author',
    dataIndex: 'author',
    width: '7%'
  },
  {
    title: 'Publisher',
    dataIndex: 'publisher',
    width: '7%'
  },
  {
    title: 'Publish Date',
    dataIndex: 'publishDate',
    width: '10%'
  },
  {
    title: 'Language',
    dataIndex: 'language',
    width: '7%'
  },
  {
    title: 'Type',
    dataIndex: `typeBook`,
    width: '7%',
  },
  {
    title: 'Page Number',
    dataIndex: 'pageNumber',
    width: '7%'
  },
  
  {
    title: 'Category',
    dataIndex: 'category',
    width: '7%'
  },
  {
    title: 'Operation',
    dataIndex: 'operation',
    width: '7%',
  },
];
const dataSource = ref([
]);
const editableData = reactive({});
const edit = _id => {
  editableData[_id] = cloneDeep(dataSource.value.filter(item => _id === item._id)[0]);
};
const save = _id => {
  Object.assign(dataSource.value.filter(item => _id === item._id)[0], editableData[_id]);
  delete editableData[_id];
};

const onDelete = async (_id) => {
  try {
    console.log(_id);
    const response = await axios.delete(`http://localhost:3000/book/${_id}`)
    console.log(response)
    dataSource.value = dataSource.value.filter(item => item._id !== _id);
  }
  catch(e){
    console.log('Error:', e.message);
  }
};
const sortByName = () =>{
  dataSource.value.sort((a, b) => {
    const nameA = a.name || '';
    const nameB = b.name || '';
    return nameA.localeCompare(nameB);
  })
}
const sortByCategory = () =>{
    dataSource.value.sort((a, b) => {
    const nameA = a.category || '';
    const nameB = b.category || '';
    return nameA.localeCompare(nameB);
  })
}
const sortByPrice = () =>{
    dataSource.value.sort((a, b) => {
    const nameA = a.price || '';
    const nameB = b.price || '';
    return nameA.localeCompare(nameB);
  })
}
const sortByAuthor = () =>{
    dataSource.value.sort((a, b) => {
    const nameA = a.author || '';
    const nameB = b.author || '';
    return nameA.localeCompare(nameB);
  })
}
</script>

<template>
  <div class="p-6">
    <div class="flex mb-3 gap-3">
      <!-- Book Drawer -->
       
      <!-- Sort -->

      <a-popover v-model:open="visible" title="Sort Ascending" trigger="click" placement="bottomLeft">
        <a-button class="flex items-center"><SortAscendingOutlined /></a-button>
        <template #content>
          <div class="flex gap-2">
            <a-button @click="sortByName">Name</a-button>
            <a-button @click="sortByCategory">Category</a-button>
            <a-button @click="sortByPrice">Price</a-button>
            <a-button @click="sortByAuthor">Author</a-button>
          </div>
        </template>
      </a-popover>
      <a-popover v-model:open="visible" title="Sort Descending" trigger="click" placement="bottomLeft">
        <a-button class="flex items-center"><SortDescendingOutlined /></a-button>
        <template #content>
          123
        </template>
      </a-popover>

    </div>
    <a-table bordered :data-source="dataSource" :columns="columns" class="" :key="dataSource">
      <template #bodyCell="{ column, text, record }">
        <template v-if="column.dataIndex === 'name'">
          <div class="editable-cell">
            <div v-if="editableData[record._id]" class="editable-cell-input-wrapper">
              <a-input v-model:value="editableData[record._id].name" @pressEnter="save(record._id)" />
              <check-outlined class="editable-cell-icon-check" @click="save(record._id)" />
            </div>
            <div v-else class="editable-cell-text-wrapper">
              {{ text || ' ' }}
              <edit-outlined class="editable-cell-icon" @click="edit(record._id)" />
            </div>
          </div>
        </template>
        <template v-else-if="column.dataIndex === 'operation'">
          <div class="flex gap-2">
            <a-button type="primary" class="flex justify-center items-center px-4">
              <SettingOutlined />
            </a-button>
            <a-popconfirm
              placement="bottomLeft"
              v-if="dataSource.length"
              title="Sure to delete?"
              @confirm="onDelete(record._id)"
            >
              <a-button type="primary" danger class="flex justify-center items-center px-4">
                <DeleteOutlined />
              </a-button>
            </a-popconfirm>
          </div>
        </template>
      </template>
    </a-table>
  </div>
</template>


<style scoped>

.editable-cell {
  position: relative;
  .editable-cell-input-wrapper,
  .editable-cell-text-wrapper {
    padding-right: 24px;
  }

  .editable-cell-text-wrapper {
    padding: 5px 24px 5px 5px;
  }

  .editable-cell-icon,
  .editable-cell-icon-check {
    position: absolute;
    right: 0;
    width: 20px;
    cursor: pointer;
  }

  .editable-cell-icon {
    margin-top: 4px;
    display: none;
  }

  .editable-cell-icon-check {
    line-height: 28px;
  }

  .editable-cell-icon:hover,
  .editable-cell-icon-check:hover {
    color: #108ee9;
  }

  .editable-add-btn {
    margin-bottom: 8px;
  }
}
.editable-cell:hover .editable-cell-icon {
  display: inline-block;
}
</style>