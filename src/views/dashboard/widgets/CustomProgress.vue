<template>
  <div style="display: flex;">
    <div>
      <svg class="stat-circle" viewBox="1.6 1.6 16.8 16.8"  v-bind:style="{ width: width + 'px', transform: 'rotate(-90deg)' }">
        <circle class="bg" cx="10" cy="10" r="8" v-bind:style="{'stroke-width': (doubleThickness ? 1.6 : 0.8), 'r': (doubleThickness ? 7 : 8) }"/>
        <circle class="progress2" cx="10" cy="10" r="8" :data-percentage="percentage" v-bind:style="{stroke: (variant == 'red' ? '#fd6c8f' : '#1cbb85'), 'stroke-width': (doubleThickness ? 1.6 : 0.8), 'r': (doubleThickness ? 7 : 8) }"/>
      </svg>
    </div> 
    <div style="position: absolute;" v-if="!hideNumbers">
      <svg class="stat-circle" viewBox="1.6 1.6 16.8 16.8"  v-bind:style="{ width: width + 'px', position: 'absolute' }">
        <text x="62%" y="70%">{{ percentage }}%</text>
      </svg>
    </div>
  </div>
</template>

<script>
  import {TweenMax, Power1} from "gsap/TweenMax";

  export default {
    props: ["percentage", "width", "variant", "hideNumbers", "doubleThickness"],
    name: 'CustomProgress',
    data: function () {
      return {
      }
    },
     mounted: function () {
      setTimeout(() => {
          var $statCircle = document.querySelectorAll(".stat-circle circle");
          for (var i = 0; i < $statCircle.length; i++) {
            var p = parseFloat($statCircle[i].dataset.percentage);
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


<style>
  .stat-circle {
    width: 75px;
  }
  .stat-circle circle.bg {
    fill: none;
    stroke: #343943;
    stroke-width: 0.8;
  }
  .stat-circle circle.progress2 {
    fill: none;
    stroke: #fd6c8f;
    stroke-width: 1;
    stroke-dasharray: 51 51;
    stroke-dashoffset: -51;
    stroke-linecap: round; 
  }
  .stat-circle text {
    font-size: 5px;
    font-weight: 400;
    text-anchor: middle;
    fill: #999eab;
  }
</style>