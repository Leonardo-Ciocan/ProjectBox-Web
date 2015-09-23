var React = require("react");
var RaisedButton = require('material-ui/lib/raised-button');
    var FlatButton = require('material-ui/lib/flat-button');
    var AppBar = require('material-ui/lib/app-bar');
    var IconButton = require('material-ui/lib/icon-button');
    var FontIcon = require('material-ui/lib/font-icon');
    var Tabs = require('material-ui/lib/tabs/tabs');
    var Tab = require('material-ui/lib/tabs/tab');
    var ThemeManager =  require('material-ui/lib/styles').ThemeManager;
    var themeManager = new ThemeManager();
    var Paper = require("material-ui/lib/paper");
    var DropDownIcon = require("material-ui/lib/drop-down-icon");
    var Toolbar = require("material-ui/lib/toolbar/toolbar");
    var ToolbarGroup = require("material-ui/lib/toolbar/toolbar-group");
    var ToolbarSeparator = require("material-ui/lib/toolbar/toolbar-separator");
    var FloatingActionButton = require("material-ui/lib/floating-action-button");
    var BoxItemList= require("./js/BoxItemList");
    var MenuItem = require('material-ui/lib/menus/menu-item');
    var IconMenu = require('material-ui/lib/menus/icon-menu');
    var LeftNav = require('material-ui/lib/left-nav');
    var MenuDivider = require('material-ui/lib/menus/menu-divider');

$(document).ready(function() {
    console.log("hey");

    $("#add-structure").click(function(){
        window.app.addItem();
    });

    $("#add-box").click(function(){
       window.location ="/createbox/";
    });

    $(".big-box").click(function(){
                    window.location = "/b/" + $(this).attr("id");
    });

    $(".big-box-new").click(function(){
        window.location="/createbox/";
    });


});


themeManager.component.appBar.height = 48;
var CustomTheme = {
    getPalette() {
        return {
            primary1Color:  "#2368d2",
            accent1Color: "#2368d2"
        };
    },
    getComponentThemes(palette){
        return {
            appBar: {
                height: 48
            }
        }
    }
};
themeManager.setTheme(CustomTheme);

var IndexPage = React.createClass({
    contextTypes: {
                router:React.PropTypes.func
        },


        childContextTypes: {
            muiTheme:React.PropTypes.object
        },
        getChildContext:function() {
            return {
                muiTheme: themeManager.getCurrentTheme()
            };
        },
    addItem:function(){

    },
    logout:function(){
        window.location = "/logout/";
    },
    userClicked:function(){
      this.refs.leftNav.toggle();
    },
    navClick:function(e,i,item){
        item.action();
    },
    render:function(){
        menuItems = [
              {  text: 'Settings' },
              {  text: 'Help' },
              {  text: 'Feedback' },
              { type: "SUBHEADER", text: '' },
              {  text: 'Log out' , action:function(){window.location = "/logout/"} }

            ];
        return(
            <div>
                <AppBar
                        style={
                            {
                                height:"40px"
                            }
                        }
                        title="Project Box"
iconElementLeft={<div/>}
                     iconElementRight={
                        <FlatButton label={user} onClick={this.userClicked}/>}>
                    </AppBar>
                    <LeftNav ref="leftNav" onChange={this.navClick} docked={false} menuItems={menuItems} />
            </div>
        )
    }
});

React.render(<IndexPage/> , document.getElementById("base"));