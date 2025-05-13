<template>
    <div v-for="index in 3" :key="index" class="border rounded-lg p-4 shadow-sm bg-white">
        <!-- Заголовок и количество задач (скелетон) -->
        <div class="flex justify-between items-center mb-2">
            <div class="h-7 w-44 bg-gray-200 rounded animate-pulse"></div>
            <div class="h-6 w-6 bg-gray-200 rounded-full animate-pulse"></div>
        </div>
        <div class="h-4 w-32 bg-gray-200 rounded animate-pulse mb-2"></div>

        <!-- Статус и назначенный пользователь (скелетон) -->
        <div class="flex items-center justify-between">
            <div class="flex items-center space-x-3">
                <div class="h-5 w-20 bg-gray-200 rounded animate-pulse"></div>
                <div class="h-5 w-40 bg-gray-200 rounded animate-pulse"></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'TaskCardSkeleton'
}
</script>

<style scoped>
.animate-pulse {
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {

    0%,
    100% {
        opacity: 1;
    }

    50% {
        opacity: 0.5;
    }
}
</style>