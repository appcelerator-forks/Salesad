var args = arguments[0] || {};
var page = args.page;

function login(e) {
	var win = Alloy.createController("login", {page: page}).getView();
	COMMON.openWindow(win);
}

function register(e) {
	var win = Alloy.createController("register", {page: page}).getView();
	COMMON.openWindow(win);
}

$.policy.addEventListener('touchend', function(e) {
	var win = Alloy.createController("webview", {url: "http://salesad.my/privacyPolicy"}).getView();
	COMMON.openWindow(win);
});
$.tou.addEventListener('touchend', function(e) {
	var win = Alloy.createController("webview", {url: "http://salesad.my/termsOfService"}).getView();
	COMMON.openWindow(win);
});

$.btnBack.addEventListener('click', function() {
	COMMON.closeWindow($.signin_out);
	if(page != "") {
		Ti.App.fireEvent("login_cancel:reward");
	}
});

function closeWindow() {
	COMMON.closeWindow($.signin_out);
}

Ti.App.addEventListener("sign:close", closeWindow);

$.signin_out.addEventListener('android:back', function (e) {
	COMMON.closeWindow($.signin_out);
	if(page != "") {
		Ti.App.fireEvent("login_cancel:reward");
	}
});