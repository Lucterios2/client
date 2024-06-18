<script>
import AbstractComp from '@/components/AbstractComp.vue'
export default {
  name: 'CaptchaComp',
  extends: AbstractComp,
  components: { AbstractComp },
  data: () => ({
    num1: 0,
    num2: 0,
    operation: 0,
    operationTxt: '',
    result: '',
    total: 0
  }),
  computed: {
    is_wrong() {
      return !this.is_valid()
    }
  },
  methods: {
    is_valid() {
      return this.num2 === Number(this.result)
    }
  },
  mounted() {
    this.num1 = Math.floor(Math.random() * 10 + 1)
    this.num2 = Math.floor(Math.random() * 10 + 1)
    this.operation = Math.floor(Math.random() * 3)
    if (this.operation === 0) {
      this.total = this.num1 + this.num2
      this.operationTxt = '+'
    } else if (this.operation === 1 && this.num2 < this.num1) {
      this.total = this.num1 - this.num2
      this.operationTxt = '-'
    } else {
      this.total = this.num1 * this.num2
      this.operationTxt = 'x'
    }
  }
}
</script>

<template>
  <AbstractComp :class="is_valid() ? '' : 'in_error'" :value="value" :component="component">
    <span>{{ num1 }}</span> <span>{{ operationTxt }}</span>
    <input
      class="result-captcha"
      ref="tofocus"
      type="text"
      v-model="result"
      :name="component.name"
      @focusin="savefocusin"
      @keyup.enter="$emit('action', null)"
    />
    = <span>{{ total }}</span>
  </AbstractComp>
  <div class="error-captcha" v-if="is_wrong">{{ $t('Captcha wrong!') }}</div>
</template>

<style scoped>
.v-field_abstract > span {
  color: black;
}
.in_error {
  color: rgb(176, 0, 32);
}
.result-captcha {
  border-bottom: 1px solid grey;
  background-color: #eee;
  vertical-align: middle;
  text-align: center;
  height: 28px;
  width: 40px;
}
.error-captcha {
  color: rgb(176, 0, 32);
  margin-left: 10px;
}
</style>
