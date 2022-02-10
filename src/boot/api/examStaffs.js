import { api } from "../axios";

async function get(contestId) {
  const res = await api.get(`contest/${contestId}/exam/get`);
  return res.data;
}

async function toExam(examStaffId) {
  const res = await api.get('contest/exam/toExam/' + examStaffId);
  return res.data;
}

export default {
  get,
  toExam,
}
