/*global define*/

define(
		[ 'jquery', 'dropzone', 'intlTelInput', '../models/commonModel',
				'../collections/commonCollection',

				'text!../templates/layout.html',
				'text!../templates/setup/ownerInfo.html',
				'text!../templates/header.html', 'text!../templates/left.html',
				'text!../templates/footer.html', 'text!../templates/home.html',
				'text!../templates/messages/generic_message.html',

				'views/blankScreenView', 'views/setupView',
				'views/clientsView', 'views/orderStatusView',
				'views/dashBoardView', 'views/servicesView', 'views/staffView',
				'views/bookOrderView', 'views/onlineBookView',
				'views/campaignManagerView', 'views/calendarView',
				'views/salesView', 'datatables', 'dataTablescolVis',
				'dataTablestableTools', 'datatablesresponsive'

		],
		function($, DropZone, I1, CommonModel, CommonCollection,
				layoutTemplate, OwnerInfoTemplate, headerTemplate,
				leftTemplate, footerTemplate, homeTemplate,
				genericMessageTemplate, BlankScreenView, SetupView,
				ClientsView, OrderStatusView, dashBoardView, ServicesView,
				StaffView, BookOrderView, onlineBookView, CampaignManagerView,
				CalendarView, SalesView, D1, D2, D3, D4) {

			var LayoutView = Backbone.View
					.extend({

						events : {
							"click #branchChange" : "renderDefault",
							"click #clients" : "clients_info",
							"click #orderStatus" : "orderStatus",
							"click #services" : "services",
							"click #staff" : "staff",
							"click #bookOrder" : "bookOrder",
							"click #blankScreen" : "blank_screen",
							"click #setup" : "setup",
							"click #dashBoard" : "dashBoard",
							"click #onlineBook" : "onlineBook",
							"click #campaignManager" : "campaignManager",
							"click #shedule" : "shedule",
							"click #contact" : "contact",
							"click #feedback" : "feedback",
							"click #calendarBtn" : "calendarBtn",
							"click #salesBtn" : "salesBtn",
							"click #companyProfileDetails" : "companyProfileDetails",
							"click #saveOwnerDetailsBtn" : "saveOwnerDetailsBtn",
							"click #saveCompanyProfileBtn" : "saveCompanyProfileBtn",
							"click #saveLocationProfileBtn" : "saveCompanyLocationBtn",
							"click #dateWiseOrder" : "dateWiseOrder",
							"click #weekWiseOrder" : "weekWiseOrder",
							"click #monthWiseOrder" : "monthWiseOrder"
						},

						initialize : function() {

							this.collection = new CommonCollection();
							this.locationCollection = new CommonCollection();
							this.saveOwnerDetailsModel = new CommonModel();
							this.businessTypeCollection = new CommonCollection();

						},

						companyProfileDetails : function() {
							new SetupView().companyProfileDetails();
						},

						dateWiseOrder : function() {
							new OrderStatusView().dateWiseOrder();
						},

						weekWiseOrder : function() {
							new OrderStatusView().weekWiseOrder();
						},

						monthWiseOrder : function() {
							new OrderStatusView().monthWiseOrder();
						},

						getAllBranches : function() {

							var me = this;

							me.locationCollection.url = CommonUtils
									.get("projectUrl")
									+ "/rest/branch/list?userId="
									+ CommonUtils.getUser("userId");

							me.locationCollection.fetch({

								cache : false,

								success : function(model, response, options) {

									me.renderDefault();

								},

								error : function(model, xhr, options) {

								}

							});

						},

						renderDefault : function() {

							var me = this;
							/*
							 * var target =
							 * document.getElementById("listSpinner");
							 * me.spinner = new Spinner();
							 * me.spinner.spin(target);
							 */
							/*
							 * Setting Undefined Branch to avoid Cache Branch
							 * Problem
							 */
							var branch;
							if (typeof (CommonUtils.getBranch("branchId")) === "undefined") {
								CommonUtils.setBranch(branch);
							}
							var renderData = {

								organisationType : CommonUtils
										.getUser("organisationType"),
								role : CommonUtils.getUser("userroles")
							}

							var headerData = {

								locationList : me.locationCollection.models
							}

							// console.log(CommonUtils.getUser("organisationType"));

							var leftNav = _.template(leftTemplate);

							var header = _.template(headerTemplate);

							$("#mainBody")
									.html(
											$(this.el).html(
													_.template(layoutTemplate)));

							$("#showADheader").append(header(headerData));

							$("#showADLeftMenu").append(leftNav(renderData));

							$("#showADFooter").append(
									_.template(footerTemplate));

							$("#showADMain").append(_.template(homeTemplate));

							this.delegateEvents();
							// me.spinner.stop();
						},

						getAllBusinessType : function(values) {

							var me = this;

							me.businessTypeCollection.url = CommonUtils
									.get("projectUrl")
									+ "/rest/getAllBusinessType";

							console.log(me.businessTypeCollection);

							me.businessTypeCollection.fetch({

								cache : false,

								success : function(model, response, options) {

									me.renderSpecial(values);

								},
								error : function(model, xhr, options) {

									me.renderUsersNotFoundTemplate();

								}

							});
						},

						renderSpecial : function(values) {

							// console.log("value"+value);

							var me = this;

							var renderData = {

								organisationType : CommonUtils
										.getUser("organisationType"),
								role : CommonUtils.getUser("userroles")
							}

							var businessTypeData = {

								businessTypeList : me.businessTypeCollection.models

							}

							var businessType = _.template(OwnerInfoTemplate);

							// console.log(renderData.toSource());

							var leftNav = _.template(leftTemplate);

							$("#mainBody")
									.html(
											$(this.el).html(
													_.template(layoutTemplate)));
							// $("#showADheader").append(_.template(headerTemplate));
							/* $("#showADMain").append(_.template(OwnerInfoTemplate)); */
							$("#showADMain").append(
									businessType(businessTypeData));

							$("#showADFooter").append(
									_.template(footerTemplate));

							var profileStatus = CommonUtils
									.getUser("profileCompletion");
							console.log("profile status" + profileStatus);
							if (profileStatus >= 50) {
								console.log("profile status" + profileStatus);
								$("#company-owner-detail-form").hide();
								$("#company-firstLocation-form").hide();
								if (profileStatus < 100 && profileStatus >= 75) {
									$("#company-detail-form").hide();
									$("#company-firstLocation-form").show();
								}
							} else {
								$("#company-detail-form").hide();
								$("#company-firstLocation-form").hide();
							}

							$("#officephone")
									.intlTelInput(
											{
												// allowExtensions: true,
												// autoFormat: false,
												autoHideDialCode : false,
												// autoPlaceholder: false,
												// defaultCountry: "auto",
												// ipinfoToken: "yolo",
												nationalMode : false,
												// numberType: "MOBILE",
												// onlyCountries: ['us', 'gb',
												// 'ch', 'ca', 'do'],
												// preferredCountries: ['cn',
												// 'jp'],
												// preventInvalidNumbers: true,
												// utilsScript:
												// "lib/libphonenumber/build/utils.js"
												initialCountry : "auto",
												geoIpLookup : function(callback) {
													$
															.get(
																	'http://ipinfo.io',
																	function() {
																	}, "jsonp")
															.always(
																	function(
																			resp) {
																		var countryCode = (resp && resp.country) ? resp.country
																				: "";
																		callback(countryCode);
																	});
												}
											});

							this.delegateEvents();

						},

						dashBoard : function() {

							new dashBoardView().dashBoard();

						},

						clients_info : function() {

							new ClientsView().getAllClients();

						},

						orderStatus : function() {

							new OrderStatusView().getOrderStatus();

						},

						services : function() {

							new ServicesView().getAllServices();

						},

						staff : function() {

							new StaffView().staff();

						},

						bookOrder : function() {

							new BookOrderView().bookOrder();

						},

						onlineBook : function() {

							new onlineBookView().onlineBook();

						},

						campaignManager : function() {

							new CampaignManagerView().getCampaignManagerList();

						},

						setup : function() {

							new SetupView().blank_screen();

						},

						shedule : function() {

							new SetupView().getScheduleDetail();

						},

						blank_screen : function() {

							new BlankScreenView().blank_screen();

						},

						contact : function() {

							new ClientsView().contact();

						},

						feedback : function() {

							new ClientsView().feedback();

						},

						calendarBtn : function() {

							new CalendarView().getTodaysCalendarAppointments();

						},

						salesBtn : function() {

							new SalesView().getSales();

						},

						logout : function() {

							// console.log("Deleting sessionStorage");

							sessionStorage.clear();

							location.href = "";

							window.location.reload();

						},

						saveOwnerDetailsBtn : function() {

							var me = this;

							var formData = CommonUtils.getFormDataAsJSON(
									"#ownerDetails-form .input", "input");

							me.saveOwnerDetailsModel = new CommonModel(formData);

							me.saveOwnerDetailsModel.set("userId", CommonUtils
									.getUser("userId"));

							me.saveOwnerDetailsModel.url = CommonUtils
									.get("projectUrl")
									+ "/rest/updateOwnerDetails";

							me.saveOwnerDetailsModel
									.save(
											null,
											{

												success : function(model,
														response, options) {

													CommonUtils
															.showSuccessMessage("Owner Details save sucessfully!!");
													$(
															"#company-owner-detail-form")
															.hide();
													$("#company-detail-form")
															.show();
												},

												error : function(model,
														response, options) {

													if (response.status === 500) {

														var template = _
																.template(genericMessageTemplate);

														var renderData = {

															errorMessage : "There was some unexpected error. Please Try again or report the Problem",
														};

														$("#showADMain")
																.html(
																		$(me.el)
																				.html(
																						template(renderData)));

													}
												}

											});

						},

						saveCompanyProfileBtn : function() {

							var me = this;

							var formData = CommonUtils.getFormDataAsJSON(
									"#companyDetails-form .input", "input");

							var companyModel = new CommonModel(formData);

							var businesssCategory = $(
									"#businesssCategory option:selected").val();

							var info = $('#info').val();

							companyModel.url = CommonUtils.get("projectUrl")
									+ "/rest/businessacccontroller/saveCompanyDetails";

							companyModel.set("userId", CommonUtils
									.getUser("userId"));

							companyModel.set("businesssCategory",
									businesssCategory);

							companyModel.set("info", info);
							// var slot_sec1 = $('#slot
							// option:selected').text();

							// console.log(screenModel.toSource());

							companyModel
									.save(
											null,
											{

												success : function(model,
														response, options) {

													CommonUtils
															.showSuccessMessage("Business Details save sucessfully!!");
													$("#company-detail-form")
															.hide();
													$(
															"#company-firstLocation-form")
															.show();

												},

												error : function(model,
														response, options) {

													if (response.status === 500) {

														var template = _
																.template(genericMessageTemplate);

														var renderData = {

															errorMessage : "There was some unexpected error. Please Try again or report the Problem",
														};

														$("#showADMain")
																.html(
																		$(me.el)
																				.html(
																						template(renderData)));

													}
												}

											});

						},

						saveCompanyLocationBtn : function() {

							var me = this;

							var formData = CommonUtils.getFormDataAsJSON(
									"#locationDetails-form .input", "input");

							var branchModel = new CommonModel(formData);

							branchModel.url = CommonUtils.get("projectUrl")
									+ "/rest/branch/addNewBranch";

							branchModel.set("userId", CommonUtils
									.getUser("userId"));

							var gender = $("input[name=gender]:checked").val();
							branchModel.set("gender", gender);

							var shopType = $("input[name=shopType]:checked")
									.val();
							branchModel.set("shopType", shopType);

							var online_bookng_status = $(
									"input[name=online_bookng_status]:checked")
									.val();
							branchModel.set("online_bookng_status",
									online_bookng_status);

							var wiFiAvailable = $(
									"input[name=wiFiAvailable]:checked").val();
							branchModel.set("wiFiAvailable", wiFiAvailable);

							branchModel
									.save(
											null,
											{

												success : function(model,
														response, options) {

													CommonUtils
															.showSuccessMessage("Company Location save sucessfully!!");
													CommonUtils
															.setUser(response);
													me.getAllBranches();

												},
												error : function(model,
														response, options) {

													if (response.status === 500) {

														var template = _
																.template(genericMessageTemplate);

														var renderData = {

															errorMessage : "There was some unexpected error. Please Try again or report the Problem",
														};

														$("#showADMain")
																.html(
																		$(me.el)
																				.html(
																						template(renderData)));

													}
												}

											});

						},

					});

			return LayoutView;

		});