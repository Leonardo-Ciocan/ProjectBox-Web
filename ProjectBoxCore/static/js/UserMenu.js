var React = require("react");
var UserMenu = React.createClass({
    logout:function(){
      this.props.logout();
    },
   render:function(){
       return <div className="user-menu" style={{background: this.props.color , padding:"10px"}}>
                        <div> <div className="user-menu-logout">
                            Setting
                        </div>
                         <div className="user-menu-logout">
                            Feedback
                        </div>

                        <div onClick={this.logout} className="user-menu-logout">
                            Log out
                        </div></div>
              </div>;
   }
});

module.exports = UserMenu;