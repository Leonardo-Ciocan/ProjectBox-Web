$(document).ready(function() {
    $.material.init();

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
            <div>{rows}</div>
        );
    }
});

var StructureItem = React.createClass({
    componentDidMount:function(){
        $("#" + this.props.id + "-choices").tokenfield();
        $("#" + this.props.id + "-choices").parent().removeClass("form-control");
        var cp = this;
        $("#" + this.props.id + "-choices").on('change', function (event) {
           var existingTokens = $(this).tokenfield('getTokens');
            var arr = [];
            $.each(existingTokens , function(i,v){
               arr.push(v.label);
            });
            cp.props.row.choices = arr;
        });
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
            this.props.id = id;
            var eid = id +"-choices";
            return(
                <div className="structure panel panel-default" >
                   <div className="form-group structure-name" >
                        <label className="control-label-inv">Name</label>
                        <input className="form-control floating-label" type="text" placeholder="Name" onChange={this.update_row}/>
                    </div>

                    <div className="form-group structure-type">
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
                    <div className="form-group structure-choices" >
                        <label className="control-label-inv">Name</label>
                        <input id={eid} placeholder="Enter choices" type="text"/>
                    </div>

                </div>
            );
      }
});

React.render(
  <StructureList />,
  document.getElementById('new-box-structure')
);