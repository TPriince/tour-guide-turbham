<template>
  <Transition name="guide">
    <div
      v-if="show"
      class="fixed top-0 left-0 w-full min-h-screen bg-black/50 px-4 md:px-6 z-[100] transition-opacity duration-300 no-scrollbar"
    >
      <div
        ref="tooltipRef"
        :style="styles.tooltip"
        class="guide-container transition-all duration-700"
        :class="currentGuide.attachTo.element ? '' : 'mt-2 mb-16 w-full h-full'"
      >
        <GuideWrapper v-show="tooltipVisible" :currentStep="currentStep">
          <component :is="currentGuide.component" />
        </GuideWrapper>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import {
  ref,
  computed,
  nextTick,
  onMounted,
  provide,
  onUnmounted,
  watch,
} from "vue";
import GuideWrapper from "./GuideWrapper.vue";

const props = defineProps({
  steps: { type: Array, required: true },
  startTour: {
    type: Boolean,
    default: false,
  },
  startOnMount: {
    type: Boolean,
    default: true,
  },
  showGuideInterVal: {
    type: Number,
    default: 4500,
  },
});

const show = ref(false);
const currentStep = ref(0);
const tooltipRef = ref(null);
const styles = ref({ tooltip: {}, tooltipArrow: {} });
const tooltipVisible = ref(true);

const currentGuide = computed(() => props.steps[currentStep.value]);

const calculateTooltipPosition = (step, element) => {
  const rect = element.getBoundingClientRect();

  const offset = step.offset ? step.offset : 20;
  let top, left, translate;
  let arrowTop, arrowLeft, arrowRight, arrowBottom;

  switch (step.attachTo.on) {
    case "top":
      top = rect.top - offset;
      left = rect.left + rect.width / 2;
      translate = "translate(-50%, -100%)";
      arrowLeft = "50%";
      arrowTop = "100%";

      break;
    case "bottom":
      top = rect.bottom + offset;
      left = rect.left + rect.width / 2;
      translate = "translateX(-50%)";
      arrowTop = "0px";
      arrowLeft = "50%";

      break;
    case "left":
      top = rect.top + rect.height / 2;
      left = rect.left - offset;
      translate = "translate(-100%, -50%)";
      arrowTop = "50%";
      arrowLeft = "100%";

      break;
    case "right":
      top = rect.top + rect.height / 2;
      left = rect.right + offset;
      translate = "translateY(-50%)";
      arrowTop = "50%";
      arrowLeft = "0px";

      break;
    default:
      top = rect.top + rect.height / 2;
      left = rect.left + rect.width / 2;
  }

  console.log({
    rect,
    top,
    left,
    arrowTop,
    arrowLeft,
  });

  styles.value = {
    tooltip: {
      top: `${top}px`,
      left: `${left}px`,
      transform: translate,
      position: "fixed",
    },
    tooltipArrow: {
      top: arrowTop,
      left: arrowLeft,
      right: arrowRight,
      bottom: arrowBottom,
    },
  };
};

const setTooltip = async () => {
  const step = props.steps[currentStep.value];
  const element =
    step.attachTo.element && document.querySelector(step.attachTo.element);

  if (element) {
    tooltipVisible.value = false;

    await scrollToElement(element);

    calculateTooltipPosition(step, element);

    nextTick(() => {
      tooltipVisible.value = true; // Show tooltip after repositioning
    });
  } else {
    console.warn(
      `Element not found for step ${currentStep.value}: ${step.attachTo.element}`
    );
    styles.value = {};
  }
};

const scrollToElement = (element) => {
  return new Promise((resolve) => {
    element.scrollIntoView({ behavior: "smooth", block: "end" });
    setTimeout(resolve, 900);
  });
};

const nextStep = async () => {
  if (currentStep.value < props.steps.length - 1) {
    await nextTick(); // Ensure DOM updates are applied

    await setTooltip(); // Calculate the new tooltip position

    currentStep.value++;

    if (currentGuide.value.stepFunction) {
      currentGuide.value.stepFunction();
    }
  }
};

const endTour = () => {
  show.value = false;
};

const startTour = async () => {
  show.value = true;
  await nextTick(); // Ensure DOM updates are applied
  await setTooltip(); // Calculate the initial tooltip position

  if (currentGuide.value.stepFunction) {
    currentGuide.value.stepFunction();
  }

  if (props.startTour) {
    setTimeout(nextStep, props.showGuideInterVal);
  }
};

const initialiseTour = () => {
  setTimeout(() => {
    startTour();
  }, 2000);
};

onMounted(() => {
  if (props.startOnMount) {
    initialiseTour();
  }

  window.addEventListener("resize", setTooltip);
});

onUnmounted(() => {
  window.removeEventListener("resize", setTooltip);
  show.value = false;
  currentStep.value = 0;
  styles.value = { tooltip: {}, tooltipArrow: {} };
  tooltipVisible.value = true;
});

watch(currentStep, async () => {
  await nextTick(); // Ensure DOM updates are applied
  await setTooltip(); // Recalculate tooltip position for the new step

  setTimeout(nextStep, props.showGuideInterVal);
});

provide("currentGuide", currentGuide);
provide("currentStep", currentStep);
provide("initialiseTour", initialiseTour);
provide("styles", styles);
provide("nextStep", nextStep);
provide("endTour", endTour);
</script>

<style scoped>
.guide-enter-from,
.guide-leave-to {
  opacity: 0;
}

.guide-enter-from .guide-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

.guide-leave-to .guide-container {
  -webkit-transform: scale(0.8);
  transform: scale(0.8);
}
</style>
