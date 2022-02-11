import { api } from "../axios";

async function get(contestId) {
  const res = await api.get(`contest/${contestId}/exam/get`);
  return res.data;
}

async function toExam(examStaffId) {
  const res = await api.get('contest/exam/toExam/' + examStaffId);
  return res.data;
}

async function check(examQueRelId) {
  const res = await api.post('exam/check', {
    examQueRelId: examQueRelId,
  });
  return res.data;
}

async function unCheck(examQueRelId) {
  const res = await api.post('exam/unCheck', {
    examQueRelId: examQueRelId,
  });
  return res.data;
}

export default {
  get,
  toExam,
  check,
  unCheck
}
