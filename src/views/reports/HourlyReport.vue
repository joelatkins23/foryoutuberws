0
<template>
    <div class="animated fadeIn">
        <!-- Details components -->
        <b-row>
            <div class="d-flex flex-row custom-flex-md-wrap align-items-stretch">
                <div class="flex-grow-1 mr-lg-1">
                    <!-- Checkboxes for filters -->
                    <b-card class="main-cards shadow filters">
                        <div class="custom-labels-checkbox">
                            <label class="custom-control fill-checkbox mr-sm-4">
                                <input type="checkbox" class="fill-control-input">
                                <span class="fill-control-indicator"></span>
                                <span class="fill-control-description">TRADES</span>
                            </label>
                            <label class="custom-control fill-checkbox mr-sm-4">
                                <input type="checkbox" class="fill-control-input">
                                <span class="fill-control-indicator"></span>
                                <span class="fill-control-description">SHARES</span>
                            </label>
                            <label class="custom-control fill-checkbox mr-sm-4">
                                <input type="checkbox" class="fill-control-input">
                                <span class="fill-control-indicator"></span>
                                <span class="fill-control-description">PROFITS</span>
                            </label>
                            <label class="custom-control fill-checkbox mr-sm-4">
                                <input type="checkbox" class="fill-control-input">
                                <span class="fill-control-indicator danger"></span>
                                <span class="fill-control-description">LOSSES</span>
                            </label>
                            <label class="custom-control fill-checkbox mr-sm-4">
                                <input type="checkbox" class="fill-control-input">
                                <span class="fill-control-indicator"></span>
                                <span class="fill-control-description">MISTAKES</span>
                            </label>
                            <label class="custom-control fill-checkbox mr-sm-4">
                                <input type="checkbox" class="fill-control-input">
                                <span class="fill-control-indicator"></span>
                                <span class="fill-control-description">EFFICIENCY</span>
                            </label>
                            <label class="custom-control fill-checkbox mr-sm-4">
                                <input type="checkbox" class="fill-control-input">
                                <span class="fill-control-indicator"></span>
                                <span class="fill-control-description">COMPARE W vs L</span>
                            </label>
                        </div>
                    </b-card>
                    <!-- Bar chart -->
                    <b-card class="main-cards shadow card highchart pt-5 mt-n3">
                        <div class="card-header">
                            <div class="d-flex flex-nowrap justify-content-between">
                                <div>
                                    <p>Hourly Performance Report</p>
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
                                  :chart-series="chartSeries"
                                  :categories="chartCategories"
                                  :height="395">
                        </vue-highchart>
                    </b-card>
                </div>
                <!-- Insights -->
                <b-card class="main-cards shadow card pt-5 position-relative flex-grow-2 adjust-insights ml-md-1">
                    <div class="card-header">
                        <div class="d-flex flex-nowrap justify-content-between">
                            <div>
                                <p>Insights</p>
                            </div>
                        </div>
                    </div>
                    <div class="card-body fix-body-insights no-padding-top">
                        <h6 class="text-highlight-success">Earnings winner is performing the best on the
                            last
                            month</h6>
                        <p class="text-silent">Feb 1 - Feb 28, 2019</p>
                        <br>
                        <p>60% of your profits comes from the setup Earning Winner. Specifically when you
                            trade
                            the afternoon in the hours between 1 - 4pm.</p>
                        <br>
                        <div class="d-flex flex-nowrap justify-content-between py-2">
                            <div>
                                <p class="text-silent">Return $</p>
                            </div>
                            <div>
                                <p class="text-silent">$13,450</p>
                            </div>
                        </div>
                        <div class="dashed-row-sep"></div>
                        <div class="d-flex flex-nowrap justify-content-between py-2">
                            <div>
                                <p class="text-silent">Avg Return</p>
                            </div>
                            <div>
                                <p class="text-silent">$369</p>
                            </div>
                        </div>
                        <div class="dashed-row-sep"></div>
                        <div class="d-flex flex-nowrap justify-content-between py-2">
                            <div>
                                <p class="text-silent">Win Rate</p>
                            </div>
                            <div>
                                <p class="text-silent">40%</p>
                            </div>
                        </div>
                        <div class="dashed-row-sep"></div>
                        <div class="d-flex flex-nowrap justify-content-between py-2">
                            <div>
                                <p class="text-silent">Aug Win</p>
                            </div>
                            <div>
                                <p class="text-silent">40%</p>
                            </div>
                        </div>
                        <br>
                        <b-button variant="outline-secondary">View Details</b-button>
                    </div>

                    <div class="card-footer">
                        <div class="d-flex flex-row flex-nowrap justify-content-between">
                            <div class="wk-gradient-zukzu" style="transform: translateY(0);">ZUKZU</div>
                            <div style="transform: translateY(6px); font-size: 0.74rem;">
                                <a href="javascript:void(0)">
                                    <p class="text-silent">MORE INSIGHTS</p>
                                </a>
                            </div>
                        </div>
                    </div>

                </b-card>
            </div>
        </b-row>
        <b-row class="mt-n3">
            <!-- Data table -->
            <b-col class="no-padding-right no-padding-left" lg="12"
                   style="width: 100%;">
                <b-card class="main-cards table-card shadow">
                    <div id="grid-wrapper">
                        <ag-grid-vue class="ag-theme-material" style="height:500px"
                                     :gridOptions="gridOptions"
                                     :columnDefs="columnDefs"
                                     :cacheQuickFilter="true"
                                     :rowData="rowData"
                                     rowSelection="multiple"
                                     @grid-size-changed="onGridSizeChanged">
                        </ag-grid-vue>
                    </div>
                </b-card>
            </b-col>
        </b-row>
    </div>
</template>

<script>
    // Ag-grid data table
    import {AgGridVue} from 'ag-grid-vue'
    // JSON file for demo purposes
    import json from './data-hourly.json'
    import TSChart from '../../components/vue-highchart/VueHighchart'

    export default {
        name: 'report-overview',
        components: {
            // Charts
            TSChart,
            // Ag-grid
            AgGridVue,
            'b-progress': {
                template:  '<b-progress height="7px" :value="74" class="my-3 green"></b-progress>'
            }

        },

        data: function () {
            return {
                // Hightcharts
                chartColumnsData: undefined,
                chartLineData: undefined,
                chartSeries: [],
                chartCategories: [ // Those categories should be set from an API
                    "INTRAAY BREAKOUT",
                    "POSITIVE NEWS",
                    "GAP AND GO",
                    "MORNING DIP BUY",
                    "CONTRACT WINNER",
                    "MULTIDAY BREAKOUT",
                    "MULTIDAY BREAKOUT",
                    "MULTIWEEK BREAKOUT",
                    "FIRST RED DAY",
                    "AFTERNOON BREAKOUT",
                    "MULTI-MONTH BREAKOUT",
                    "INTRAAY BREAKOUT",
                    "POSITIVE NEWS",
                    "GAP AND GO",
                    "MORNING DIP BUY",
                    "CONTRACT WINNER",
                    "MULTIDAY BREAKOUT",
                    "MULTIDAY BREAKOUT",
                    "MULTIWEEK BREAKOUT",
                    "FIRST RED DAY",
                    "AFTERNOON BREAKOUT",
                    "MULTI-MONTH BREAKOUT",
                    "INTRAAY BREAKOUT",
                    "POSITIVE NEWS",
                    "GAP AND GO",
                    "MORNING DIP BUY",
                    "CONTRACT WINNER",
                    "MULTIDAY BREAKOUT",
                    "MULTIDAY BREAKOUT",
                    "MULTIWEEK BREAKOUT",
                    "FIRST RED DAY",
                    "AFTERNOON BREAKOUT",
                    "MULTI-MONTH BREAKOUT",
                    ""

                ],
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
                    headerName: "Setup",
                    field: "setup",
                    sortable: true,
                    width: 120,
                    minWidth: 100
                },
                {
                    headerName: "Return $",
                    field: "return_usd",
                    sortable: true,
                    cellRenderer: highlightColDefinition,
                    width: 80,
                    minWidth: 80
                },
                {
                    headerName: "Efficiency",
                    cellRendererFramework: 'b-progress',
                    width: 110,
                    minWidth: 100

                },
                {
                    headerName: "Efficiency %",
                    field: "efficiency_ptg",
                    sortable: true,
                    width: 90,
                    minWidth: 100
                },
                {
                    headerName: "Mistakes",
                    field: "mistakes",
                    sortable: true,
                    width: 80,
                    minWidth: 80
                },
                {
                    headerName: "Win Rate",
                    field: "win_rate",
                    sortable: true,
                    width: 80,
                    minWidth: 80
                },
                {
                    headerName: "Trades",
                    field: "trades",
                    sortable: true,
                    width: 80,
                    minWidth: 80
                },
                {
                    headerName: "Shares",
                    field: "shares",
                    sortable: true,
                    width: 80,
                    minWidth: 80
                },
                {
                    headerName: "Profits",
                    field: "profits",
                    sortable: true,
                    width: 80,
                    minWidth: 80
                },
                {
                    headerName: "Losses",
                    field: "losses",
                    sortable: true,
                    width: 80,
                    minWidth: 80
                },
                {
                    headerName: "AVG Return",
                    field: "avg_return",
                    sortable: true,
                    width: 80,
                    minWidth: 80
                },
                {
                    headerName: "AVG Profit",
                    field: "win_rate",
                    sortable: true,
                    width: 80,
                    minWidth: 80
                },
                {
                    headerName: "AVG Loser",
                    field: "win_rate",
                    sortable: true,
                    width: 80,
                    minWidth: 80
                },
                {
                    headerName: "",
                    width: 150,
                    field: 'url',
                    cellRenderer: viewDetailsColDefinition,
                    minWidth: 100
                },
            ];

            // Methods for hightcharts data
            this.fetchChartColumnData();
            this.fetchChartLineData();
            this.setChartSeries();

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
                let gridWidth = document.getElementById("grid-wrapper").offsetWidth;
                let columnsToShow = [];
                let columnsToHide = [];
                let totalColsWidth = 0;
                let allColumns = params.columnApi.getAllColumns();

                for (let i = 0; i < allColumns.length; i++) {
                    let column = allColumns[i];
                    totalColsWidth += column.getMinWidth();
                    if (totalColsWidth > gridWidth) {
                        if (column.colId !== 'url') {
                            columnsToHide.push(column.colId);
                        }
                    }
                }
                // let urlColumn = allColumns[allColumns.length-1];
                // columnsToShow.push(urlColumn.colId);
                // columnsToShow.splice("0", 1);
                console.log(columnsToShow);
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
                this.chartColumnsData = Array.from({length: 32}, () => Math.floor(Math.random() * 40));
            },

            /**
             * Get data for chart line
             */
            fetchChartLineData() {
                // TODO: Use the service or API here
                // The code below is for demo purpose
                this.chartLineData = Array.from({length: 32}, () => Math.floor(Math.random() * 40));
            },

            /**
             * Set the series to be used in the highcharts
             */
            setChartSeries() {
                this.chartSeries = [
                    {
                        type: 'column'.toLowerCase(),
                        data: this.chartColumnsData
                    },
                    {
                        type: 'line'.toLowerCase(),
                        data: this.chartLineData
                    }
                ];
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
     * Render the CustomProgress Bar for Efficiency column
     * @param params
     * @returns {string}
     */
    function efficiencyBarColDefinition(params) {
        /* This code is for demo purposes */
        /* TODO: Set the correct label below, depend on the status value. */
        return '<b-progress height="7px" :value="74" class="mb-1 green"></b-progress>';
    }
    /**
     * Render the HTML value with text highlighted
     * @param params
     * @returns {string}
     */
    function highlightColDefinition(params) {
        return "<span class='text-highlight-success text-bolder'>" + params.value + "</span>";
    }

    /**
     * Render the HTML for row link
     * @param params
     * @returns {string}
     */
    function viewDetailsColDefinition(params) {
        return "<a class='text-silent text-bolder' href='javascript:void()'>" +
            "VIEW REPORT &nbsp;&nbsp;<i class=\"fa fa-arrow-right\"></i>" +
            "</a>";
    }

    /* Clicking on Ag-grid rows */
    document.getElementsByClassName("ag-row").onclick = function () {
        location.href = void (0);
    }
</script>

<style lang="scss">
    @import '../../assets/scss/partials/ag-grid-custom';
</style>

