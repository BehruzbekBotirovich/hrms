<template>
  <section class="p-4">
    <div class="flex justify-between items-center mb-4">
      <h3 class="text-2xl font-bold">{{ $t('project_page.title') }}</h3>
      <div class="flex gap-2">
        <!-- <input type="text" v-model="searchQuery" placeholder="Введите название проекта..."
            class="border rounded px-3 py-1" /> -->
        <!-- <select v-model="filterStatus" class="border rounded px-3 py-1">
            <option value="">Все</option>
            <option value="Активный">Активный</option>
            <option value="Завершён">Завершён</option>
        </select> -->
        <a-button
          @click="openAddProjectModal"
          class="bg-blue-600 text-white px-4 rounded hover:bg-blue-700"
        >
          + {{ $t('project_page.add') }}
        </a-button>
      </div>
    </div>

    <div class="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div
        v-for="project in projectsStore.projects"
        :key="project.id"
        class="border cursor-pointer bg-white hover:border-blue-400 hover:shadow-lg rounded-xl p-4"
      >
        <router-link
          :to="`/dashboard/projects/view/${project?._id}?projectName=${project?.name}`"
        >
          <div class="flex items-center justify-between">
            <h4 class="text-lg font-semibold mb-2">{{ project?.name }}</h4>
            <a-dropdown :trigger="['click']" v-if="userMe.user.role==='admin'">
              <a-button size="small" class="ant-dropdown-link" @click.stop>
                <icon-triple-dots />
              </a-button>
              <template #overlay>
                <a-menu>
                  <a-menu-item key="0">
                    <div @click="$emit('selfClick')" class="flex items-center gap-1">
                      <icon-edit /> <span>Tahrirlash</span>
                    </div>
                  </a-menu-item>
                  <a-menu-item key="1">
                    <a-popconfirm :title="$t('confirm.delete')"
                                  @confirm="projectsStore.archiveProject(project._id)" :ok-text="$t('confirm.yes')"
                                  :cancel-text="$t('confirm.no')">
                      <div class="flex items-center gap-1">
                        <icon-delete /><span>{{$t('project_page.delete')}}</span>
                      </div>
                    </a-popconfirm>
                  </a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>
          </div>
          <p class="text-gray-600 mb-3">{{ project?.description }}</p>
          <div class="flex flex-wrap items-center gap-2">
            <badge-component :status="project?.isArchived" :content="project?.isArchived ? t('close') : t('open') " />
            <span
              class="text-sm border text-gray-800 bg-gray-100 px-2 py-0.5 rounded flex items-center gap-1"
            >
              {{ project?.owner }}
              <icon-pinned />
            </span>
            <span
              class="text-sm border bg-gray-100 px-2 py-0.5 rounded flex items-center gap-1"
            >
              <icon-triple-user />
              {{ project?.membersCount }}
            </span>
          </div>
        </router-link>
      </div>
      <project-sceleton v-if="projectsStore.loading" />
    </div>
  </section>
</template>

<script setup>
import { computed, ref, onMounted, shallowRef } from 'vue'
import useProjectsStore from '@/store/projects.pinia.js'
import BadgeComponent from '@/components/BadgeComponent.vue'
import useModal from '@/store/modal.pinia.js'
import ProjectSceleton from '@/components/ProjectSceleton.vue'
import useUser from '@/store/user.pinia.js'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
// icons
import IconPinned from '@/components/icons/IconPinned.vue'
import IconUser from '@/components/icons/IconUser.vue'
import IconTripleUser from '@/components/icons/IconTripleUser.vue'
import AddProjectModal from '@/components/AddProjectModal.vue'

const projectsStore = useProjectsStore()
const modal = useModal()
const userMe = useUser()

function openAddProjectModal() {
  modal.open({
    component: shallowRef(AddProjectModal)
  })
}

onMounted(() => {
  projectsStore.getProjects()
  projectsStore.getAllEmployees()
})

const searchQuery = ref('')
const filterStatus = ref('')
</script>