<script setup lang="ts">
import Header from '../components/TheHeader.vue';
import { ref, computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import { occupations } from '@/libs/constants';

import { inject } from 'vue'

const selectedLang = inject('selectedLang')

const router = useRouter();
function handleClick(id: string) {
  router.push(`/occupations/${id}`);
}

const searchTerm = ref('');
const currentPage = ref(1);
const itemsPerPage = 5;

const filteredOccupations = computed(() =>
  occupations.filter((occ) =>
    occ[`Title_${selectedLang.value}`]?.toLowerCase().includes(searchTerm.value.toLowerCase())
  )
);

const totalPages = computed(() =>
  Math.ceil(filteredOccupations.value.length / itemsPerPage)
);

const paginatedOccupations = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return filteredOccupations.value.slice(start, start + itemsPerPage);
});

// Reset to first page on new search
watch(searchTerm, () => {
  currentPage.value = 1;
});

const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++;
};

const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--;
};

const setCurrentPage = (n: number) => {
  currentPage.value = n;
};
</script>

<template>
  <main>
    <div class="bg-white w-5/6 m-auto rounded-xl shadow-xl shadow-grey-200 my-10">
      <Header />
      <div class="p-10">
        <div class="flex justify-between items-center mb-10">
          <h1 class="text-3xl font-bold">Все профессии</h1>
          <div class="flex items-center gap-4">
            <div class="relative">
              <input
                v-model="searchTerm"
                type="text"
                class="border border-gray-200 rounded-md py-2 pl-10 pr-4 focus:outline-none focus:border-gray-400"
                placeholder="Поиск..."
              />
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <img alt="search bar" src="/src/assets/images/search.svg" />
              </div>
            </div>
          </div>
        </div>

        <!-- Table -->
        <table class="w-full text-left border border-gray-300 rounded-lg border-collapse">
          <thead class="bg-gray-100 text-gray-700 text-sm">
          <tr>
            <th class="p-4 border border-gray-300">Название</th>
            <th class="p-4 border border-gray-300">Популярный</th>
          </tr>
          </thead>
          <tbody class="text-gray-800">
          <tr
            v-for="occupation in paginatedOccupations"
            :key="occupation.onet_code"
            class="hover:bg-gray-50 cursor-pointer"
            @click="handleClick(occupation.onet_code)"
          >
            <td class="p-4 border border-gray-300">
              {{ occupation?.[`Title_${selectedLang}`] }}
            </td>
            <td class="p-4 border border-gray-300">
              <div class="flex items-center gap-2">
                <div
                  :class="[
        'w-6 h-6 flex items-center justify-center rounded-full',
        occupation.Bright_outlook === 'Rapid Growth'
          ? 'bg-green-100 text-green-600'
          : 'bg-red-100 text-red-600'
      ]"
                >
                  <svg
                    v-if="occupation.Bright_outlook === 'Rapid Growth'"
                    class="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <svg
                    v-else
                    class="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
              </div>
            </td>
          </tr>
          </tbody>
        </table>

        <!-- Pagination -->
        <div class="flex items-center gap-4 mt-12 ml-2">
          <!-- Prev Button -->
          <button
            class="w-12 h-12 border border-slate-100 text-gray-700 rounded-xl font-medium text-lg disabled:bg-gray-300"
            :disabled="currentPage === 1"
            @click="prevPage"
          >
            ‹
          </button>

          <!-- Pagination Dots -->
          <div class="flex items-center gap-2">
            <span
              v-for="n in totalPages"
              :key="n"
              class="cursor-pointer w-12 h-12 flex items-center justify-center border border-slate-100 rounded-xl font-medium text-lg"
              :class="n === currentPage ? 'bg-gray-200 border-black' : 'hover:bg-gray-100'"
              @click="setCurrentPage(n)"
            >
              {{ n }}
            </span>
          </div>

          <!-- Next Button -->
          <button
            class="w-12 h-12 border border-slate-100 text-gray-700 rounded-xl font-medium text-lg disabled:bg-gray-300"
            :disabled="currentPage === totalPages"
            @click="nextPage"
          >
            ›
          </button>
        </div>

      </div>
    </div>
  </main>
</template>

<style scoped>
/* Add styles as needed */
</style>
