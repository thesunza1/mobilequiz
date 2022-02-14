<template>
  <q-page class="flex flex-start">
    <div class="full-width">
      <div  class="text-center text-primary text-bold text-h5 q-pt-sm"> Các Kỳ Thi</div>
      <div v-for="(contest, index) in contests" :key="index">
        <contest-render-card :specialContest="contest"></contest-render-card>
      </div>
    </div>
    <q-footer class="bg-white q-pb-sm flex flex-center">
      <q-pagination
        v-model="currentPage"
        :max="lastPage"
        color="primary"
        rounded
      />
    </q-footer>
    <div>
      <circular-progress :val="contests"></circular-progress>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import staffapi from "../boot/api/staff";
import sp from "../boot/sp/support";
import { mapGetters, mapActions } from "vuex";
import contestapi from "../boot/api/contest";
import ContestRenderCard from "../components/ContestRenderCard.vue";
import CircularProgress from "../components/CircularProgress.vue";

export default defineComponent({
  components: {
    ContestRenderCard,
    CircularProgress,
  },
  setup() {},
  name: "PageIndex",
  computed: {
    ...mapGetters("User", ["user"]),
  },
  data() {
    return {
      contests: [],
      currentPage: 1,
      lastPage: 5,
    };
  },
  watch: {
    currentPage(newval, oldval) {
      console.log(newval);
      return this.changePage(newval);
    },
  },
  methods: {
    ...mapActions("User", ["update", "logout"]),
    async onClick() {
      // localStorage.removeItem("key");
      // this.logout();
      // this.$router.go();
      // const res = await contestapi.get() ;
      // console.log(res);
    },
    async changePage(num) {
      this.contests = [];
      const resContests = await contestapi.getPage(num);
      if (resContests.statuscode == 1) {
        this.contests = resContests.specialcontests.data;
        this.currentPage = resContests.specialcontests.current_page;
        this.lastPage = resContests.specialcontests.last_page;
      }
      return;
    },
  },
  async created() {
    try {
      // const resUser = await staffapi.get();
      // const resContests = await contestapi.get();
      const [resUser, resContests] = await Promise.all([
        staffapi.get(),
        contestapi.get(),
      ]);
      if (resUser?.statuscode == 1) this.update(resUser.user);
      this.contests = resContests.specialcontests.data;
      this.currentPage = resContests.specialcontests.current_page;
      console.log(this.currentPage);
      this.lastPage = resContests.specialcontests.last_page;
    } catch (error) {
      const key = localStorage.getItem("key");
      if (this.user.id != -1 && key == null) {
      }
      this.$router.go();
    }
  },
});
</script>
