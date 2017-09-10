<template>
  <v-list-tile>
    <v-list-tile-content>
      <v-list-tile-title v-text="comment.email" />
      <v-list-tile-title v-text="comment.name" />
      <v-list-tile-sub-title v-text="comment.body" />
    </v-list-tile-content>
    <slot name="buttons" />
  </v-list-tile>
</template>

<script>
export default {
  name: 'comment',
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
}
</script>
