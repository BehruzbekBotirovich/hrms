<template>
    <div class="flex gap-4">
        <div v-for="(column, index) in columns" :key="index" class="w-1/3 bg-white rounded-lg shadow p-4">
            <div class="font-semibold text-gray-800 mb-2">
                {{ column.title }} / {{ column.tasks.length }}
            </div>
            <div v-if="column.tasks.length === 0" class="text-center text-gray-500 p-6">
                <a-empty :description="null" />
                <p>{{ $t('no_data') }}</p>
            </div>
            <a-card v-for="task in column.tasks" :key="task.id" class="mb-2" hoverable>
                <template #default>
                    <div class="font-medium text-black">{{ task.title }}</div>
                    <div class="text-sm text-gray-600 mt-1">Loyiha: {{ task.project }}</div>
                    <div class="text-sm text-gray-600">Board: {{ task.board }}</div>
                    <div class="flex items-center gap-2 mt-2">
                        <a-tag color="red">Muhim</a-tag>
                        <a-tag icon="clock-circle">{{ task.date }}</a-tag>
                    </div>
                </template>
            </a-card>
        </div>
    </div>
</template>

<script setup>
const columns = [
    {
        title: 'Yaratilgan',
        tasks: [],
    },
    {
        title: 'Tugash muddati yaqin',
        tasks: [],
    },
    {
        title: 'Tugatilgan',
        tasks: [
            {
                id: 1,
                title: 'bot UI fix',
                project: 'Z-post',
                board: 'Delivery Front',
                date: 'Mar 27 - Mar 28',
            },
            {
                id: 2,
                title: 'UI ni multi language qilish kerak',
                project: 'Z-post',
                board: 'Delivery Front',
                date: 'Apr 03',
            },
        ],
    },
]
</script>

<style scoped>
/* Ant Design карточки */
:deep(.ant-card) {
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}
</style>