<template>
  <div>
    <div class="app" v-cloak>
      <keep-alive :include="include" :max="10">
        <router-view class="router" ref="router"></router-view>
      </keep-alive>
    </div>
  </div>
</template>
<script>
function isKeepAlive($route) {
  return $route.meta.keepAlive === undefined || $route.meta.keepAlive;
}

import { mapGetters } from "vuex";

export default {
  data() {
    return {
      transitionName: "fold-right",
      include: isKeepAlive(this.$route) ? [this.$route.name] : [],
      history: []
    };
  },
  provide() {
    return {
      app: this
    };
  },
  computed: mapGetters(["isLogin"]),
  components: {},
  watch: {
    $route(to, from) {
      alert(to);
      const lastPath = this.history[this.history.length - 1] || {},
        { isReplace, isBack } = this.$router;

      if (lastPath.path === to.path) {
        this.transitionName = "fold-right";
        this.history.pop();
      } else {
        this.transitionName = "fold-left";
        if (!isReplace) this.history.push({ path: from.path, name: from.name });
      }

      if (isKeepAlive(to) && to.name !== "Login") {
        !this.include.includes(to.name) && this.include.push(to.name);
      }

      if (isKeepAlive(from) && isBack) {
        var index = this.include.indexOf(from.name);
        index !== -1 && this.include.splice(index, 1);
      }

      this.$router.isBack = false;
      this.$router.isReplace = false;
    }
  }
};
</script>
<style lang="scss"></style>
