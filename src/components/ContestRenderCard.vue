<template>
  <div class="flex flex-center">
    <q-card
      clickable
      @click="onlick(specialContest.contest.id)"
      class="my-card q-mt-md g-card-width g-border-radius shadow-up-2"
    >
      <q-card-section class="q-pb-none text-primary text-bold">
        <div class="text-h5">
          <div
            class="g-first-up g-question"
          >
            {{ specialContest.contest.name }}
          </div>
        </div>
      </q-card-section>
      <q-card-section class="q-pt-sm">
        <div class="text-h6">
          <q-icon name="timer" class="text-positive" />
          :{{ timeToDate(specialContest.contest.begintime_at) }}
        </div>
        <div>
          <div><q-icon name="notes"  class="text-positive" size="sm" /> <p class="text-subtitle2" style="display: inline">Lưu ý:</p></div>
          <div
            class="g-text-indent"
            v-html="specialContest.contest.content"
          ></div>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import sp from "../boot/sp/support";
export default {
  props: {
    specialContest: {
      type: Object,
    },
  },
  methods: {
    onlick(id) {
      this.$router.push({ name: "examStaff", params: { contestId: id } });
    },
    toDate(date) {
      return sp.toDate(date);
    },
    timeToDate(date) {
      return sp.timeToDate(date);
    },
  },
};
</script>

<style lang="sass" scoped></style>
