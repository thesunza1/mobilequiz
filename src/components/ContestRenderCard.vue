<template>
  <div class="flex flex-center">
    <q-card
      clickable
      @click="onlick(specialContest.contest.id)"
      class="my-card q-mt-md g-card-width g-border-radius"
    >
      <q-card-section>
        <div class="text-h5 text-primary" v-html="'Tên kỳ thi: ' + specialContest.contest.name"></div>
        <div class="text-h6">  {{timeToDate(specialContest.contest.begintime_at)}}</div>
        <div
          class="text-subtitle2"
          v-html="specialContest.contest.content"
        ></div>
        <div class="">Ngày tạo: {{ toDate(specialContest.contest.created_at) }}</div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import sp from '../boot/sp/support'
export default {
  props: {
    specialContest: {
      type: Object,
    },
  },
  methods: {
    onlick(id) {
      this.$router.push({name: 'examStaff', params: { contestId: id}});
    },
    toDate(date){
      return sp.toDate(date);
    },
    timeToDate(date) {
      return sp.timeToDate(date);
    }
  },
};
</script>

<style lang="sass" scoped></style>
