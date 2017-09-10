<template>
  <v-card>
    <v-card-text>
      <v-text-field label="Name"
                    v-model="commentData.name" />
      <v-text-field label="Body"
                    v-model="commentData.body"
                    multi-line />
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn slot="submit"
             class="blue--text darken-1"
             flat
             @click="$parent.$parent.$listeners.submit(commentData)"
             scoped>Save</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'commentForm',
  props: {
    comment: {
      type: Object,
      required: false
    },
  },
  data: () => ({
    commentData: {
      postId: '',
      id: '',
      name: '',
      email: '',
      body: '',
    }
  }),
  mounted() {
    if (this.comment) {
      this.$set(this, 'commentData', { ...this.comment });
    }
  },
}
</script>
