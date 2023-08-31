<script setup lang="ts">
defineProps({
  isPasswordVisible: {
    type: Boolean,
    required: true,
  },
});
</script>

<template>
  <icon-button>
    <v-icon name="bi-eye-fill" scale="1.3" v-if="isPasswordVisible" />
    <v-icon name="bi-eye-slash-fill" scale="1.3" v-else />
  </icon-button>
</template>
