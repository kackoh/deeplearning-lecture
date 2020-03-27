import React from "react";
import ReactDOM from "react-dom";
import DrawableCanvas from './components/DrawableCanvas.jsx'

class Layout extends React.Component {
  render() {
    return (
      <DrawableCanvas />
    );
  }
}

const app = document.getElementById('app');
ReactDOM.render(<Layout/>, app);