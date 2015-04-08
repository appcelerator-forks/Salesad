var args = arguments[0] || {};
var nav = Alloy.Globals.navMenu;

/** google analytics**/ 
Alloy.Globals.tracker.trackEvent({
	category: "settings",
	action: "view",
	label: "settings",
	value: 1
});
Alloy.Globals.tracker.trackScreen("Settings Main");

/**Set Custom title**/
var custom = Ti.UI.createLabel({ 
    text: 'SETTINGS', 
    color: '#CE1D1C', 
    width: Ti.UI.SIZE 
 });
  
$.setting.titleControl = custom;

function generateSettingTable(){
	var tbl_data = [
	    { title: 'About', hasChild:true},
		{ title: 'Help', hasChild:true },
		{ title: 'Privacy and Terms', hasChild:true },
		{ title: 'Text Size', hasChild:true },
		{ title: 'Push Notification', hasChild:true }
	];

	var fontSizeClasses = (Ti.App.Properties.getString("fontSizeClasses"))?Ti.App.Properties.getString("fontSizeClasses"):"normal_font";
 
	var RegTable = Titanium.UI.createTableView({
		width:'100%',
		separatorColor: '#ffffff' ,
		scrollable: false
	});

	var regData=[];
	for (var j=0; j< tbl_data.length; j++) {

	   var regRow = Titanium.UI.createTableViewRow({
		    touchEnabled: true,
		    height: 50, 
		    id: "profile",
		    selectedBackgroundColor: "#FFE1E1",
			backgroundGradient: {
		      type: 'linear',
		      colors: ['#FEFEFB','#F7F7F6'],
		      startPoint: {x:0,y:0},
		      endPoint:{x:0,y:50},
		      backFillStart:false},
		  });

		var title = $.UI.create('label', {
			text: tbl_data[j].title , 
			classes: [fontSizeClasses],
			color: "#848484",
			width:'auto',
			textAlign:'left',
			left:20,
		});

		var rightRegBtn =  Titanium.UI.createImageView({
			image:"/images/btn-forward.png",
			width:15,
			height:15,
			right:20,
			top:20
		});		

		regRow.add(title);
		regRow.add(rightRegBtn);
		regData.push(regRow);
	}

	RegTable.setData(regData); 
	//$.setting.removeAllChildren();
	$.setting.add(RegTable);
}

/* Event Listener */
$.setting.addEventListener("close", function(){
    $.destroy();
});

$.setting.addEventListener('click', function(e){
	if(e.index == 0){
		var win = Alloy.createController("about").getView(); 
		nav.openWindow(win,{animated:true});
	}
	if(e.index == 1){
		var win = Alloy.createController("help").getView();  
		nav.openWindow(win,{animated:true});
	}
	if(e.index == 2){
		var win = Alloy.createController("tnc").getView(); 
		nav.openWindow(win,{animated:true});
	}

	if(e.index == 3){
		var win = Alloy.createController("textSizeSetting").getView(); 
		nav.openWindow(win,{animated:true});
	}

	if(e.index == 4){
		var win = Alloy.createController("pushNotificationSettings").getView();  
		nav.openWindow(win,{animated:true});
	}
});


/* Function */
var fontReset = function(){
	$.setting.removeAllChildren();
	generateSettingTable();
};

$.btnBack.addEventListener('click', function(){ 
	nav.closeWindow($.setting); 
}); 

Ti.App.addEventListener('app:fontReset', fontReset);
/* App Running */
// alternatively, you could do
generateSettingTable();
tbl_data = null;
table = null;