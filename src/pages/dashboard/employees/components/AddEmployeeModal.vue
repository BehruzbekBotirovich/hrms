<template>
    <div class="flex h-full w-[500px]">
        <div class="p-6 w-full bg-white rounded-lg shadow-md border overflow-y-auto">
            <h2 class="text-xl font-semibold mb-6">Xodim qo‘shish</h2>
            <a-form layout="vertical" @submit.prevent="handleSubmit">
                <a-row :gutter='16'>
                    <!-- Колонка 1 -->
                    <a-col :span="12">
                        <a-form-item label="* To‘liq ism" name="fullName"
                            :rules="[{ required: true, message: 'Ismni kiriting' }]">
                            <a-input v-model:value="form.fullName" />
                        </a-form-item>
                    </a-col>

                    <a-col :span="12">
                        <a-form-item label="* Email" name="email"
                            :rules="[{ required: true, type: 'email', message: 'Email noto‘g‘ri' }]">
                            <a-input v-model:value="form.email" />
                        </a-form-item>
                    </a-col>
                </a-row>

                <a-row :gutter='16'>
                    <a-col :span="12">
                        <a-form-item label="Bo‘lim" name="department">
                            <a-input v-model:value="form.department" />
                        </a-form-item>
                    </a-col>

                    <a-col :span="12">
                        <a-form-item label="Lavozim" name="position">
                            <a-input v-model:value="form.position" />
                        </a-form-item>
                    </a-col>
                </a-row>

                <a-row :gutter='16'>
                    <a-col :span="12">
                        <a-form-item name="role">
                            <a-select v-model:value="form.role" :options="roles" size="large" />
                        </a-form-item>
                    </a-col>

                    <a-col :span="12">
                        <a-form-item label="* Parol" name="password"
                            :rules="[{ required: true, message: 'Parolni kiriting' }]">
                            <a-input-password v-model:value="form.password" />
                        </a-form-item>
                    </a-col>
                </a-row>

                <a-row :gutter='16'>
                    <a-col :span="12">
                        <a-form-item label="Telegram chatId" name="chatId" class="pt-6"
                            :rules="[{ required: true, message: 'chat id kirit' }]">
                            <a-input-number v-model:value="form.chatId" class="w-full mt-1" size="large" />
                        </a-form-item>
                    </a-col>

                    <a-col :span="12">
                        <a-form-item name="phone">
                            <h3>Telefon raqam</h3>
                            <input-phone-component v-model="form.phone" class="w-full" />
                        </a-form-item>
                    </a-col>
                </a-row>

                <!-- Загрузка изображения -->
                <a-form-item name="image">
                    <a-upload :show-upload-list="false" :before-upload="(file) => { form.image = file; return false; }"
                        accept="image/*" :max-count="1">
                        <a-button>Rasmni yuklash</a-button>
                    </a-upload>

                </a-form-item>

                <div class="flex justify-end gap-2 mt-4">
                    <a-button @click="modal.close()">Bekor qilish</a-button>
                    <a-button type="primary" html-type="submit" :loading="employeesStore.loading">Saqlash</a-button>
                </div>
            </a-form>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { notification } from 'ant-design-vue'
import useEmployeesStore from '@/store/employees.pinia'
import useModal from '@/store/modal.pinia.js'
import InputPhoneComponent from '@/components/InputPhoneComponent.vue'
import { Upload, message } from 'ant-design-vue'

const modal = useModal()
const employeesStore = useEmployeesStore()
const form = ref({
    fullName: '',
    email: '',
    department: '',
    position: '',
    role: 'employee',
    phone: '',
    password: '',
    chatId: null,
    image: null,
})

const roles = [
    { label: 'Employee', value: 'employee' },
    { label: 'Manager', value: 'manager' },
    { label: 'Admin', value: 'admin' },
]

const handleSubmit = () => {
    employeesStore.addEmployee(form.value)
}

// Функция для проверки типа загружаемого файла (должен быть изображением)
const beforeUpload = (file) => {
    const isImage = file.type.startsWith('image/')
    if (!isImage) {
        message.error('Iltimos, tasvir faylini yuklang!')
    }
    return isImage
}

// Функция для загрузки изображения (в реальной реализации добавь серверную логику)
const uploadImage = (file) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("image_url")  // Здесь будет URL изображения, полученный от сервера
        }, 1000)
    })
}
</script>

<style scoped>
.ant-form-item {
    margin-bottom: 16px;
}
</style>
