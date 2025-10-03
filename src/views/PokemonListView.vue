<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import AppInput from '@/components/ui/AppInput.vue'
import PokemonList from '@/components/shared/PokemonList.vue'
import AppLoadingSpinner from '@/components/ui/AppLoadingSpinner.vue'
import AppAlert from '@/components/ui/AppAlert.vue'
import { getPokemonList } from '@/api/pokemon'
import bg from '@/assets/svg/backgrounds/background.svg'
import PokemonDetailModal from '@/components/shared/PokemonDetailModal.vue'
import { useFavoritesStore } from '@/stores/favorites'
import AppButton from '@/components/ui/AppButton.vue'
import FavoriteButton from '@/components/shared/FavoriteButton.vue'
import { useI18n } from 'vue-i18n'
import { useAppState } from '@/composables/useAppState'
import { usePokemonDetail } from '@/composables/usePokemonDetail'

const isLoading = ref(false)
const search = ref('')
const allItems = ref<{ name: string; favorite: boolean }[]>([])
const isEmptyState = ref(false)

const favoritesStore = useFavoritesStore()
const { t } = useI18n()
const { setShowFooter } = useAppState()

const filteredItems = computed(() => {
  const q = search.value.trim().toLowerCase()
  const list = q ? allItems.value.filter((it) => it.name.toLowerCase().includes(q)) : allItems.value
  return list.map((it) => ({ ...it, favorite: favoritesStore.isFavorite(it.name) }))
})

async function fetchAll() {
  isLoading.value = true
  try {
    const res = await getPokemonList({ limit: 1000, offset: 0 })
    allItems.value = res.results.map((r) => ({
      name: r.name,
      favorite: favoritesStore.isFavorite(r.name),
    }))
  } finally {
    isLoading.value = false
  }
}

function toggleFavorite(name: string) {
  favoritesStore.toggleFavorite(name)
}

function onEmptyStateChange(isEmpty: boolean) {
  isEmptyState.value = isEmpty
  setShowFooter(!isEmpty)
}

const { showModal, detail, showShareSuccess, openDetail, getDetailImage, onShare, closeDetail } =
  usePokemonDetail()

onMounted(async () => {
  await fetchAll()
})
</script>

<template>
  <main class="mx-auto flex max-w-screen-md flex-col gap-4 px-4 py-4">
    <div class="sticky top-0 z-10 bg-white mb-4">
      <AppInput
        v-model="search"
        :placeholder="t('common.search')"
      />
    </div>

    <AppLoadingSpinner
      v-if="isLoading"
      :fullscreen="true"
    />

    <PokemonList
      :items="filteredItems"
      @open="openDetail"
      @toggle-favorite="toggleFavorite"
      @empty-state-change="onEmptyStateChange"
    />

    <PokemonDetailModal
      :open="showModal"
      :background-src="bg"
      :pokemon-image-src="getDetailImage(detail)"
      @close="closeDetail"
    >
      <div
        v-if="detail"
        class="divide-y divide-[var(--gray-200)]"
      >
        <div class="py-3">
          <span class="font-bold">{{ t('common.name') }}:</span
          ><span class="pl-2">{{ detail.name }}</span>
        </div>
        <div class="py-3">
          <span class="font-bold">{{ t('common.weight') }}:</span
          ><span class="pl-2">{{ detail.weight }}</span>
        </div>
        <div class="py-3">
          <span class="font-bold">{{ t('common.height') }}:</span
          ><span class="pl-2">{{ detail.height }}</span>
        </div>
        <div class="py-3">
          <span class="font-bold">{{ t('common.types') }}:</span
          ><span class="pl-2">{{ detail.types.join(', ') }}</span>
        </div>
      </div>
      <template #footer>
        <div class="flex items-center justify-between">
          <AppButton
            :label="t('common.shareToMyFriends')"
            variant="primary"
            @click="onShare"
          />
          <div>
            <FavoriteButton
              :active="favoritesStore.isFavorite(detail?.name || '')"
              :aria-label="
                favoritesStore.isFavorite(detail?.name || '')
                  ? t('common.removeFromFavorites')
                  : t('common.addToFavorites')
              "
              @toggle="() => favoritesStore.toggleFavorite(detail?.name || '')"
            />
          </div>
        </div>
      </template>
    </PokemonDetailModal>

    <AppAlert
      :show="showShareSuccess"
      variant="success"
    />
  </main>
</template>
