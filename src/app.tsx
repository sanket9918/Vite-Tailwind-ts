import Router, { Route } from 'preact-router';
import Entry from './component/entry';
import Work from './component/work';

const App = () => {

  return (
    <>
      <Router>
        <Route path="/" component={Entry} />
        <Route path='/work' component={Work} />
      </Router>
    </>
  )
}

export default App