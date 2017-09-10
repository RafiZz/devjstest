<template>
  <div class="alerts-wrapper"
       v-if="$store.state.alerts">
    <v-alert v-for="(alert, i) in $store.state.alerts"
             :key="i"
             :success="!alert.message || alert.status < 300"
             :error="!!alert.message || alert.status >= 400"
             :value="alert"
             transition="scale-transition">
      <template v-if="!alert.message">
        <span>{{ alert.config.method }}</span>
        <span>{{ alert.config.url.replace(alert.config.baseURL, '') }}</span>
        <span>{{ alert.status }}</span>
      </template>
      <p v-if="alert.statusText || alert.message">{{ alert.statusText || alert.message }}</p>
    </v-alert>
  </div>
</template>

<style scoped>
.alerts-wrapper {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  z-index: 9999;
}

.alerts-wrapper>* {
  margin: 0;
}
</style>
