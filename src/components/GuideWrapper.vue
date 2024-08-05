<template>
  <Transition :key="currentStep" appear>
    <div :class="currentGuide.attachTo.on ? 'guide-bx-shadow' : ''">
      <div class="relative z-10">
        <slot></slot>
      </div>

      <div
        v-if="currentGuide.attachTo.on"
        class="w-3.5 h-3.5 absolute -translate-x-1/2 -translate-y-1/2 rotate-45"
        :style="{
          backgroundColor: currentGuide.tooltipArrowColor
            ? `${currentGuide.tooltipArrowColor}`
            : 'white',
          ...styles.tooltipArrow,
        }"
      ></div>
    </div>
  </Transition>
</template>

<script setup>
import { inject } from "vue";

const currentGuide = inject("currentGuide");
const currentStep = inject("currentStep");
const styles = inject("styles");
</script>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 1s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.guide-bx-shadow {
  box-shadow: 0px 4px 4px 0px #00000040;
}
</style>
