<template>
  <advanced-image :cld-img="img" :alt="alt" />
</template>

<script setup lang="ts">
import { AdvancedImage } from '@cloudinary/vue';
import { Cloudinary } from '@cloudinary/url-gen';
import { Resize } from '@cloudinary/url-gen/actions/resize';
import { computed } from 'vue';

interface IProps {
  imgId: string;
  alt?: string;
  size: number;
}

const props = withDefaults(defineProps<IProps>(), {
  alt: '',
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
    .resize(Resize.fill().width(props.size).height(props.size))
);
</script>
