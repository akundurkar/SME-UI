require.config({
  shim: {
    bootstrap: {
      deps: ['jquery'],
      exports: 'jquery'
    },
    commonUtil:{
    	deps: ['backbone']
    },
    underscore: {
        exports: '_'
    }
  },
  
  //urlArgs: "bust=" + (new Date()).getTime(),
  
  urlArgs: "bust=v1",
  
  paths: {
	fileDownloadJS: "../js/jqueryfileDownload",
	bootstrap: '../js/bootstrap-sass-official/assets/javascripts/bootstrap',
	jquery: '../js/jquery/dist/jquery',
	moment: '../js/plugin/moment/moment.min',
	jqueryfullcalendar: '../js/plugin/fullcalendar/jquery.fullcalendar.min',
    dropzone: '../js/plugin/dropzone/dropzone-amd-module.min',
    backbone: '../js/backbone/backbone',
    underscore: '../js/underscore/underscore',
    text:'../js/requirejs-text/text',
    gritter:"../js/plugin/gritter/jquery.gritter.min",
    datatables:'../js/plugin/datatables/jquery.dataTables.min',
    dataTablescolVis:'../js/plugin/datatables/dataTables.colVis.min',
    dataTablestableTools:'../js/plugin/datatables/dataTables.tableTools.min',
    dataTablesbootstrap:'../js/plugin/datatables/dataTables.bootstrap.min',
    datatablesresponsive:'../js/plugin/datatable-responsive/datatables.responsive.min',
    intlTelInput:'../js/intlTelInput',
    
    commonUtil: "models/commonUtils"}
});

require([    
  'backbone',
  'routes/router',
  'commonUtil',
  '../js/json!constants/constants.json',
  
], function (Backbone,Router,CommonUtil,ConstantJson) {
	var spinner = new Spinner().spin();
	$('#adSpinner').html(spinner.el);
	$.ajaxSetup({ cache: true });
	Constants=ConstantJson;
	CommonUtils=CommonUtil;
	router=new Router();
    Backbone.history.start();
});
