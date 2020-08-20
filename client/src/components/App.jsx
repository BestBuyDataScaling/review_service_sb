/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from 'react-accessible-accordion';
import '../styles/App.css';

// eslint-disable-next-line import/extensions
import ReviewList from './ReviewList.jsx';

class App extends React.Component {
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
      <Accordion allowZeroExpanded style={{ width: '85%' }}>
        <AccordionItem className="reviewAccordion">
          <AccordionItemHeading>
            <AccordionItemButton>
              <div className="reviews">
                Reviews
              </div>
              <img alt="" className="arrow" src="https://static.thenounproject.com/png/196766-200.png" />
            </AccordionItemButton>
          </AccordionItemHeading>
          <AccordionItemPanel>
            <ReviewList />
          </AccordionItemPanel>
        </AccordionItem>
      </Accordion>
    );
  }
}
export default App;
