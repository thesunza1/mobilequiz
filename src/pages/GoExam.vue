<template>
  <div>
    <div v-if="questions">
      <q-btn color="primary" icon="check" label="OK" @click="confirm = !confirm" />
      <div v-for="(quest, index) in questions" :key="index" class="my-card">
        <div
          v-if="
            startQuest <= quest.order_question &&
            quest.order_question <= endQuest
          "
        >
          <q-card-section class="q-mt-lg" v-if="quest.order_relies == 1">
            Câu {{ quest.order_question }}:
            <div class="g-first-up g-question">
              {{ quest.question.content }}
            </div>
          </q-card-section>
          <q-card-section>
            <div
              :id="'relies_' + quest.id"
              :class="{ 'g-chose': quest.chose == 1 }"
              @click="chose(quest.id, index)"
              class="g-relies g-first-up"
              :val="quest.id"
            >
              {{ quest.relies.noidung }}
            </div>
          </q-card-section>
        </div>
      </div>
    </div>
    <q-footer class="bg-white flex flex-center">
      <q-pagination v-model="currentPage" :max="lastPage" />
    </q-footer>
    <q-dialog v-model="confirm" class="">
      <q-card class="g-border-radius g-card-width">
        <q-card-section class="row items-center">
          <span class="q-ml-sm"
            > Danh sách câu hỏi:</span
          >
        </q-card-section>
        <div v-for="i in numQuest" :key="i">
          <q-card-actions align="left" class="q-pl-lg">
            <q-btn flat  :label="`Câu ${i}: ${isCheck(i)? 'Đã chọn' : 'Chưa chọn'}. ` " no-caps :color="isCheck(i)? 'black':'negative'" @click="toQuestion(i)" v-close-popup />
          </q-card-actions>
        </div>
        <q-card-actions align="center">
          <q-btn flat label=" Nộp ngay" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import examStaffapi from "../boot/api/examStaffs";
export default {
  data() {
    return {
      examStaffId: this.$route.params.examStaffId,
      questions: null,
      questPerPage: 5,
      currentPage: 1,
      lastPage: 1,
      currentQuest: 0,
      numQuest: 1,
      startQuest: 1,
      endQuest: 5,
      confirm: false,
    };
  },
  watch: {
    currentPage(newVal) {
      this.startQuest = this.questPerPage * (newVal - 1) + 1;
      this.endQuest = this.questPerPage * newVal;
      console.table([this.startQuest, this.endQuest]);
    },
  },
  methods: {
    isCheck(num) {
      let status = 0
      status = this.questions.findIndex((e) => e.order_question == num && e.chose ==1 );
      if(status == -1 ) {
        return false;
      } else  {
        return true;
      }
    },
    toQuest(num) {

    },
    async chose(id, index) {
      // await this.checkChose(this.questions[index].question_id);
      let [unCheck, check] = await Promise.all([
        this.checkChose(this.questions[index].question_id),
        examStaffapi.check(id),
      ]);
      if (unCheck?.statuscode == 1 && check?.statuscode == 1) {
      }
      this.questions[index].chose = 1;
    },
    async checkChose(questionId) {
      // var chose;
      this.questions.forEach(async function (e, index) {
        if (e.question_id == questionId && e.chose == 1) {
          this[index].chose = -1;
          await examStaffapi.unCheck(this[index].id);
        }
      }, this.questions);
      return { statuscode: 1 };
    },
  },
  async created() {
    const questionRes = await examStaffapi.toExam(this.examStaffId);
    this.questions = questionRes?.questions;
    this.numQuest = questionRes?.numQuest;
    let addpage = this.numQuest % this.questPerPage > 0 ? 1 : 0;
    this.lastPage =
      (this.numQuest - (this.numQuest % this.questPerPage)) /
        this.questPerPage +
      addpage;
  },
};
</script>

<style></style>
