import {  Notify } from "quasar";
import store from "src/store";

function showNoti(mess, color) {
  Notify.create({
    message: mess,
    color: color,
    position: "center",
    timeout: 3000,
  });
}

function reload() {
  const user = store.getters['User/user'];
  console.log(user);
  return;
}

function toLength(arr) {
  return arr.length;
}
function toDate(date) {
  return date.slice(0, 10);
}

function timeToTime(ds) {
  var date = new Date(ds * 1000);
  return (date.getHours()) + ':' + date.getMinutes();
}

function timeToDate(ds) {
  var date = new Date(ds * 1000);

  return (date.getHours()) +
    "h:" + date.getMinutes() + "m" + "  " +
    date.getDate() +
    "/" + (date.getMonth() + 1) +
    "/" + date.getFullYear();
}


function limitTime(timeLimit) {
  const nowTime = Math.floor(new Date().getDate() / 1000)
  // return false
  if (timeLimit == -1) return false;
  return timeLimit > nowTime ? true : false;
}

export default {
  showNoti,
  reload,
  toDate,
  timeToDate,
  limitTime,
  timeToTime,
  toLength,
}
