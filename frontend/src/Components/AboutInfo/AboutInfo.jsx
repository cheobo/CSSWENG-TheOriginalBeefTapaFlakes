import React from 'react';
import Collapsible from 'react-collapsible';
import './AboutInfo.css';

const AboutInfo = () => {
  return (
    <div className="about-container">
      <h1>ABOUT US</h1>
      <p>What about Original Beef Tapa Flakes? You are currently in the about page where you can check our contact details, payment methods, and our terms service, alongside our refund policy. Do read carefully and feel free to email us using the email in the Contact section to reach out to us for any other concern that wasn’t mentioned in our FAQ.</p>
      
      <div className="collapsible-sections">
        <Collapsible trigger="Shipping">
          <p>Content for Shipping...</p>
        </Collapsible>
        <Collapsible trigger="Service Hours">
          <p>Content for Service Hours...</p>
        </Collapsible>
        <Collapsible trigger="Contact Info">
          <p>Content for Contact Info...</p>
        </Collapsible>
        <Collapsible trigger="Payment Options">
          <p>Content for Payment Options...</p>
        </Collapsible>
        <Collapsible trigger="FAQ">
          <p>Content for FAQ...</p>
        </Collapsible>
        <Collapsible trigger="Terms of Service">
          <p>Content for Terms of Service...</p>
        </Collapsible>
        <Collapsible trigger="Refund Policy">
          <p>Content for Refund Policy...</p>
        </Collapsible>
      </div>
    </div>
  );
}

export default AboutInfo;
