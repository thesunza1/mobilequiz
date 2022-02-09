import { api } from "../axios";

async function get(contestId) {
  const res = await api.get(`contest/${contestId}/exam/get`);
  return res.data;
}


export default {
  get,
}
