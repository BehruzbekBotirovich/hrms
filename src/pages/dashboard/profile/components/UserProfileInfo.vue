<template>
    <div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div v-for="field in editableFields" :key="field.key">
                <p class="text-gray-500 text-sm">{{ field.label }}</p>

                <a-input v-if="field.component === 'a-input'" v-model:value="profile[field.key]" :disabled="!isEditing"
                    :placeholder="field.label" />

                <a-select v-else-if="field.component === 'a-select'" v-model:value="profile[field.key]"
                    :options="field.options" :disabled="!isEditing" class="w-full" :placeholder="field.label" />

                <a-date-picker v-else-if="field.component === 'a-date-picker'" v-model:value="profile[field.key]"
                    :disabled="!isEditing" class="w-full" format="YYYY-MM-DD" :placeholder="field.label" />
            </div>
        </div>

        <div class="flex justify-end mt-6 gap-2">
            <template v-if="isEditing">
                <a-button @click="cancelEdit">Отмена</a-button>
                <a-button type="primary" @click="saveChanges">{{ $t() }}</a-button>
            </template>
            <template v-else>
                <a-button type="primary" @click="isEditing = true">{{ $t('edit') }}</a-button>
            </template>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import dayjs from 'dayjs'

const isEditing = ref(false)

// Данные по умолчанию (как будто с бэка)
const profile = reactive({
    firstName: 'Али',
    lastName: 'Алиев',
    patronymic: 'Алиевич',
    gender: 'Мужской',
    birthDate: dayjs('1995-06-01'),
    city: 'г. Ташкент',
    phone: '+99890 924 01 34',
    homePhone: '+99871 924 01 34',
    email: 'info@gmail.com',
    passport: 'AA 2266666'
})

// Поля, которые редактируются
const editableFields = [
    { label: 'Имя', key: 'lastName', component: 'a-input' },
    { label: 'Фамилия', key: 'firstName', component: 'a-input' },
    { label: 'Отчество', key: 'patronymic', component: 'a-input' },
    {
        label: 'Пол',
        key: 'gender',
        component: 'a-select',
        options: [
            { label: 'Мужской', value: 'Мужской' },
            { label: 'Женский', value: 'Женский' }
        ]
    },
    { label: 'Дата рождения', key: 'birthDate', component: 'a-date-picker' },
    { label: 'Место рождения', key: 'city', component: 'a-input' },
    { label: 'Телефон', key: 'phone', component: 'a-input' },
    { label: 'Домашний телефон', key: 'homePhone', component: 'a-input' },
    { label: 'Почта', key: 'email', component: 'a-input' },
    { label: 'Серия и номер паспорта', key: 'passport', component: 'a-input' }
]

// Логика
const backup = reactive({ ...profile })

function saveChanges() {
    isEditing.value = false
    Object.assign(backup, profile)
    console.log('Сохранено:', profile)
}

function cancelEdit() {
    isEditing.value = false
    Object.assign(profile, backup)
}
</script>