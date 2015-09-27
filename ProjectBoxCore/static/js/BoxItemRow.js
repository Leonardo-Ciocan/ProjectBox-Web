var React = require('react');
var TextField = require('material-ui/lib/text-field');
var Slider = require('material-ui/lib/slider');
var Checkbox = require('material-ui/lib/checkbox');
var DatePicker = require('material-ui/lib/date-picker/date-picker');
var DropDownMenu = require('material-ui/lib/drop-down-menu');
var StarRating = require("./react-star-rating");
var TagsInput = require('./tags');

var BoxItemRow = React.createClass({
        save:function(e){
            var input = e.target.value;
            var payload = {};
                payload[this.props.row.name.toLowerCase()] = input;
            //console.log(input+">>");
            if(this.props.data[this.props.row.name.toLowerCase()] !== input){
                this.props.data[this.props.row.name.toLowerCase()] = input;
                payload["item_id"]= this.props.data["_id"]["$oid"];
                payload["id"] = box._id["$oid"];
                payload["csrfmiddlewaretoken"] = getCookie('csrftoken');
                $.post("/box/" , payload);
            }

        },
        saveCheck:function(e,checked){
            var payload = {};
            var value = checked;
            payload[this.props.row.name.toLowerCase()] = value;

            //console.log(payload);
            if(this.props.data[this.props.row.name.toLowerCase()] !== value){
                this.props.data[this.props.row.name.toLowerCase()] = value;
                payload["item_id"]= this.props.data["_id"]["$oid"];
                payload["id"] = box._id["$oid"];
                payload["csrfmiddlewaretoken"] = getCookie('csrftoken');
                $.post("/box/" , payload);
            }

        },
        saveChoice:function(e, selectedIndex, menuItem){

            var payload = {};
            var value = this.props.row.choices[selectedIndex];
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
              //$("#" + this.props.id + "").val(this.props.data[this.props.row.name.toLowerCase()]);
          }
          else if(this.props.row.type.toLowerCase() == "choice"){
              var data = this.props.data;
              var row  = this.props.row;
              $("#"+this.props.id).children()
                    .each(function() { $(this).attr("selected" ,  (this.text == data[row.name.toLowerCase()])); });
          }
          else if(this.props.row.type.toLowerCase() == "image"){
                //$("#"+this.props.id).css("background-image" ,"url("+this.props.data[this.props.row.name.toLowerCase()] +")");
          }
          $.material.init();
      },
    componentDidMount:function(){
        console.log(this.refs);
       //this.refs.rating.state.editing = true;
    },
    saveRange:function(e,value){
            var payload = {};
            console.log(e);
            payload[this.props.row.name.toLowerCase()] = value;

            if(this.props.data[this.props.row.name.toLowerCase()] !== value){
                this.props.data[this.props.row.name.toLowerCase()] = value;
                payload["item_id"]= this.props.data["_id"]["$oid"];
                payload["id"] = box._id["$oid"];
                payload["csrfmiddlewaretoken"] = getCookie('csrftoken');
                $.post("/box/" , payload);
            }
            this.props.data[this.props.row.name.toLowerCase()] = $("#"+this.props.id).val();

    },
    saveImage:function(e){
            var input = prompt("Enter the url");
            var payload = {};
            var value = input;
            payload[this.props.row.name.toLowerCase()] = value;

            if(this.props.data[this.props.row.name.toLowerCase()] !== value){
                this.props.data[this.props.row.name.toLowerCase()] = value;

                payload["item_id"]= this.props.data["_id"]["$oid"];
                payload["id"] = box._id["$oid"];
                payload["csrfmiddlewaretoken"] = getCookie('csrftoken');
                $.post("/box/" , payload);
            }
            this.setState({});

    },
    saveDate:function(e,date){

            var payload = {};
            var value = date.toISOString();
            payload[this.props.row.name.toLowerCase()] = value;

            if(this.props.data[this.props.row.name.toLowerCase()] !== value){
                this.props.data[this.props.row.name.toLowerCase()] = value;
                $("#"+this.props.id).attr("src" ,this.props.data[this.props.row.name.toLowerCase()]);
                payload["item_id"]= this.props.data["_id"]["$oid"];
                payload["id"] = box._id["$oid"];
                payload["csrfmiddlewaretoken"] = getCookie('csrftoken');
                $.post("/box/" , payload);
            }
    },
    saveRating:function(e,data){
            var payload = {};
            var value = data.rating;
            payload[this.props.row.name.toLowerCase()] = value;

            if(this.props.data[this.props.row.name.toLowerCase()] !== value){
                this.props.data[this.props.row.name.toLowerCase()] = value;
                $("#"+this.props.id).attr("src" ,this.props.data[this.props.row.name.toLowerCase()]);
                payload["item_id"]= this.props.data["_id"]["$oid"];
                payload["id"] = box._id["$oid"];
                payload["csrfmiddlewaretoken"] = getCookie('csrftoken');
                $.post("/box/" , payload);
            }
    },
    saveTags:function(arr){
            var payload = {};
            var value = JSON.stringify(arr);
            payload[this.props.row.name.toLowerCase()] = value;

            if(this.props.data[this.props.row.name.toLowerCase()] !== value){
                this.props.data[this.props.row.name.toLowerCase()] = value;
                $("#"+this.props.id).attr("src" ,this.props.data[this.props.row.name.toLowerCase()]);
                payload["item_id"]= this.props.data["_id"]["$oid"];
                payload["id"] = box._id["$oid"];
                payload["csrfmiddlewaretoken"] = getCookie('csrftoken');
                $.post("/box/" , payload);
            }

    },
      render:function() {

          var id = this.props.id = unique();
          var content = this.props.data[this.props.row.name.toLowerCase()];
          //console.log(content);
          var name = this.props.row.name;

          var elem = <div/>;
          if(this.props.row.type.toLowerCase() === "text" || this.props.row.type.toLowerCase() === "number" ) {
//              elem = <div className="text-row mdl-textfield mdl-js-textfield mdl-textfield--floating-label" onBlur={this.save}>
//                  <input className="mdl-textfield__input" type="text" id={id}/>
//                  <label className="mdl-textfield__label" htmlFor={id}>{name}</label>
//              </div>

              elem = <div className="form-group">
                        <label style={{width:"100%"}}>

                            <TextField
                                style={
                                {width:"100%"}
                                }
                                onBlur={this.save}
                                defaultValue={content}
                                floatingLabelText={name} />
                        </label>
                    </div>;
          }
          else if(this.props.row.type.toLowerCase() === "checkbox") {
//              elem = <label className="mdl-switch mdl-js-switch mdl-js-ripple-effect" htmlFor={id} onChange={this.saveCheck.bind(this)}>
//                          <input type="checkbox" id={id} className="mdl-switch__input"  />
//                          <span className="mdl-switch__label">{name}</span>
//                      </label>

              elem = <label style={{marginTop:"10px",width:"100%"}}>
                    <Checkbox
                      label={name}
                      defaultChecked={this.props.data[this.props.row.name.toLowerCase()] == "true"}
                      onCheck={this.saveCheck}/>
                </label>
          }
          else if(this.props.row.type.toLowerCase() === "choice"){
                var items = this.props.row.choices.map(function(item){
                    return {text:item};
                });
              console.log(this.props.row.choices);
                elem = <div className="form-group" style={{marginTop:"15px"}}>
                            <label className="control-label">{name}</label>
                            <DropDownMenu
                                style= {{
                                    width:"100%"
                                }}
                                menuItems={items}
                                          onChange={this.saveChoice}
                                selectedIndex={
                                        this.props.row.choices.indexOf(
                                            content
                                        )
                                    }
                                />
                        </div>;
          }
          else if(this.props.row.type.toLowerCase() === "range") {

                    elem = <div style={{width: "100%",overflow:"hidden"}}>
                                <label style={{width: "100%"}}>
                                     {name}
                                </label>
                                    <Slider defaultValue={parseInt(content)} min={this.props.row.min} max={this.props.row.max} onChange={this.saveRange} />
                           </div>;
          }
          else if(this.props.row.type.toLowerCase() === "date") {
              var datepicker = content != undefined ?
                  <DatePicker  hintText="Portrait Dialog"
                               formatDate={function(date){
  return date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate();
}}
                                             value={new Date(content)}
                                            onChange={this.saveDate}/>
                  :
                        <DatePicker  hintText="Portrait Dialog"
                                            onChange={this.saveDate}/>;

          elem = <div style={{width: "100%",overflow:"hidden"}}>
                                <label style={{width: "100%"}}>
                                     {name}
                                </label>
              {datepicker}

                 </div>
          }
          else if(this.props.row.type.toLowerCase() === "image") {
              elem =
                  <label style={{width: "100%",paddingLeft:"0px"}} onClick={this.saveImage}>
                                     {name}
                      <div>

                          <div  style={{
                                border:!(content == "" ||content==undefined) ?"" : "1px dashed " + this.props.color,
                                height:"150px",
                                width: "100%" ,
                                backgroundSize:"cover",
                                backgroundImage:"url("+content+")",
                             backgroundRepeat:"none",
                             backgroundPosition:"center center"}}
                              >
                              <h1 style={{pointerEvents:"none" , visibility: ((content == "" ||content==undefined) ? "visible" : "collapse"),
                                            verticalAlign:"middle",
                                            lineHeight:"150px",
                                            color:this.props.color,
                                            margin:"0 auto",
                                            padding:"0",
                                            textAlign:"center"
                               }}>Click to add {name}</h1>
                          </div>




                      </div>
                  </label>
          }
          else if(this.props.row.type.toLowerCase() === "rating") {
                    elem = <div style={{width: "100%",overflow:"hidden"}}>
                                <label style={{width: "100%"}}>
                                     {name}
                                </label>
                                <StarRating style={{textAlign:"center",display:"block"}} editing={true} ref="rating"  size="lg" onRatingClick={this.saveRating} rating={content == undefined ? 0 : parseFloat(content)} />
                           </div>;
          }
          else if(this.props.row.type.toLowerCase() === "tags") {
                    elem = <div style={{width: "100%",overflow:"hidden"}}>
                                <label style={{width: "100%"}}>
                                     {name}
                                </label>
                        <TagsInput  ref='tags' onChange={this.saveTags} defaultValue={content == undefined ? [] :JSON.parse(content)} tagColor={this.props.color} tagTextColor="#fff" tagBorderColor="#000"/>
                    </div>;
          }

        return (
          elem
        );
      }
});

module.exports = BoxItemRow;