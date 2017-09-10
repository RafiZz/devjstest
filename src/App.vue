<template>
  <v-app id="app"
         :dark="dark"
         toolbar
         footer>
    <alerts />
    <loader v-if="$store.state.loading" />
    <v-toolbar>
      <v-toolbar-title>DevJS Test | {{ $route.name.charAt(0).toUpperCase() + $route.name.slice(1) }} page</v-toolbar-title>
      <v-spacer />
      <v-btn icon
             @click="dark = !dark">
        <v-icon>{{ dark ? 'wb_sunny' : 'brightness_3'}}</v-icon>
      </v-btn>
    </v-toolbar>
    <main>
      <v-container text-xs-center>
        <transition name="scale-transition"
                    mode="out-in">
          <router-view />
        </transition>
      </v-container>
    </main>
    <v-footer>
      <v-spacer />
      <span>© 2017</span>
    </v-footer>
  </v-app>
</template>

<script>
import { mapActions } from 'vuex'
import alerts from '@/components/alerts';
import loader from '@/components/loader';

export default {
  name: 'app',
  data: () => ({
    dark: true,
  }),
  components: {
    alerts,
    loader
  },
  methods: {
    ...mapActions([
      'fetchDB',
    ]),
  },
  created() {
    this.fetchDB();
  }
};
</script>
