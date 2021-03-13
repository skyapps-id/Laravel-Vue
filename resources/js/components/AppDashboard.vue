<template>
  <v-app>
    <v-navigation-drawer app fixed v-model="drawer">
      <v-list dense nav>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          :to="item.to">
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app fixed color="primary">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>HuntStreet</v-toolbar-title>

      <div class="flex-grow-1"></div>

      <v-btn icon>
        <v-badge color="accent" overlap>
          <template v-slot:badge>4</template>
          <v-icon>mdi-bell</v-icon>
        </v-badge>
      </v-btn>

      <v-btn icon>
        <v-badge color="accent" overlap>
          <template v-slot:badge>3</template>
          <v-icon>mdi-email</v-icon>
        </v-badge>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>

    <v-footer app inset color="primary" height="auto">
      <v-container fluid>
        <v-row align="start" justify="center" no-gutters>
          <v-col cols="12">
            <div class="text-center">
              {{ new Date().getFullYear() }} — <strong>Vuetify</strong>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'AppDashboard',
  data () {
    return {
      drawer: null,
      collapseOnScroll: true,
      items: [
        { title: 'Home', icon: 'mdi-home', to: '/' },
        { title: 'Master Person', icon: 'mdi-account-group-outline', to: 'person' },
        { title: 'Master Designer', icon: 'mdi-cards', to: 'designers' },
        { title: 'Master Event', icon: 'mdi-calendar', to: 'event' },
        { title: 'Event Register', icon: 'mdi-calendar-check', to: 'register' },
        { title: 'Logout', icon: 'mdi-logout', to: '/auth/logout/destory' },
      ],
      right: null,
    }
  },
}
</script>