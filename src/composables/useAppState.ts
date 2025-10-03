import { ref } from 'vue'

const showFooter = ref(true)

export function useAppState() {
  function setShowFooter(show: boolean) {
    showFooter.value = show
  }

  function getShowFooter() {
    return showFooter.value
  }

  return {
    showFooter,
    setShowFooter,
    getShowFooter,
  }
}
