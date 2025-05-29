<template>
  <div class="p-4">
    <h1 class="font-semibold text-lg mb-2">{{ $t('employee.update') }}</h1>
    <a-form :form="form" :model="formData" layout="vertical">
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item
            :label="$t('employee.fullName')"
            name="fullName"
            :rules="[{ required: true, message: $t('employee.nameRequired') }]"
          >
            <a-input v-model:value="formData.fullName" />
          </a-form-item>
        </a-col>

        <a-col :span="12">
          <a-form-item
            :label="$t('employee.email')"
            name="email"
            :rules="[
              {
                required: true,
                type: 'email',
                message: $t('employee.emailRequired')
              }
            ]"
          >
            <a-input v-model:value="formData.email" />
          </a-form-item>
        </a-col>
      </a-row>

      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item
            :label="$t('employee.phone')"
            name="phone"
            :rules="[{ required: true, message: $t('employee.phoneRequired') }]"
          >
            <a-input v-model:value="formData.phone" />
          </a-form-item>
        </a-col>

        <a-col :span="12">
          <a-form-item
            :label="$t('employee.position')"
            name="position"
            :rules="[
              { required: true, message: $t('employee.positionRequired') }
            ]"
          >
            <a-input v-model:value="formData.position" />
          </a-form-item>
        </a-col>
      </a-row>

      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item
            name="role"
            :rules="[{ required: true, message: $t('employee.roleRequired') }]"
          >
            <a-select v-model:value="formData.role" :options="roleOptions" />
          </a-form-item>
        </a-col>

        <a-col :span="12">
          <a-button @click="handleSubmit" :loading="employeesStore.loading" html-type="submit" type="primary" class="w-full"
            > {{$t('employee.update')}}
          </a-button>
        </a-col>
      </a-row>
    </a-form>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import useEmployeesStore from '@/store/employees.pinia.js'

const employeesStore = useEmployeesStore()
const props = defineProps({
  employee: {
    type: Object
  }
})

// Для хранения данных формы
const formData = reactive({
  fullName: props.employee.fullName || '',
  email: props.employee.email || '',
  phone: props.employee.phone || '',
  position: props.employee.position || '',
  role: props.employee.role || ''
})

const roleOptions = [
  { label: 'Employee', value: 'employee' },
  { label: 'Manager', value: 'manager' },
  { label: 'Admin', value: 'admin' }
]

// Обработчик отправки формы
const handleSubmit = () => {
  employeesStore.updateEmployee(formData, props.employee._id)
}
</script>

<style scoped></style>
