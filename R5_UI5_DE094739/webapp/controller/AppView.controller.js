sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast",
	"sap/ui/model/json/JSONModel"
], function (Controller, MessageToast, JSONModel) {
	"use strict";

	return Controller.extend("R5_UI5_DE094739.R5_UI5_DE094739.controller.AppView", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf R5_UI5_DE094739.R5_UI5_DE094739.view.AppView
		 */
		onInit: function () {
			// set data model on view
			var oData = {
				recipient: {
					name: "Test"
				}
			};
			var oModel = new JSONModel(oData);
			this.getView().setModel(oModel);

			$.ajax({
				type: "GET",
				url: "/node/sample",
				async: true,
				dataType: 'json',
				success: function (data, textStatus, request) {
					MessageToast.show(JSON.stringify(data));
					return;
				},
				error: function (jqXHR, textStatus, errorThrown) {
					MessageToast.show(JSON.stringify(errorThrown));
					return;
				}
			});
//BSP:
/*			$.ajax({
				type: "POST",
				url: "/node/pwcTeamApp/teams/createTeam/",
				async: true,
				data: JSON.stringify(body),
				contentType: "application/json",
				headers: {
					"x-csrf-token": getCSRFToken()
				},
				success: function (data, textStatus, request) {
					MessageBox.information(JSON.stringify(data));
					return;
				},
				error: function (jqXHR, textStatus, errorThrown) {
					MessageBox.error(JSON.stringify(errorThrown));
					return;
				}
			});*/
		},

		onShowHello: function () {
			// show a native JavaScript alert
			MessageToast.show(this.getView().getModel().getProperty("/recipient/name"));

		},

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf R5_UI5_DE094739.R5_UI5_DE094739.view.AppView
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf R5_UI5_DE094739.R5_UI5_DE094739.view.AppView
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf R5_UI5_DE094739.R5_UI5_DE094739.view.AppView
		 */
		//	onExit: function() {
		//
		//	}

	});

});