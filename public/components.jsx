

var isNode = typeof module !== 'undefined' && module.exports
  , React = isNode ? require('react') : window.React
  , ReactDOM = isNode ? require('react') : window.ReactDOM





var HelloMessage = React.createClass({

  getInitialState: function(){
    return {
      data: this.props.data
    }
  },


  fetchData: function(){
    console.log("this is running")
    console.log('this', this)
    var self  = this;
    axios.get('http://jsonplaceholder.typicode.com/users')
      .then(function (response) {
        var data  = response.data;
        console.log("data" ,data);
        self.setState({data: data});
      })
      .catch(function (error) {
        console.log(error);
    });


  },

  handleClick: function () {
    alert('You clicked!');
  },



  render(){
    console.log("data from initial state", this.state.data)
    if (this.state.data === undefined){
      this.fetchData();
      return (
        <div>loading</div>
      )
    }

    var dataArray = this.state.data.map(function(element, i){
      return (
          <tr  key = {element.id}>
            <th scope="row">{element.id}</th>
            <td>{element.name}</td>
            <td>{element.email}</td>
            <td>{element.address.street}, {element.address.suite}</td>
            <td>{element.address.city}</td>
          </tr>
      );
    });
    return (
      <table onClick = {this.handleClick} className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Street</th>
            <th>City</th>
          </tr>
        </thead>
        <tbody>
          {dataArray}
        </tbody>
      </table>
    );
  }
});

if (isNode) {
  exports.HelloMessage = HelloMessage;
} else {
  ReactDOM.render(<HelloMessage  />, document.getElementById('react-root'))
}
