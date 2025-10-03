<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import AppButton from '@/components/ui/AppButton.vue'
import allIcon from '@/assets/svg/icons/all-button.svg'
import starIcon from '@/assets/svg/icons/star-button.svg'
import { useI18n } from 'vue-i18n'

const router = useRouter()
const route = useRoute()
const { t } = useI18n()

function goAll() {
  if (route.name !== 'pokemon-list') router.push({ name: 'pokemon-list' })
}

function goFavorites() {
  if (route.name !== 'favorites') router.push({ name: 'favorites' })
}
</script>

<template>
  <div class="fixed inset-x-0 bottom-0 bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.04)]">
    <div class="mx-auto flex max-w-screen-md items-center justify-center gap-3 px-4 py-4">
      <AppButton
        :label="t('common.all')"
        :variant="route.name === 'pokemon-list' ? 'primary' : 'secondary'"
        :icon-src="allIcon"
        class="flex-1"
        @click="goAll"
      />
      <AppButton
        :label="t('common.favorites')"
        :variant="route.name === 'favorites' ? 'primary' : 'secondary'"
        :icon-src="starIcon"
        class="flex-1"
        @click="goFavorites"
      />
    </div>
  </div>
</template>
