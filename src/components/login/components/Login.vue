<template>
  <a-form id="login-form-content" :form="form" class="login-form" @submit="handleSubmit">
    <h1 class="title">{{ $t('common.accountPasswordLogin') }}</h1>
    <a-form-item>
      <a-input v-decorator="['name', { rules: [{ required: true, message: $t('common.pleaseInputYourUsername') }] }]" :placeholder="$t('common.username')" size="large">
        <a-icon slot="prefix" type="user" style="color: rgba(0, 0, 0, 0.25)" />
      </a-input>
    </a-form-item>
    <a-form-item>
      <a-input
        v-decorator="['password', { rules: [{ required: true, message: $t('common.pleaseInputYourPassword') }] }]"
        type="password"
        :placeholder="$t('common.password')"
        size="large"
      >
        <a-icon slot="prefix" type="lock" style="color: rgba(0, 0, 0, 0.25)" />
      </a-input>
    </a-form-item>
    <a-form-item>
      <a-checkbox v-decorator="['remember', { valuePropName: 'checked', initialValue: true }]">
        {{ $t('common.rememberMe') }}
      </a-checkbox>
      <a class="login-form-forgot" @click="show('ResetPwdByPhone')">
        {{ $t('common.forgotPassword') }}
      </a>
      <a-button type="primary" html-type="submit" class="login-form-button" size="large">
        {{ $t('common.login') }}
      </a-button>
      Or
      <a @click="show('Register')">
        {{ $t('common.registerNow') }}
      </a>
    </a-form-item>
  </a-form>
</template>

<script>
import loginService from '@/service/loginService';

export default {
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: 'normal_login' });
  },
  inject: ['show'],
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          loginService
            .login(values)
            .then(res => {
              // 刷新当前页面
              this.$emit('success');
            })
            .catch(err => {
              this.$message.error(err.desc);
            });
        }
      });
    },
  },
};
</script>

<style>
#login-form-content .title {
  font-size: 20px;
  font-weight: bold;
  padding-bottom: 15px;
}

#login-form-content .ant-input-affix-wrapper .ant-input {
  font-size: 14px;
}

#login-form-content .login-form-forgot {
  float: right;
}

#login-form-content .login-form-button {
  width: 100%;
}

#login-form-content .ant-form-item {
  margin-bottom: 10px;
}
</style>
