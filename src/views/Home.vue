<template xmlns:el-col="http://www.w3.org/1999/html">
  <div>
    <el-row :gutter="10" style="margin-bottom: 40px">
      <el-col :span="6">
        <el-card style="color: #409EFF">
          <div><i class="el-icon-user-solid"/> 用户总数</div>
          <div style="padding: 10px 0; text-align: center; font-weight: bold">
            34
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card style="color: #d70a22">
          <div ><i class="el-icon-money"/> 问卷总量</div>
          <div style="padding: 10px 0; text-align: center; font-weight: bold">
            16
          </div>
        </el-card>
      </el-col>

    </el-row>
    <el-row>
      <el-col :span="12">
        <div id="main1" style="width: 500px; height: 400px"></div>
      </el-col>
      <el-col :span="12">
        <div id="main2" style="width: 500px; height: 400px"></div>
      </el-col>
      <el-col :span="12">
        <div id="pie1" style="width: 500px; height: 400px"></div>
      </el-col>
      <el-col :span="12">
        <div id="pie2" style="width: 500px; height: 400px"></div>
      </el-col>

      <el-col :span="12">
        <div id="main" style="width: 500px; height: 400px"></div>
      </el-col>
      <el-col :span="12">
        <div id="pie" style="width: 500px; height: 400px"></div>
      </el-col>
    </el-row>

  </div>
</template>

<script>
  import * as echarts from 'echarts';
  export default {
    name: "Home",
    data(){
      return{
        max:1,
        min:2

      }
    },
    mounted() {
      var option1 = {
        title: {
          text:'问卷调查系统用户图',
          subtext:'趋势图',
          left:'center',
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 'left'
        },
        xAxis: {
          type: 'category',
          data: ["第一季度","第二季度","第三季度","第四季度"]
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [],
            type: 'line'
          },
          {
            data: [],
            type: 'bar'
          },
        ]
      };

      var pieOption1 = {
        title: {
          text:'各季度用户数量统计',
          subtext:'趋势图',
          left:'center',
        },
        tooltip: {
          trigger: 'item',
          formatter:'{b} : {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 'left'
        },
        series: [
          {
            type: 'pie',
            radius: '50%',
            center:['25%','50%'],
            label:{
              normal:{
                show:true,
                position:'inner',
                textStyle:{
                  fontWeight:300,
                  fontSize:16,
                  color:"#fff"
                },
                formatter:'{d}%'
              }
            },
            data: [], //填空
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      };


      var option2 = {
        title: {
          text:'问卷调查系统问卷图',
          subtext:'趋势图',
          left:'center',
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 'left'
        },
        xAxis: {
          type: 'category',
          data: ["第一季度","第二季度","第三季度","第四季度"]
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [],
            type: 'line'
          },
          {
            data: [],
            type: 'bar'
          },
        ]
      };

      var pieOption2 = {
        title: {
          text:'各季度问卷数量统计',
          subtext:'趋势图',
          left:'center',
        },
        tooltip: {
          trigger: 'item',
          formatter:'{b} : {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 'left'
        },
        series: [
          {
            type: 'pie',
            radius: '50%',
            center:['25%','50%'],
            label:{
              normal:{
                show:true,
                position:'inner',
                textStyle:{
                  fontWeight:300,
                  fontSize:16,
                  color:"#fff"
                },
                formatter:'{d}%'
              }
            },
            data: [], //填空
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      };
      var option = {
        title: {
          text:'各季度会员数量统计',
          subtext:'趋势图',
          left:'center',
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 'left'
        },
        xAxis: {
          type: 'category',
          data: ["第一季度","第二季度","第三季度","第四季度"]
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name:"星巴克",
            data: [],
            type: 'line'
          },
          {
            name:"星巴克",
            data: [],
            type: 'bar'
          },

          {
            name:"肯德基",
            data: [],
            type: 'line'
          },
          {
            name:"肯德基",
            data: [],
            type: 'bar'
          },
        ]
      };

      var pieOption = {
        title: {
          text:'各季度会员数量统计',
          subtext:'趋势图',
          left:'center',
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 'left'
        },
        series: [
          {
            name:"星巴克",
            type: 'pie',
            radius: '60%',
            center:['25%','50%'],
            label:{
              normal:{
                show:true,
                position:'inner',
                textStyle:{
                  fontWeight:300,
                  fontSize:16,
                  color:"#fff"
                },
                formatter:'{d}%'
              }
            },
            data: [], //填空
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          },
          {
            name:"肯德基",
            type: 'pie',
            radius: '50%',
            center:['75%','50%'],

            label:{
              normal:{
                show:true,
                position:'inner',
                textStyle:{
                  fontWeight:300,
                  fontSize:16,
                  color:"#fff"
                },
                formatter:'{d}%'
              }
            },
            data: [{name:"第一季度",value:4},
              {name:"第二季度",value:5},
              {name:"第三季度",value:6},
              {name:"第四季度",value:7},], //填空
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      };
      var chartDom = document.getElementById('main');
      var myChart = echarts.init(chartDom);

      var pieDom = document.getElementById('pie');
      var pieChart = echarts.init(pieDom);

      var chartDom1 = document.getElementById('main1');
      var myChart1 = echarts.init(chartDom1);

      var pieDom1 = document.getElementById('pie1');
      var pieChart1 = echarts.init(pieDom1);

      var chartDom2 = document.getElementById('main2');
      var myChart2 = echarts.init(chartDom2);

      var pieDom2 = document.getElementById('pie2');
      var pieChart2 = echarts.init(pieDom2);

      this.request.get("/echarts/members").then(res=>{
        option1.series[0].data=res.data
        option1.series[1].data=res.data

        myChart1.setOption(option1);

        pieOption1.series[0].data=[
          {name:"第一季度",value:res.data[0]},
          {name:"第二季度",value:res.data[1]},
          {name:"第三季度",value:res.data[2]},
          {name:"第四季度",value:res.data[3]},

        ]
        pieChart1.setOption(pieOption1)

      })

      this.request.get("/echarts/members2").then(res=>{
        option2.series[0].data=res.data
        option2.series[1].data=res.data

        myChart2.setOption(option2);

        pieOption2.series[0].data=[
          {name:"第一季度",value:res.data[0]},
          {name:"第二季度",value:res.data[1]},
          {name:"第三季度",value:res.data[2]},
          {name:"第四季度",value:res.data[3]},

        ]
        pieChart2.setOption(pieOption2)

      })

      this.request.get("/echarts/members").then(res=>{

        //option.xAxis.data=res.data.x
        option.series[0].data=res.data
        option.series[1].data=res.data

        option.series[2].data=[5,6,7,8]
        option.series[3].data=[5,6,7,8]
        myChart.setOption(option);

        pieOption.series[0].data=[
          {name:"第一季度",value:res.data[0]},
          {name:"第二季度",value:res.data[1]},
          {name:"第三季度",value:res.data[2]},
          {name:"第四季度",value:res.data[3]},

        ]
        pieChart.setOption(pieOption)

      })
    }
  }
</script>

<style scoped>

</style>