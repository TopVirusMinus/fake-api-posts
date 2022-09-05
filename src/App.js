import './App.css';
import React from 'react'
import { Provider } from 'react-redux';
import Posts from "./components/Posts";
import postStore from "./store/postStore";

function App() {
  return (
    <div className="App">
      <h1>Mustafabook</h1>
      <Provider store={postStore}>
        <Posts/>
      </Provider>
    </div>
  );
}

export default App;
