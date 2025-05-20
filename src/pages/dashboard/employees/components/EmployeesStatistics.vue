<template>
  <!-- Таблица -->
  <a-table
    :columns="columns"
    :dataSource="employeesStore.employeesKpi"
    rowKey="_id"
    text="middle"
  >
    :loading="employeesStore.loading">
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'fullName'">
        <div class="flex items-center">
          <img
            :src="
              record.user.avatarUrl
                ? `https://hrms-backend-mvdb.onrender.com/api/upload/avatar/${record.user.avatarUrl}`
                : def_ava
            "
            alt="Avatar"
            class="w-10 h-10 rounded-full mr-2 object-cover"
            crossorigin="anonymous"
          />
          <span>{{ record.user.fullName }}</span>
        </div>
      </template>
      <template v-if="column.key === 'assignedCount'">
        {{ record.assignedCount }}
      </template>
      <template v-if="column.key === 'completedCount'">
        {{ record.completedCount }}
      </template>
      <template v-if="column.key === 'completedTime'">
        {{ record.completedTime }} hours
      </template>
      <template v-if="column.key === 'totalAssignedTime'">
        {{ record.totalAssignedTime }} hours
      </template>
    </template>
  </a-table>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import useEmployeesStore from '@/store/employees.pinia.js'
import def_ava from '@/assets/images/def_ava.png'

const employeesStore = useEmployeesStore()

onMounted(() => {
  employeesStore.getEmployeesKpi()
})

const columns = [
  {
    title: 'To\'liq ismi',
    dataIndex: 'user.fullName',
    key: 'fullName'
  },
  {
    title: 'Biriktirilgan vazifalar soni',
    dataIndex: 'assignedCount',
    key: 'assignedCount',
    align: 'center'
  },
  {
    title: 'Tugatilgan vazifalari',
    dataIndex: 'completedCount',
    key: 'completedCount',
    align: 'center'
  },
  {
    title: 'Bajarilgan vazifalar soat hisobida',
    dataIndex: 'completedTime',
    key: 'completedTime',
    align: 'center'
  },
  {
    title: 'Bariktirlangan vazifalar soat hisobida',
    dataIndex: 'totalAssignedTime',
    key: 'totalAssignedTime',
    align: 'center'
  }
]
</script>

<style scoped>
.ant-table {
  width: 100%;
}

.ant-modal-footer {
  display: flex;
  justify-content: flex-end;
}
</style>
