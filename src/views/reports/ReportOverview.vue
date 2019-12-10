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
            <b-col class="no-padding-left no-padding-right-mobile padding-justify full-height overflow-scroll"
                   sm="12" md="12" lg="8" style="width: 100%; height: 89vh;">
                <!-- Checkboxes for filters -->
                <b-row class="mb-n3">
                    <b-col>
                        <b-card class="main-cards shadow filters">
                            <div class="custom-labels-checkbox">
                                <label class="custom-control fill-checkbox">
                                    <input type="checkbox" class="fill-control-input">
                                    <span class="fill-control-indicator"></span>
                                    <span class="fill-control-description">DAILY P&L</span>
                                </label>
                                <label class="custom-control fill-checkbox mr-sm-4">
                                    <input type="checkbox" class="fill-control-input">
                                    <span class="fill-control-indicator"></span>
                                    <span class="fill-control-description">GROSS P&L</span>
                                </label>
                                <div class="separator-x"></div>
                                <label class="custom-control fill-checkbox ml-sm-4">
                                    <input type="checkbox" class="fill-control-input">
                                    <span class="fill-control-indicator"></span>
                                    <span class="fill-control-description">DAILY P&L</span>
                                </label>
                                <label class="custom-control fill-checkbox">
                                    <input type="checkbox" class="fill-control-input">
                                    <span class="fill-control-indicator"></span>
                                    <span class="fill-control-description">INDEX</span>
                                </label>
                            </div>
                        </b-card>
                    </b-col>
                </b-row>
                <!-- Bar chart -->
                <b-row class="mb-n3">
                    <b-col sm="12">
                        <b-card class="main-cards shadow card highchart pt-5">
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
                                      :chart-series="chartColumnsSeries">
                            </vue-highchart>
                            <!-- Other filters -->
                            <div class="pt-1">
                                <div class="custom-labels-checkbox">
                                    <label class="custom-control fill-checkbox">
                                        <input type="checkbox" class="fill-control-input">
                                        <span class="fill-control-indicator"></span>
                                        <span class="fill-control-description">LIFETIME</span>
                                    </label>
                                    <label class="custom-control fill-checkbox">
                                        <input type="checkbox" class="fill-control-input">
                                        <span class="fill-control-indicator"></span>
                                        <span class="fill-control-description">90 DAYS</span>
                                    </label>
                                    <label class="custom-control fill-checkbox">
                                        <input type="checkbox" class="fill-control-input">
                                        <span class="fill-control-indicator"></span>
                                        <span class="fill-control-description">60 DAYS</span>
                                    </label>
                                    <label class="custom-control fill-checkbox">
                                        <input type="checkbox" class="fill-control-input">
                                        <span class="fill-control-indicator"></span>
                                        <span class="fill-control-description">30 DAYS</span>
                                    </label>
                                </div>
                            </div>
                        </b-card>
                    </b-col>
                </b-row>
                <!-- Cards for calculus -->
                <b-row>
                    <b-col class="mb-n2 margin-x-ajust" sm="6" lg="3" v-for="data in chartAmountsLineSeries" :key="data.amount">
                        <a href="#">
                            <b-card class="main-cards shadow calculus-card">
                                <b-row>
                                    <b-col lg="12" md="12" sm="12">
                                        <P style="font-size: 12px;">ACCUMULATIVE RETURNS</P>
                                        <h4 class="card-text">${{ data.amount }}
                                            <b-badge variant="outline"><h6 class="badge1">{{ data.percentage }}% &#8599;</h6></b-badge>
                                        </h4>
                                    </b-col>
                                    <b-col lg="12" md="12" sm="12" class="no-padding-left no-padding-right no-padding-bottom">
                                        <vue-highchart :constructor-type="'chart'"
                                                  :chart-series="data.series"
                                                  :chart-details="false"
                                                  :height="50">
                                        </vue-highchart>
                                    </b-col>
                                </b-row>
                            </b-card>
                        </a>
                    </b-col>
                </b-row>
            </b-col>
            <!-- Data table -->
            <b-col class="no-padding-right no-padding-left-mobile padding-justify hide-md overflow-scroll" lg="4"
                   style="width: 100%; height: 89vh;">
                <b-card class="main-cards table-card shadow">
                    <div id="grid-wrapper">
                        <ag-grid-vue class="ag-theme-material"
                                     :gridOptions="gridOptions"
                                     :columnDefs="columnDefs"
                                     :cacheQuickFilter="true"
                                     :rowData="rowData"
                                     rowSelection="multiple"
                                     @grid-size-changed="onGridSizeChanged"
                                     :enableSorting="true">
                        </ag-grid-vue>
                    </div>
                </b-card>
            </b-col>
        </b-row>
    </div>
</template>

<script>
    import BarExample from '../charts/BarExample'
    // Ag-grid data table
    import { AgGridVue } from 'ag-grid-vue'
    // JSON file for demo purposes
    import json from './data-overview.json'
    import TSChart from '../../components/vue-highchart/VueHighchart'

    export default {
        name: 'report-overview',
        components: {
            // Charts
            BarExample,
            TSChart,
            // Ag-grid
            AgGridVue

        },

        data: function () {
            return {
                // Hightcharts
                chartColumnsSeries: [], // For column chart
                chartAmountsLineSeries: [], // for Amounts cards
                // Ag-Grid
                gridOptions: null,
                columnDefs: null,
                rowData: json
            }

        },

        beforeMount() {
            this.gridOptions = {};
            this.gridOptions.headerHeight = 39;
            this.gridOptions.rowHeight = 43;
            this.columnDefs = [

                {
                    headerName: "Status",
                    field: "status",
                    cellRenderer: statusColDefinition,
                    width: 85,
                    minWidth: 100
                },
                {
                    headerName: "Date",
                    field: "date",
                    width: 110,
                    minWidth: 100

                },
                {
                    headerName: "Symbol",
                    field: "symbol",
                    cellRenderer: symbolColDefinition,
                    width: 90,
                    minWidth: 100
                },
                {
                    headerName: "Return $",
                    field: "return_usd",
                    cellRenderer: highlightColDefinition,
                    width: 80,
                    minWidth: 80
                },
                {
                    headerName: "side",
                    field: "side",
                    cellRenderer: sideColDefinition,
                    width: 80,
                    minWidth: 80
                }
            ];

            // Mothods for highcharts
            this.fetchChartColumnData();
            this.fetchAmountsSeries();
        },
        mounted() {
            this.gridApi = this.gridOptions.api;
            this.gridColumnApi = this.gridOptions.columnApi;
        },
        methods: {
            /*
             * Resize the Ag-grid table to avoid horizontal scrolling
             * hiding / showing columns depends on the grid table width
             */
            onGridSizeChanged(params) {
                var gridWidth = document.getElementById("grid-wrapper").offsetWidth;
                var columnsToShow = [];
                var columnsToHide = [];
                var totalColsWidth = 0;
                var allColumns = params.columnApi.getAllColumns();

                for (var i = 0; i < allColumns.length; i++) {
                    let column = allColumns[i];
                    totalColsWidth += column.getMinWidth();
                    if (totalColsWidth > gridWidth) {
                        columnsToHide.push(column.colId);
                    } else {
                        columnsToShow.push(column.colId);
                    }
                }
                params.columnApi.setColumnsVisible(columnsToShow, true);
                params.columnApi.setColumnsVisible(columnsToHide, false);
                params.api.sizeColumnsToFit();
            },

            /**
             * Get data for chart columns
             */
            fetchChartColumnData() {
                // TODO: Use the service or API here
                // The code below is for demo purpose
                this.chartColumnsSeries = [
                    {
                        type: 'column'.toLowerCase(),
                        data: Array.from({length: 15}, () => Math.floor(Math.random() * 40))
                    }
                ];
            },

            /**
             * Get data for amounts and chart lines
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
                    this.chartAmountsLineSeries.push(
                        {
                            amount: Number((Math.random()  * 20000.00).toFixed(2)).toLocaleString(),
                            percentage: Math.floor(Math.random()  * 100),
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

    /*
     * ==================================
     * Functions for columns definitions
     * on AG-GRID data table
     * ==================================
     * /
    /**
     * Render the HTML value for Status Column
     * @param params
     * @returns {string}
     */
    function statusColDefinition(params) {
        /* This code is for demo purposes */
        let labels = ["label-success", "label-alert", "label-danger"];
        let randomLabels = labels[Math.floor(Math.random() * labels.length)];
        /* TODO: Set the correct label below, depend on the status value. */
        return "<a href='#' class='label " + randomLabels + "'>" + params.value + "</a>"
    }

    /**
     * Render the HTML value for Side Column
     * @param params
     * @returns {string}
     */
    function sideColDefinition(params) {
        /* TODO: Set the correct label below, depend on the side value. */
        return "<span class='label label-outline-success'>" + params.value + "</span>";
    }

    /**
     * Render the HTML value for Symbol Column
     * @param params
     * @returns {string}
     */
    function symbolColDefinition(params) {
        return "<span class='text-highlight-info text-bolder'>" + params.value + "</span>";
    }

    /**
     * Render the HTML value with text highlighted
     * @param params
     * @returns {string}
     */
    function highlightColDefinition(params) {
        return "<span class='text-highlight-success text-bolder'>" + params.value + "</span>";
    }

    /* Clicking on Ag-grid rows */
    document.getElementsByClassName("ag-row").onclick = function() {
        location.href = void(0);
    }
</script>

<style lang="scss">
    @import '../../assets/scss/partials/ag-grid-custom';

    .container-fluid {
        flex-direction: column;
        flex: 1;
        display: flex;
        height: 100%;
    }
    .animated.fadeIn {
        display: flex;
        flex-direction: column;
        flex: 1;

        /*& .row:nth-child(2) {*/
            /*flex: 1;*/
            /*flex-wrap: nowrap;*/
            /*max-height: calc(100% - 40px);*/
            /*!*height: 1px;*!*/
            /*overflow: hidden;*/
        /*}*/
    }

</style>

