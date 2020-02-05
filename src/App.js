import React, { Component } from "react";
import "./index.css";
import todosList from "./todos.json";

class App extends Component {
  state = {
    todos: todosList
  };

  handleComplete = (event, todoId) => {
    // create copy
    const newTodos = this.state.todos.slice();
    // modify copy
    const newnewTodos = newTodos.map(todo => {
      // if (todo.id === todoIdToDelete) {
      // find todo to modify
      // change it's completed value to true
      if (todo.id === todoId) todo.completed = !todo.completed;
      return todo;
    });
    // overwrite original
    this.setState({ todos: newnewTodos });
  };

  handleAddTodo = event => {
    if (event.key === "Enter") {
      // create new todo
      const newTodo = {
        userId: 1,
        id: Math.floor(Math.random() * 1000000),
        title: event.target.value,
        completed: false
      };

      // update component state with new todo
      // create copy of data
      const newTodos = this.state.todos.slice();
      // modify and overwrite original
      newTodos.push(newTodo);
      this.setState({ todos: newTodos });

      event.target.value = "";
    }
  };

  render() {
    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            onKeyDown={this.handleAddTodo}
            autofocus
          />
        </header>
        <TodoList
          todos={this.state.todos}
          handleComplete={this.handleComplete}
        />
        <footer className="footer">
          <span className="todo-count">
            <strong>0</strong> item(s) left
          </span>
          <button className="clear-completed">Clear completed</button>
        </footer>
      </section>
    );
  }
}

class TodoItem extends Component {
  render() {
    return (
      <li className={this.props.completed ? "completed" : ""}>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={this.props.completed}
            onChange={event => this.props.handleComplete(event, this.props.id)}
          />
          <label>{this.props.title}</label>
          <button className="destroy" />
        </div>
      </li>
    );
  }
}

class TodoList extends Component {
  render() {
    return (
      <section className="main">
        <ul className="todo-list">
          {this.props.todos.map(todo => (
            <TodoItem
              title={todo.title}
              completed={todo.completed}
              id={todo.id}
              handleComplete={this.props.handleComplete}
            />
          ))}
        </ul>
      </section>
    );
  }
}

export default App;
