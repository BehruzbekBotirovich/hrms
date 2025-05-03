<template>
    <div class="flex h-full p-6">
        <!-- Левая часть: форма -->
        <div class="w-2/3 p-6 bg-white rounded-lg shadow-md border overflow-y-auto">
            <h2 class="text-xl font-semibold mb-6">Vazifa qo'shish</h2>

            <a-form layout="vertical" @submit.prevent="handleSubmit">
                <!-- Заголовок -->
                <a-form-item label="* Sarlavha kiriting">
                    <a-input v-model:value="form.title" required />
                </a-form-item>

                <!-- Описание -->
                <a-form-item label="Vazifa izohini kiriting">
                    <a-textarea v-model:value="form.description" rows="5" resize='none' />
                </a-form-item>

                <!-- Назначенные сотрудники -->
                <a-form-item label="Biriktirilgan xodimlar" class="pt-6 ">
                    <a-select v-model:value="form.assignees" mode="multiple" placeholder="Tayinlash"
                        :options="userOptions" show-search allow-clear />
                </a-form-item>

                <!-- Приоритет -->
                <a-form-item label="Muhimlik darajasi">
                    <div class="flex flex-wrap gap-2 pt-6">
                        <a-tag v-for="priority in priorities" :key="priority.value"
                            :color="form.priority === priority.value ? priority.color : 'default'"
                            @click="form.priority = priority.value"
                            class="cursor-pointer px-4 py-1 border rounded-full hover:opacity-80" :class="{
                                'bg-red-100 text-red-600 border-red-300': priority.value === 'muhim' && form.priority === 'muhim',
                                'bg-orange-100 text-orange-600 border-orange-300': priority.value === 'shoshilinch' && form.priority === 'shoshilinch',
                                'bg-yellow-100 text-yellow-600 border-yellow-300': priority.value === 'yuqori' && form.priority === 'yuqori',
                                'bg-blue-100 text-blue-600 border-blue-300': priority.value === 'normal' && form.priority === 'normal',
                                'bg-gray-100 text-gray-600 border-gray-300': priority.value === 'past' && form.priority === 'past'
                            }">
                            {{ priority.label }}
                        </a-tag>
                    </div>
                </a-form-item>

                <h3>Belgilangan vaqt oraligi</h3>
                <p>{{ }}</p>
                <div class="flex gap-2 items-center">
                    <!-- Время начала и окончания -->
                    <a-form-item label="Vaqt oraligini ozgartirish" class="pt-9 w-3/4">
                        <a-range-picker v-model:value="form.dateRange" show-time format="YYYY-MM-DD HH:mm"
                            class="w-full" />
                    </a-form-item>
                    <!-- Продолжительность -->
                    <a-form-item label="Vazifa davomiyligi ish soatida" class="pt-9 w-1/4">
                        <a-input-number v-model:value="form.duration" :min="1" :max="100" class="w-full" />
                    </a-form-item>
                </div>

                <!-- Кнопки -->
                <div class="flex items-center justify-between">
                    <a-button> {{ $t('copy') }}</a-button>
                    <div class="flex justify-end gap-2 mt-4">
                        <a-button @click="handleCancel">Bekor qilish</a-button>
                        <a-button type="primary" html-type="submit">Saqlash</a-button>
                    </div>
                </div>
            </a-form>
        </div>

        <!-- Правая часть: Инфа о процессах -->
        <div class="w-1/3 border-l p-4 flex flex-col justify-between bg-gray-50">
            <div class="text-center text-gray-400 mt-8">
                <p>Ma'lumot yo'q</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, h } from 'vue'

const form = ref({
    title: '',
    description: '',
    assignees: [],
    priority: null,
    dateRange: [],
    duration: null,
})

const userOptions = [
    { label: 'Ali', value: 'ali' },
    { label: 'Vali', value: 'vali' },
    { label: 'Gulbahor', value: 'gulbahor' }
]

const priorities = [
    { label: 'Muhim', value: 'muhim', color: 'red' },
    { label: 'Shoshilinch', value: 'shoshilinch', color: 'orange' },
    { label: 'Yuqori', value: 'yuqori', color: 'gold' },
    { label: 'Normal', value: 'normal', color: 'blue' },
    { label: 'Past', value: 'past', color: 'gray' }
]

const handleSubmit = () => {
    console.log('Form saqlandi:', form.value)
}

const handleCancel = () => {
    console.log('Bekor qilindi')
}
</script>

<style scoped>
.ant-tag {
    user-select: none;
    transition: all 0.2s;
}
</style>