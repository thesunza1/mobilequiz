<template>
  <q-card
    clickable
    class="my-card g-border-radius g-card-width q-mt-md"
  >
    <q-card-section vertical class="">
      <q-card-section>
        <div class="text-h6">Ngày tạo: {{ toDate(exam?.created_at) }}</div>
        <div class="text-subtitle">tổng số câu: {{ exam?.questionnum }}</div>
        <div>người tạo: {{ exam.staff.name }}</div>
        <div>Thời gian: {{ exam?.examtime_at }} phút</div>
      </q-card-section>
      <q-card-section
        v-if="exam.examstaffs[0].time_limit > 0 && exam.examstaffs[0].point < 0"
      >
        <div
          class="text-red"
          v-if="checkTimeLimit(exam.examstaffs[0].time_limit)"
        >
          bạn đã hết thời gian làm bài
        </div>
        <div v-else>
          <div class="">
            <q-btn
              color="black"
              icon="check"
              label="Thi tiếp"
              @click="toExam()"
            />
          </div>
          <div>
            Hết thời gian lúc: {{ timeToDate(exam.examstaffs[0].time_limit) }}-
            {{ timeToTime(exam.examstaffs[0].time_limit) }}
          </div>
        </div>
      </q-card-section>
      <q-card-section
        v-if="
          exam?.examstaffs[0].time_limit == null
            ? true
            : false && exam?.examstaffs[0].point < 0
        "
      >
        <div>Chưa thi</div>
        <div>
          <q-btn
            color="black"
            label=" Bắt đầu thi"
            @click="toExam()"
          />
        </div>
      </q-card-section>
      <q-card-section v-if="exam.examstaffs[0].point >= 0">
        <div class="text-positive text-subtitle2">Đã thi</div>
        <div class="text-positive text-subtitle2">
          Tổng điểm: {{ exam.examstaffs[0].point }}/10 điểm
        </div>
      </q-card-section>
    </q-card-section>
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
    }
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
      this.$emit('choseExam',this.index);
    }
  },
};
</script>

<style></style>
