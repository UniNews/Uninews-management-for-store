<template>
  <section class="hero is-small">
    <div class="hero-body">
      <div class="container pd-150 mg-bt-25 pd-tp-20">
        <div class="dp-flex flex-end">
          <b-field label="Selected graph">
            <b-select v-model="selectedValue" placeholder="Select a name">
              <option v-for="option in selectedData" :value="option" :key="option">{{ option }}</option>
            </b-select>
          </b-field>
        </div>
        <PieChart v-show="selectedValue==='Pie'" :chartData="this.chartData" />
        <LineChart v-show="selectedValue==='Line'" :chartData="this.chartData" />
        <BarChart v-show="selectedValue==='Bar'" :chartData="this.chartData" />
        <BubbleChart v-show="selectedValue==='Bubble'" :chartData="this.chartData" />
        <DoughnutChart v-show="selectedValue==='Doughnut'" :chartData="this.chartData" />
        <HBarChart v-show="selectedValue==='HorizontalBar'" :chartData="this.chartData" />
        <PolarChart v-show="selectedValue==='Polar'" :chartData="this.chartData" />
        <RadarChart v-show="selectedValue==='Radar'" :chartData="this.chartData" />
        <ScatterChart v-show="selectedValue==='Scatter'" :chartData="this.chartData" />
      </div>
    </div>
    <b-loading :is-full-page="true" :active.sync="isLoading" />
  </section>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import userservice from "@/services/userservice";
import PieChart from "@/components/charts/PieChart";
import LineChart from "@/components/charts/LineChart";
import BarChart from "@/components/charts/BarChart";
import BubbleChart from "@/components/charts/BubbleChart";
import DoughnutChart from "@/components/charts/DoughnutChart";
import HBarChart from "@/components/charts/HBarChart";
import PolarChart from "@/components/charts/PolarChart";
import RadarChart from "@/components/charts/RadarChart";
import ScatterChart from "@/components/charts/ScatterChart";

export default {
  name: "Dashboard",
  components: {
    PieChart,
    LineChart,
    BarChart,
    BubbleChart,
    DoughnutChart,
    HBarChart,
    PolarChart,
    RadarChart,
    ScatterChart
  },
  data() {
    return {
      articles: [],
      isLoading: false,
      chartData: null,
      selectedData: [
        "Pie",
        "Line",
        "Bar",
        "Bubble",
        "Doughnut",
        "HorizontalBar",
        "Polar",
        "Radar",
        "Scatter"
      ],
      selectedValue: "Pie"
    };
  },
  methods: {
    async fetchUsers() {
      this.isLoading = true;
      const data = await userservice.getMyArticle(this.getUser()._id);
      this.articles = data.data.articles;
      let randomColor = [];
      let lableData = [];
      let viewsData = [];
      this.articles.forEach(e => {
        lableData.push(e.title);
        viewsData.push(e.views.length);
        randomColor.push("#" + (((1 << 24) * Math.random()) | 0).toString(16));
      });
      this.chartData = {
        labels: lableData,
        datasets: [
          {
            label: "Show Data",
            backgroundColor: randomColor,
            data: viewsData
          }
        ]
      };
      this.isLoading = false;
    },
    ...mapGetters({
      getUser: "Auth/getUser"
    })
  },
  mounted() {
    console.log("TEST");
    this.fetchUsers();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.pd-150 {
  padding: 150px;
}
.pd-tp-20 {
  padding-top: 20px;
}
.mg-bt-25 {
  margin-bottom: 25px;
}
</style>