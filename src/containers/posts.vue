<template>
  <v-flex>
    <div class="text-xs-center"
         v-show="posts.length">
      <v-pagination v-model="page"
                    :length="length || 1"
                    circle
                    class="ma1" />
    </div>
    <modal v-if="showPostCreateForm"
           @submit="onSubmit"
           @cancel="showPostCreateForm = false"
           :modal="showPostCreateForm">
      <span class="headline"
            slot="headline">Create Post</span>
      <post-form slot="body" />
    </modal>
    <div class="right-top">
      <v-text-field label="Search"
                    v-model="search"
                    prepend-icon="search"
                    single-line />
      <v-btn icon
             @click="fetchPosts">
        <i class="material-icons">refresh</i>
      </v-btn>
    </div>
    <v-list two-line
            v-if="posts.length">
      <transition-group name="slide-x-transition"
                        tag="div">
        <template v-for="(post, i) in posts">
          <v-list-tile :key="i"
                       @click="$router.push({ name: 'post', params: { id: post.id } })">
            <v-subheader v-text="post.id"
                         style="width: 50px" />
            <v-list-tile-content>
              <v-list-tile-title v-text="post.title" />
              <v-list-tile-sub-title v-text="post.body" />
            </v-list-tile-content>
          </v-list-tile>
          <v-divider v-if="i + 1 < posts.length"
                     :key="i" />
        </template>
      </transition-group>
    </v-list>
    <div v-else>
      <h3>Not Found</h3>
    </div>
    <v-btn class="indigo"
           @click="showPostCreateForm = true">
      <v-icon>add</v-icon>
    </v-btn>
  </v-flex>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import modal from '@/components/modal'
import postForm from '@/components/postForm'

export default {
  name: 'posts',
  data: () => ({
    search: '',
    showPostCreateForm: false,
    page: 1,
    pageSize: 10
  }),
  components: { modal, postForm },
  computed: {
    ...mapGetters([
      'getPosts',
    ]),
    filteredPosts() {
      return this.getPosts.filter(post => `${post.title}`.toLowerCase().indexOf(this.search.toLowerCase()) !== -1);
    },
    posts() {
      const start = (this.page - 1) * this.pageSize;
      return this.filteredPosts.slice(start, start + this.pageSize);
    },
    length() {
      const floatLength = this.filteredPosts.length / this.pageSize;
      const intLength = parseInt(floatLength, 10);
      const length = floatLength - intLength > 0 ? intLength + 1 : intLength;
      return length;
    }
  },
  methods: {
    ...mapActions([
      'fetchPosts',
      'createPost',
    ]),
    onSubmit(data) {
      this.createPost(data).then(id => {
        this.showPostCreateForm = false;
        this.$router.push({ name: 'post', params: { id } });
      }
      );
    }
  },
  watch: {
    search() {
      this.page = 1;
    }
  },
};
</script>
