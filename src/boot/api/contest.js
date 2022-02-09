import { api } from "../axios";

async function get() {
  const res = await api.get('contests');
  return res.data;
}
async function  getPage(pageNum) {
  const res = await api.get(`contests?page=${pageNum}`);
  return res.data;
}

export default {
  get,
  getPage
}
