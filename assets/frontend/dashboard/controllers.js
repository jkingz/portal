(function() {
  'use strict';

  angular
    .module('dashboard.portal')
    .controller('DashBoardController', DashBoardController)
    .controller('asideInvoiceController', asideInvoiceController)
  ;

  /* DashBoardController
   * @ desc: This will displat the list of user invoices
   */
  function DashBoardController($scope, $rootScope, InvoiceService) {
    feather.replace();
    var self = this;
    var order = 'asc';

    self.invoiceService = InvoiceService;
    self.sorting = {
      'customer': false,
      'code': false,
      'due_date': false,
      'status': false,
    };

    //request to the backend
    self.sortBy = function(field, order) {
      var page_number = {"page": self.invoiceService.list.page.number}
      self.invoiceService.getList(page_number, field, order);
    };

    // Sort the display
    self.sort = function (field) {
      feather.replace();
      self.sorting[field] = !self.sorting[field];
      self.order = self.order == 'asc' ? 'desc' : 'asc';

      if(self.order === 'asc') {
        self.sortBy(field, 'asc');
      } else if (self.order === 'desc') {
        self.sortBy(field, 'desc');
      };
    };

    // this will trigger the filter button
    self.onFilterClick = function () {
      $rootScope.isSideBarActive = true;
    };

    $scope.$watch('ctrl.invoiceService.filter', function (newItem, oldItem){
      self.invoiceService.filter = newItem;
    }, true);

  }; // end of DashBoardController

   /* aside Controller
    * @desc: this will display the sidebar for invoice filter
    */
  function asideInvoiceController($scope, $rootScope, InvoiceService) {
    var self = this;
    feather.replace();
    self.invoiceService = InvoiceService;

    self.onsideBarClose = function() {
      $rootScope.isSideBarActive = false;
    };

    self.onSelectFilter = function(data, key) {
      console.log(data, "filtered datas")
      self.invoiceService.filter[key] = data[key];
    };

    self.resetFilter = function() {
      self.invoiceService.filter = {};
      $scope.filter = undefined;
      $scope.filter_due_date = undefined;
      $scope.filter_status = undefined;
      $scope.filter_total_amount = undefined;
    };

  }; // end of asideInvoiceController

})();
