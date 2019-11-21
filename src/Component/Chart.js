import React, {Component, useState} from 'react';
import CanvasJSReact from '../canvasjs.react';

const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSChart = CanvasJSReact.CanvasJSChart

export default class Chart extends Component{
    constructor(props){
        super();
        this.state = {
            age: props.age,
            currentSaved: props.currentSaved,
            yearlyCont: props.yearlyCont,
            rate: props.rate/100,
            baseData: [],
            investedData: [],
            total: 0

        }
    }
    componentDidMount(){
      let years = 65 - this.state.age;
      let nextBase = this.state.currentSaved;
      let accumulatedTotal = 0;
      let d = new Date();
      let currentYear = d.getFullYear();
      for(let i = 1; i <= years; i++){
        let interest = (nextBase * this.state.rate);
        let yearTotal = nextBase + interest;
        this.state.baseData.push({label: currentYear + (i - 1), y: nextBase});
        this.state.investedData.push({label: currentYear + (i - 1), y: interest});
        nextBase = yearTotal + this.state.yearlyCont;
        accumulatedTotal += yearTotal;
      }
      this.setState({total: accumulatedTotal});
    }
    // shouldComponentUpdate(props){
    //   const diffAge = this.props.age !== props.age;
    //   const diffSaved = this.props.currentSaved !== props.currentSaved;
    //   const diffCont = this.props.yearlyCont !== props.yearlyCont;
    //   const diffRate = this.props.rate !== props.rate;
    //   return diffAge || diffSaved || diffCont || diffRate;
    // }
    render(){
       
    const options = {
        animationEnabled: true,
        exportEnabled: true,
        title: {
          text: `Compounded Interest over ${65-this.state.age} years`,
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
          </div>  
        );
    }
}