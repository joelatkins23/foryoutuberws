<template>
    <div class="animated fadeIn">
        <!-- Alert buttons -->
        <b-row>
            <b-alert class="mr-1 main-alerts shadow" show fade>
                TRADES DATE: MAY 19, 2018 &nbsp;
                <b-button><i class="fa fa-close"></i></b-button>
            </b-alert>
        </b-row>
        <!-- Details components -->
        <b-row>
            <b-col class="no-padding-left no-padding-right-mobile padding-justify full-height mb-md-3 mb-sm-3 overflow-scroll"
                   sm="12" md="12" lg="8" style="width: 100%; height: 89vh;">
                <!-- Checkboxes for filters -->
                <b-row class="mb-n3">
                    <b-col>
                        <b-card class="main-cards shadow filters">
                            <div class="custom-labels-checkbox">
                                <label class="custom-control fill-checkbox">
                                    <input type="checkbox" class="fill-control-input">
                                    <span class="fill-control-indicator"></span>
                                    <span class="fill-control-description">COMMINIONS</span>
                                </label>
                            </div>
                        </b-card>
                    </b-col>
                </b-row>
                <!-- Bar chart -->
                <b-row class="mb-n3">
                    <b-col sm="12">
                        <b-card class="main-cards shadow highchart card py-4">
                            <div class="card-header">
                                <div class="d-flex flex-nowrap justify-content-between">
                                    <div>
                                        <p>Daily P&L</p>
                                    </div>
                                    <div>
                                        <p class="text-right text-white">
                                            <a href="javascript:void(0)">
                                                <i class="nav-icon fa fa-cog ts-fa-gradient"></i>
                                            </a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <!-- Bar chart -->
                            <vue-highchart :constructor-type="'chart'"
                                      :chart-axes="chartAxes"
                                      :chart-series="chartSeries">
                            </vue-highchart>
                            <div class="card-footer" style="border: none;">
                                <div><span class="wk-gradient-zukzu-2 float-right">ZUKZU</span></div>
                            </div>
                        </b-card>
                    </b-col>
                </b-row>
                <!-- Cards for calculus -->
                <b-row>
                    <b-col class="mb-n2 margin-x-ajust" sm="6" lg="4" xl="3" v-for="data in chartAmountsLineSeries" :key="data.amount">
                        <a href="#">
                            <b-card class="main-cards shadow calculus-card">
                                <div class="card-header background-none" style="padding-right: 12px; border: none;">
                                    <div class="float-right"><i class="fa fa-exclamation-circle"></i></div>
                                </div>
                                <p style="font-size: 12px;" class="mb-2">AVG WiNNER</p>
                                <h4 class="card-text no-margin-bottom">${{ data.amount }}
                                    <b-badge variant="outline">
                                        <h6 class="badge1 no-margin-bottom">{{ data.percentage }}%
                                            <span>&#10151</span></h6>
                                    </b-badge>
                                </h4>
                                <p style="font-size: 12px;" class="mt-1 mb-2">{{ data.compare }}</p>
                            </b-card>
                        </a>
                    </b-col>
                </b-row>
            </b-col>
            <b-col class="no-padding-right no-padding-left-mobile padding-justify overflow-scroll" lg="4"
                   style="width: 100%; height: 89vh;">
                <div class="d-flex align-items-stretch">
                    <b-card class="main-cards shadow mb-2" style="margin-right: 8px; width: 100%;">
                        <div class="card-header background-none" style="padding-right: 12px; border: none;">
                            <div class="float-right"><i class="fa fa-exclamation-circle"></i></div>
                        </div>
                        <p style="font-size: 12px;" class="mb-2">% CHANGE</p>
                        <h4 class="card-text no-margin-bottom text-gradient-gold">$ -13.10</h4>
                        <p style="font-size: 12px;" class="mt-1">85% ACHIEVABLE</p>
                    </b-card>
                    <b-card class="main-cards shadow no-padding-card-body card flex-grow-1 mb-2">
                        <p style="color: #cabd8e;">You must avoid trading the unchecked datapoints below to increase your performance by 40%.
                            This scenario has a likelihood of 85% achievable based on your trades.</p>
                    </b-card>
                </div>
                <b-card class="main-cards shadow no-padding-card-body card pt-4 mb-2">
                    <div class="card-header">
                        <div class="d-flex flex-nowrap justify-content-between">
                            <div>
                                <p>Price</p>
                            </div>
                        </div>
                    </div>
                    <!-- Input checkbox -->
                    <div class="card-body">
                        <b-form-group>
                            <div class="d-flex flex-nowrap justify-content-between py-2">
                                <div>
                                    <b-form-checkbox>
                                        $0 - $1 <br>
                                        <span class="text-silent">$1,809.91 (-19.2%)</span>
                                    </b-form-checkbox>
                                </div>
                                <div>
                                    <b-form-checkbox>
                                        $0 - $1 <br>
                                        <span class="text-silent">$1,809.91 (-19.2%)</span>
                                    </b-form-checkbox>
                                </div>
                                <div>
                                    <b-form-checkbox>
                                        $0 - $1 <br>
                                        <span class="text-silent">$1,809.91 (-19.2%)</span>
                                    </b-form-checkbox>
                                </div>
                            </div>
                            <div class="d-flex flex-nowrap justify-content-between py-2">
                                <div>
                                    <b-form-checkbox>
                                        $0 - $1 <br>
                                        <span class="text-silent">$1,809.91 (-19.2%)</span>
                                    </b-form-checkbox>
                                </div>
                                <div>
                                    <b-form-checkbox>
                                        $0 - $1 <br>
                                        <span class="text-silent">$1,809.91 (-19.2%)</span>
                                    </b-form-checkbox>
                                </div>
                                <div>
                                    <b-form-checkbox>
                                        $0 - $1 <br>
                                        <span class="text-silent">$1,809.91 (-19.2%)</span>
                                    </b-form-checkbox>
                                </div>
                            </div>
                            <div class="d-flex flex-nowrap justify-content-between py-2">
                                <div>
                                    <b-form-checkbox>
                                        $0 - $1 <br>
                                        <span class="text-silent">$1,809.91 (-19.2%)</span>
                                    </b-form-checkbox>
                                </div>
                                <div>
                                    <b-form-checkbox>
                                        $0 - $1 <br>
                                        <span class="text-silent">$1,809.91 (-19.2%)</span>
                                    </b-form-checkbox>
                                </div>
                                <div>
                                    <b-form-checkbox>
                                        $0 - $1 <br>
                                        <span class="text-silent">$1,809.91 (-19.2%)</span>
                                    </b-form-checkbox>
                                </div>
                            </div>
                        </b-form-group>
                    </div>

                </b-card>
                <b-card class="main-cards shadow no-padding-card-body card pt-4 mb-2">
                    <div class="card-header">
                        <div class="d-flex flex-nowrap justify-content-between">
                            <div>
                                <p>Price</p>
                            </div>
                        </div>
                    </div>
                    <!-- Input checkbox -->
                    <div class="card-body">
                        <b-form-group>
                            <div class="d-flex flex-nowrap justify-content-between py-2">
                                <div>
                                    <b-form-checkbox>
                                        $0 - $1 <br>
                                        <span class="text-silent">$1,809.91 (-19.2%)</span>
                                    </b-form-checkbox>
                                </div>
                                <div>
                                    <b-form-checkbox>
                                        $0 - $1 <br>
                                        <span class="text-silent">$1,809.91 (-19.2%)</span>
                                    </b-form-checkbox>
                                </div>
                                <div>
                                    <b-form-checkbox>
                                        $0 - $1 <br>
                                        <span class="text-silent">$1,809.91 (-19.2%)</span>
                                    </b-form-checkbox>
                                </div>
                            </div>
                            <div class="d-flex flex-nowrap justify-content-between py-2">
                                <div>
                                    <b-form-checkbox>
                                        $0 - $1 <br>
                                        <span class="text-silent">$1,809.91 (-19.2%)</span>
                                    </b-form-checkbox>
                                </div>
                                <div>
                                    <b-form-checkbox>
                                        $0 - $1 <br>
                                        <span class="text-silent">$1,809.91 (-19.2%)</span>
                                    </b-form-checkbox>
                                </div>
                                <div>
                                    <b-form-checkbox>
                                        $0 - $1 <br>
                                        <span class="text-silent">$1,809.91 (-19.2%)</span>
                                    </b-form-checkbox>
                                </div>
                            </div>
                            <div class="d-flex flex-nowrap justify-content-between py-2">
                                <div>
                                    <b-form-checkbox>
                                        $0 - $1 <br>
                                        <span class="text-silent">$1,809.91 (-19.2%)</span>
                                    </b-form-checkbox>
                                </div>
                                <div>
                                    <b-form-checkbox>
                                        $0 - $1 <br>
                                        <span class="text-silent">$1,809.91 (-19.2%)</span>
                                    </b-form-checkbox>
                                </div>
                                <div>
                                    <b-form-checkbox>
                                        $0 - $1 <br>
                                        <span class="text-silent">$1,809.91 (-19.2%)</span>
                                    </b-form-checkbox>
                                </div>
                            </div>
                        </b-form-group>
                    </div>

                </b-card>
                <b-card class="main-cards shadow no-padding-card-body card pt-4 mb-2">
                    <div class="card-header">
                        <div class="d-flex flex-nowrap justify-content-between">
                            <div>
                                <p>Price</p>
                            </div>
                        </div>
                    </div>
                    <!-- Input checkbox -->
                    <div class="card-body">
                        <b-form-group>
                            <div class="d-flex flex-nowrap justify-content-between py-2">
                                <div>
                                    <b-form-checkbox>
                                        $0 - $1 <br>
                                        <span class="text-silent">$1,809.91 (-19.2%)</span>
                                    </b-form-checkbox>
                                </div>
                                <div>
                                    <b-form-checkbox>
                                        $0 - $1 <br>
                                        <span class="text-silent">$1,809.91 (-19.2%)</span>
                                    </b-form-checkbox>
                                </div>
                                <div>
                                    <b-form-checkbox>
                                        $0 - $1 <br>
                                        <span class="text-silent">$1,809.91 (-19.2%)</span>
                                    </b-form-checkbox>
                                </div>
                            </div>
                            <div class="d-flex flex-nowrap justify-content-between py-2">
                                <div>
                                    <b-form-checkbox>
                                        $0 - $1 <br>
                                        <span class="text-silent">$1,809.91 (-19.2%)</span>
                                    </b-form-checkbox>
                                </div>
                                <div>
                                    <b-form-checkbox>
                                        $0 - $1 <br>
                                        <span class="text-silent">$1,809.91 (-19.2%)</span>
                                    </b-form-checkbox>
                                </div>
                                <div>
                                    <b-form-checkbox>
                                        $0 - $1 <br>
                                        <span class="text-silent">$1,809.91 (-19.2%)</span>
                                    </b-form-checkbox>
                                </div>
                            </div>
                            <div class="d-flex flex-nowrap justify-content-between py-2">
                                <div>
                                    <b-form-checkbox>
                                        $0 - $1 <br>
                                        <span class="text-silent">$1,809.91 (-19.2%)</span>
                                    </b-form-checkbox>
                                </div>
                                <div>
                                    <b-form-checkbox>
                                        $0 - $1 <br>
                                        <span class="text-silent">$1,809.91 (-19.2%)</span>
                                    </b-form-checkbox>
                                </div>
                                <div>
                                    <b-form-checkbox>
                                        $0 - $1 <br>
                                        <span class="text-silent">$1,809.91 (-19.2%)</span>
                                    </b-form-checkbox>
                                </div>
                            </div>
                        </b-form-group>
                    </div>

                </b-card>
                <b-card class="main-cards shadow no-padding-card-body card pt-4 mb-2">
                    <div class="card-header">
                        <div class="d-flex flex-nowrap justify-content-between">
                            <div>
                                <p>Price</p>
                            </div>
                        </div>
                    </div>
                    <!-- Input checkbox -->
                    <div class="card-body">
                        <b-form-group>
                            <div class="d-flex flex-nowrap justify-content-between py-2">
                                <div>
                                    <b-form-checkbox>
                                        $0 - $1 <br>
                                        <span class="text-silent">$1,809.91 (-19.2%)</span>
                                    </b-form-checkbox>
                                </div>
                                <div>
                                    <b-form-checkbox>
                                        $0 - $1 <br>
                                        <span class="text-silent">$1,809.91 (-19.2%)</span>
                                    </b-form-checkbox>
                                </div>
                                <div>
                                    <b-form-checkbox>
                                        $0 - $1 <br>
                                        <span class="text-silent">$1,809.91 (-19.2%)</span>
                                    </b-form-checkbox>
                                </div>
                            </div>
                            <div class="d-flex flex-nowrap justify-content-between py-2">
                                <div>
                                    <b-form-checkbox>
                                        $0 - $1 <br>
                                        <span class="text-silent">$1,809.91 (-19.2%)</span>
                                    </b-form-checkbox>
                                </div>
                                <div>
                                    <b-form-checkbox>
                                        $0 - $1 <br>
                                        <span class="text-silent">$1,809.91 (-19.2%)</span>
                                    </b-form-checkbox>
                                </div>
                                <div>
                                    <b-form-checkbox>
                                        $0 - $1 <br>
                                        <span class="text-silent">$1,809.91 (-19.2%)</span>
                                    </b-form-checkbox>
                                </div>
                            </div>
                            <div class="d-flex flex-nowrap justify-content-between py-2">
                                <div>
                                    <b-form-checkbox>
                                        $0 - $1 <br>
                                        <span class="text-silent">$1,809.91 (-19.2%)</span>
                                    </b-form-checkbox>
                                </div>
                                <div>
                                    <b-form-checkbox>
                                        $0 - $1 <br>
                                        <span class="text-silent">$1,809.91 (-19.2%)</span>
                                    </b-form-checkbox>
                                </div>
                                <div>
                                    <b-form-checkbox>
                                        $0 - $1 <br>
                                        <span class="text-silent">$1,809.91 (-19.2%)</span>
                                    </b-form-checkbox>
                                </div>
                            </div>
                        </b-form-group>
                    </div>

                </b-card>
            </b-col>
        </b-row>
    </div>
</template>

<script>
    import VueHighchart from '../../components/vue-highchart/VueHighchart'

    export default {
        name: 'report-overview',
        components: {
            // Charts
            VueHighchart,
        },

        data: function () {
            return {
                // Hightcharts
                chartColumnsData: undefined,
                chartSeries: [],
                chartAmountsLineSeries: [], // for Amounts cards

                // Define chart axes
                chartAxes: {
                    only: ['yAxis-right']
                }
            }

        },

        beforeMount() {
            // Mothods for highcharts
            this.fetchChartLineData();
            this.fetchChartLine2Data();
            this.fetchChartLine3Data();
            this.fetchChartLine4Data();
            this.setChartSeries();
            this.fetchAmountsSeries();
        },

        mounted() {},

        methods: {

            /**
             * Get data for chart line
             */
            fetchChartLineData() {
                // TODO: Use the service or API here
                // The code below is for demo purpose
                return Array.from({length: 50}, () => Math.floor(Math.random() * 90));
            },

            /**
             * Get data for chart line 2
             */
            fetchChartLine2Data() {
                // TODO: Use the service or API here
                // The code below is for demo purpose
                return Array.from({length: 50}, () => Math.floor(Math.random() * 50));
            },
            /**
             * Get data for chart line 3
             */
            fetchChartLine3Data() {
                // TODO: Use the service or API here
                // The code below is for demo purpose
                return Array.from({length: 50}, () => Math.floor(Math.random() * 30));
            },
            /**
             * Get data for chart line 3
             */
            fetchChartLine4Data() {
                // TODO: Use the service or API here
                // The code below is for demo purpose
                return Array.from({length: 50}, () => Math.floor(Math.random() * 72));
            },

            /**
             * Set the series to be used in the highcharts
             */
            setChartSeries() {
                this.chartSeries = [
                    {
                        type: 'line'.toLowerCase(),
                        yAxis: 1,  // Secondary yAxis (right)
                        data: this.fetchChartLineData()
                    },
                    {
                        type: 'line'.toLowerCase(),
                        yAxis: 1,  // Secondary yAxis (right)
                        data: this.fetchChartLine2Data()
                    },
                    {
                        type: 'line'.toLowerCase(),
                        yAxis: 1,  // Secondary yAxis (right)
                        data: this.fetchChartLine3Data()
                    },
                    {
                        type: 'line'.toLowerCase(),
                        yAxis: 1,  // Secondary yAxis (right)
                        data: this.fetchChartLine4Data()
                    }
                ];
            },

            /**
             * Get data for amounts and chart lines for amounts
             */
            fetchAmountsSeries() {
                /*
                 * TODO: Use the service or API here
                 *
                 * The data must be retrieved as an array list
                 * So, we set a new array to chartAmountsLinesSeries with all data following the structure below:
                 *
                 *  {
                 *      amount: Float,
                 *      percentage: Integer,
                 *      series: [{
                 *          type: 'area'.toLowerCase(),
                 *          data: Array
                 *      }]
                 *  }
                 *
                 */

                // The code below is for demo purpose
                for(let index = 0; index < 40; index++) {
                    // On this way the data has to be retrieved and set
                    this.chartAmountsLineSeries.push(
                        {
                            amount: Number((Math.random()  * 10000.00).toFixed(2)).toLocaleString(),
                            percentage: Math.floor(Math.random()  * 100),
                            compare: Number((Math.random()  * 10000.00).toFixed(2)).toLocaleString()
                                + ' vs ' + Number((Math.random()  * 10000.00).toFixed(2)).toLocaleString(),
                            series: [{
                                type: 'area'.toLowerCase(),
                                data: Array.from({length: 10}, () => Math.floor(Math.random() * 40))
                            }]
                        },
                    );
                }
            },
        }
    }
</script>

