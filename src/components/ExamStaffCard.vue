<template>
  <q-card clickable class="my-card g-border-radius g-card-width q-mt-md" v-if="exam.examstaffs.length > 0">
    <q-card-section class="g-chose">
      <div class="text-h6 text-white">Ngày thi: {{ toDate(exam.created_at) }}</div>
      <div class=" flex items-center text-white">
        <q-icon name="timer" size="sm"  />
        <div class="text-subtitle2">Thời gian: {{ exam.examtime_at }} phút</div>
      </div>
    </q-card-section>
    <q-card-section>
      <div class="text-subtitle">Tổng số câu: {{ exam.questionnum }}</div>
      <div>Người tạo: {{ exam.staff.name }}</div>
    </q-card-section>
    <q-card-action
      align="right"
      v-if="exam.examstaffs[0]?.time_limit > 0 && exam.examstaffs[0].point < 0"
    >
      <div
        class="text-red q-pr-sm"
        v-if="checkTimeLimit(exam.examstaffs[0].time_limit)"
      >
        Bạn đã hết thời gian làm bài
      </div>
      <div v-else>
        <div>
          <div class="text-red text-subtitle2">
            {{ timeToDate(exam.examstaffs[0].time_limit) }}
          </div>
        </div>
        <div class="">
          <q-btn
            color="black"
            icon="check"
            label="Thi tiếp"
            @click="toExam()"
            rounded
            no-caps
          />
        </div>
      </div>
    </q-card-action>
    <q-card-action
      align="right"
      v-if="
        exam?.examstaffs[0].time_limit == null
          ? true
          : false && exam?.examstaffs[0].point < 0
      "
    >
      <div>
        <q-btn
          color="black"
          label=" Bắt đầu thi"
          @click="toExam()"
          rounded
          no-caps
        />
      </div>
    </q-card-action>
    <q-card-actions
      align="right"
      class="full-width"
      v-if="exam.examstaffs[0].point >= 0"
    >
      <q-chip
        icon="campaign"
        text-color="white"
        color="positive"
        :label="`${exam.examstaffs[0].point}/10 điểm`"
      />
    </q-card-actions>
  </q-card>
</template>

<script>
import sp from "../boot/sp/support";
export default {
  props: {
    exam: {
      type: Object,
    },
    index: {
      type: Number,
    },
  },
  methods: {
    checkTimeLimit(timeLimit) {
      return sp.limitTime(timeLimit);
    },
    toDate(date) {
      return sp.toDate(date);
    },
    timeToDate(date) {
      return sp.timeToDate(date);
    },
    timeToTime(date) {
      return sp.timeToTime(date);
    },
    toExam() {
      this.$emit("choseExam", this.index);
    },
  },
};
</script>

<style></style>
