<template>
  <advanced-image :cld-img="img" :alt="alt" />
</template>

<script setup lang="ts">
import { AdvancedImage } from '@cloudinary/vue';
import { Cloudinary } from '@cloudinary/url-gen';
import { Resize } from '@cloudinary/url-gen/actions/resize';
import { computed } from 'vue';

const props = defineProps({
  imgId: {
    type: String,
    required: true,
  },
  alt: {
    type: String,
    default: '',
  },
  width: {
    type: Number,
    required: true,
  },
  height: {
    type: Number,
    required: true,
  },
});

const cld = new Cloudinary({
  cloud: {
    cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
  },
  url: {
    secure: true,
  },
});

const img = computed(() =>
  cld
    .image(props.imgId)
    .quality('auto:best')
    .resize(Resize.fill().width(props.width).height(props.height))
);
</script>
