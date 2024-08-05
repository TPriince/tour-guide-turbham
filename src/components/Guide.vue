<template>
  <div
    class="bg-white p-2.5 rounded-lg"
    :class="currentGuide.width ? currentGuide.width : 'max-w-[199px]'"
  >
    <p class="text-Cinder text-xs md:text-sm font-medium">
      {{ currentGuide.text }}
    </p>
  </div>
</template>

<script setup>
import { inject } from "vue";

const currentGuide = inject("currentGuide");
</script>
