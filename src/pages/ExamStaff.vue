<template>
  <q-page padding>
    <div class="full-width text-center text-h6 text-primary g-first-up text-bold" v-html="contest">

    </div>
    <div v-if="exams.length > 0">
      <div v-for="(exam, index) in exams" :key="index">
        <div class="full-width flex flex-center">
          <exam-staff-card
            @choseExam="toExam($event)"
            :index="index"
            :exam="exam"
          ></exam-staff-card>
        </div>
      </div>
    </div>
    <q-dialog v-model="confirm" persistent>
      <q-card v-if="thisExam" class="g-border-radius">
        <q-card-section class="row items-center">
          <div>
            <div class="text-h6 text-primary">
              Ngày thi: {{ toDate(thisExam.created_at) }}
            </div>
            <div class="text-subtitle2">
              Thời gian thi: {{ thisExam.examtime_at }} phút
            </div>
            <div class="">
              Tổng số câu: {{ thisExam.questionnum }}
            </div>
          </div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label=" Thoát" no-caps color="negative" v-close-popup />
          <q-btn
            :to="{
              name: 'toExam',
              params: { examStaffId: thisExam.examstaffs[0].id },
            }"
            flat
            label="Bắt đầu thi"
            no-caps
            color="black"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <div>
      <circular-progress :val="exams"></circular-progress>
    </div>
  </q-page>
</template>

<script>
import examSatffapi from "../boot/api/examStaffs";
import ExamStaffCard from "../components/ExamStaffCard.vue";
import sp from "../boot/sp/support";
import CircularProgress from "../components/CircularProgress.vue";
export default {
  setup() {},
  methods: {
    toExam(index) {
      this.thisExam = this.exams[index];
      console.log(this.thisExam);
      this.confirm = true;
    },
    toDate(date) {
      return sp.toDate(date);
    },
  },
  components: {
    ExamStaffCard,
    CircularProgress,
  },
  data() {
    return {
      contestId: this.$route.params.contestId,
      exams: [],
      thisExam: null,
      confirm: false,
      contest: '',
    };
  },
  async created() {
    const resExam = await examSatffapi.get(this.contestId);
    if (resExam.statuscode == 1) {
      this.exams = resExam.exams;
      this.contest = resExam.contest;
    }
  },
};
</script>

<style></style>
