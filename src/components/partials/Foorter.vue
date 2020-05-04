<template>
  <div class="bt-3 r-3 p-fixed">
    <b-button v-on:click="clickButton()" class="b-radious-20 b-0 bt-10">
      <span>
        <b-icon
          icon="pencil"
          size="30">
        </b-icon>
      </span>
    </b-button>
  </div>
</template>

<script>
import newservice from "../../services/newservice"
export default {
  name: "Footer",
  methods:{
    clickButton() {
      this.$router.push('postnews')
    }
  }
};
</script>
<style scoped>
.b-radious-20 {
  border-radius: 20px;
}
.b-0 {
  border: 0px white solid;
}
.bt-3 {
  bottom: 3px;
}
.r-3 {
  right: 3px;
}
.p-fixed {
  position: fixed;
}
.mg-r-10 {
  margin-right: 10px;
}
.mg-r-10:nth-of-type(1) {
  margin-left: 20px;
}
</style>