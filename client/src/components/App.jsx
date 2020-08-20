import React from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from 'react-accessible-accordion';
import '../styles/App.css';

import ReviewList from './ReviewList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props)
  }

  // componentDidMount() {
  //   // window.addEventListener('message', this.initPort);
  // }

  // initPort(event) {
  //   var port2 = event.ports[0];
  //   port2.onmessage = this.onMessage;
  // }
  // onMessage(event) {
  //   console.log("MESSAGE IN REVIEW COMPONENT: ", event)
  // }

  render() {
    return (
      <Accordion allowZeroExpanded={true} style={{width:"85%"}}>
          <AccordionItem className="reviewAccordion">
              <AccordionItemHeading>
                  <AccordionItemButton>
                    <div className='reviews'>
                      Reviews
                    </div>
                    <img className="arrow" src="https://static.thenounproject.com/png/196766-200.png"></img>
                  </AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel>
                  <ReviewList />
              </AccordionItemPanel>
          </AccordionItem>
      </Accordion>
  );
  //   return (

  //   <div className="App">
  //     <div>Hello Worl1d</div>
  //   </div>
  //   )
  }
}
export default App;
