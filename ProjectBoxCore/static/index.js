$(document).ready(function() {
    $.material.init();

    $("#add-structure").click(function(){
        window.app.addItem();
    });

    $("#create-box").click(function(){
        var _data = {
           structure : JSON.stringify(window.app.getRows()),
           name : $("#new-box-name").val(),
           "csrfmiddlewaretoken" : getCookie('csrftoken')
        };
         $.ajax({
            type: "POST",
            url: "/create/",
            data: _data ,
            success:function(data){
                console.log(data);
                var container = $("#container");
                var bx = $("<div/>").addClass("box panel panel-default").attr("id" , data);
                bx.append($("<h1/>").text($("#new-box-name").val()));
                container.append(bx);
                $(".modal").modal("hide");
            },
            error: function (e) {
                $(".modal").modal("hide");
            }
        });

    });
});

var StructureList = React.createClass({
    componentDidMount:function(){
       window.app = this;
    },
    getInitialState: function(){
		return {items: []};
	},
    addItem:function(){
        this.state.items.push({type:"text",name:""});
        this.setState({items: this.state.items});
    },
    getRows:function(){
      return this.state.items;
    },
    render:function(){
        var rows = this.state.items.map(function (row) {
              return (
                    <StructureItem row={row}>
                    </StructureItem>
                  );
        });
        return (
            <div className="panel panel-default">{rows}</div>
        );
    }
});

var StructureItem = React.createClass({
    componentDidMount:function(){

    },
    update_row:function(e){
        if(e.type == "input"){
            this.props.row.name = e.target.value;
        }
        else{
            this.props.row.type = e.target.value;
        }
    },
      render: function() {
            var id = unique();
            return(
                <div className="structure" >
                   <div className="form-group structure-half" >
                        <label className="control-label-inv">Name</label>
                        <input className="form-control floating-label" type="text" placeholder="Name" onChange={this.update_row}/>
                    </div>

                    <div className="form-group structure-half">
                            <label htmlFor={id} className="control-label-inv">Type</label>
                            <div>
                                <select id={id} className="form-control" onChange={this.update_row}>
                                    <option>Text</option>
                                    <option>Number</option>
                                    <option>Checkbox</option>
                                    <option>Choice</option>
                                </select>
                            </div>
                        </div>


                </div>
            );
      }
});

React.render(
  <StructureList />,
  document.getElementById('new-box-structure')
);