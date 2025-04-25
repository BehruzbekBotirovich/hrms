<template>
    <div class="flex h-full w-[900px]">
        <!-- Левая часть: форма -->
        <div class="w-2/3 p-6 bg-white rounded-lg shadow-md border overflow-y-auto">
            <h2 class="text-xl font-semibold mb-6">Vazifani o'zgartirish</h2>

            <a-form layout="vertical" @submit.prevent="handleSubmit">
                <a-form-item label="* Sarlavha kiriting">
                    <a-input v-model:value="form.title" required />
                </a-form-item>

                <a-form-item label="Vazifa izohini kiriting">
                    <a-textarea v-model:value="form.description" rows="5" />
                </a-form-item>

                <a-form-item>
                    <h3>Biriktirilgan xodimlar</h3>
                    <a-select v-model:value="form.assignees" mode="multiple" placeholder="Tayinlash"
                        :options="userOptions" show-search allow-clear />
                </a-form-item>

                <a-form-item>
                    <h3>Muhimlik darajasi</h3>
                    <div class="flex flex-wrap gap-2">
                        <a-tag v-for="priority in priorities" :key="priority.value"
                            :color="form.priority === priority.value ? priority.color : 'default'"
                            @click="form.priority = priority.value"
                            class="cursor-pointer px-4 py-1 border rounded-full hover:opacity-80">
                            {{ priority.label }}
                        </a-tag>
                    </div>
                </a-form-item>

                <h3>Vaqt oraligi</h3>
                <div class="flex gap-2 items-center">
                    <a-form-item class="w-3/4">
                        <a-range-picker v-model:value="form.dateRange" show-time format="YYYY-MM-DD HH:mm"
                            class="w-full" />
                    </a-form-item>

                    <a-form-item label="Davomiyligi (soatda)" class="w-1/4">
                        <a-input-number v-model:value="form.duration" :min="1" class="w-full" />
                    </a-form-item>
                </div>

                <!-- <a-form-item>
                    <h3>Rasmlar</h3>
                    <a-upload v-model:file-list="fileList" list-type="picture-card" :before-upload="() => false"
                        :on-preview="handlePreview" :on-change="handleUploadChange" :on-remove="handleRemove"
                        accept="image/*" :max-count="1">
                        <div v-if="fileList.length < 1">
                            <plus-outlined />
                            <div style="margin-top: 8px">Yuklash</div>
                        </div>
                    </a-upload>

                </a-form-item> -->

                <div class="flex justify-end gap-2 mt-4">
                    <a-button @click="handleCancel">Bekor qilish</a-button>
                    <a-button type="primary" html-type="submit">Saqlash</a-button>
                </div>
            </a-form>
        </div>

        <!-- Правая часть -->
        <div class="w-1/3 border-l p-4 flex flex-col justify-center items-center bg-gray-50 text-gray-400">
            <p>Ma'lumot yo'q</p>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import useTasksStore from '@/store/tasks.pinia'
import { PlusOutlined } from '@ant-design/icons-vue'
import { priorities } from '../constants'

const props = defineProps({
    element: Object,
    status: String,
    boardId: String
})

const tasksStore = useTasksStore()
const fileList = ref([])
// const previewImage = ref('')
// const previewVisible = ref(false)

const form = ref({
    title: '',
    description: '',
    assignees: [],
    priority: null,
    dateRange: [],
    duration: null
})

onMounted(async () => {
    await tasksStore.getOneTask(props.element)
    const task = tasksStore.current_task
    form.value = {
        title: task?.title || '',
        description: task?.description || '',
        assignees: task?.assignedTo?.map(a => a._id) || [],
        priority: task?.priority || null,
        dateRange: task?.startDate && task?.dueDate
            ? [new Date(task.startDate), new Date(task.dueDate)]
            : [],
        duration: task?.estimatedHours ?? null
    }

    if (task?.taskImg && typeof task.taskImg === 'string') {
        fileList.value = [
            {
                uid: '-1',
                name: task.taskImg,
                status: 'done',
                url: `http://localhost:5000/${task.taskImg}`
            }
        ]
    }
})

const userOptions = computed(() =>
    tasksStore.project_members.map(member => ({
        label: member.fullName,
        value: member._id
    }))
)

// const handlePreview = async file => {
//     if (!file.url && !file.preview) {
//         file.preview = await getBase64(file.originFileObj)
//     }
//     previewImage.value = file.url || file.preview
//     previewVisible.value = true
// }

// const handleUploadChange = ({ fileList: newList }) => {
//     fileList.value = newList.slice(-1) // гарантируем один файл
// }


// const handleRemove = file => {
//     fileList.value = fileList.value.filter(f => f.uid !== file.uid)
// }

// const getBase64 = file =>
//     new Promise((resolve, reject) => {
//         const reader = new FileReader()
//         reader.readAsDataURL(file)
//         reader.onload = () => resolve(reader.result)
//         reader.onerror = error => reject(error)
//     })

const handleSubmit = () => {
    const payload = {
        title: form.value.title,
        description: form.value.description?.trim() || undefined,
        estimatedHours: typeof form.value.duration === 'number' ? form.value.duration : undefined,
        priority: form.value.priority || undefined,
        assignedTo: [...form.value.assignees],
        startDate: form.value.dateRange?.[0]?.toISOString() || undefined,
        dueDate: form.value.dateRange?.[1]?.toISOString() || undefined,
        status: props.status,
        boardId: props.boardId
    }

    tasksStore.updateTask(tasksStore.current_task._id, payload, props.boardId)
}

</script>

<style scoped>
.ant-tag {
    user-select: none;
    transition: all 0.2s;
}
</style>