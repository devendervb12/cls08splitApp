sap.ui.controller("com.emax.product.controller.ProductDetails", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf view.ProductDetails
*/
	onInit: function() {
			// get Router 
		var oRouter = this.getOwnerComponent().getRouter();
		
		var oRoute = oRouter.getRoute("toDetails");
		
		oRoute.attachPatternMatched(function(oEvent){
			
			var selectedTitle = oEvent.getParameters().arguments.title;
			
			//calling odata service and retriving selected product data into View
			this.getView().bindElement("/Products("+selectedTitle+")");
			
		}, this);
	},

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf view.ProductDetails
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf view.ProductDetails
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf view.ProductDetails
*/
//	onExit: function() {
//
//	}
	onCreate : function(){
       var oDialog = new sap.m.Dialog({
    	   title : "Provide Product Entries",
    	   content : [
    		   new sap.m.Label({ text : "ID"}),
    		   new sap.m.Input(),
    		   new sap.m.Label({ text : "Name"}),
    		   new sap.m.Input(),
    		   new sap.m.Label({ text : "Description"}),
    		   new sap.m.Input(),
    		   new sap.m.Label({ text : "ReleaseDate"}),
    		   new sap.m.DatePicker(),
    		   new sap.m.Label({ text : "Rating"}),
    		   new sap.m.Input(),
    		   new sap.m.Label({ text : "Price"}),
    		   new sap.m.Input()
    	   ],
    	   buttons : [
    		   new sap.m.Button({ text : "Save and Close", press : function(){
    			// collect data
    			var data = {
    					ID : oDialog.getContent()[1].getValue(),
    					Name : oDialog.getContent()[3].getValue(),
    					Description : oDialog.getContent()[5].getValue(),
    					ReleaseDate : oDialog.getContent()[7].getValue(),
    					Rating : oDialog.getContent()[9].getValue(),
    					Price : oDialog.getContent()[11].getValue()
    			}
    			// save to odata
    			var oModel = oDialog.getModel();
    			
    			oModel.create("/Products", data, {
    				success : function(){
    					sap.m.MessageToast.show("Data Created");
    					
    				},
    				error : function(){
    					sap.m.MessageToast.show("Data Not Created");
    				}
    			});
    			
    			//close dialog
    			   oDialog.close();  
    			   
    		   }
    		   
    		   })
    	   ]
       });
       
       // hi dialog get model of component
       oDialog.setModel(this.getOwnerComponent().getModel());
       
       oDialog.open();
	},
	onUpdate : function(){
		var oController = this;
		var oDialog = new sap.m.Dialog({
			title : "Update Name",
			content : [
				   new sap.m.Label({ text : "ID"}),
	    		   new sap.m.Input({ value : oController.getView().byId("prodID").getText(),editable : false}),
	    		   new sap.m.Label({ text : "Name"}),
	    		   new sap.m.Input({ value : oController.getView().byId("prodName").getText()})
			],
			buttons : [
				new sap.m.Button({ text : "Update and Close", press : function(){
					// data
					var data = {
							Name : oDialog.getContent()[3].getValue()
					}
					//update
					var oModel = oDialog.getModel();
					
					var pid = oController.getView().byId("prodID").getText();
					
					var upDatePath = "/Products("+pid+")";
					oModel.update(upDatePath, data, {
						success : function(){
	    					sap.m.MessageToast.show("Data Updated");
	    					
	    				},
	    				error : function(){
	    					sap.m.MessageToast.show("Data Not Updated");
	    				}
					})
					//close
					oDialog.close();
				}})
			]
		});
			oDialog.setModel(this.getOwnerComponent().getModel());
	       oDialog.open();
		
	},
	onDelete : function(){
		var pid = this.getView().byId("prodID").getText();
		this.getOwnerComponent().getModel().remove("/Products("+pid+")")
	}
	

});

