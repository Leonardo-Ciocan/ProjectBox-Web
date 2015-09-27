box._data = box._data || [];
console.log("starting");
    var injectTapEventPlugin = require("react-tap-event-plugin");
    injectTapEventPlugin();


    var React = require('react');

    var RaisedButton = require('material-ui/lib/raised-button');
    var FlatButton = require('material-ui/lib/flat-button');
    var AppBar = require('material-ui/lib/app-bar');
    var Snackbar = require('material-ui/lib/snackbar');

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
    var Menu = require('material-ui/lib/menus/menu');
    var IconMenu = require('material-ui/lib/menus/icon-menu');
    var MenuDivider = require('material-ui/lib/menus/menu-divider');
    var TextField = require('material-ui/lib/text-field');
    var Sidebar = require('react-sidebar');
    var UserMenu = require('./js/UserMenu');

themeManager.component.appBar.height = 48;
var CustomTheme = {
    getPalette() {
        return {
            primary1Color: box.color || "#00CC00",
            accent1Color: box.color || "#fff"
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
            return {items: this.props.data , filter : [] , sidebarOpen: false};
        },
        childContextTypes: {
            muiTheme:React.PropTypes.object
        },
        getChildContext:function() {
            return {
                muiTheme: themeManager.getCurrentTheme()
            };
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
        search:function(e){

            var txt = e.target.value.split(",");
            var c =[];
            for(var i = 0;i<txt.length;i++){
                var r=generateFilter(txt[i]);
                if(r != undefined)c.push(r);
            }
            this.setState({
                filters : c
            });
        },
        logout:function(){
            window.location="/logout/";
        },
        showNav:function(e){
            e.stopPropagation();
            e.nativeEvent.stopImmediatePropagation();
            e.nativeEvent.stopPropagation();
          $(this.refs.userMenu.getDOMNode()).css("visibility","visible");
          $(this.refs.userMenu.getDOMNode()).animate({opacity:1},200);
        },
        render: function(){

            var mainStyle={
                position:"relative",
                width:"100%",
                height:"100%",
                paddingTop:"70px"
            };
            var leftNav={
                position:"absolute",
                top:"50px",
                left:10,
                width:"270px",
                marginTop:"10px",
                padding:"10px"
            };
            var containerStyle ={
                position:"absolute",
                top:"100px",
                bottom:0,
                left:"300px",
                padding:"10px"
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
                                height:"40px",
                                position:"fixed",
                                top:0,
                                left:0,
                                right:0
                            }
                        }
                        title={this.props.data.name}
                     iconElementLeft={<IconButton iconClassName="material-icons" onClick={this.onHome}>arrow_back</IconButton>}
                     iconElementRight={<FlatButton label={user} onClick={this.showNav}/>}>
                    </AppBar>
                    <div style={{}}>
                        <RaisedButton style={{float:"left",marginLeft:"320px"}} label="Add new item" primary={true} onClick={this.addItem} />
                        <TextField onKeyUp={this.search} hintText="Search" style={{width:"250px",float:"right",marginRight:"40px"}}/>
                    </div>

                    <div style={leftNav}>
                            <div className="tab" style={{background:CustomTheme.getPalette().primary1Color}}>
                                <h1>Info</h1>
                                </div>
                        <Paper style={{width:"100%"   , padding:"10px"}}>


                                 <SideBarHeader/>
                            </Paper>

                                <div className="tab" style={{background:CustomTheme.getPalette().primary1Color,marginTop:"20px"}}>
                                <h1>Members</h1>

                                </div>
                                <Paper style={{width:"100%"   , padding:"10px",paddingTop:"0"}}>

                                        <MemberList style={{paddingTop:"0px"}} members={box.members}/>
                                </Paper>






                    </div>
                    <div style={containerStyle}>
                        <BoxItemList data={this.state.items} structure={box.structure} filters={this.state.filters} color={CustomTheme.getPalette().primary1Color}/>
                   </div>

                    <UserMenu ref="userMenu" logout={this.logout} color={CustomTheme.getPalette().primary1Color}/>


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



    //$(document).click(function(){
    //   $(".user-menu").animate({opacity:0} , 500 , function(){
    //       $(".user-menu").css("visibility","collapse");
    //   });
    //});



    var base =$("#base");


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
    render:function(){

                return(
                    <div style={{}}>

                        <h1 className="side-panel-header" style={{
                        fontWeight:"bold",
                        "text-align":"center",color:CustomTheme.getPalette().primary1Color , fontSize:"24pt"
                        }}>{ box.name.toUpperCase()  }</h1>
                        <h4  style={{"text-align":"center",paddingBottom:"20px" }}>Created by <span style={{color:CustomTheme.getPalette().primary1Color,fontWeight:"bold"}}>{this.state.name}</span></h4>
                        <h4  style={{"text-align":"center",paddingBottom:"20px" }}>Contains <span style={{color:CustomTheme.getPalette().primary1Color,fontWeight:"bold"}}>{box._data.length}</span> items</h4>

                    </div>
                )
    }
});

var MemberList = React.createClass({
    componentDidMount:function(){

    },
    addMember:function(e){
      if(e.keyCode == 13) {
          $.ajax({
              type: "POST",
              url: "/contributor/",
              data: {
                    "csrfmiddlewaretoken" : getCookie('csrftoken'),
                     username : e.target.value,
                     id : box._id["$oid"]
                },
              success: function(e){
                    box.members.push(e);
                    React.render(
                    <BoxPage box={box} filter="" data={box}/>,
                    document.getElementById('base'));
                    e.target.value = "";
                },
              error:function(){
                    console.log("nay");
                    this.refs.error.show();
                }.bind(this)
            });
        }
    },
    render:function(){
        var content = this.props.members.map(function(item){
            return (
                <MemberItem id={item} key={item}/>
            )
        });
        return (
            <div>
                <Snackbar
                    autoHideDuration={1500}
                                ref="error"
                                message="Couldn't find this member"/>

                <TextField style={{width:"100%"}} floatingLabelText="Add member by username" onKeyDown={this.addMember}/>
                <div>{content}</div>
            </div>
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
        var memberStyle={
            padding:"8px",
            color: CustomTheme.getPalette().primary1Color,
            border:"1px solid " + CustomTheme.getPalette().primary1Color,
            borderRadius:"0px"
        };
        return (
            <h4 style={memberStyle}>@{this.state.name}</h4>
        );
    }
});


function generateFilter(input){
    var filter = {
        target : "",
        type   : "",
        param  : ""
    };
    var textFilter = /(.*) is (.*)/g;
    var textMatches = textFilter.exec(input);
    if(textMatches != null && textMatches.length > 0){
        filter.type = "text";
        filter.param = textMatches[2];
        filter.target = textMatches[1];
        return filter;
    }
}