box._data = box._data || [];

$(document).ready(function(){
    $("#add-item").click(function(){
       window.app.addItem();
        $("html, body").animate({ scrollTop: $(document).height() }, "slow");
    });

    var textRegex = /(.+) is (.+)/g;
    $(".search").keypress(function(e) {
        if(e.which == 13) {
            if($(this).val() == ""){
                React.render(
                        <App filter=""/>,
                        document.getElementById('container')
                    );
            }else{
                var data = (textRegex.exec($(this).val()));
                if (data != null){
                    if(data.length > 0) {
                        React.render(
                            <App filter={data}/>,
                            document.getElementById('container')
                        );
                    }
                }
            }


        }
    });

    $("#box-props").click(function(){
        event.stopPropagation();
        $(".box-panel").animate({ "right": "0px" }, 300);
    });

     $(".box-panel").click(function(){
        event.stopPropagation();
     });

    if(box.members == undefined) box.members = [];





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
        console.log(this.props.data);
		return (
			<BoxItemList key={k} data={this.state.items} structure={box.structure} filter={this.props.filter}/>
		);
	}
});

var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var BoxItemList = React.createClass({
    componentDidMount:function(){
       $.material.init();
    },
  render: function() {
    var structure = this.props.structure;
      var data = this.props.data;
      var dt = [];
      if(box._data != undefined){
          dt = box._data.slice(0);
      }
      if(this.props.filter != "") {
          dt = jQuery.grep(dt, function (v,i) {
              var info = this.props.filter;
              var val = v[this.props.filter[1]];
              if (val == undefined) return false;
              return val.indexOf(this.props.filter[2]) != -1;
          }.bind(this));
          console.log("filtering with ");
          console.log(this.props.filter);
      }
    var boxes = dt.map(function (item) {

      return (
        <BoxItem key={item["_id"]["$oid"]} item={item} structure={structure} data={data}>
        </BoxItem>
      );
    });
    return (
        //<div>
        //    <ReactCSSTransitionGroup transitionName="list" transitionAppear={true} transitionLeave={false}>
        //        {boxes}
        //    </ReactCSSTransitionGroup>
        //</div>
         <div>
                {boxes}
        </div>
    );
  }
});

var BoxItem = React.createClass({
    componentDidMount:function(){
       var item = this.props.item;
       if("_id" in this.props.item){

       }
        else{
           $.post("/box/",{
                   "csrfmiddlewaretoken" : getCookie('csrftoken'),
                   id : box._id["$oid"]
               },
               function(dt){
                    if(dt!=undefined)
                        item._id = {"$oid":dt};
               }
           );
       }
    },
    delete:function(){
        box._data.splice(box._data.indexOf(this.props.item),1);
        $.post("/delete-item/",

            {
                id : box._id["$oid"],
                item_id : this.props.item._id["$oid"],
                "csrfmiddlewaretoken" : getCookie('csrftoken')
            }
        );
        //console.log(this.props.item);
        //console.log(box._data);
        window.app.update();
    },
  render: function() {
        var item = this.props.item;

        var rows = this.props.structure.map(function (row) {

          return (
            <BoxItemRow row={row} data={item}>
            </BoxItemRow>
          );
        });
        return (
            <div style={{height:"500px" , float:"left" , margin:"10px"}} >
                <div className="card">
                    {rows}
                    <div className="card-bottom">
                        <a href="javascript:void(0)" className="btn btn-flat btn-default delete-item" onClick={this.delete}>Delete</a>
                    </div>
                </div>

                </div>
        );
  }
});

var BoxItemRow = React.createClass({
        save:function(){
            var input = $("#"+this.props.id+"").val();
            var payload = {};
                payload[this.props.row.name.toLowerCase()] = input;
            //console.log(input+">>");
            if(this.props.data[this.props.row.name.toLowerCase()] !== input){
                this.props.data[this.props.row.name.toLowerCase()] = input;
                payload["item_id"]= this.props.data["_id"]["$oid"];
                payload["id"] = box._id["$oid"];
                payload["csrfmiddlewaretoken"] = getCookie('csrftoken');
                $.post("/box/" , payload);
            }

        },
        saveCheck:function(e){
            var input = $("#"+this.props.id+"");
            var payload = {};
            var value = document.getElementById(""+this.props.id+"").checked;
            payload[this.props.row.name.toLowerCase()] = value;

            //console.log(payload);
            if(this.props.data[this.props.row.name.toLowerCase()] !== value){
                this.props.data[this.props.row.name.toLowerCase()] = value;
                payload["item_id"]= this.props.data["_id"]["$oid"];
                payload["id"] = box._id["$oid"];
                payload["csrfmiddlewaretoken"] = getCookie('csrftoken');
                $.post("/box/" , payload);
            }

        },
        saveChoice:function(e){
            var input = $("#"+this.props.id+"");
            var payload = {};
            var value = input.val();
            payload[this.props.row.name.toLowerCase()] = value;

            console.log(payload);
            if(this.props.data[this.props.row.name.toLowerCase()] !== value){
                this.props.data[this.props.row.name.toLowerCase()] = value;
                payload["item_id"]= this.props.data["_id"]["$oid"];
                payload["id"] = box._id["$oid"];
                payload["csrfmiddlewaretoken"] = getCookie('csrftoken');
                $.post("/box/" , payload);
            }

        },
      componentDidMount:function(){
          if(this.props.row.type.toLowerCase() == "text" || this.props.row.type.toLowerCase() == "number") {
              $("#" + this.props.id + "").val(this.props.data[this.props.row.name.toLowerCase()]);
          }
          else if (this.props.row.type.toLowerCase() == "checkbox" && this.props.data[this.props.row.name.toLowerCase()] == "true") {
            var value = document.getElementById(""+this.props.id+"").checked = true;
          }
          else if(this.props.row.type.toLowerCase() == "choice"){
              var data = this.props.data;
              var row  = this.props.row;
              $("#"+this.props.id).children()
                    .each(function() { $(this).attr("selected" ,  (this.text == data[row.name.toLowerCase()])); });
          }
          else if(this.props.row.type.toLowerCase() == "range"){
              //console.log(parseFloat(this.props.row.max).toFixed(1));
                //$("#"+this.props.id).slider({
                //    range: "max",
                //         min:   parseFloat(this.props.row.min).toFixed(1)  || 0.0 ,
                //         max:   parseFloat(this.props.row.max).toFixed(1)  || 100.0,
                //         value: [ parseFloat(this.props.data[this.props.row.name.toLowerCase()]) ],
                //
                //});
                $("#"+this.props.id)[0].min = parseInt(this.props.row.min);
                $("#"+this.props.id)[0].max = parseInt(this.props.row.max);
                $("#"+this.props.id)[0].value = (parseInt(this.props.data[this.props.row.name.toLowerCase()]));
          }
          else if(this.props.row.type.toLowerCase() == "image"){
                $("#"+this.props.id).attr("src" ,this.props.data[this.props.row.name.toLowerCase()]);
          }
          $.material.init();

      },
    saveRange:function(e){

            var input = $("#"+this.props.id+"");
            var payload = {};
            var value = e.target.value;
            payload[this.props.row.name.toLowerCase()] = value;

            if(this.props.data[this.props.row.name.toLowerCase()] !== value){
                this.props.data[this.props.row.name.toLowerCase()] = value;
                payload["item_id"]= this.props.data["_id"]["$oid"];
                payload["id"] = box._id["$oid"];
                payload["csrfmiddlewaretoken"] = getCookie('csrftoken');
                $.post("/box/" , payload);
            }
                    this.props.data[this.props.row.name.toLowerCase()] = $("#"+this.props.id).val();

    },
    saveImage:function(e){


            var input = prompt("Enter the url");

            var payload = {};
            var value = input;
            payload[this.props.row.name.toLowerCase()] = value;

            if(this.props.data[this.props.row.name.toLowerCase()] !== value){
                this.props.data[this.props.row.name.toLowerCase()] = value;
                $("#"+this.props.id).attr("src" ,this.props.data[this.props.row.name.toLowerCase()]);
                payload["item_id"]= this.props.data["_id"]["$oid"];
                payload["id"] = box._id["$oid"];
                payload["csrfmiddlewaretoken"] = getCookie('csrftoken');
                $.post("/box/" , payload);
            }
                    this.props.data[this.props.row.name.toLowerCase()] = $("#"+this.props.id).val();

    },
      render:function() {

          var id = this.props.id = unique();
          var content = this.props.data[this.props.row.name.toLowerCase()];
          //console.log(content);
          var name = this.props.row.name;

          var elem = <div/>;
          if(this.props.row.type.toLowerCase() === "text" || this.props.row.type.toLowerCase() === "number" ) {
//              elem = <div className="text-row mdl-textfield mdl-js-textfield mdl-textfield--floating-label" onBlur={this.save}>
//                  <input className="mdl-textfield__input" type="text" id={id}/>
//                  <label className="mdl-textfield__label" htmlFor={id}>{name}</label>
//              </div>

              elem = <div className="form-group">
                        <label style={{width:"100%"}}>
                            {name}
                            <input className="form-control" id={id} type="text" onBlur={this.save}/>
                        </label>
                    </div>;
          }
          else if(this.props.row.type.toLowerCase() === "checkbox") {
//              elem = <label className="mdl-switch mdl-js-switch mdl-js-ripple-effect" htmlFor={id} onChange={this.saveCheck.bind(this)}>
//                          <input type="checkbox" id={id} className="mdl-switch__input"  />
//                          <span className="mdl-switch__label">{name}</span>
//                      </label>

              elem = <label>
                            {name}<div className="togglebutton">
                            <label>
                            <input id={id} type="checkbox" onClick={this.saveCheck} />
                            </label>
                     </div> </label>
          }
          else if(this.props.row.type.toLowerCase() === "choice"){
              var ops = this.props.row.choices.map(function(row){
                                      return (
                                        <option>{row}</option>
                                      );
                                    });
                elem = <div className="form-group">
                            <label htmlFor={id} className="control-label">{name}</label>
                            <div className="col-lg-10">
                                <select className="form-control" id={id} onChange={this.saveChoice}>
                                    {ops}
                                </select>
                            </div>
                        </div>;
          }
          else if(this.props.row.type.toLowerCase() === "range") {
                    elem = <div style={{width: "100%"}}>
                                <label style={{width: "100%"}}>
                                     {name}
                                      <input style={{width: "100%"}} className="" id={id} onChange={this.saveRange} type="range"></input>
                                </label>
                           </div>;
          }
          else if(this.props.row.type.toLowerCase() === "image") {
              elem =
                  <label style={{width: "300px",paddingLeft:"0px"}} onClick={this.saveImage}>
                                     {name}
                      <div>

                          <img style={{width: "300px",marginLeft:"-20px",paddingBottom:"10px",minHeight:"20px"}} id={id}
                              onerror="this.src='https://www.google.com.br/logos/2012/montessori-res.png';">

                          </img>

                          <h1 style={{pointerEvents:"none" , visibility: ((content == "" ||content==undefined) ? "visible" : "collapse"),
                                        color:"#000",
                                        textAlign:"center"
                           }}>Click to add {name} image</h1>



                      </div>
                  </label>
          }

        return (
          elem
        );
      }
});

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



React.render(
  <App data={box._data} filter=""/>,
  document.getElementById('container')
);

React.render(
      <MemberList members={box.members}/>,
      document.getElementById('contributors')
    );

React.render(
      <SideBarHeader/>,
      document.getElementById('contr-header')
    );