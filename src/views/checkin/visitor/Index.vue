<template>
  <div class="index">微信用户信息 :{{ res }}</div>
</template>
<script>
import { getUserInfo } from "@api/user";
export default {
  name: "Visitor",
  components: {},
  props: {},
  data() {
    return {
      res: null
    };
  },
  methods: {
    getUrlParam(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      var rrr = decodeURIComponent(window.location.search);
      var r = rrr.substr(1).match(reg);
      if (r != null) return unescape(r[2]);
      return null;
    }
  },
  mounted: function() {
    let that = this;
    // 获取请求的code,获取用户信息
    const code = this.getUrlParam("code");
    this.res = "获取用户信息中...";
    if (null != code) {
      // 获取用户信息
      getUserInfo(code).then(res => {
        that.res = JSON.stringify(res);
      });
    }
  }
};
</script>
<style scoped>
.index {
  background-color: #fff;
}
</style>
