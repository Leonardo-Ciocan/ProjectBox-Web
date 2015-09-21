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
        window.location="/createbox/";
    },
    logout:function(){
        window.location = "/logout/";
    },
    render:function(){
        return(
            <div>
                <AppBar
                        style={
                            {
                                height:"40px"
                            }
                        }
                        title="Project Box"

                     iconElementRight={
                        <div>
                            <h1 className="username" > {user} </h1>
<div  className="username"  ><IconMenu iconButtonElement={<IconButton iconClassName="material-icons" tooltipPosition="bottom-center"
  tooltip="Sky">keyboard_arrow_down</IconButton>}>
  <MenuItem primaryText="Send feedback" />
  <MenuItem primaryText="Settings" />
  <MenuItem primaryText="Help" />
  <MenuItem primaryText="Sign out" onClick={this.logout}/>
</IconMenu>     </div>                   </div>
                        }>
                    </AppBar>
                    <Toolbar>
                      <ToolbarGroup key={0} float="left">
                          <RaisedButton label="Create box" primary={true} onClick={this.addItem} />

                      </ToolbarGroup>
                      <ToolbarGroup key={1} float="right">


                      </ToolbarGroup>
                    </Toolbar>
            </div>
        )
    }
});

React.render(<IndexPage/> , document.getElementById("base"));