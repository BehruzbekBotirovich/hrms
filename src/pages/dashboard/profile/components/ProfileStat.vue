<template>
  <a-spin :spinning="userStore.loading">
    <!-- Показать данные KPI -->
    <div class="flex justify-between items-start border-b last:border-b-0 py-2">
      <div class="flex items-center gap-2 text-gray-700">
        <calendar-outlined class="text-lg" />
        <span>{{ $t('stats.unassignedTasks') }}:</span>
      </div>
      <div class="font-semibold text-right text-black">
        {{ userStore.user?.kpi?.assignedCount }}
      </div>
    </div>

    <div class="flex justify-between items-start border-b last:border-b-0 py-2">
      <div class="flex items-center gap-2 text-gray-700">
        <check-circle-outlined class="text-lg" />
        <span>{{ $t('stats.linkedDoneTasks') }}:</span>
      </div>
      <div class="font-semibold text-right text-black">
        {{ userStore.user?.kpi?.completedCount }}
      </div>
    </div>

    <div class="flex justify-between items-start border-b last:border-b-0 py-2">
      <div class="flex items-center gap-2 text-gray-700">
        <file-text-outlined class="text-lg" />
        <span>{{ $t('stats.expectedVolume') }}:</span>
      </div>
      <div class="font-semibold text-right text-black">
        {{ userStore.user?.kpi?.totalAssignedTime }}
      </div>
    </div>

    <div class="flex justify-between items-start py-2">
      <div class="flex items-center gap-2 text-gray-700">
        <clock-circle-outlined class="text-lg" />
        <span>{{ $t('stats.completedVolume') }}:</span>
      </div>
      <div class="font-semibold text-right text-black">
        {{ userStore.user?.kpi?.completedTime }}
      </div>
    </div>
  </a-spin>
</template>

<script setup>
import { onMounted } from 'vue'
import {
  CalendarOutlined,
  CheckCircleOutlined,
  FileTextOutlined,
  ClockCircleOutlined
} from '@ant-design/icons-vue'
import useUser from '@/store/user.pinia.js'

const userStore = useUser()

// Получаем данные KPI при монтировании компонента
onMounted(() => {
  userStore.getMyKpi()
})
</script>
