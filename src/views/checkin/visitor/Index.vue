<template>
  <div class="index">
    <p>微信用户信息 :{{ res }}</p>
    <input type="button" @click="wxScan" value="扫一扫" class="button" />
    <p>扫一扫结果：</p>
    <div>
      {{ scanResult }}
    </div>
  </div>
</template>
<script>
import { getUserInfo, getWxConfig } from "@api/user";
import wx from "weixin-js-sdk";
export default {
  name: "Visitor",
  components: {},
  props: {},
  data() {
    return {
      res: null,
      scanResult: null
    };
  },
  methods: {
    getUrlParam(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      var rrr = decodeURIComponent(window.location.search);
      var r = rrr.substr(1).match(reg);
      if (r != null) return unescape(r[2]);
      return null;
    },

    /**
     * 扫二维码
     */
    wxScan() {
      wx.ready(() => {
        wx.scanQRCode({
          needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
          success: res => {
            this.scanResult = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
          }
        });
      });
    }
  },
  mounted: function() {
    // 获取请求的code,获取用户信息
    const code = this.getUrlParam("code");
    this.res = "获取用户信息中...";
    if (null != code) {
      // 获取用户信息
      getUserInfo(code).then(res => {
        this.res = JSON.stringify(res);
      });
    }
    // 获取签名信息
    var myurl = window.location.href.split("#")[0];
    getWxConfig(myurl).then(res => {
      const param = {
        debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: res.appId, // 必填，公众号的唯一标识
        timestamp: res.timestamp, // 必填，生成签名的时间戳
        nonceStr: res.nonceStr, // 必填，生成签名的随机串
        signature: res.signature, // 必填，签名
        jsApiList: ["scanQRCode"] // 必填，需要使用的JS接口列表
      };
      console.log(param);
      wx.config(param);
    });
  }
};
</script>
<style scoped>
.index {
  background-color: #fff;
}
.button {
  margin-left: 10px;
  line-height: 1.499;
  position: relative;
  display: inline-block;
  font-weight: 400;
  white-space: nowrap;
  text-align: center;
  background-image: none;
  box-shadow: 0 2px 0 rgba(0, 0, 0, 0.015);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  touch-action: manipulation;
  height: 32px;
  padding: 0 15px;
  font-size: 14px;
  border-radius: 4px;
  color: rgba(0, 0, 0, 0.65);
  background-color: #fff;
  border: 1px solid #d9d9d9;
}
</style>
