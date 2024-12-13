<script setup>
import { computed, onMounted, reactive, ref } from 'vue';
import { cloneDeep, result } from 'lodash-es';
import Drawer from "../../Drawer/AddUser.vue"
import axios from 'axios';
import { CheckOutlined, DeleteOutlined, HourglassOutlined, SettingOutlined, SortAscendingOutlined, SortDescendingOutlined } from '@ant-design/icons-vue';
import AddBookDrawer from '../../../components/Drawer/AddBook.vue'
import { toast } from 'vue3-toastify';

const usernames = ref([])
const booknames = ref([])
onMounted( async ()=> {
  const { data } = await axios.get('http://localhost:3000/borrow')
  dataSource.value = data
  console.log(dataSource.value)
})
const columns = [
  {
    title: ' User',
    dataIndex: `username`,
    width: '8%',
  },
  {
    title: 'Book',
    dataIndex: 'bookname',
    width: '15%'
  },
  {
    title: 'Part',
    dataIndex: 'part',
    width: '7%'
  },
  {
    title: 'Type',
    dataIndex: 'type',
    width: '7%'
  },
  {
    title: 'Borrow Date',
    dataIndex: 'borrowDate',
    width: '10%'
  },
  {
    title: 'Return Date',
    dataIndex: 'returnDate',
    width: '10%'
  },
  {
    title: 'Status',
    dataIndex: `status`,
    width: '7%',
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
    const response = await axios.delete(`http://localhost:3000/borrow/${_id}`)
    console.log(response)
    dataSource.value = dataSource.value.filter(item => item._id !== _id);
  }
  catch(e){
    console.log('Error:', e.message);
  }
};
const allowBorrowBook = async (_id) => {
  try{
    console.log(_id)
    const response = await axios.patch(`http://localhost:3000/borrow/update-status/${_id}`,{status: "success"})
    console.log(response)
    if(!response){
      toast.error('Failed to allow borrowing');
    }
    if(response.data.success ===true){
      toast("Allowed to borrow books!", {
        "type": "success",
        "position": "bottom-left",
        "transition": "slide",
      })
    }
    else if(response.data.success ===false && response.data.status === "success") {
      toast("Error! Status in success", {
        "type": "error",
        "position": "bottom-left",
        "transition": "slide",
      })
    }
    else{
      toast("Failed to allow borrowing", {
        "type": "error",
        "position": "bottom-left",
        "transition": "slide",
      })
    }
  }
  catch(e){
    console.log('Error:', e.message);
  }
}
const sortByName = () =>{
  dataSource.value.sort((a, b) => {
    const nameA = a.username || '';
    const nameB = b.username || '';
    return nameA.localeCompare(nameB);
  })
}
const sortByStatus = () =>{
  dataSource.value.sort((a, b) => {
    const nameA = a.status || '';
    const nameB = b.status || '';
    return nameA.localeCompare(nameB);
  })
}
</script>

<template>
  <div class="p-6">
    <div class="flex mb-3 gap-3 justify-between">
      <!-- Add Book Drawer -->
      <div>
        <AddBookDrawer :dataSource="dataSource"/>
      </div>
      <div class="flex gap-3">
        <!-- Sort -->
        <a-popover v-model:open="visible" title="Sort Ascending" trigger="click" placement="bottomLeft">
        <a-button class="flex items-center"><SortAscendingOutlined /></a-button>
        <template #content>
          <div class="flex gap-2">
            <a-button @click="sortByName">Name</a-button>
            <a-button @click="sortByStatus">status</a-button>
          </div>
        </template>
        </a-popover>
        <a-popover v-model:open="visible" title="Sort Descending" trigger="click" placement="bottomLeft">
          <a-button class="flex items-center"><SortDescendingOutlined /></a-button>
          <template #content>
            123
          </template>
        </a-popover>
        <!-- Search -->
        <a-input-search
          v-model:value="search"
          placeholder="input search text"
          enter-button
          @search="onSearch"
          class="w-60"
        />
      </div>
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
            <a-button @click="allowBorrowBook(record._id)" type="primary" class="flex justify-center items-center px-4 button-success">
              <CheckOutlined />
            </a-button>
            <a-button type="primary" class="flex justify-center items-center px-4">
              <HourglassOutlined />
            </a-button>
            <a-popconfirm
              placement="bottomLeft"
              v-if="dataSource.length"
              title="Sure to delete?"
              @confirm="onDelete(record._id)"
            >
              <a-button type="primary" danger class="flex justify-center items-center px-4">
                <DeleteOutlined  />
              </a-button>
            </a-popconfirm>
          </div>
        </template>
      </template>
    </a-table>
  </div>
</template>


<style scoped>
.button-success{
  background-color: #4caf50; /* Green */
  color: white;
  border: none;
}
.button-success:hover {
  background-color: #45a049; /* Darker green */
}
.button-done{
  background-color: #ccc; /* Green */
  color: white;
  border: none;
}
.button-done:hover {
  background-color: #ddd; /* Darker green */
}
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