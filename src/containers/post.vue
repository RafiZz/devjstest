<template>
  <v-flex class="relative">
    <h2>Post</h2>
    <div v-if="post">
      <p v-if="author">Author: {{ author.name }}</p>
      <h5>{{ post.title }}</h5>
      <p>{{ post.body }}</p>
      <p>{{ comments.length }} comments</p>
      <v-list three-line
              v-if="comments.length">
        <template v-for="(comment, i) in comments">
          <comment :comment="comment"
                   :key="i">
            <template v-if="comment.email === $store.state.user.email"
                      slot="buttons">
              <v-btn icon
                     @click="editableComment = comment">
                <i class="material-icons">create</i>
              </v-btn>
              <v-btn icon
                     @click="deleteComment(comment.id)">
                <i class="material-icons">delete</i>
              </v-btn>
            </template>
          </comment>
          <v-divider v-if="i + 1 < comments.length"
                     :key="i" />
        </template>
      </v-list>
      <v-btn v-if="!showCommentCreateForm"
             class="indigo"
             @click="showCommentCreateForm = !showCommentCreateForm">
        <v-icon>add</v-icon>
      </v-btn>
    </div>
    <div v-else>
      <h3>Not found</h3>
    </div>
    <div class="right-top">
      <template v-if="post">
        <v-btn icon
               @click="showPostEditForm = true">
          <i class="material-icons">create</i>
        </v-btn>
        <v-btn icon
               @click="deletePost(post.id)">
          <i class="material-icons">delete</i>
        </v-btn>
      </template>
      <v-btn icon
             @click="close">
        <i class="material-icons">close</i>
      </v-btn>
    </div>
    <modal v-if="showPostEditForm"
           @submit="submitPostEditForm"
           @cancel="showPostEditForm = false"
           :modal="showPostEditForm">
      <span class="headline"
            slot="headline">Edit Post</span>
      <post-form slot="body"
                 :post="post" />
    </modal>
    <modal v-if="showCommentCreateForm"
           @submit="submitCommentCreateForm"
           @cancel="showCommentCreateForm = false"
           :modal="showCommentCreateForm">
      <span class="headline"
            slot="headline">Add Comment</span>
      <comment-form slot="body"
                    :comment="{ postId: post.id, email: $store.state.user.email, id: $store.state.lastCommentId + 1 }" />
    </modal>
    <modal v-if="editableComment"
           @submit="submitCommentEditForm"
           @cancel="editableComment = false"
           :modal="!!editableComment">
      <span class="headline"
            slot="headline">Edit Comment</span>
      <comment-form slot="body"
                    :comment="editableComment" />
    </modal>
  </v-flex>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import modal from '@/components/modal'
import postForm from '@/components/postForm'
import commentForm from '@/components/commentForm'
import comment from '@/components/comment'

export default {
  name: 'post',
  data: () => ({
    showPostEditForm: false,
    showCommentCreateForm: false,
    editableComment: null,
  }),
  components: { modal, postForm, commentForm, comment },
  computed: {
    ...mapGetters([
      'getUserById',
      'getPostById',
      'getCommentsByPostId'
    ]),
    post() {
      return this.getPostById(this.$route.params.id);
    },
    comments() {
      return this.getCommentsByPostId(this.$route.params.id);
    },
    author() {
      return this.getUserById(this.post.userId);
    }
  },
  methods: {
    ...mapActions([
      'deletePost',
      'editPost',
      'createComment',
      'editComment',
      'deleteComment',
      'fetchComments'
    ]),
    close() {
      this.$router.push({ name: 'posts' });
    },
    submitPostEditForm(data) {
      this.editPost(data).then(() => {
        this.showPostEditForm = false;
      });
    },
    submitCommentCreateForm(data) {
      this.createComment(data).then(() => {
        this.showCommentCreateForm = false;
      });
    },
    submitCommentEditForm(data) {
      this.editComment(data).then(() => {
        this.editableComment = null;
      });
    }
  },
};
</script>
