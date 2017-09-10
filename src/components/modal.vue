<template>
  <v-layout row
            justify-center
            :elevation="24">
    <v-dialog v-model="modal"
              persistent
              width="800px">
      <v-card>
        <v-card-title>
          <slot name="headline">Headline</slot>
        </v-card-title>
        <slot name="body">Body</slot>
        <v-card-actions>
          <v-spacer />
          <slot name="submit" />
          <v-btn class="blue--text darken-1"
                 flat
                 @click="$listeners.cancel">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
export default {
  name: 'modal',
  props: {
    modal: {
      type: Boolean,
      default: true
    }
  },
}
</script>
