<template>
  <div class="stats">
    <h1 class="stats__header header">Статистика</h1>
    <div class="stats__content content">
      <line-chart :height="170" :chart-data="lineChartData" :options="lineChartOptions"> </line-chart>
      <div class="stats__buttons">
        <button class="stats__button" @click="updateData">
          Случайные данные
        </button>
        <button class="stats__button" @click="addData">
          Добавить данные
        </button>
        <button class="stats__button" @click="deleteData">
          Удалить данные
        </button>
        <button class="stats__button" @click="increase">
          Увеличить кол-во данных
        </button>
        <button class="stats__button" @click="decrease">
          Уменьшит кол-во данных
        </button>
      </div>
    </div>
  </div>
</template>

<script>
  import LineChart  from "@/assets/js/LineChart.js"

  export default {
    components: {
      LineChart 
    },
    data() {
      return {
        lineChartData: {
          labels: ['Январь','Февраль','Март','Апрель','Май','Июнь'],
          datasets: [],
        },
        lineChartOptions: {
          scales: {
            yAxes: [{
              ticks: {
                callback: function(value, index, values) {
                  return value / 5;
                },
                stepSize: 100,
                max: 500,
                min: -300,
                fontColor: '#CBCBCB',
                fontSize: 14
              }
            }],
            xAxes: [{
              ticks: {
                callback: function(value, index, values) {
                  return value
                },
                fontColor: '#CBCBCB',
                fontSize: 14
              }
            }]
          },
          legend: {
            display: true,
            labels: {
              fontColor: '#CBCBCB',
              fontSize: 14, 
            },
          },
          tooltips: {
            mode: 'point',
            backgroundColor: "#fff",
            cornerRadius: 5,
            yPadding: 10,
            bodyFontColor: '#CBCBCB',
            callbacks: {
              label: function(tooltipItem, data) {
                var label = data.datasets[tooltipItem.datasetIndex].label || '';

                if (label) {
                  label += ' ';
                }
                label += Math.round(tooltipItem.yLabel * 100) / 100;
                return label;
              },
              title: function() {
                return ''
              },
              labelColor: tooltipItem => {
                return {
                  borderColor: 'none',
                  backgroundColor: this.colors[tooltipItem.datasetIndex],
                }
              }
            }
          },
        },
        months: ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'],
        dates: ['Первая', 'Вторая', 'Третья', 'Четвертая', 'Пятая'],
        currentDates: ['Январь','Февраль','Март','Апрель','Май','Июнь'],
        colors: ['#EEB969', '#788DFF', '#BD0D22', 'yellow', '#6FBC9A']
      }
    },
    mounted() {
      this.addData();
      this.addData();
    },
    methods: {
      updateData() {
        let newDatasets = this.lineChartData.datasets;
        newDatasets.forEach(dataset => {
          let arr = []
          dataset.data = this.randomIntegers(dataset.data.length)
        })

        this.lineChartData = {
          labels: this.lineChartData.labels,
          datasets: newDatasets
        }
      },
      addData() {
        let newData = [];
        if (this.lineChartData.datasets.length < 5) {
          this.lineChartData = {
            labels: this.lineChartData.labels,
            datasets: [
            ...this.lineChartData.datasets,
            {
              label: this.dates[this.lineChartData.datasets.length] + ' дата',
              backgroundColor: [this.colors[this.lineChartData.datasets.length]],
              fill: 'none',
              borderColor: this.colors[this.lineChartData.datasets.length],
              point: {
                pointStyle: 'circle',
                backgroundColor:'#fff',
              },
              data: this.randomIntegers(12)
            }
            ]
          }
        }
      },
      deleteData() {
        this.lineChartData = {
          labels: this.lineChartData.labels,
          datasets: []
        }
      },
      increase() {
        if (this.currentDates.length < 12) {
          this.currentDates.push(this.months[this.currentDates.length]);
          this.lineChartData = {
            labels: this.currentDates,
            datasets: this.lineChartData.datasets
          }
        }
      },
      decrease() {
        if (this.currentDates.length > 1) {
          this.currentDates.pop();
          this.lineChartData = {
            labels: this.currentDates,
            datasets: this.lineChartData.datasets
          }
        }
      },
      randomIntegers(amount, min = -300, max = 500) {
        let arr = []
        for (let i = 0; i < amount; i++) {
          let rand = min - 0.5 + Math.random() * (max - min + 1);
          arr.push(Math.round(rand))
        }
        return arr
      },
    },
  }
</script>

<style lang="less">
  .stats{
    background: #EFF1F9;
    width: 100%;
    padding:40px 56px 0 48px;
    .header{
      font-family: Montserrat;
      font-style: normal;
      font-weight: 500;
      font-size: 20px;
      line-height: 32px;
      margin-bottom: 24px;
    }
    .stats__buttons{
      display: flex;
      .stats__button{
        cursor: pointer;
        margin-right: 10px;
        margin-top: 17px;
        border: 1px solid #CBCBCB;
        box-sizing: border-box;
        border-radius: 10px;
        font-weight: 500;
        font-size: 12px;
        line-height: 16px;
        color: #CBCBCB;
        background: #fff;
        padding: 8px 13px;
        &:hover{
          color: #BD0D22;
          border-color: #BD0D22;
        }
      }
    }
    .content{
      background: #FFFFFF;
      border-radius: 10px;
      padding: 48px 40px 33px 40px;
      max-width: 920px;
    }
  }

  @media(max-width: 414px) {
    .stats{
      .header{

      }
      .stats__buttons{
        .stats__button{

        }
      }
      .content{

      }
    }
  }
</style>
