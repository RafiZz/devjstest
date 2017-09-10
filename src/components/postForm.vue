<template>
  <v-card>
    <v-card-text>
      <v-text-field label="Title"
                    v-model="postData.title" />
      <v-text-field label="Body"
                    v-model="postData.body"
                    multi-line />
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn slot="submit"
             class="blue--text"
             flat
             @click="$parent.$parent.$listeners.submit(postData)"
             scoped>Save</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'postForm',
  props: {
    post: {
      type: Object,
      required: false
    },
  },
  data: () => ({
    postData: {
      id: '',
      userId: '',
      title: '',
      body: ''
    }
  }),
  mounted() {
    if (this.post) {
      this.$set(this, 'postData', { ...this.post });
    }
  },
}
</script>
