<template>
  <!-- Выбор года и месяца -->
  <div class="flex items-center mb-4">
    <a-month-picker
      v-model:value="selectedDate"
      format="YYYY-MM"
      @change="handleDateChange"
      class="mr-4"
    />
  </div>

  <!-- Таблица -->
  <a-table
    :columns="columns"
    :dataSource="employeesStore.employeesKpi"
    rowKey="_id"
    text="middle"
    :loading="employeesStore.loading"
  >
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'fullName'">
        <div class="flex items-center">
          <img
            :src="record.user.avatarUrl ? `https://hrms-backend-mvdb.onrender.com/api/upload/avatar/${record.user.avatarUrl}` : def_ava"
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
import dayjs from 'dayjs'  // Импорт dayjs
import useEmployeesStore from '@/store/employees.pinia.js'
import def_ava from '@/assets/images/def_ava.png'

const employeesStore = useEmployeesStore()

// Устанавливаем текущую дату по умолчанию через dayjs
const selectedDate = ref(dayjs())

// Столбцы таблицы
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

// Функция для получения KPI данных
const getEmployeesKpi = () => {
  if (selectedDate.value) {
    const year = selectedDate.value.year()  // Используем dayjs для получения года
    const month = selectedDate.value.month() + 1  // Используем dayjs для получения месяца (с 1)
    employeesStore.getEmployeesKpi(month, year)  // Вызываем метод с выбранным месяцем и годом
  }
}

// При монтировании компонента устанавливаем текущий месяц и год по умолчанию
onMounted(() => {
  getEmployeesKpi()  // Получаем данные при инициализации
})

// Наблюдаем за изменением выбранной даты
const handleDateChange = (date) => {
  selectedDate.value = dayjs(date)  // Преобразуем выбранную дату в dayjs объект
  getEmployeesKpi()  // Получаем KPI данные с новой датой
}
</script>
