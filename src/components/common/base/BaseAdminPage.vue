<template>
  <div>
    <sub-header-title-page :title="title" />
    <main class="h-full overflow-y-auto">
      <div class="container px-6 mx-auto grid">
        <slot />
      </div>
    </main>
  </div>
</template>


<script setup>

import {defineProps} from "vue"


defineProps({
    title:{
        type: String,
        default: '',
    }
})

</script>