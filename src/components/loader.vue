<template>
  <div class="loading">
    <v-progress-circular indeterminate
                         v-bind:size="70"
                         v-bind:width="7"
                         class="primary--text" />
  </div>
</template>
 <style>
.loading {
  position: fixed;
  z-index: 9999;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
 