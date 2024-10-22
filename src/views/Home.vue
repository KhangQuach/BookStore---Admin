<script setup>
import { onMounted, reactive, ref } from 'vue';
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
import axios from 'axios';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)
onMounted(async () =>{
  const roles = ['user', 'admin']
  const borrows = ['pending, success, expired']
  const categorys = ['children','horror','romance', 'thriller', 'cookbook','travel','other']
  try{  
    const usersEnpoints = roles.map((role)=> {
      axios.get(`http://localhost:3000/user/countByRole/${role}`)
    })
    const borrowsEnpoints = borrows.map((borrow)=>{
      axios.get(`http://localhost:3000/book/countByCategory/${borrows}`)
    })
    const categoryEnpoints = categorys.map((category)=>{
      axios.get(`http://localhost:3000/book/countByCategory/${category}`)
    })

    console.log(usersEnpoints, borrowsEnpoints, categoryEnpoints);
  }catch(e){
    console.error(e)
  }
})
const data = reactive({
  Users:[{data: [12,2]}],
  Books:[{data: [40, 20, 30, 15,4,5, 3]}],
  Borrows:[{ data: [40, 20, 30] }]
})
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
    labels: [ 'Pending...', 'Success', 'Exp' ],
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