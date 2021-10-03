import React, { Component } from 'react';
import { connect } from 'react-redux';

class CreateTodo extends Component {

  constructor() {
    super();
    this.state = {
      text: ""
    }
  }

  // This function cannot be defined as a class function [like render()] since it will be called on the prototypal chain, not the instance
  // handleChange(event) {
  handleChange = (event) => {
    this.setState({
      text: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.addTodo(this.state)
    // Alternatively, we can call this.props.dispatch directly without mapping it to props [See revised connect() function below]
    // this.props.dispatch({type: "ADD_TODO", payload: this.state})
  }

  render() {
    return(
      <div>
        <form onSubmit={this.handleSubmit}>
          <input 
            type="text" 
            placeholder="add todo"
            // onChange={event => this.handleChange(event)}
            // Since event listeners (onChange) always pass in the 'event' as an arg, it will implicitly be sent to the event handler assignment; therefore 'event' does not need to be explicitly passed in this event handler assignment
            onChange={this.handleChange}
            value={this.state.text}
          />
          <input type="submit" />
        </form>
        {/* This line is just to test that the form is controlled and that the state updates with every keystroke */}
        {this.state.text}
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addTodo: (formData) => dispatch({ type: "ADD_TODO", payload: formData })
  }
}

// Similar to above event listener/handler (onChange/handleChange), mapDispatchToProps can be called below without explicitly passing in the 'dispatch' arg in an arrow function since connect() automatically passes it in to the second argument, which allows for its implicit call to the function defined above
// null is passed as first argument since there is no mapStateToProps property
export default connect(null, mapDispatchToProps)(CreateTodo);

// Alternative connect() function without mapDispatchToProps
// export default connect()(CreateTodo);