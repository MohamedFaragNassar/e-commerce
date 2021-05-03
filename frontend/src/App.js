import React from 'react';
import {Route,BrowserRouter,Switch } from 'react-router-dom';
import './App.css';
import {useSelector} from 'react-redux';
import AdminPanel from './screeens/admin/AdminPanel'
import Customer from './screeens/Customer';
import ProtectedRoute from './components/ProtectedRoute';
function App() {
  return (
    <BrowserRouter>
      <Switch>
          <ProtectedRoute path="/admin" component={AdminPanel} />
          <Route path="/" component={Customer} />
      </Switch>
    </BrowserRouter>
   
  );
}

export default App;
