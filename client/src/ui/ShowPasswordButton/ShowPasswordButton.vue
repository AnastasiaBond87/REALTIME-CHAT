<script setup lang="ts">
interface IProps {
  isPasswordVisible: boolean;
  scale?: number;
}
withDefaults(defineProps<IProps>(), {
  scale: 1,
});
</script>

<template>
  <icon-button>
    <v-icon name="bi-eye-fill" :scale="scale" v-if="isPasswordVisible" />
    <v-icon name="bi-eye-slash-fill" :scale="scale" v-else />
  </icon-button>
</template>
