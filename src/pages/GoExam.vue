<template>
  <div>
    <div v-if="questions">
      <div v-for="(quest, index) in questions" :key="index" class="my-card">
        <q-card-section v-if="quest.order_relies == 1">
          Câu {{ quest.order_question }}: {{ quest.question.content }}
        </q-card-section>
        <q-card-section>
          <div :id="'relies_'+ quest.id" :class="{'g-chose': quest.chose == 1}" @click="chose(quest.id, index)" class="" :val="quest.id"  >
            {{ quest.relies.noidung }}
          </div>
        </q-card-section>
      </div>
    </div>
    <q-footer>
      <!-- <q-pagination v-model="currentPage" :max="lastPage" /> -->
    </q-footer>
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
      questionIndex: 0,
      currentQuest: 0,
      numQuest: 1,
    };
  },
  methods: {
    chose(id, index) {
      this.checkChose(this.questions[index].question_id);
      this.questions[index].chose = 1;
      // let idEl = 'relies_'+ id;
      // let l = document.getElementById(idEl);
      // l.classList.add('g-chose');
    },
    checkChose(questionId) {
      // var chose;
      this.questions.forEach(function ( e, index) {
        if(e.question_id == questionId && e.chose == 1 ) {
         this[index].chose = -1;
        }
      }, this.questions);
    }
  },
  async created() {
    const questionRes = await examStaffapi.toExam(this.examStaffId);
    this.questions = questionRes?.questions;
    // this.numQuest = questionRes?.numQuest;
    //set page
    // let addpage = this.numQuest % this.questPerPage > 0 ? 1 : 0;
    // this.lastPage =
    //   (this.numQuest - (this.numQuest % this.questPerPage)) /
    //     this.questPerPage +
    //   addpage;
  },
};
</script>

<style></style>
