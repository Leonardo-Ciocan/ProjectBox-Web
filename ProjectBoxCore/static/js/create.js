var React = require("react");
console.log("loading");
$(document).ready(function(){


    $('input[type="text"]')
        // event handler
        .keyup(resizeInput)
        // resize on page load
        .each(resizeInput);


    $("#box-name").on("input",function(){
        $("#btn-create").text("CREATE "+ $(this).val() + " BOX");
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
            this.props.onColor(e.target.style.background);
        },
        render: function () {
            var colors = ["#245124" , "#4F6693" , "#AD4575", "#212121", "#EFD004"];
            var cols =  colors.map(function(col){
               return (<div style={{"background":col}} className="color" onClick={this.onColor}>

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
            <div>
                <ColorPicker onColor={this.onColor}/>
                {collumns}
                <button id="btn-create" className="btn btn-primary" onClick={this.onCreate}>Create</button>
            </div>
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
       if(this.state.type.toLowerCase() == "choice"){
            elem  = <div>
                       <h1 className="create-line line-small">Each one has a
                           <select onChange={this.changedType}>
                               <option value="Text" checked>piece of text</option>
                               <option value="Number">number</option>
                               <option value="Image">image</option>
                               <option value="Checkbox">checkbox</option>
                               <option value="Choice">choice</option>
                               <option value="Range">number between</option>
                            </select>
                           called <input placeholder="name" id={id+"-name"} type="text" onFocus={this.onAdd}  onChange={this.saveName}/>
                            which can be : <input placeholder="e.g Easy,Medium,Hard" id={id+"-choice"} type="text" onChange={this.saveChoices}/></h1>
                   </div>
       }else if (this.state.type.toLowerCase() == "text" || this.state.type.toLowerCase() == "number" || this.state.type.toLowerCase() == "image" || this.state.type.toLowerCase() == "checkbox"){
           elem  = <div>
               <h1 className="create-line line-small">Each one has a
                   <select onChange={this.changedType}>
                                <option value="Text" checked>piece of text</option>
                               <option value="Number">number</option>
                               <option value="Image">image</option>
                               <option value="Checkbox">checkbox</option>
                               <option value="Choice">choice</option>
                               <option value="Range">number between</option>

                    </select>
                   called <input id={id+"-name"} type="text" onFocus={this.onAdd} onChange={this.saveName}/></h1>
           </div>
       }
       else if(this.state.type.toLowerCase() == "range"){
            elem  = <div>
               <h1 className="create-line line-small">Each one has a
                   <select onChange={this.changedType}>
                                <option value="Text" checked>piece of text</option>
                               <option value="Number">number</option>
                               <option value="Image">image</option>
                               <option value="Checkbox">checkbox</option>
                               <option value="Choice">choice</option>
                               <option value="Range">number between</option>
                    </select>
                   <input className="short-input" id={id+"-min"}   type="text"  onChange={this.saveMin}/> and
                   <input className="short-input" id={id+"-max"}   type="text"  onChange={this.saveMax}/>
                   called <input id={id+"-name"} type="text" onFocus={this.onAdd} onChange={this.saveName}/></h1>
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

