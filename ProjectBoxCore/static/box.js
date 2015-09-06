function unique(){
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
            return v.toString(16);
            });
}

var BoxItemList = React.createClass({
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
            if(this.props.data[this.props.row.name.toLowerCase()] !== input){
                this.props.data[this.props.row.name.toLowerCase()] = input;
                payload["item_id"]= this.props.data["_id"]["$oid"];
                payload["id"] = box._id["$oid"];
                payload["csrfmiddlewaretoken"] = getCookie('csrftoken');
                //$.post("/box/" , payload);
                console.log(payload);
            }

        },
      componentDidMount:function(){
          $("#"+this.props.id+"").val(this.props.data[this.props.row.name.toLowerCase()]);
      },
      render:function() {

        console.log(this.props.data);
          var id = this.props.id = unique();
          var content = this.props.data[this.props.row.name.toLowerCase()];
          var name = this.props.row.name;
        return (
            this.props.row.type === "Text" || this.props.row.type === "Number" ?
            <div className="text-row mdl-textfield mdl-js-textfield mdl-textfield--floating-label" onBlur={this.save}>
                <input className="mdl-textfield__input" type="text" id={id}/>
                <label className="mdl-textfield__label" htmlFor={id}>{name}</label>
            </div>
                :
            <label className="mdl-switch mdl-js-switch mdl-js-ripple-effect" htmlFor={id} onClick={this.save2}>
              <input type="checkbox" id={id} className="mdl-switch__input"  />
              <span className="mdl-switch__label">{name}</span>
            </label>

        );
      }
});

React.render(
  <BoxItemList data={box._data} structure={box.structure}/>,
  document.getElementById('container')
);

function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie != '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
