<template>
  <div class="flex flex-center">
    <q-card
      clickable
      @click="onlick(specialContest.contest.id)"
      class="my-card q-mt-md g-card-width g-border-radius"
    >
      <q-card-section class="bg-positive text-white">
        <div class="text-h5">
          <div
            class="g-first-up q-pl-sm g-question"
            style="display: inline-block"
          >
            {{ specialContest.contest.name }}
          </div>
        </div>
      </q-card-section>
      <q-card-section>
        <div class="text-h6">
          <q-icon name="timer" class="" />
          {{ timeToDate(specialContest.contest.begintime_at) }}
        </div>
        <div>
          <div>Nội dung:</div>
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
