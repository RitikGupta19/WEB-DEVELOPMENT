import React from 'react';
import './App.css';
import Header from './Header';
import Footer from './Footer';
import Content from './Content';

// class App extends Component {
//     render() {
//       return (
//         <div className="container">
//         <Header />
//         <Content />
//         <Footer />
//         </div>
//       );
//   }
// }

const App = () => {
  return (
      <div className="container">
      <Header />
      <Content />
      <Footer />
      </div>
    );
};

export default App;

/*
 constructor(props) {
    super(props);
    this.state = {
      newItem : '',
      list : [],
      date: new Date().toString().slice(0,15),
      completedList: []
    };
  }

  addItem(todo) {
    if (todo !== "") {
      const newItem = {
        id: Date.now(),
        value: todo,
        isDone: false
      };

      const list = [...this.state.list];
      list.push(newItem);
      this.setState({ list: list , newItem: ""});
    }
  }

  deleteItem(todo) {
    const list = [...this.state.list];
    if(todo !== "") {
      const newList = list.filter((item) =>{
        return item.id !== todo.id;
      });

      this.setState({ list: newList });
    }
  };

  updateChange(e) {
    this.setState({ newItem: e.target.value });
  };

  onCheckMark(item) {
    item.isDone = true;
    const doneList = [...this.state.completedList];
    doneList.push(item);
    this.setState({completedList: doneList});

    const list = [...this.state.list];
    const changedList = list.filter(item => {
      return item.isDone === false;
    });
    this.setState({list: changedList})
  } */

/*
<div className="input-group mb-3">
      <input 
        type="text" className="form-control" placeholder="Add Task" aria-describedby="button-addon2"
        required
        value={this.state.newItem}
        onChange={e=> this.updateChange(e)}/>
      <div className="input-group-append">
        <button 
          className="btn btn-outline-info" type="button" id="button-addon2"
          onClick={() => this.addItem(this.state.newItem)}
          disabled = { !this.state.newItem.length } >ADD</button>
      </div>
    </div>
      {this.state.list.length > 0 ? (
        <h2><span className="badge badge-warning">TODO:</span></h2>
      ) : (
        <h2><span className="badge badge-success mb-5">No TASK pending</span></h2>
      )}
      
      {this.state.list.map((item, index) => {
        //console.log(item);
        return (
          <div  key={index}className="input-group mb-3">
            <div className="input-group-prepend">
              <div className="input-group-text">
              <input type="checkbox" checked=""
              onClick={() => this.onCheckMark(item)}/>
              </div>
            </div>
            <input type="text" className="form-control" disabled
            value={item.value}/>
            <div className="input-group-append">
              <button 
                className="btn btn-outline-info" type="button" id="button-addon2"
                onClick={() => this.deleteItem(item)}
                >DELETE</button>
            </div>
          </div>
          )
        })}
        {this.state.completedList.length > 0 ? (
          <h2><span className="badge badge-primary">COMPLETED</span></h2>
        ) : (
          <div></div>
        )}
        {this.state.completedList.map((item, index) => {
          //console.log(item);
          return (
            <div  key={index}className="input-group mb-3">
              <div className="input-group-prepend">
                <div className="input-group-text">
                <input type="checkbox"
                defaultChecked/>
                </div>
              </div>
              <input type="text" className="form-control" disabled
              value={item.value}/>
            </div>
            )
          })}
 */