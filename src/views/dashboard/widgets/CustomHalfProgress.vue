<template>
  <div style="display: flex; position: absolute; top: 0px;">
    <div>
      <svg id="potencial-per" class="stat-circle2" viewBox="1.6 1.6 16.8 16.8"  v-bind:style="{ width: width + 'px', transform: 'rotate(-180deg)' }">
        <circle class="bg" cx="10" cy="10" r="8"/>
        <circle class="progress2" cx="10" cy="10" r="8" :data-percentage="percentage" v-bind:style="{stroke: (variant == 'red' ? '#fd6c8f' : '#1cbb85')}"/>
      </svg>
    </div> 
    <div style="position: absolute;top: 30%;left: 0;right: 0;text-align: center;font-size: 22px;line-height: 20px;color: #a6b2cf;">
      <span>{{percentage}}</span>
      <span style="font-size: 15px;">%</span>
    </div>
  </div>
</template>

<script>
  import {TweenMax, Power1} from "gsap/TweenMax";

  export default {
    props: ["percentage", "width", "variant"],
    name: 'CustomHalfProgress',
    data: function () {
      return {
      }
    },
     mounted: function () {
      setTimeout(() => {
          var $statCircle = document.querySelectorAll("#potencial-per circle");
          for (var i = 0; i < $statCircle.length; i++) {
            var p = parseFloat(this.percentage/2);
            var off = -51 -((51 / 100) * p);
            new TweenMax.to($statCircle[i], .6,  {
              strokeDashoffset: off,
              ease: Power1.easeInOut
            });
          }
      }, 500)
    },
  }
</script>


<style scoped>
  .stat-circle2 {
    width: 75px;
  }
  .stat-circle2 circle.bg {
    fill: none;
    stroke: #343943;
    stroke-width: 0.8;
  }
  .stat-circle2 circle.progress2 {
    fill: none;
    stroke: #fd6c8f;
    stroke-width: 0.8;
    stroke-dasharray: 51 51;
    stroke-dashoffset: -51;
    stroke-linecap: butt; 
  }
  .stat-circle2 text {
    font-size: 5px;
    font-weight: 400;
    text-anchor: middle;
    fill: #999eab;
  }
</style>