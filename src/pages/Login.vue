<template>
  <q-page padding class="flex flex-center">
    <div class="">
      <q-card class="my-card g-border-radius">
        <q-img
          src="~assets/loginBanner02.jpg"
          :ratio="16 / 9"
          spinner-color="primary"
          spinner-size="82px"
        />
        <q-card-section>
          <div class="text-h4 text-primary">Đăng nhập</div>
        </q-card-section>
        <q-card-section>
          <q-form @submit="tologin" class="q-gutter-md">
            <q-card-section>
              <q-input
                v-model="login.email"
                type="text"
                label="Email"
                clearable
              >
                <template v-slot:prepend>
                  <q-icon name="email" />
                </template>
              </q-input>
              <q-input
                v-model="login.password"
                type="password"
                label=" Mật khẩu"
                clearable
              >
                <template v-slot:prepend>
                  <q-icon name="password" />
                </template>
              </q-input>
            </q-card-section>
            <q-card-section>
              <q-checkbox
                right-label
                v-model="rule"
                label=" Bạn đồng ý với các điều khoản của chúng tôi"
              />
            </q-card-section>
            <q-card-actions horizontal align="right">
              <q-btn :disabled="!rule" no-caps label="Đăng nhập" rounded color="black" icon="login" type="submit" />
            </q-card-actions>
          </q-form>
        </q-card-section>
        <q-card-section>
          <span class="text-subtitle2 text-primary"> Quên mật khẩu?</span>
          <br>
          <span class="text-subtitle2 text-primary"> Tạo tài khoản</span>
        </q-card-section>
        <div class="g-height-space"></div>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import sp from "../boot/sp/support";
import staffapi from "../boot/api/staff";
import {mapGetters, mapActions} from 'vuex';
export default {
  setup() {
    function showNoti(mess, col) {
      return sp.showNoti(mess, col);
    }
    return {
      showNoti,
    };
  },
  data() {
    return {
      login: {
        email: null,
        password: null,
      },
      rule: true,
    };
  },
  methods: {
    async tologin() {
      const res = await staffapi.login(this.login);
      if(res?.statuscode == 1) {
        const key = res.access_token;
        const user = res.user;

        this.update(user);
        localStorage.setItem('key', key) ;
        sp.showNoti(' Đăng nhập thành công', 'black');
        this.$router.push('/');
      } else {
        sp.showNoti('Sai tài khoản hoặc mật khẩu', 'black');
      }
    },
    ...mapActions('User', ['update']),
  },
  computed: {
    ...mapGetters('User', ['user']),
  }
};
</script>

<style></style>
