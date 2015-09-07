box._data = box._data || [];

$(document).ready(function(){
    $("#add-item").click(function(){
       window.app.addItem();
        $("html, body").animate({ scrollTop: $(document).height() }, "slow");
    });
});



var App = React.createClass({
    componentDidMount:function(){
       window.app = this;
    },
   getInitialState: function(){
		return {items: box._data};
	},
	addItem: function(){
        box._data.push({});
		this.setState({items: box._data});
	},
	render: function(){
		return (
			<BoxItemList data={this.state.items} structure={box.structure}/>
		);
	}
});


var BoxItemList = React.createClass({
    componentDidMount:function(){
       $.material.init();
    },
  render: function() {
    var structure = this.props.structure;
    var data = this.props.data;
    var boxes = this.props.data.map(function (item) {

      return (
        <BoxItem item={item} structure={structure} data={data}>
        </BoxItem>
      );
    });
    return (
        <div>{boxes}</div>
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
  render: function() {
        var item = this.props.item;

        var rows = this.props.structure.map(function (row) {

          return (
            <BoxItemRow row={row} data={item}>
            </BoxItemRow>
          );
        });
        return (
            <div className="card">{rows}</div>
        );
  }
});

var BoxItemRow = React.createClass({
        save:function(){
            var input = $("#"+this.props.id+"").val();
            var payload = {};
                payload[this.props.row.name.toLowerCase()] = input;
            console.log(input+">>");
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

            console.log(payload);
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


      },
      render:function() {

          var id = this.props.id = unique();
          var content = this.props.data[this.props.row.name.toLowerCase()];
          var name = this.props.row.name;

          var elem = <div/>;
          if(this.props.row.type.toLowerCase() === "text" || this.props.row.type.toLowerCase() === "number" ) {
//              elem = <div className="text-row mdl-textfield mdl-js-textfield mdl-textfield--floating-label" onBlur={this.save}>
//                  <input className="mdl-textfield__input" type="text" id={id}/>
//                  <label className="mdl-textfield__label" htmlFor={id}>{name}</label>
//              </div>

              elem = <div className="form-group">
                        <input className="form-control floating-label" id={id} type="text" placeholder={name} onBlur={this.save}/>
                    </div>;
          }
          else if(this.props.row.type.toLowerCase() === "checkbox") {
//              elem = <label className="mdl-switch mdl-js-switch mdl-js-ripple-effect" htmlFor={id} onChange={this.saveCheck.bind(this)}>
//                          <input type="checkbox" id={id} className="mdl-switch__input"  />
//                          <span className="mdl-switch__label">{name}</span>
//                      </label>

              elem = <div className="togglebutton">
                        <label>
                            <input id={id} type="checkbox" onClick={this.saveCheck} /> {name}
                        </label>
                     </div>;
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


        return (
          elem
        );
      }
});

React.render(
  <App />,
  document.getElementById('container')
);
