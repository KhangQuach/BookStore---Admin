<script setup>
import { computed, onMounted, reactive, ref } from 'vue';
import { cloneDeep, result } from 'lodash-es';
import Drawer from "../Drawer/index.vue"
import axios from 'axios';
import { DeleteOutlined, SettingOutlined } from '@ant-design/icons-vue';

onMounted( async ()=> {
  const { data } = await axios.get('http://localhost:3000/user')
  console.log(data)
  dataSource.value = data
})
const columns = [
  {
    title: 'Name',
    dataIndex: 'username',
    width: '12%',
  },
  {
    title: 'Age',
    dataIndex: 'age',
    width: '3%'
  },
  {
    title: 'Gender',
    dataIndex: 'gender',
    width: '8%'
  },
  {
    title: 'Username',
    dataIndex: 'username',
    width: '8%'
  },
  {
    title: 'Password',
    dataIndex: 'password',
    width: '8%'
  },
  {
    title: 'Email',
    dataIndex: 'email',
    width: '8%'
  },
  
  {
    title: 'Phone',
    dataIndex: 'phone',
    width: '8%'
  },
  {
    title: 'Address 1',
    dataIndex: 'address1',
  },
  {
    title: 'Address 2',
    dataIndex: 'address2',
  },
  {
    title: 'Address 3',
    dataIndex: 'address3',
  },

  {
    title: 'Operation',
    dataIndex: 'operation',
    width: '8%',
  },
];
const dataSource = ref([
]);
const count = computed(() => dataSource.value.length + 1);
const editableData = reactive({});
const edit = _id => {
  editableData[_id] = cloneDeep(dataSource.value.filter(item => _id === item._id)[0]);
};
const save = _id => {
  Object.assign(dataSource.value.filter(item => _id === item._id)[0], editableData[_id]);
  delete editableData[_id];
};
const onDelete = (_id) => {
  console.log(_id);
  const response = axios.delete(`http://localhost:3000/user/${_id}`)
};
const handleAdd = () => {
  const newData = {
    _id: `${count.value}`,
    name: `Edward King ${count.value}`,
    age: 32,
    address: `London, Park Lane no. ${count.value}`,
  };
  dataSource.value.push(newData);
};

</script>

<template>
  <div class="p-6">
    <Drawer/>
    <a-button class="editable-add-btn" style="margin-bottom: 8px" @click="handleAdd">Add New</a-button>
    <a-table bordered :data-source="dataSource" :columns="columns" class="">
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