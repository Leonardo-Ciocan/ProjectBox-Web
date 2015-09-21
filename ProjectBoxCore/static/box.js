box._data = box._data || [];
console.log("starting");
    var injectTapEventPlugin = require("react-tap-event-plugin");
    injectTapEventPlugin();


    var React = require('react');

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

themeManager.component.appBar.height = 48;
var CustomTheme = {
    getPalette() {
        return {
            primary1Color: box.color || "#00CC00",
            accent1Color: box.color || "#00CC00"
        };
    },
    getComponentThemes(palette){
        return {
            appBar: {
                height: 48
            }
        }
    }
    //getComponentThemes(palette) {
    //    return {
    //        appBar: {
    //            color: String,
    //            textColor: String,
    //            height: Number
    //        },
    //        button: {
    //            height: Number,
    //            minWidth: Number,
    //            iconButtonSize: Number
    //        },
    //        checkbox: {
    //            boxColor: String,
    //            checkedColor: String,
    //            requiredColor: String,
    //            disabledColor: String,
    //            labelColor: String,
    //            labelDisabledColor: String
    //        },
    //        datePicker: {
    //            color: String,
    //            textColor: String,
    //            calendarTextColor: String,
    //            selectColor: String,
    //            selectTextColor: String,
    //        },
    //        dropDownMenu: {
    //            accentColor: String,
    //        },
    //        flatButton: {
    //            color: String,
    //            textColor: String,
    //            primaryTextColor: String,
    //            secondaryTextColor: String,
    //            disabledColor: String
    //        },
    //        floatingActionButton: {
    //            buttonSize: Number,
    //            miniSize: Number,
    //            color: String,
    //            iconColor: String,
    //            secondaryColor: String,
    //            secondaryIconColor: String,
    //            disabledColor: String,
    //            disabledTextColor: String
    //        },
    //        leftNav: {
    //            width: Number,
    //            color: String,
    //        },
    //        menu: {
    //            backgroundColor: String,
    //            containerBackgroundColor: String,
    //        },
    //        menuItem: {
    //            dataHeight: Number,
    //            height: Number,
    //            hoverColor: String,
    //            padding: Number,
    //            selectedTextColor: String,
    //        },
    //        menuSubheader: {
    //            padding: Number,
    //            borderColor: String,
    //            textColor: String,
    //        },
    //        paper: {
    //            backgroundColor: String,
    //        },
    //        radioButton: {
    //            borderColor: String,
    //            backgroundColor: String,
    //            checkedColor: String,
    //            requiredColor: String,
    //            disabledColor: String,
    //            size: Number,
    //            labelColor: String,
    //            labelDisabledColor: String
    //        },
    //        raisedButton: {
    //            color: String,
    //            textColor: String,
    //            primaryColor: String,
    //            primaryTextColor: String,
    //            secondaryColor: String,
    //            secondaryTextColor: String,
    //            disabledColor: String,
    //            disabledTextColor: String
    //        }
    //    }
    //}
};

themeManager.setTheme(CustomTheme);


    var BoxPage = React.createClass({
        contextTypes: {
                router:React.PropTypes.func
        },

       getInitialState: function(){
            return {items: this.props.data};
        },
        childContextTypes: {
            muiTheme:React.PropTypes.object
        },
        getChildContext:function() {
            return {
                muiTheme: themeManager.getCurrentTheme()
            };
        },
        componentDidMount:function(){

        },
        showProperties:function(){
            event.stopPropagation();
            $(".box-panel").animate({ "right": "0px" }, 300);
        },
        onHome:function(){
            window.location = "/";
        },
        sideBarClick:function(event){
            event.stopPropagation();
        },

	addItem: function(){
        var item = {};
        box._data.push(item);
        $.post("/box/",{
                   "csrfmiddlewaretoken" : getCookie('csrftoken'),
                   id : box._id["$oid"]
               },
               function(dt){
                    if(dt!=undefined)
                        item._id = {"$oid":dt};
                   		this.setState({items: this.state.data});

               }.bind(this)
        );
	},
        logout:function(){
            window.location="/logout/";
        },
        render: function(){
            console.log(this.props.box);
            var mainStyle={
                position:"relative",
                width:"100%",
                height:"100%"
            };
            var containerStyle ={
                position:"absolute",
                top:"100px",
                bottom:0,
                left:0,
                right:0
            };
            var iconMenuItems = [
              { payload: '1', text: 'Download' },
              { payload: '2', text: 'More Info' }
            ];
            return (
                <div style={mainStyle}>

                    <AppBar
                        style={
                            {
                                height:"40px"
                            }
                        }
                        title={this.props.data.name}
                     iconElementLeft={<IconButton iconClassName="material-icons" onClick={this.onHome}>arrow_back</IconButton>}
                     iconElementRight={
                        <div>
                            <h1 className="username" >{user} </h1>
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
                          <RaisedButton label="Add new item" primary={true} onClick={this.addItem} />

                      </ToolbarGroup>
                      <ToolbarGroup key={1} float="right">
                          <FlatButton label="Box options" onClick={this.showProperties} />

                      </ToolbarGroup>
                    </Toolbar>

                    <div style={containerStyle}>
                        <BoxItemList data={this.state.items} structure={box.structure} filter={this.props.filter}/>
                   </div>

                    <div className="box-panel" onClick={this.sideBarClick}>
                        <Paper style={{height:"100%"}}>
                            <SideBarHeader/>
                            <MemberList members={box.members}/>
                        </Paper>
                    </div>
                </div>

            );
        }
});


$(document).ready(function(){
    $("#add-item").click(function(){
       window.app.addItem();
        $("html, body").animate({ scrollTop: $(document).height() }, "slow");
    });

    var textRegex = /(.+) is (.+)/g;
    $(".search").keypress(function(e) {
        if(e.which == 13) {
            if($(this).val() == ""){
                //React.render(
                //        <App filter=""/>,
                //        document.getElementById('container')
                //    );
            }else{
                var data = (textRegex.exec($(this).val()));
                if (data != null){
                    if(data.length > 0) {
                        //React.render(
                        //    <App filter={data}/>,
                        //    document.getElementById('container')
                        //);
                    }
                }
            }


        }
    });



    if(box.members == undefined) box.members = [];







    var base =$("#base");

    console.log(themeManager.getCurrentTheme());

    console.log(box);
    React.render(
        <BoxPage box={box} filter="" data={box}/>,
        document.getElementById('base'));


});


var App = React.createClass({
    componentDidMount:function(){
       window.app = this;
    },
   getInitialState: function(){
		return {items: this.props.data};
	},
	addItem: function(){
        var item = {};
        box._data.push(item);
        $.post("/box/",{
                   "csrfmiddlewaretoken" : getCookie('csrftoken'),
                   id : box._id["$oid"]
               },
               function(dt){
                    if(dt!=undefined)
                        item._id = {"$oid":dt};
                   		this.setState({items: this.state.data});

               }.bind(this)
        );
	},
    update:function(){
        this.setState({items: this.props.data});
    },
	render: function(){
        var k = unique();
		return (
			<BoxItemList key={k} data={this.state.items} structure={box.structure} filter={this.props.filter}/>
		);
	}
});

var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;


var SideBarHeader = React.createClass({
    getInitialState:function(){
      return {name:""}
    },
    componentDidMount:function(){
        $.get("/userinfo/",
            {
                id: box.creator
            },
            function(data){
                this.setState({name:data});
            }.bind(this)
        )
    },
    addMember:function(e){
      if(e.keyCode == 13) {
            $.post("/contributor/",
                {
                    "csrfmiddlewaretoken" : getCookie('csrftoken'),
                     username : e.target.value,
                     id : box._id["$oid"]
                },
                function(e){
                    box.members.push(e);
                    React.render(
                      <MemberList members={box.members}/>,
                      document.getElementById('contributors')
                    );

                }
            );
        }
    },
    render:function(){
                return(
                    <div>
                        <h1 className="side-panel-header" style={{"text-align":"center"}}>{ box.name }</h1>
                        <h4  style={{"text-align":"center"}}>Created by <span style={{color:"dodgerblue"}}>{this.state.name}</span></h4>
                        <h4 style={{color:"gray" , marginTop:"30px"}}>Contributors:</h4>

                        <input id="add-member" type="text" placeholder="Enter username of contributor"
                               className="form-control  floating-label" onKeyDown={this.addMember} />
                    </div>
                )
    }
});

var MemberList = React.createClass({
    componentDidMount:function(){

    },
    render:function(){
        var content = this.props.members.map(function(item){
            return (
                <MemberItem id={item} key={item}/>
            )
        });
        console.log(content);
        return (
            <div>{content}</div>
        );
    }
});

var MemberItem = React.createClass({
    getInitialState:function(){
      return {name:""}
    },
    componentDidMount:function(){
        $.get("/userinfo/",
            {
                id:this.props.id
            },
            function(data){
                this.setState({name:data});
            }.bind(this)
        )
    },
    render:function(){
        return (
            <h4>{this.state.name}</h4>
        );
    }
});


function generateFilter(input){

}