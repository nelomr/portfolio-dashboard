<script setup lang="ts">
import { ref } from "vue";
import { Zap } from "lucide-vue-next";

const title = ref("Cartera");
</script>

<template>
  <header class="sticky top-0 z-10 border-b bg-background/80 backdrop-blur-md">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 items-center justify-between">
        <div class="flex items-center gap-3">
          <div
            class="h-8 w-8 rounded-lg bg-primary flex items-center justify-center shadow-lg"
          >
            <Zap class="w-5 h-5 text-primary-foreground" />
          </div>
          <h1 class="text-xl font-semibold tracking-tight">{{ title }}</h1>
        </div>
      </div>
    </div>
  </header>
</template>
