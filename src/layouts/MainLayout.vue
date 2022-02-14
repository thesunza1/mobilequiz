<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn color="white" flat rounded icon="arrow_back" @click="goBack()" />
        <q-space />
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered side="right">
      <q-img
        src="https://cdn.quasar.dev/img/material.png"
        style="height: 150px"
        v-if="user"
      >
        <div class="absolute-bottom bg-transparent">
          <q-avatar size="56px" class="q-mb-sm">
            <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
          </q-avatar>
          <div class="text-weight-bold">{{ user.name }}</div>
          <div>{{ user.email }}</div>
        </div>
      </q-img>
      <q-list>
        <!-- <q-item-label
          header
        >
          Essential Links
        </q-item-label> -->

        <q-item clickable @click="goHome()">
          <q-item-section top avatar>
            <q-avatar color="black" text-color="white" icon="home" />
          </q-item-section>
          <q-item-section>
            <q-item-label> Trang chủ</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable @click="toLogout()">
          <q-item-section top avatar>
            <q-avatar color="black" text-color="white" icon="logout" />
          </q-item-section>
          <q-item-section>
            <q-item-label> Đăng xuất tài khoản</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import { mapGetters, mapActions } from "vuex";
export default defineComponent({
  name: "MainLayout",
  setup() {
    const leftDrawerOpen = ref(false);
    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
  methods: {
    goHome() {
      this.$router.push({ name: "home" });
    },
    goBack() {
      this.$router.go(-1);
    },
    toLogout() {
      localStorage.removeItem("key");
      this.logout();
      this.$router.go();
    },
    ...mapActions("User", ["logout"]),
  },
  computed: {
    ...mapGetters("User", ["user"]),
  },
});
</script>
