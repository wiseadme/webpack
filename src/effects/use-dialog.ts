import { ref } from 'vue'

type DialogAction = {
  type: 'success' | 'warning' | 'danger' | 'primary',
  title: string,
  handler: () => any
}

type DialogParams = {
  header: string
  type: 'success' | 'warning' | 'danger' | 'primary',
  content: string,
  width?: string | number,
  actions: DialogAction[]
}

export const showDialog = ref<boolean>(false)
export const dialogParams = ref<DialogParams | null>(null)

export function useDialog() {
  const dialog = {
    show: (params: DialogParams) => {
      dialogParams.value = params
      requestAnimationFrame(() => showDialog.value = true)
    },

    close: () => {
      showDialog.value = false
    },
  }

  return {
    dialog,
  }
}
