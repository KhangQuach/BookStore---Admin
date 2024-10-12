<script setup>
import { ref } from 'vue';
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const usersChart = {
  chartData: {
    labels: [ 'User', 'Admin', ],
    datasets: [ { data: [200, 20] } ]
  },
  chartOptions:{
    responsive: true
  }
}
const booksChart = {
  chartData: {
    labels: [ 'Children', 'Horror', 'Romance', 'Thriller','Cook Book','Travel', 'Other' ],
    datasets: [ { data: [40, 20, 30, 15,4,5, 3] } ],
    
  },
  chartOptions:{
    responsive: true
  }
}
  const totalUsers = ref()
  const totalBooks = ref()
  const totalBorrows = ref()
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