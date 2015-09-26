var React = require('react');
var BoxItemRow = require("./BoxItemRow");
var Paper = require("material-ui/lib/paper");
var IconButton =  require("material-ui/lib/icon-button");

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
        this.props.onDelete();
    },
  render: function() {
        var item = this.props.item;
        var rows = this.props.structure.map(function (row) {

          return (
            <BoxItemRow color={this.props.color} row={row} data={item}>
            </BoxItemRow>
          );
        }.bind(this));

      var barStyle = {
        float:"right"
      };
        console.log(this.props.cardWidth);
      var key = unique();
        return (
            <div key={key} style={{float:"left" , padding:"10px",width:this.props.cardWidth +"px"}} >
                <Paper zDepth={1}  style={{width:"100%",padding:"10px",paddingTop:"0px"}}>
                            <div style={{overflow:"hidden"}}>
                                {rows}
                                <div style={barStyle}>
                                    <IconButton iconClassName="material-icons"
                                                tooltip="GitHub" onClick={this.delete}
                                                color="red" style={{float:"right"}}>delete</IconButton>
                                 </div>
                            </div>
                </Paper>
            </div>
        );
  }
});

module.exports = BoxItem;