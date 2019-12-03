import React, {Component} from 'react';
import CanvasJSReact from '../canvasjs.react';
import {Button, Row, Col} from 'react-bootstrap';

const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSChart = CanvasJSReact.CanvasJSChart

export default class Chart extends Component{
    constructor(props){
        super();
        this.state = {
            age: props.age,
            baseData: [],
            investedData: [],
            total: 0,
        };
        this.calculate = this.calculate.bind(this);
    }
    componentDidMount(){
      this.calculate();
    }

    calculate(){
      let years = 65 - parseInt(this.props.age);
      let accumulatedTotal = 0;
      let accumulatedBase = parseFloat(this.props.currentSaved);
      let rate = (parseFloat(this.props.rate)/100)
      let yearlyCont = parseFloat(this.props.yearlyCont);
      let accumulatedInterest = 0;
      let d = new Date();
      let currentYear = d.getFullYear();
      let runningBase = accumulatedBase;
      let bData = [];
      let iData = [];
      for(let i = 1; i <= years; i++){
        let interest = runningBase * rate;
        accumulatedInterest += interest;
        bData.push({label: currentYear + (i - 1), y: accumulatedBase});
        iData.push({label: currentYear + (i - 1), y: accumulatedInterest});
        accumulatedBase = accumulatedBase + yearlyCont;
        runningBase = accumulatedBase + interest;
      }
      accumulatedTotal = accumulatedBase + accumulatedInterest;
      this.setState({baseData: bData});
      this.setState({investedData: iData});
      this.setState({age: years});
      this.setState({total: accumulatedTotal});
    }

    render(){
       
    const options = {
        animationEnabled: true,
        exportEnabled: true,
        title: {
          text: `Compounded Interest over ${this.state.age} years`,
          fontFamily: "verdana"
        },
        axisY: {
          title: "in USD",
          prefix: "$",
          suffix: ""
        },
        legend: {
          verticalAlign: "center",
          horizontalAlign: "right",
          reversed: true,
          cursor: "pointer",
        },
        data: [
        {
          type: "stackedColumn",
          name: "Base",
          showInLegend: true,
          yValueFormatString: "$#,###",
          dataPoints: this.state.baseData
        },
        {
          type: "stackedColumn",
          name: "Gain",
          showInLegend: true,
          yValueFormatString: "$#,###",
          dataPoints: this.state.investedData
        },
        ]
      }
        return(
          <div>
              <CanvasJSChart options = {options}/>
              <Row>
                <Col sm={4}>
                  <Button variant="success" size="lg" onClick={ () => this.calculate()}>Calculate</Button>
                </Col>
                <Col sm={8}>
                  ${this.state.total.toFixed(2).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}(USD) after {this.state.age} years.
                </Col>
              </Row>
              
          </div>  
        );
    }
}