<script setup>
import { computed, reactive, ref } from 'vue';
import { cloneDeep } from 'lodash-es';
import { DeleteOutlined, SettingOutlined } from '@ant-design/icons-vue';
import Drawer from "../Drawer/index.vue"
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
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
    dataIndex: 'address',
  },
  {
    title: 'Address 2',
    dataIndex: 'address',
  },
  {
    title: 'Address 3',
    dataIndex: 'address',
  },

  {
    title: 'Operation',
    dataIndex: 'operation',
    width: '8%',
  },
];
const dataSource = ref([
  {
    key: '0',
    name: 'Quach Thieu Khang',
    age: 32,
    address: 'London, Park Lane no. 0',
  },
  {
    key: '1',
    name: 'Edward King 1',
    age: 32,
    address: 'London, Park Lane no. 1',
  },
]);
const count = computed(() => dataSource.value.length + 1);
const editableData = reactive({});
const edit = key => {
  editableData[key] = cloneDeep(dataSource.value.filter(item => key === item.key)[0]);
};
const save = key => {
  Object.assign(dataSource.value.filter(item => key === item.key)[0], editableData[key]);
  delete editableData[key];
};
const onDelete = key => {
  dataSource.value = dataSource.value.filter(item => item.key !== key);
};
const handleAdd = () => {
  const newData = {
    key: `${count.value}`,
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
            <div v-if="editableData[record.key]" class="editable-cell-input-wrapper">
              <a-input v-model:value="editableData[record.key].name" @pressEnter="save(record.key)" />
              <check-outlined class="editable-cell-icon-check" @click="save(record.key)" />
            </div>
            <div v-else class="editable-cell-text-wrapper">
              {{ text || ' ' }}
              <edit-outlined class="editable-cell-icon" @click="edit(record.key)" />
            </div>
          </div>
        </template>
        <template v-else-if="column.dataIndex === 'operation'">
          <div class="flex gap-2">
            <a-button type="primary" class="flex justify-center items-center">
              <SettingOutlined />
            </a-button>
            <a-popconfirm
              v-if="dataSource.length"
              title="Sure to delete?"
              @confirm="onDelete(record.key)"
            >
              <a-button type="primary" danger class="flex justify-center items-center">
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