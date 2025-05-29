<template>
  <div class="p-4">
    <h3 class="text-2xl font-bold">{{ $t('menu.TasksView') }}</h3>
    <a-skeleton :loading="tasksStore.loading" class="w-full">
      <div class="flex gap-2 overflow-x-scroll ">
        <div v-for="(status, index) in tasksStore.my_tasks" :key="index" class="bg-white column rounded-lg h-fit">
          <h3 class="px-4 py-2 border-b-2 "> {{ index }}</h3>

          <router-link v-for="task in status" :key="task._id"
            :to="`/dashboard/projects/tasks/${task?.boardId?._id}?projectName=${projectId?.name}&boardName=${task?.boardId?.name}&projectId=${task?.projectId?._id}`">
            <div class="bg-gray-50 task-card rounded-lg shadow-md p-4 space-y-1 mb-3 mx-2">
              <div class="font-semibold"> {{ task.title }}</div>
              <div class="text-sm text-gray-600">Board: <span class="text-black">{{ task.boardId.name }}</span></div>
              <div class="text-sm text-gray-600">Project: <span class="text-black"> {{ task.projectId.name }}</span>
              </div>

              <div class="flex gap-1">
                <badge-priority-component v-if="task?.priority" :status="task?.priority" class="w-fit" />
                <a-tag v-if="task?.startDate && task?.dueDate" class="flex w-fit items-center gap-1" color="blue"
                  size="small">
                  <icon-clock />
                  {{ dayjs(task.startDate).format('MMM D HH:mm') }} - {{ dayjs(task?.dueDate).format('MMM D HH:mm') }}
                </a-tag>
                <a-tag v-else class="flex gap-1 items-center" color="default" size="small">
                  <icon-clock /> {{ $t('common.null') }}
                </a-tag>
              </div>

              <div class="text-sm"> <span class="text-gray-600">{{$t('task.creator')}}:</span> {{ task.createdBy?.fullName }}</div>
            </div>

          </router-link>

        </div>
      </div>
    </a-skeleton>

  </div>
</template>
<script setup>
import dayjs from 'dayjs'
import BadgePriorityComponent from '@/components/BadgePriorityComponent.vue'
import useTasksStore from '@/store/tasks.pinia.js';
import { ref, reactive, onMounted } from 'vue'
const tasksStore = useTasksStore()



onMounted(() => {
  tasksStore.getMyTasks()
})

</script>
<style scoped>
.task-card {
  width: 280px !important;
}

.column {
  width: 300px !important;
  min-width: 300px;
}
</style>
