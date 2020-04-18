import { PolarArea, mixins } from 'vue-chartjs'

export default {
  extends: PolarArea,
  mixins: [mixins.reactiveProp],
  props: ['chartData'],
  mounted () {
    this.renderChart(this.chartData,{
      responsive: true,
      maintainAspectRatio: false
    })
  }
}