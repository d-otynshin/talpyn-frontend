<script setup lang="ts">
import { inject } from 'vue'

const selectedLang = inject('selectedLang')
</script>

<template>
  <header class="flex justify-between px-10 py-6">
    <router-link to="/">
      <div class="flex items-center gap-4">
        <div>
          <h2 class="font-bold text-l uppercase">Talpyn</h2>
          <p class="text-slate-400">Платформа для профориентации</p>
        </div>
      </div>
    </router-link>

    <ul class="flex items-center gap-10">
      <select
        v-model="selectedLang"
        class="border border-gray-300 rounded-md px-3 py-2 text-gray-700"
      >
        <option value="ru">Русский</option>
        <option value="kz">Қазақша</option>
      </select>

      <select
        class="py-2 px-3 border border-gray-200 focus:border-gray-400 rounded-md focus:outline-none"
      >
        <option value="price">Старший</option>
        <option value="price">Младший</option>
      </select>

      <li class="flex items-center gap-3 cursor-pointer">
        <img class="w-7" src="/src/assets/icons/profile.png" alt="Cart" />
        <span>Войти</span>
      </li>
    </ul>
  </header>
</template>
