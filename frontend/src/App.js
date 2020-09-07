import React from 'react';
import { BrowserRouter as Router, Switch, Route, BrowserRouter } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import Navigation from './components/Navigation';
import PostList from './components/posts/PostList';
import PostForm from './components/posts/PostForm';
import SideBar from './components/sidebar/SideBar';
import RegisterForm from './components/register/RegisterForm';
import LoginForm from './components/register/LoginForm';
import './assets/css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';





function App() {
  return (
    <div className="App" style={{ backgroundColor: "#242933"}}>
      <Router>
        <Navigation />
        <Container fluid>
          <Row>
            <Col lg={3} md={8} xs={12} >
              <SideBar />
            </Col>
            <Col lg={8} md={8} xs={12}>
              <Switch>
                <Route exact path="/" component={PostList} />
                <Route path="/post/create" component={PostForm} />
                <Route path="/accounts/register" component={RegisterForm} />
                <Route path="/accounts/login" component={LoginForm} />
              </Switch>
            </Col>
          </Row>
          </Container>
      </Router>
    </div>
  );
}

export default App;
