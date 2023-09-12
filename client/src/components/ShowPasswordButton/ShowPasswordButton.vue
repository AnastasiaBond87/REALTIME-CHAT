<script setup lang="ts">
defineProps({
  isPasswordVisible: {
    type: Boolean,
    required: true,
  },
  scale: {
    type: Number,
    default: 1,
  },
});
</script>

<template>
  <icon-button>
    <v-icon name="bi-eye-fill" :scale="scale" v-if="isPasswordVisible" />
    <v-icon name="bi-eye-slash-fill" :scale="scale" v-else />
  </icon-button>
</template>
