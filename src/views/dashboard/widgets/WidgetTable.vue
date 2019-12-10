<template>
  <div class="dashboard-widget-container">
    <!-- <div class="dashboard-widget-header">
      <h5 class="dashboard-widget-title">Title</h5>
      <button class="dashboard-widget-config-button" @click="configButton">
        <img src="/img/dashboard/gear.svg" alt="" srcset="">
      </button>
    </div> -->
    <div class="dashboard-widget-body" v-show="isLoading">
      <WidgetLoader></WidgetLoader>
    </div> 
    <div class="dashboard-widget-body" v-show="!isLoading">
        <perfect-scrollbar>
            <button class="dashboard-table-config-button" @click="configTableButton">
                <img src="/img/dashboard/gear.svg" alt="" srcset="">
            </button>
            <b-col class="no-padding-right no-padding-left-mobile padding-justify"
              style="width: 100%; height: 89vh;">
              <b-card class="main-cards table-card shadow">
                  <div id="grid-wrapper">
                      <ag-grid-vue class="ag-theme-material"
                                    :gridOptions="gridOptions"
                                    :cacheQuickFilter="true"
                                    rowSelection="multiple"
                                    :rowData="rowData"
                                    @grid-size-changed="onGridSizeChanged"
                                    :enableSorting="true">
                      </ag-grid-vue>
                  </div>
              </b-card>
          </b-col>
        </perfect-scrollbar>
    </div>
  </div>
</template>




<script>
  import WidgetLoader from './WidgetLoader'
  import { AgGridVue } from 'ag-grid-vue'
  import json from '../../reports/data-overview.json'
  import { setTimeout } from 'timers';

  export default {
    name: 'WidgetMisc',
    components: {
      AgGridVue,
      WidgetLoader
    },
    data: function () {
      return {
        isLoading: true,
        gridOptions: null,
        columnDefs: null,
        rowData: json,
        showTable: false
      }
    },
    mounted() {
      this.gridApi = this.gridOptions.api;
      this.gridColumnApi = this.gridOptions.columnApi;
      this.gridOptions.api.setColumnDefs(this.columnDefs)
      this.gridOptions.api.setRowData(this.rowData)

      setTimeout(()=>{
        this.isLoading = false;
      }, 500)

      // setTimeout(_ => {
      //   this.columnDefs.push( {
      //         headerName: "side2",
      //         field: "side2",
      //         cellRenderer: sideColDefinition,
      //         width: 80,
      //         minWidth: 80
      //     })
      //   this.gridOptions.api.setColumnDefs(this.columnDefs)
      //   console.log(1555)
      // }, 2000)

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
              width: 80,
              minWidth: 80
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
  },
    methods: {
      configTableButton: function(event) {
        this.$store.dispatch('toggleWidgetsWindow')
      },
      onGridSizeChanged(params) {

          this.$nextTick(() => {
            this.gridOptions.api.sizeColumnsToFit();
          });

                return;

          var gridWidth = document.getElementById("grid-wrapper").offsetWidth;
          var columnsToShow = [];
          var columnsToHide = [];
          var totalColsWidth = 0;
          var allColumns = params.columnApi.getAllColumns();

          // for (var i = 0; i < allColumns.length; i++) {
          //     let column = allColumns[i];
          //     totalColsWidth += column.getMinWidth();
          //     if (totalColsWidth > gridWidth) {
          //         columnsToHide.push(column.colId);
          //     } else {
          //         columnsToShow.push(column.colId);
          //     }
          // }
          // params.columnApi.setColumnsVisible(columnsToShow, true);
          // params.columnApi.setColumnsVisible(columnsToHide, false);
          params.api.sizeColumnsToFit();
      },

    }
  }

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

</script>


<style lang="scss">
  @import '../../../assets/scss/partials/ag-grid-custom';
</style>
