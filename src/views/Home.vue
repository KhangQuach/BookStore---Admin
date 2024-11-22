<script setup>
import { onMounted, reactive, ref, watchEffect } from 'vue';
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
import axios from 'axios';
import router from '../routes';
import { onBeforeMount } from 'vue';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)


const data = reactive({
  Users:[{data: [24,2]}],
  Books:[{data: [6,8,10,7,9,7,3]}],
  Borrows:[{ data: [10,11,4,3]}]
})

onMounted(async () => {
  await fetchData()
})

  const fetchData = async () =>{
    const roles = ['user', 'admin']
    const status = ['pending', 'success', 'expired', 'deny']
    const categories = ['children','horror','romance', 'thriller', 'cookbook','travel','other']
    try{  
      const usersEndpoints = roles.map((role) =>
        axios.get(`http://localhost:3000/user/countByRole/${role}`)
      );
      // Borrows count by status
      const borrowsEndpoints = status.map((item) =>
        axios.get(`http://localhost:3000/borrow/countByStatus/${item}`)
      );
  
      // Books count by categories
      const categoryEndpoints = categories.map((category) =>
        axios.get(`http://localhost:3000/book/countByCategory/${category}`)
      );
  
      const [usersData, borrowsData, categoriesData] = await Promise.all([
        Promise.all(usersEndpoints),
        Promise.all(borrowsEndpoints),
        Promise.all(categoryEndpoints),
      ]);
      data.Users[0].data = usersData.map(item => item.data.count)
      data.Books[0].data = borrowsData.map(item => item.data.count)
      data.Borrows[0].data = categoriesData.map(item => item.data.count)
      
      console.log(data.Users[0].data, data.Books[0].data, data.Borrows[0].data)
      data.value = data.value
      console.log(data)
    }catch(e){
      console.error(e)
    }
  }
  console.log(data)
const usersChart = {
  chartData: {
    labels: [ 'User', 'Admin' ],
    datasets: data.Users
  },
  chartOptions:{
    responsive: true
  }
}
const booksChart = {
  chartData: {
    labels: [ 'Children', 'Horror', 'Romance', 'Thriller','Cook Book','Travel', 'Other' ],
    datasets: data.Books
    
  },
  chartOptions:{
    responsive: true
  }
}
const borrowsChart = {
  chartData: {
    labels: [ 'Pending', 'Success', 'Expired', 'Deny' ],
    datasets: data.Borrows
    
  },
  chartOptions:{
    responsive: true
  }
}


</script>
<template>
  <div class="flex">
    <div class="w-1/2 p-6">
      <a-row :gutter="16">
        <a-col class="w-full">
          <a-card>
            <a-statistic
              title="Total Users"
              :value="40"
              suffix="users"
              :value-style="{ color: '#3f8600' }"
              style="margin-right: 50px"
            >
              <template #prefix>
                <arrow-up-outlined />
              </template>
            </a-statistic>
          </a-card>
          
        </a-col>
      </a-row>
      <Bar
        class="mt-10"
        id="my-chart-id"
        :options="usersChart.chartOptions"
        :data="usersChart.chartData"
      />
      <a-card class="mt-20">
        <a-statistic
          title="Total Borrow"
          :value="40"
          suffix="borrows"
          :value-style="{ color: '#123429' }"
          style="margin-right: 50px"
        >
          <template #prefix>
            <arrow-up-outlined />
          </template>
        </a-statistic>
      </a-card>
      <Bar
        class="mt-10"
        id="my-chart-id"
        :options="borrowsChart.chartOptions"
        :data="borrowsChart.chartData"
      />
    </div>
    <div class="w-1/2 p-6">
      <a-row :gutter="16">
        <a-col class="w-full">
          <a-card>
            <a-statistic
              title="Total Books"
              :value="200"
              suffix="Books"
              class="demo-class"
              :value-style="{ color: '#cf1322' }"
            >
              <template #prefix>
                <arrow-down-outlined />
              </template>
            </a-statistic>
          </a-card>
        </a-col>
      </a-row>
      <Bar
        class="mt-10"
        id="my-chart-id"
        :options="booksChart.chartOptions"
        :data="booksChart.chartData"
      />
    </div>
  </div>
</template>