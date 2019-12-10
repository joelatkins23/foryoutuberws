<template>
  <div class="profile-inner-container">
    <SideBar :optionSelected="'invoices'"/>
    <div class="profile-inner-body">
      <div class="profile-inner-body-container">
        <span class="title">Invoices</span>
        <div id="grid-wrapper" style="width: 100%; height: 100%; max-width: 95%;">
          <ag-grid-vue class="ag-theme-material"
                        :gridOptions="gridOptions"
                        :cacheQuickFilter="true"
                        rowSelection="single"
                        :rowData="rowData"
                        @grid-size-changed="onGridSizeChanged"
                        :enableSorting="true"                            
                        >
          </ag-grid-vue>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import SideBar from './SideBar'
import { AgGridVue } from 'ag-grid-vue'

export default {
  name: 'Invoices',
  components: {
    SideBar,
    AgGridVue
  },
  data () {
    return {
      gridOptions: null,
      columnDefs: null,
      rowData: [{
        "date": "MAY 18, 2018",
        "plan": "PREMIUM",
        "action": "UPGRADED",
        "expiration": "UPGRADED",
        "orderid": "ADMIN 2019/12/1213:35:48",
        "subscriptionrate": "$49.95",
      },{
        "date": "MAY 18, 2018",
        "plan": "PREMIUM",
        "action": "UPGRADED",
        "expiration": "UPGRADED",
        "orderid": "ADMIN 2019/12/1213:35:48",
        "subscriptionrate": "$49.95",
      },{
        "date": "MAY 18, 2018",
        "plan": "PREMIUM",
        "action": "UPGRADED",
        "expiration": "UPGRADED",
        "orderid": "ADMIN 2019/12/1213:35:48",
        "subscriptionrate": "$49.95",
      },{
        "date": "MAY 18, 2018",
        "plan": "PREMIUM",
        "action": "UPGRADED",
        "expiration": "UPGRADED",
        "orderid": "ADMIN 2019/12/1213:35:48",
        "subscriptionrate": "$49.95",
      },{
        "date": "MAY 18, 2018",
        "plan": "PREMIUM",
        "action": "UPGRADED",
        "expiration": "UPGRADED",
        "orderid": "ADMIN 2019/12/1213:35:48",
        "subscriptionrate": "$49.95",
      },{
        "date": "MAY 18, 2018",
        "plan": "PREMIUM",
        "action": "UPGRADED",
        "expiration": "UPGRADED",
        "orderid": "ADMIN 2019/12/1213:35:48",
        "subscriptionrate": "$49.95",
      },{
        "date": "MAY 18, 2018",
        "plan": "PREMIUM",
        "action": "UPGRADED",
        "expiration": "UPGRADED",
        "orderid": "ADMIN 2019/12/1213:35:48",
        "subscriptionrate": "$49.95",
      },],
      columnDefs: [],
      allColumnDefs: [
          {
              headerName: "DATE",
              field: "date",
              cellRenderer: highlightColDefinition,
              width: 70,
              minWidth: 100,
          }, {
              headerName: "PLAN",
              field: "plan",
              cellRenderer: planColDefinition,
              width: 70,
              minWidth: 100,
          }, {
              headerName: "ACTION",
              field: "action",
              cellRenderer: highlightColDefinition,
              width: 70,
              minWidth: 100,
          }, {
              headerName: "EXPIRATION",
              field: "expiration",
              cellRenderer: highlightColDefinition,
              width: 70,
              minWidth: 100,
          }, {
              headerName: "ORDER ID",
              field: "orderid",
              cellRenderer: highlightColDefinition,
              width: 70,
              minWidth: 200
          },{
              headerName: "SUBSCRIPTION RATE",
              field: "subscriptionrate",
              cellRenderer: highlightColDefinition,
              width: 70,
              minWidth: 150
          }
        ]
    }
  },
  beforeMount() {
      this.gridOptions = {};
      this.gridOptions.headerHeight = 39;
      this.gridOptions.rowHeight = 43;
      this.columnDefs = [];

      this.columnDefs = [...this.allColumnDefs]

  },
  mounted: function() {
    // Attach the class to the container
    document.getElementsByClassName('main')[0].style.marginTop = '0';
    document.getElementsByClassName('container-fluid')[0].classList.add("profile-container");

    this.gridApi = this.gridOptions.api;
    this.gridColumnApi = this.gridOptions.columnApi;
    this.gridOptions.api.setColumnDefs(this.columnDefs)

    this.gridOptions.onDragStopped = this.dragStopped

    this.gridOptions.api.setRowData(this.rowData)
  },
  beforeDestroy: function() {
    document.getElementsByClassName('main')[0].style.marginTop = '10px';
    document.getElementsByClassName('container-fluid')[0].classList.remove("profile-container");
  },
  methods: {
    onGridSizeChanged(params) {

          // this.$nextTick(() => {
          //   this.gridOptions.api.sizeColumnsToFit();
          // });

          //       return;

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
  }
}

function highlightColDefinition(params) {
  return "<span class='plan-text-normal text-bolder'>" + params.value + "</span>";
}

function planColDefinition(params) {
  return "<span class='label plan-style'>" + params.value + "</span>"
}
</script>

<style lang="scss">
  @import '../../assets/scss/partials/ag-grid-custom';
  .plan-text-normal {
    color: #c4c4c4;
    font-size: 14px;
  }
  .plan-style {
    color: #fff;
    background-color: #dfba74;
  }
</style>

<style lang="scss" scoped>

  
  .profile-inner-container {
    display: flex;
    flex-direction: row;
    flex: 1;
  }
  
  .profile-inner-body {
    display: flex;
    flex-direction: column;
    flex: 1;

    .profile-inner-body-container {

      padding: 20px 50px 0;

      @media (max-width: 600px) {
        padding: 15px 15px;
      }

      @media (max-width: 768px) {
        text-align: center;
      }

      .title {
        font-size: 22px;
        font-weight: 600;
        font-style: normal;
        font-stretch: normal;
        line-height: 1.36;
        margin-bottom: 23px;
        display: inline-block;
      }
    }

  }

  div > .dashboard-widget-container {
    flex: none;
    max-width: 500px;
    text-align: left;

    @media (max-width: 768px) {
      margin: 15px auto 0;
    }
  }

  div > .dashboard-widget-body {
    padding-left: 55px;
    padding-right: 55px;
    padding-top: 30px;
    padding-bottom: 15px;

    transition: padding 0.3s;

    @media (max-width: 600px) {
      padding-left: 25px;
      padding-right: 25px;
    }
  }
</style>
