import React from 'react';
import { BrowserRouter as Router, Switch, Route, BrowserRouter } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import Navigation from './components/Navigation';
import Posts from './components/posts/Posts';
import PostDetail from './components/posts/PostDetail';
import PostForm from './components/posts/PostForm';
import RegisterForm from './components/register/RegisterForm';
import LoginForm from './components/register/LoginForm';
import PrivateRoute from './components/PrivateRoute';
import { UserProvider } from './components/UserContext';
import { loginReducer, initialState} from './reducers/loginReducer';
import './assets/css/App.css';



function App() {
  return (
    <div className="App" style={{ backgroundColor: "#242933"}}>
      <UserProvider reducer={loginReducer} initialState={initialState}>
      <Navigation />
      <Container>
        <Row>
          <Col>
            <Switch>
              <Route exact path="/posts" component={Posts} />
              <PrivateRoute exact path="/posts/create" component={PostForm}/>
              <Route exact path="/posts/:id" component={PostDetail} />
              <Route path="/accounts/register" component={RegisterForm} />
              <Route path="/accounts/login" component={LoginForm} />
            </Switch>
          </Col>
        </Row>
        </Container>
      </UserProvider>
    </div>
  );
}

export default App;
