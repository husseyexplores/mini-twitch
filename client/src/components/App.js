import React, { Component } from 'react'
import { Router, Route } from 'react-router-dom'

import history from '../history'
import Header from './Header'
import StreamCreate from './streams/StreamCreate'
import StreamDelete from './streams/StreamDelete'
import StreamEdit from './streams/StreamEdit'
import StreamList from './streams/StreamList'
import StreamShow from './streams/StreamShow'

class App extends Component {
  render() {
    return (
      <div className="ui container">
        <Router history={history}>
          <div>
            <Header />
            <Route path="/" exact component={StreamList} />
            <Route
              path="/streams/new"
              exact
              component={() => <StreamCreate />}
            />
            <Route
              path="/streams/edit/:streamId"
              exact
              component={StreamEdit}
            />
            <Route
              path="/streams/delete/:streamId"
              exact
              component={StreamDelete}
            />
            <Route
              path="/streams/show/:streamId"
              exact
              component={StreamShow}
            />
          </div>
        </Router>
      </div>
    )
  }
}

export default App
