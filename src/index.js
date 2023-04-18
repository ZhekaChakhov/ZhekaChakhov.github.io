import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

class Display extends React.Component {
  render() {
    return (
      <div className="display">
        {this.props.value}
      </div>
      );
  }
}

class Square extends React.Component {
  render() {
    return (
      <button className={this.props.className}
      onClick={this.props.onClick}>
        {this.props.value}
      </button>
      );
  }
}

class Board extends React.Component {
  renderSquare(i) {
    if (i == 18) {
      return (
        <Square
          className="square longButton"
          value={this.props.squares[i]}
          onClick={() => this.props.onClick(i)}
        />
      );
    }

    return (
      <Square
        className="square shortButton"
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
          {this.renderSquare(3)}
          {this.renderSquare(4)}
        </div>
        <div className="board-row">
          {this.renderSquare(5)}
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
          {this.renderSquare(9)}
        </div>
        <div className="board-row">
          {this.renderSquare(10)}
          {this.renderSquare(11)}
          {this.renderSquare(12)}
          {this.renderSquare(13)}
          {this.renderSquare(14)}
        </div>
        <div className="board-row">
          {this.renderSquare(15)}
          {this.renderSquare(16)}
          {this.renderSquare(17)}
          {this.renderSquare(18)}
        </div>
      </div>
    );
  }
}

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: ["7", "8", "9", "C", "<-",
                "4", "5", "6", "x", "/",
                "1", "2", "3", "+", "-",
                "0", ".", "+-", "="],
      prev: "",
      operator: "",
      value: "0",
      newExpr: true,
      lastWasOperator: false, 
        //последняя нажатая кнопка была или не была кнопкой оператора
    };
  }

  handleClick(i) {
    const squares = this.state.squares;
    //если нажали на цифру:
    if (!isNaN(squares[i])) {
      this.handleNumber(i);
    }

    //если нажали на оператор кроме "=":
    else if (i == 8 || i == 9 || i == 13 || i == 14) {
      const operator = this.state.operator;
      if(operator == "") {
        // если это первый оператор или до этого было "="
        this.handleOperator(i);
      }
      else {
      // если до этого был уже какой то оператор
        this.handleEqual();
        this.handleOperator(i);
      }
    }

    //если нажали на "=":
    else if (i == 18) {
      this.handleEqual();
    }

    //нажали на другую кнопку:
    else this.handleOther(i);
  }

  handleNumber(i) {
    const squares = this.state.squares;

    this.setState((state, props) => {
      if (state.value == "0" || state.newExpr == true) {
        return {
          value: squares[i],
          newExpr: false,
          lastWasOperator: false,
        }
      }

      return {
        value: state.value + squares[i],
        lastWasOperator: false,
      }
    });
  }

  handleOperator(i) {
    // "+"
    if (i == 13) {
      this.setState((state,props) => {
        return {
          prev: state.value,
          operator: "+",
          newExpr: true,
          lastWasOperator: true,
        }
      });
    }

    // "-"
    if (i == 14) {
      this.setState((state,props) => {
        return {
          prev: state.value,
          operator: "-",
          newExpr: true,
          lastWasOperator: true,
        }
      });
    }

    // "*"
    if (i == 8) {
      this.setState((state,props) => {
        return {
          prev: state.value,
          operator: "*",
          newExpr: true,
          lastWasOperator: true,
        }
      });
    }

    // "/"
    if (i == 9) {
      this.setState((state,props) => {
        return {
          prev: state.value,
          operator: "/",
          newExpr: true,
          lastWasOperator: true,
        }
      });
    }
  }

  // "="
  handleEqual() {
    const operator = this.state.operator;
    const prev = this.state.prev;
    const value = this.state.value;

    if (operator == "+") {
      this.setState({
        operator: "",
        value: String(+prev + +value),
        newExpr: true,
        lastWasOperator: false,
      });
    }

    if (operator == "-") {
      this.setState({
        operator: "",
        value: String(+prev - +value),
        newExpr: true,
        lastWasOperator: false,
      });
    }

    if (operator == "*") {
      this.setState({
        operator: "",
        value: String(+prev * +value),
        newExpr: true,
        lastWasOperator: false,
      });
    }

    if (operator == "/") {
      this.setState({
        operator: "",
        value: String(+prev / +value),
        newExpr: true,
        lastWasOperator: false,
      });
    }
  }

  handleOther(i) {
    // "C"
    if (i == 3) {
      this.setState((state,props) => {
        return {
          prev: "",
          operator: "",
          value: "0",
          newExpr: true,
          lastWasOperator: false,
        }
      });
    }

    // "<-"
    if (i == 4) {
      this.setState((state,props) => {
        if (state.value != "0" && state.newExpr != true &&
          state.lastWasOperator == false) {
          if (state.value.length > 1) {
            return {
              value: state.value.slice(0,-1),
            }
          }
          else return {
            value: "0",
          }
        }
      });
    }

    // "."
    if (i == 16) {
      this.setState((state,props) => {
        if (!state.value.includes(".") &&
          state.lastWasOperator == false) {
          return {
            value: state.value + ".",
            lastWasOperator: false,
          }
        }
      });
    }

    // "+-"
    if (i == 17) {
      this.setState((state,props) => {
        if (state.value != "0" &&
          state.lastWasOperator == false) {
          return {
            value: state.value * (-1),
            lastWasOperator: false,
          }
        }
      });
    }
  }

  render() {
    return (
      <div className="calculator">
        <Display value={this.state.value}/>
        <Board
          squares={this.state.squares}
          onClick={(i) => this.handleClick(i)}
        />
      </div>
      );
  }
}

const root = ReactDOM.createRoot(document.getElementById('root')); 
root.render(<Calculator />);
