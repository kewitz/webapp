import React from 'react'
import { connect } from 'react-redux'
import Navbar from '../components/navigation/Navbar'
import Modal from '../components/modals/Modal'
import Devtools from '../components/devtools/Devtools'

class App extends React.Component {

  render() {
    const { location, children } = this.props
    const { pathname } = location
    return (
      <section className="App">
        <main className="Main" data-pathname={pathname} role="main">
          {children}
        </main>
        <Navbar/>
        <Modal/>
        <Devtools/>
      </section>
    )
  }
}

App.propTypes = {
  location: React.PropTypes.shape({
    pathname: React.PropTypes.string.isRequired,
  }),
  children: React.PropTypes.node.isRequired,
}

export default connect()(App)

