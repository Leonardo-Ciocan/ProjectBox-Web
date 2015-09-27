var React = require("react");
var UserMenu = React.createClass({
    logout:function(){
      this.props.logout();
    },

    mouseOut:function(){
        var i = this.refs.menu.getDOMNode();
        $(i).css("visibility","collapse");
    },

   render:function(){
       return (<div ref="menu" className="user-menu" style={{background: this.props.color , padding:"10px"}} onMouseLeave={this.mouseOut}>

                                     <a href="mailto:leonardo.ciocan@outlook.com" className="user-menu-logout">
                                        FEEDBACK
                                    </a>

                                    <a onClick={this.logout} className="user-menu-logout">
                                        LOG OUT
                                    </a>
              </div>);
   }
});

module.exports = UserMenu;