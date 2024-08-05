# Vue Tour Guide Component

A customizable tour guide component for Vue 3 applications that highlights elements and guides users through different steps.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
  - [Props](#props)
  - [Events](#events)
  - [Example](#example)
- [Components](#components)
  - [GuideWrapper](#guidewrapper)
  - [Guide](#guide)
- [Author](#author)

## Features

- Customizable steps with dynamic content
- Smooth scrolling to elements
- Highlighting elements with tooltips
- Configurable positioning of tooltips
- Automatic progression through steps
- Resize handling

## Installation

```bash
npm install tour-guide-turbham
```

## Usage

1. To use the tour guide in your Vue project, import the component and the CSS file:

```js
import { createApp } from "vue";
import App from "./App.vue";
import "tour-guide-turbham/dist/style.css";

const app = createApp(App);

app.mount("#app");
```

2. Import the `TourGuide` component into your Vue application.

```vue
<template>
  <div id="app">
    <TourGuide :steps="steps" :startTour="true" :showGuideInterVal="4500" />
    <!-- Other content -->
  </div>
</template>

<script setup>
import { ref } from "vue";
import TourGuide from "./components/TourGuide.vue";

const steps = ref([
  {
    component: "StepComponent1",
    attachTo: { element: "#element1", on: "bottom" },
    stepFunction: () => console.log("Step 1 action"),
  },
  {
    component: "StepComponent2",
    attachTo: { element: "#element2", on: "right" },
    stepFunction: () => console.log("Step 2 action"),
  },
  // Add more steps as needed
]);
</script>
```

## Props

| Prop                | Type    | Required | Default | Description                                   |
| ------------------- | ------- | -------- | ------- | --------------------------------------------- |
| `steps`             | Array   | Yes      | -       | Array of step objects defining the tour steps |
| `startTour`         | Boolean | No       | false   | Automatically start the tour on mount         |
| `startOnMount`      | Boolean | No       | true    | Start the tour when the component is mounted  |
| `showGuideInterVal` | Number  | No       | 4500    | Time interval in milliseconds between steps   |

## Events

The component provides several events to handle tour actions. These events can be sued within the scope of the tour guide:

| Event Name | Description                          |
| ---------- | ------------------------------------ |
| `nextStep` | Fired when the tour is ended.        |
| `endTour`  | Fired when the next step is reached. |

## Example

Here is a complete example of using the TourGuide component in a Vue 3 application:

```vue
<template>
  <div id="app">
    <TourGuide :steps="steps" :startTour="true" :showGuideInterVal="4500" />
    <div id="element1">Step 1 target element</div>
    <div id="element2">Step 2 target element</div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import TourGuide from "./components/TourGuide.vue";

const steps = ref([
  {
    component: "StepComponent1",
    attachTo: { element: "#element1", on: "bottom" },
    stepFunction: () => console.log("Step 1 action"),
  },
  {
    component: "StepComponent2",
    attachTo: { element: "#element2", on: "right" },
    stepFunction: () => console.log("Step 2 action"),
  },
  // Add more steps as needed
]);
</script>
```

## Components

### GuideWrapper

The GuideWrapper component is used to wrap the content of each step in the tour.

### Guide

The Guide component is used to display the content of each step in the tour. You can use it in the steps array by specifying it as the component.

```js
const steps = ref([
  {
    attachTo: {
      element: "#step1",
      on: "bottom",
    },
    text: "This is step 1",
    component: "Guide",
  },
  {
    attachTo: {
      element: "#step2",
      on: "top",
    },
    text: "This is step 2",
    component: "Guide",
  },
  // Add more steps as needed
]);
```

## Credits

This NPM package was developed by Tobiloba Odukoya.
