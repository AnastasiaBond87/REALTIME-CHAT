import { onBeforeUnmount, onMounted, ref } from 'vue';

const useClickOutside = <T extends HTMLElement>() => {
  const isOpen = ref(false);
  const element = ref<T | null>(null);

  const handleClickOutside = (event: Event): void => {
    const { target } = event;

    if (
      target instanceof HTMLElement &&
      element.value &&
      !element.value.contains(target) &&
      isOpen.value
    ) {
      isOpen.value = false;
    }
  };

  onMounted(() => {
    window.addEventListener('click', handleClickOutside);
  });

  onBeforeUnmount(() => {
    window.removeEventListener('click', handleClickOutside);
  });

  return { isOpen, element };
};

export { useClickOutside };
