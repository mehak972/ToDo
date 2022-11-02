import React from 'react';
import logo from './logo.svg';
import './App.css';
// import './ListItem.js' ;
// import ListItem from './ListItem';
import {library} from '@fortawesome/fontawesome-svg-core';
import {faTrash} from '@fortawesome/free-solid-svg-icons';
import {faCircleCheck} from '@fortawesome/free-regular-svg-icons';
import flipMove from 'react-flip-move';
import './ListItem.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

library.add(faTrash);
library.add(faCircleCheck);


class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      currentItems:{
        text:'' ,
        key:'',
        "status":false,
      },
      items : [],
      completed_items:[]
    }
    this.handleInput=this.handleInput.bind(this); 
    this.addItem=this.addItem.bind(this);
    this.deleteItem=this.deleteItem.bind(this);
    this.setUpdate=this.setUpdate.bind(this);
    this.markDone=this.markDone.bind(this);

  }
 
  handleInput(e){
    this.setState({
      currentItems:{
        text:e.target.value,
        key:Date.now()
      }
    })
  }
  
  addItem(e){
    e.preventDefault();
    // console.log(this.state)
    const newItem=this.state.currentItems;
    // console.log(newItem)
    // console.log("-----  ")
    if(newItem.text!==""){
    const newItems=[...this.state.items,newItem];
      this.setState({
        items:newItems,
        currentItems:{
          text:'',
          key:'',
        
        }
      })
    }
  }
  
  deleteItem(key){
    const filteredItems= this.state.items.filter(item=>
      item.key!==key);
    console.log(this.state)
      this.setState({
        items:  filteredItems   })
    // console.log(filteredItems)
    // console.log(this.state)
    // console.log("-----Inside Delete---")
  }
  
  markDone(key){
    const completedItemList=this.state.completed_items;
  
    const done=this.state.items.map(item=>{
      if(item.key===key){
        
        completedItemList.push(item)
        this.setState({
          completed_items:completedItemList
        
        })


        // console.log(this.state)
        // console.log("0000000")
        this.deleteItem(key)
        // console.log((key))
        return({...this.state.items}) 
        
      
      }
    
      return item;
      
    })
    // this.setState({
    //   items:done
    // })
  }
 
  setUpdate(text,key){
    const items=this.state.items;
    items.filter(item=>{
      if(item.key===key){
        item.text=text;
      }
    })
    this.setState({
      items:items
    })
  }
  render(){
    return(
      <div className="App" >
        <header>
          <form id="to-do-form" onSubmit={this.addItem}>
           <input type="text" placeholder="Enter Text"
           value={this.state.currentItems.text}
           onChange={this.handleInput} />

           <button type="submit">Add</button>
          </form>
        </header>
        {/* <ListItem items={this.state.items}
        deleteItem={this.deleteItem}
        setUpdate={this.setUpdate}>
        </ListItem> */}

          <div>
            <ul>
              {this.state.items.map(item =>{
                return(
                
                  <li key={item.key} className="list">
                    <input 
                    type="text"
                    id={item.key}
                    value={item.text}
                    onChange={(e) =>{
                      this.setUpdate(e.target.value,item.key)
                    }}
                    />
          
                    <FontAwesomeIcon className="faicons" icon='trash'
                    onClick={()=> this.deleteItem(item.key)}/>
                    <FontAwesomeIcon className="faicons" icon={faCircleCheck}
                    onClick={()=> this.markDone(item.key)}
                    />
                  </li>


                   )
                  })}
                  {this.state.completed_items.map(item =>{
                return(
          
                  <li key={item.key} className="list">
                    <input 
                    type="text"
                    id={item.key}
                    value={item.text}
                    />
                    completed
                  </li>
                  )
                })}
             </ul>     
          </div>        

      </div>
    )
  }
}

export default App;


