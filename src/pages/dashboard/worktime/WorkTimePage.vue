<script setup>
import { ref } from 'vue'
import dayjs from 'dayjs'
import weekday from 'dayjs/plugin/weekday'
import isoWeek from 'dayjs/plugin/isoWeek'
dayjs.extend(weekday)
dayjs.extend(isoWeek)

const currentMonth = ref(dayjs())

// Пример данных посещаемости
const attendanceData = {
    '2025-04-01': { hours: 7, minutes: 3 },
    '2025-04-02': { hours: 9, minutes: 51 },
    '2025-04-03': { hours: 11, minutes: 28 },
    '2025-04-04': { hours: 5, minutes: 58 },
    '2025-04-05': { dayOff: true },
    '2025-04-06': { dayOff: true },
    '2025-04-07': { hours: 7, minutes: 50 },
    '2025-04-08': { hours: 8, minutes: 37 },
    '2025-04-09': { hours: 10, minutes: 44 },
    '2025-04-10': { hours: 5, minutes: 56 },
    '2025-04-11': { hours: 9, minutes: 45 },
    '2025-04-12': { hours: 3, minutes: 32 },
    '2025-04-13': { dayOff: true },
    '2025-04-14': { hours: 9, minutes: 33 },
    '2025-04-15': { hours: 6, minutes: 33 },
    '2025-04-16': { hours: 7, minutes: 58 },
    '2025-04-17': { today: true },
    '2025-04-19': { dayOff: true },
    '2025-04-20': { dayOff: true },
    '2025-04-26': { dayOff: true },
    '2025-04-27': { dayOff: true }
}

const getCalendarDays = () => {
    const start = currentMonth.value.startOf('month').startOf('week')
    const end = currentMonth.value.endOf('month').endOf('week')
    const days = []
    let current = start
    while (current.isBefore(end)) {
        days.push(current)
        current = current.add(1, 'day')
    }
    return days
}

const daysOfWeek = ['Du', 'Se', 'Ch', 'Pa', 'Ju', 'Sh', 'Ya']
</script>

<template>
    <div class="p-6">
        <h2 class="text-2xl font-bold mb-4">Shaxsiy tabel</h2>

        <div class="flex justify-end mb-2">
            <a-date-picker v-model:value="currentMonth" picker="month" format="MM.YYYY" />
        </div>

        <div class="grid grid-cols-7 gap-px border rounded overflow-hidden">
            <div v-for="day in daysOfWeek" :key="day" class="bg-gray-100 text-center py-2 font-medium">
                {{ day }}
            </div>
            <div v-for="date in getCalendarDays()" :key="date.format('YYYY-MM-DD')"
                class="h-24 p-2 text-sm flex items-center justify-center text-center" :class="[
                    date.month() !== currentMonth.month() ? 'bg-white text-gray-300' : '',
                    date.day() === 0 ? 'bg-red/10 text-red font-medium' : '',
                    attendanceData[date.format('YYYY-MM-DD')]?.hours ? 'bg-green/10 text-green font-semibold' :
                        (!attendanceData[date.format('YYYY-MM-DD')] && date.day() !== 0 && date.month() === currentMonth.month()) ? 'bg-yellow-100 text-yellow-800' : '',
                    attendanceData[date.format('YYYY-MM-DD')]?.today ? 'border border-blue-400 bg-blue-50' : ''
                ]">
                <div class="flex flex-col items-center justify-center w-full">
                    <div class="text-sm font-medium mb-1 text-black">
                        {{ date.format('DD') }}
                    </div>

                    <div v-if="attendanceData[date.format('YYYY-MM-DD')]">
                        <template v-if="attendanceData[date.format('YYYY-MM-DD')].dayOff">
                            <p class="text-red/60 text-sm font-medium">Dam olish kuni</p>
                        </template>
                        <template v-else-if="attendanceData[date.format('YYYY-MM-DD')].today">
                            <p class="text-blue-600 font-medium">Bugun</p>
                        </template>
                        <template v-else>
                            <p class="text-base mb-0 font-semibold">
                                {{ attendanceData[date.format('YYYY-MM-DD')].hours }} soat
                            </p>
                            <p class="text-sm">
                                {{ attendanceData[date.format('YYYY-MM-DD')].minutes }} daqiqa
                            </p>
                        </template>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.grid {
    border-collapse: collapse;
}
</style>