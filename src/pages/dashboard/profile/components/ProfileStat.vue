<template>
    <div class="bg-white rounded-xl shadow p-6 w-full max-w-xl">
        <div v-for="item in stats" :key="item.key"
            class="flex justify-between items-start border-b last:border-b-0 py-2">
            <div class="flex items-center gap-2 text-gray-700">
                <component :is="item.icon" class="text-lg" />
                <span>{{ $t(`stats.${item.key}`) }}:</span>
            </div>
            <div class="font-semibold text-right text-black" v-html="item.value" />
        </div>
    </div>
</template>

<script setup>
import {
    ClockCircleOutlined,
    CalendarOutlined,
    QuestionCircleOutlined,
    CheckCircleOutlined,
    FileTextOutlined,
} from '@ant-design/icons-vue'
import useUser from '@/store/user.pinia.js'
import { onMounted, ref } from 'vue';

const userStore = useUser()

onMounted(() => {
    userStore.getMyKpi()
})

const stats = ref([
    { key: 'unassignedTasks', value: userStore.user?.kpi?.assignedCount, icon: CalendarOutlined, },
    { key: 'linkedDoneTasks', value: userStore.user?.kpi?.completedCount, icon: CheckCircleOutlined },
    { key: 'expectedVolume', value: userStore.user?.kpi?.totalAssignedTime, icon: FileTextOutlined },
    { key: 'completedVolume', value: userStore.user?.kpi?.completedTime, icon: ClockCircleOutlined },
])
</script>