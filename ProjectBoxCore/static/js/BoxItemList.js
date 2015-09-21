var React = require('react');
var BoxItem = require("./BoxItem");

var BoxItemList = React.createClass({
    componentDidMount:function(){
       $.material.init();
      // $(".nano").nanoScroller({ alwaysVisible: true });

    },
    onDelete:function(){
        this.setState({});
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
        <BoxItem key={item["_id"]["$oid"]} item={item} structure={structure} data={data} onDelete={this.onDelete}>
        </BoxItem>
      );
    }.bind(this));
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

module.exports = BoxItemList;