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
        updateDimensions: function() {
            this.setState({width: $(window).width()-320, height: $(window).height()-320});
        },
        componentWillMount: function() {
            this.updateDimensions();
        },
        componentDidMount: function() {
            window.addEventListener("resize", this.updateDimensions);
        },
        componentWillUnmount: function() {
            window.removeEventListener("resize", this.updateDimensions);
        },
  render: function() {
    var structure = this.props.structure;
      var data = this.props.data;
      var dt = [];
      if(box._data != undefined){
          dt = box._data.slice(0);
      }
      console.log(this.props.filters);
      if(this.props.filters != undefined && this.props.filters.length > 0) {
          for(var i =0; i< this.props.filters.length;i++) {
              dt = jQuery.grep(dt, function (v, q) {
                  var filter = this.props.filters[i];
                  var val = v[filter.target].toLowerCase();
                  if (val == undefined) return false;
                  return val.indexOf(filter.param.toLowerCase()) != -1;
              }.bind(this));
          }
          console.log("filtering with ");
          console.log(this.props.filters[0]);
      }
      var cardMax = Math.floor(this.state.width / 250);
                var cardWidth = this.state.width / cardMax;
                console.log(cardWidth);

    var boxes = dt.map(function (item) {
      return (
        <BoxItem color={this.props.color} cardWidth={cardWidth}  key={item["_id"]["$oid"]} item={item} structure={structure} data={data} onDelete={this.onDelete}>
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