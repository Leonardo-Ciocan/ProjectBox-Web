var React = require("react");
console.log("loading");
    var AppBar = require('material-ui/lib/app-bar');
    var FlatButton = require('material-ui/lib/flat-button');
    var UserMenu = require('./UserMenu');
    var Paper = require("material-ui/lib/paper");

var ThemeManager =  require('material-ui/lib/styles').ThemeManager;
    var themeManager = new ThemeManager();
themeManager.component.appBar.height = 48;
var CustomTheme = {
    getPalette() {
        return {
            primary1Color:  "#33c9FF",
            accent1Color: "#3399FF"
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
$(document).ready(function(){


    $('input[type="text"]')
        // event handler
        .keyup(resizeInput)
        // resize on page load
        .each(resizeInput);


    $("#box-name").on("input",function(){
        $("#btn-create").text("CREATE "+ $(this).val() + " BOX");
    });

    $(document).click(function(){
       $(".user-menu").animate({opacity:0} , 500 , function(){
           console.log("xxx");
           $(".user-menu").css("visibility","collapsed");
       });
    });


});

function resizeInput() {
    $(this).attr('size', $(this).val().length);
}

function s_unique(){
    return Math.random().toString(36).slice(2);
}

var ColorPicker = React.createClass({
        onColor:function(e){
            var cl = e.target.style.background;
            this.props.onColor(cl);
            $(e.target).parent().children().css("border","2px solid black");
            //$(e.target).css("border","2px solid white");

            CustomTheme.getPalette = function() {
                return {
                    primary1Color: cl,
                    accent1Color: cl
                };
            }.bind(this);

            React.render(
              <CollumnList onCreate={create_box}/>,
              document.getElementById('container')
            );

            React.render(
              <CreatePage/>,
              document.getElementById('base')
            );
        },
        render: function () {
            var colors = [
                "#245124" ,
                "#4F6693" ,
                "#AD4575",
                "#212121",
                "#EFD004",
                "#CC0000",
                "#FF6600",
                "#CC0099",
                "#993300",
                "#33CC33"];
            var cols =  colors.map(function(col){
               return (<div
                          col={col}
                          style={{
                            "background":col,
                            border:"2px solid black"
                       }} className="color" onClick={this.onColor}>

                      </div>)
            }.bind(this));
            console.log(cols);
            return (
                <div style={{overflow:"hidden"}}>
                    {cols}
                </div>
            )
        }
    }
);

var data = [{type:"Text" , name:""}];
var CollumnList = React.createClass({
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
    getInitialState:function(){
        return {items:data , color:"green"};
    },
    add_new:function(e){
        data.push({type:"Text" , name:""});
        this.setState({items:data});
        console.log(this.state.items);
    },
    get_collumns:function(){
        return this.state.data;
    },
    onCreate:function(){

        this.props.onCreate(this.state.items,this.state.color);
    },
    onColor:function(col){
        console.log(col);
        this.setState({color:col});
    },
   render:function(){
       console.log(CustomTheme.getPalette().primary1Color);
       var i = 0;
        var collumns = this.state.items.map(function (collumn) {
                i++;
              var id = s_unique();
              return (
                    <Collumn onAdd={this.add_new} collumn={collumn} position={i}>
                    </Collumn>
                  );
            }.bind(this)
        );
       return (
            <Paper style={{margin:"10px",padding:"10px",overflow:"hidden"}}>
                <ColorPicker onColor={this.onColor}/>
                {collumns}
                <button id="btn-create" className="btn btn-primary" onClick={this.onCreate}>Create</button>
            </Paper>
       )
   }
});

var Collumn = React.createClass({
    componentDidMount:function(){
          $("#"+this.props.id + "-name")
            // event handler
            .keyup(resizeInput)
            // resize on page load
            .each(resizeInput);

        $("#"+this.props.id + "-choice").keyup(resizeInput).each(resizeInput);
        $("#"+this.props.id + "-min").keyup(resizeInput).each(resizeInput);
        $("#"+this.props.id + "-max").keyup(resizeInput).each(resizeInput);
    },
    getInitialState:function(){
        return {type:"Text"}
    },
    onAdd:function(e){
        if(data.length == this.props.position) {
            this.props.onAdd.call();
        }
    },
    saveName: function (e) {
        this.props.collumn.name = e.target.value;
    },
    saveChoices:function(e){
        this.props.collumn.choices = e.target.value.split(",");
    },
    saveMin:function(e){
        this.props.collumn.min = e.target.value;
    },
    saveMax:function(e){
        this.props.collumn.max = e.target.value;
    },
    changedType:function(e){
        var type = e.target.value;
        this.props.collumn.type = type;
        this.setState({type:type});
    },
   render:function(){
       var id = unique();
       this.props.id = id;
       var elem = <div/>;
       console.log(this.state.type+">>>>:");
       var options = <select onChange={this.changedType} style={{color:CustomTheme.getPalette().primary1Color}}>
                               <option value="Text" checked>piece of text</option>
                               <option value="Number">number</option>
                               <option value="Image">image</option>
                               <option value="Checkbox">checkbox</option>
                               <option value="Choice">choice</option>
                               <option value="Range">number between</option>
                               <option value="Date">date</option>
                            </select>;



       if(this.state.type.toLowerCase() == "choice"){
            elem  = <div>
                       <h1 className="create-line line-small">Each one has a
                           {options}
                           called <input placeholder="name" id={id+"-name"} type="text" onFocus={this.onAdd}  onChange={this.saveName} style={{color:CustomTheme.getPalette().primary1Color}}/>
                            which can be : <input placeholder="e.g Easy,Medium,Hard" id={id+"-choice"} type="text" onChange={this.saveChoices} style={{color:CustomTheme.getPalette().primary1Color}}/></h1>
                   </div>
       }else if (this.state.type.toLowerCase() == "text" ||this.state.type.toLowerCase() == "date" || this.state.type.toLowerCase() == "number" || this.state.type.toLowerCase() == "image" || this.state.type.toLowerCase() == "checkbox"){
           elem  = <div>
               <h1 className="create-line line-small">Each one has a
                  {options}
                   called <input style={{color:CustomTheme.getPalette().primary1Color}} id={id+"-name"} type="text" onFocus={this.onAdd} onChange={this.saveName}/></h1>
           </div>
       }
       else if(this.state.type.toLowerCase() == "range"){
            elem  = <div>
               <h1 className="create-line line-small">Each one has a
                   {options}
                   <input style={{color:CustomTheme.getPalette().primary1Color}} className="short-input" id={id+"-min"}   type="text"  onChange={this.saveMin}/> and
                   <input style={{color:CustomTheme.getPalette().primary1Color}} className="short-input" id={id+"-max"}   type="text"  onChange={this.saveMax}/>
                   called <input style={{color:CustomTheme.getPalette().primary1Color}} id={id+"-name"} type="text" onFocus={this.onAdd} onChange={this.saveName}/></h1>
           </div>
       }
       return (
            <div>
                {elem}
            </div>
       )
   }
});


function create_box(e,c){
    var package = {};
    package.name = $("#box-name").val();
    e = jQuery.grep(e , function(v,i){
        console.log(v);
        return v.name != "";
    });
    package["csrfmiddlewaretoken"] = getCookie('csrftoken');
    package["structure"] = JSON.stringify(e);
    package["color"] = c;
    $.post("",package,function(){
       window.location = "/";
    });
}
React.render(
  <CollumnList onCreate={create_box}/>,
  document.getElementById('container')
);

var CreatePage = React.createClass({
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
    userClicked:function(e){
            e.stopPropagation();
            e.nativeEvent.stopImmediatePropagation();
            console.log(this.refs.userMenu.getDOMNode());
             $(this.refs.userMenu.getDOMNode()).css("visibility","visible");
            $(this.refs.userMenu.getDOMNode()).animate({opacity:1},200);
    },
    render:function(){

        return(
            <div>
                <AppBar
                        style={
                            {
                                height:"40px",
                                backgroundColor:CustomTheme.getPalette().primary1Color
                            }
                        }
                        title="Project Box"
iconElementLeft={<div/>}
                     iconElementRight={
                        <FlatButton label={user} onClick={this.userClicked}/>}>
                    </AppBar>
                <UserMenu ref="userMenu" logout={this.logout} color={CustomTheme.getPalette().primary1Color}/>
            </div>
        )
    }
});

React.render(
  <CreatePage/>,
  document.getElementById('base')
);