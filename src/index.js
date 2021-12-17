import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
  return (
    <button className="square" onClick={() => props.onClick()}>
      { props.value }
    </button>
  );
}

class Numbers extends React.Component {
  renderSquare(value) {
    return (
    <Square
      value={value}
      onClick={() => this.props.onClick(value)}
      />
    );
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(7)}
          {this.renderSquare(8)}
          {this.renderSquare(9)}
          {this.renderSquare("/")}
        </div>
        <div className="board-row">
          {this.renderSquare(4)}
          {this.renderSquare(5)}
          {this.renderSquare(6)}
          {this.renderSquare("*")}
        </div>
        <div className="board-row">
          {this.renderSquare(1)}
          {this.renderSquare(2)}
          {this.renderSquare(3)}
          {this.renderSquare("-")}
        </div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(".")}
          {this.renderSquare("=")}
          {this.renderSquare("+")}
        </div>
      </div>
    );
  }
}

class Calculator extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      calculation: "",
      num1: 0,
      num2: 0,
      operator: ""
    };
  }

  handleClick(value) {
    var calc = this.state.calculation
    this.setState({
      answer: ""
    })
    if (value === "+") {
      this.setState({
        num1: parseFloat(calc),
        operator: "+",
        calculation: ""
      })
    }
    else if (value === "-") {
      this.setState({
        num1: parseFloat(calc),
        operator: "-",
        calculation: ""
      })
    }
    else if (value === "*") {
      this.setState({
        num1: parseFloat(calc),
        operator: "*",
        calculation: ""
      })
    }
    else if (value === "/") {
      this.setState({
        num1: parseFloat(calc),
        operator: "/",
        calculation: ""
      })
    }
    else if (value === "=") {
      this.solve();
    } 
    else {
      calc += value
      this.setState({
        calculation: calc
      })
    }
  }

  reset() {
    this.setState({
      calculation: "",
      num1: 0,
      num2: 0,
      operator: "",
      answer: ""
    })
  }

  solve() {
    if (this.state.operator.length === 0) {
      return
    }
    var answer = this.state.num1;
    var num2 = parseFloat(this.state.calculation)
    var operator = this.state.operator;

    if (operator === "+") {
      answer += num2;
    }
    else if (operator === "-") {
      answer -= num2;
    }
    else if (operator === "*") {
      answer *= num2;
    }
    else if (operator === "/") {
      answer /= num2;
    }

    this.setState({
      num1: answer,
      calculation: "",
      operator: "",
      answer: answer,
    });

  }

  render() {
    return (
      <div className="solver">
        <div className="game">
          <div className="game-board">
            <div className="puzzle" onContextMenu={(e) => e.preventDefault()}>
              <h2>{this.state.calculation}{this.state.calculation.length <= 0? this.state.operator: ""}</h2>
              <Numbers
                onClick={(value) => this.handleClick(value)}
              />
            </div>
          </div>
          <h1>Result:</h1>
          <h2>{this.state.answer}</h2>
          <button className="button" onClick={() => this.solve()}>Calculate</button>
          <button className="button" onClick={() => this.reset()}>Clear</button>
        </div>

      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Calculator />,
  document.getElementById('root')
);
