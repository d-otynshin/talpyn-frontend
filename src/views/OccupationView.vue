<script setup lang="ts">
import Header from '../components/TheHeader.vue'
import { occupations } from '@/libs/constants'
import { useRoute } from 'vue-router'
import { inject } from 'vue'

const selectedLang = inject('selectedLang')

const route = useRoute()

const id = route.params.id

const profession = occupations.find(occupation => {
  return occupation['onet_code'] == id
})
</script>

<template>
  <main>
    <div
      class="bg-white w-5/6 m-auto rounded-xl shadow-xl shadow-grey-200 my-10"
    >
      <Header />

      <div class="py-4 px-10">
        <div
          class="col-span-4 w-full bg-white border border-gray-200 rounded-3xl p-8 space-y-6"
        >
          <!-- Title -->
          <div class="flex items-center justify-between">
            <h2 class="text-2xl sm:text-3xl font-bold text-gray-900">
              {{ profession?.[`Title_${selectedLang}`] }}
            </h2>
            <span
              v-if="profession?.Bright_outlook === 'Rapid Growth'"
              class="inline-block px-3 py-1 text-sm bg-green-100 text-green-600 rounded-full font-medium"
              >Яркая перспектива</span
            >
            <span
              v-else
              class="inline-block px-3 py-1 text-sm bg-gray-100 text-gray-600 rounded-full font-medium"
              >Низкая перспектива</span
            >
          </div>

          <!-- Description -->
          <div>
            <p class="text-gray-600 text-base leading-relaxed">
              {{ profession?.[`Description_${selectedLang}`] }}
            </p>
          </div>

          <!-- Details Section -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <!-- Job Zone -->
            <div class="bg-gray-50 p-4 rounded-xl border border-gray-100">
              <h3 class="text-sm text-gray-500 uppercase tracking-wider mb-1">
                Зона занятости
              </h3>
              <p class="text-gray-800 font-medium">
                {{ profession?.[`Job_zone_name_${selectedLang}`] }}
              </p>
            </div>

            <!-- Bright Outlook (icon variant) -->
            <div
              class="bg-gray-50 p-4 rounded-xl border border-gray-100 flex items-center gap-4"
            >
              <div class="bg-gray-50 p-4 rounded-xl border border-gray-100 flex items-center gap-4">
                <div
                  :class="[
      'w-10 h-10 flex items-center justify-center rounded-full',
      profession?.Bright_outlook === 'Rapid Growth'
        ? 'bg-green-100 text-green-600'
        : 'bg-red-100 text-red-600'
    ]"
                >
                  <svg
                    v-if="profession?.Bright_outlook === 'Rapid Growth'"
                    class="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <svg
                    v-else
                    class="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <div>
                  <h3 class="text-sm text-gray-500 uppercase tracking-wider">Перспектива</h3>
                </div>
              </div>
            </div>
          </div>

          <!-- Related Jobs -->
          <div>
            <h3 class="text-sm text-gray-500 uppercase tracking-wider mb-2">
              Связанные профессии
            </h3>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="job in profession?.[`Related_${selectedLang}`].split(', ')"
                :key="job"
                class="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium"
              >
                {{ job }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped></style>
