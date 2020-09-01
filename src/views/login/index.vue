<template>
  <div class="login">
    <div class="login-form">
      <div class="logo-wrapper">
        <span class="icon-logo"></span>
      </div>
      <div class="input-wrapper">
        <input
          required
          type="text"
          autocomplete="off"
          v-model="postData.account"
          class="form-input"
        />
        <div class="underline"></div>
        <label class="input-title">Account</label>
      </div>
      <div class="input-wrapper">
        <input
          required
          type="password"
          autocomplete="off"
          v-model="postData.password"
          class="form-input"
        />
        <div class="underline"></div>
        <label class="input-title">Password</label>
      </div>
      <div class="submit-wrapper" @click="login">
        <div class="submit-btn">Login</div>
      </div>
    </div>
  </div>
</template>

<script>
import { encode, decode } from '../../utils/auth'
import { login } from '../../api/admin'
export default {
  data() {
    return {
      postData: {
        account: '',
        password: '',
      },
    }
  },
  methods: {
    login() {
      login(this.postData)
    },
  },
}
</script>
<style lang="scss" scoped>
@import '@/assets/style/globalScript';
.login {
  width: 100vw;
  height: 100vh;
  @include center;
  background-image: url(https://i.loli.net/2019/11/17/GAYyzeKsiWjP5qO.jpg);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  .login-form {
    @include columnCenter;
    width: 350px;
    height: 75vh;
    box-shadow: 0 0.3px 0.7px rgba(0, 0, 0, 0.126),
      0 0.9px 1.7px rgba(0, 0, 0, 0.179), 0 1.8px 3.5px rgba(0, 0, 0, 0.224),
      0 3.7px 7.3px rgba(0, 0, 0, 0.277), 0 10px 20px rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(20px);
    transition: all $animationTime $animationType;
    &:hover {
      box-shadow: 0 0.7px 1px rgba(0, 0, 0, 0.157),
        0 1.7px 2.6px rgba(0, 0, 0, 0.224), 0 3.5px 5.3px rgba(0, 0, 0, 0.28),
        0 7.3px 11px rgba(0, 0, 0, 0.346), 0 20px 30px rgba(0, 0, 0, 0.5);
    }
    .logo-wrapper {
      flex: 1;
      width: 100%;
      @include center;
      font-size: 60px;
      font-weight: 800;
      color: #fff;
    }
    .input-wrapper {
      position: relative;
      flex: 0 0 40px;
      width: 80%;
      margin: 0 auto 35px;
      .form-input {
        padding: 0;
        position: relative;
        width: 100%;
        border: none;
        border-bottom: 2px solid #fff;
        background-color: transparent !important;
        height: 100%;
        font-size: 16px;
        color: #fff;
        outline: none;
        &:focus,
        &:valid {
          & ~ .input-title {
            transform: translateY(-25px);
            font-size: 18px;
          }
          & ~ .underline {
            transform: scaleX(1);
          }
        }
      }
      .underline {
        position: absolute;
        width: 100%;
        height: 3px;
        left: 0;
        bottom: 0;
        transform: scaleX(0);
        background: $color-blue;
        transition: transform $animationTime $animationType;
      }
      .input-title {
        position: absolute;
        left: 0;
        bottom: 10px;
        font-size: 16px;
        color: #fff;
        pointer-events: none;
        transition: all $animationTime $animationType;
      }
    }
    .submit-wrapper {
      flex: 0 0 40px;
      width: 70%;
      margin: 0 auto 20px;
      .submit-btn {
        position: relative;
        height: 100%;
        border: 2px solid #fff;
        @include center;
        font-size: 25px;
        padding: 10px 20px;
        color: #fff;
        cursor: pointer;
        transition: transform $animationTime $animationType;
        &:hover {
          transform: scale(0.9);
        }
      }
    }
  }
}
</style>