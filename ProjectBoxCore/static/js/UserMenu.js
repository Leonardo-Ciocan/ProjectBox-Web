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

                                    <div className="user-menu-logout">
                                    SETTING
                                    </div>
                                     <div className="user-menu-logout">
                                        FEEDBACK
                                    </div>

                                    <div onClick={this.logout} className="user-menu-logout">
                                        LOG OUT
                                    </div>
              </div>);
   }
});

module.exports = UserMenu;