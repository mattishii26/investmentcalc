import React, {useState} from 'react';
import './App.css';
import {Navbar, NavbarBrand, Container, Row, Col, Form, Card, Button} from 'react-bootstrap';
import Chart from './Component/Chart.js';

function App() {
  let [currentAge, setCurrentAge] = useState(18);
  let [currentSaved, setSaved] = useState(5000.00);
  let [annualCon, setAnnualCon] = useState(6000.00);
  let [ror, setROR] = useState(6);
  
  const graphBuilder = () => {
    console.log(currentAge);
    console.log(currentSaved);
    console.log(annualCon);
    console.log(ror);
  }


  return (
    <div className="App">
      <Navbar bg="dark" variant="dark">
        <NavbarBrand href="#home">How much will you have invested?</NavbarBrand>
      </Navbar>
      <br></br>
      <Container>
        <Row>
          <Col sm={4}>
            <Form>
              <Form.Group controlId="formCurrentAge">
                <Form.Label>How Old are you now?</Form.Label>
                <Form.Control type="number" min={18} max={65} value={currentAge} placeholder="How old are you now?" onChange={(ev)=>setCurrentAge(ev.target.value)}></Form.Control>
              </Form.Group>
              <Form.Group controlId="formCurrentSaved">
                <Form.Label>How much do you have invested?</Form.Label>
                <Form.Control type="number" min={0} step={0.01} value={currentSaved} placeholder="How much do you have invested currently?" onChange={(ev) => setSaved(ev.target.value)}></Form.Control>
              </Form.Group>
              <Form.Group controlId="formYearlyContribution">
                <Form.Label>How much do you plan to contribute annually?</Form.Label>
                <Form.Control type="number" min={0} step={0.01} value={annualCon} placeholder="How much do you plan to contribute annually?" onChange={(ev) => setAnnualCon(ev.target.value)}></Form.Control>
              </Form.Group>
              <Form.Group controlId="formApproximateReturn">
                <Form.Label>Estimated Rate of Return?</Form.Label>
                <Form.Control type="number" value={ror} step={0.1} placeholder="Approximate yearly Return" onChange={(ev) => setROR(ev.target.value)}></Form.Control>
              </Form.Group>
            </Form>
            <Button variant="success" size="lg" onClick={graphBuilder}>Calculate</Button>
          </Col>
          <Col sm={8}>
            <Chart age={currentAge} currentSaved={currentSaved} yearlyCont={annualCon} rate={ror}></Chart>
          </Col>
        </Row>
        <br></br>
        <Card>
          <Card.Header>Assumptions</Card.Header>
          <Card.Body>
            Retirement Age is 65 Years old<br/>
            Rate of Return is Constant. Average is around 6%
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default App;
