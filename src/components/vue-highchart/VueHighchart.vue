<template>
    <highcharts :constructor-type="constructorType" :options="chartOptions"></highcharts>
</template>

<script>
    // https://www.highcharts.com/docs/chart-and-series-types/chart-types
    import { Chart } from 'highcharts-vue'

    /**
     * Component that allows implement multiple highcharts components
     * in the same view and applying charts combinations
     *
     * Properties:
     *  constructorType: hightchart constructor type (chart, stockchart, etc)
     *  charAxes: To implement multiple axes
     *            { only: ['xAxis-top', 'xAxis-bottom', 'yAxis-left', 'yAxis-right'] }
     *  chartSeries: To implement multiple chart types (columns, line, area, spline, etc)
     *  categories: Categories labels
     *  chartDetails: Remove chart details (labels and axes); true is by default.
     *  title: Highchart title.
     *  height: Highchart title height
     */

    export default {
        name: "vue-hightchart",
        components: {
            highcharts: Chart
        },

        props: {
            constructorType: {
                title: 'constructor-type',
                required: true,
                type: String,
            },
            chartAxes: {
                title: 'chart-axes',
                type: Object, String
            },
            chartSeries: {
                title: 'chart-series',
                required: true,
                type: Array,
            },
            categories: {
                title: 'categories',
                type: Array,
            },
            title: {
                type: String
            },
            chartDetails: {
                title: 'chart-details',
                type: Boolean,
                default: true
            },
            height: {
                type: [Number, String]
            }
        },

        data: function() {
            return {
                // Highcharts options
                chartOptions: {
                    title: { text: this.title },
                    series: this.chartSeries,
                    chart: {
                        height: this.height,
                        styledMode: true
                    },
                    xAxis: [
                        {
                            title: {
                                text: undefined
                            },
                            categories: this.categories,
                            visible: true && this.chartDetails
                        },
                        {
                            title: {
                                text: undefined
                            },
                            visible: false && this.chartDetails,
                            opposite: true
                        }
                    ],
                    yAxis: [
                        {
                            title: {text: undefined },
                            visible: true && this.chartDetails
                        },
                        {
                            title: {text: undefined },
                            visible: false && this.chartDetails,
                            opposite: true
                        }
                    ],
                    legend: { enabled: false },
                    defs: {
                        // Columns gradients
                        oddColGradiend: {
                            tagName: 'linearGradient',
                            id: 'odd-col-gradient',
                            x1: 0, y1: 0,
                            x2: 0, y2: 1,
                               children: [
                                { tagName: 'stop', offset: 0 },
                                { tagName: 'stop', offset: 1 }
                            ]
                        },
                        evenColGradiend: {
                            tagName: 'linearGradient',
                            id: 'even-col-gradient',
                            x1: 0, y1: 0,
                            x2: 0, y2: 1,
                            children: [
                                { tagName: 'stop', offset: 0 },
                                { tagName: 'stop', offset: 1 }
                            ]
                        },
                        // Area gradients
                        areaGradiend: {
                            tagName: 'linearGradient',
                            id: 'area-gradient',
                            x1: 0, y1: 0,
                            x2: 0, y2: 1,
                            children: [
                                { tagName: 'stop', offset: 0 },
                                { tagName: 'stop', offset: 1 }
                            ]
                        }
                    }// defs
                },
            }
        }, // data

        mounted() {
            if(this.chartAxes) {
                this.setAxes(this.chartAxes);
            }
        }, // mounted

        methods: {
            /**
             * Sets the desired axes on the chart.
             * If the chart-axes property is not defined, the default axes will be set
             *
             * Defined axes names:
             *   'xAxis-top',
             *   'xAxis-bottom',
             *   'yAxis-left',
             *   'yAxis-right'
             *
             * @param chartAxes -> chart-axes property
             */
            setAxes(chartAxes) {
                const axesNames = ['xAxis-top', 'xAxis-bottom', 'yAxis-left', 'yAxis-right'];

                if ( chartAxes.only.length > 4 ) {
                    throw new ExceptionAxisLength(chartAxes.only).toString();
                }

                chartAxes.only.forEach(axis => {
                    if (!axesNames.includes(axis)) {
                        throw new ExceptionInvalidAxis(axis.axis).toString();
                    }
                });

                this.chartOptions.xAxis[0].visible = chartAxes.only.includes('xAxis-bottom') && this.chartDetails;
                this.chartOptions.xAxis[1].visible = chartAxes.only.includes('xAxis-top') && this.chartDetails;
                this.chartOptions.yAxis[0].visible = chartAxes.only.includes('yAxis-left') && this.chartDetails;
                this.chartOptions.yAxis[1].visible = chartAxes.only.includes('yAxis-right') && this.chartDetails;
            }
        } // methods
    }

    /**
     * Generic Exception
     * @param msg -> Message
     * @constructor
     */
    function ExceptionGeneric(msg) {
        this.msg = msg;
        this.toString = function() {
            return this.msg;
        }
    }

    /**
     * Exception for and invalid axis
     * @param axis
     * @constructor
     */
    function ExceptionInvalidAxis(axis) {
        this.axis = axis;
        this.msg = ' is not a valid axis. Provide a correct one such as [\'xAxis-top\', \'xAxis-bottom\', \'yAxis-left\', \'yAxis-right\']';
        if (axis.includes('xAxis')) {
            this.msg = ' is not a valid axis. Maybe you meant \'xAxis-top\' or \'xAxis-bottom\'';
        }
        else if (axis.includes('yAxis')) {
            this.msg = ' is not a valid axis. Maybe you meant \'yAxis-left\' or \'yAxis-right\'';
        }
        this.toString = function () {
            return '\'' + this.axis + '\'' + this.msg;
        };
    }

    /**
     * Exception for chartAxes length
     * @param axes
     * @constructor
     */
    function ExceptionAxisLength(axes) {
        this.axes = axes;
        this.msg = ' Only 1-4 axes are required.' + this.axes.length.toString() + ' provided';
        this.toString = function () {
            return this.msg
        };
    }

</script>
