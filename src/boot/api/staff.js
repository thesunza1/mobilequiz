import { api } from '../axios';


async function login(data) {
  let email = data.email;
  let password = data.password;

  const res = await api.post('login', {
    email: email,
    password: password,

  });
  return res.data;
}

async function get() {
  const res = await api.get('staff/get');
  return res.data;
}

export default {
  login ,
  get,
}
