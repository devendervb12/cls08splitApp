
sap.ui.core.UIComponent.extend("com.emax.product.Component", {
	metadata : {
		manifest : "json"
	},
	init : function(){
		sap.ui.core.UIComponent.prototype.init.apply(this);
		
		this.getRouter().initialize();
		
	}
})