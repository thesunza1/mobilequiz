<template>
  <q-page padding>
    <div v-if="exams">
      <div v-for="(exam, index) in exams" :key="index">
        <div class="full-width flex flex-center">
          <exam-staff-card :exam="exam"></exam-staff-card>
        </div>
      </div>
    </div>
    <q-dialog v-model="confirm" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <div class="text-h6 text-primary">
            ngày thi: 
          </div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label=" Thoát" no-caps color="negative" v-close-popup />
          <q-btn flat label=" Bắt đầu thi" no-caps color="black" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import examSatffapi from "../boot/api/examStaffs";
import ExamStaffCard from "../components/ExamStaffCard.vue";
export default {
  setup() {
    let confirm = false

    return {
      confirm,
    }
  },
  components: {
    ExamStaffCard,
  },
  data() {
    return {
      contestId: this.$route.params.contestId,
      exams: null,
      thisExam: {},
    };
  },
  async created() {
    const resExam = await examSatffapi.get(this.contestId);
    if (resExam.statuscode == 1) {
      this.exams = resExam.exams;
    }
  },
};
</script>

<style></style>
