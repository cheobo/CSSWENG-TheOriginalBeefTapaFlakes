import React from 'react';
import Collapsible from 'react-collapsible';
import './AboutInfo.css';

const AboutInfo = () => {
  return (
    <div className="about-page-full">
    <div className="container-1-left-about">
      <h1>ABOUT US</h1>
      <p>What about Original Beef Tapa Flakes? You are currently in the about page where you can check our contact details, payment methods, and our terms service, alongside our refund policy. Do read carefully and feel free to email us using the email in the Contact section to reach out to us for any other concern that wasn’t mentioned in our FAQ.</p>
      </div>

      <div className="container-2-right-about-collapsible">
        <Collapsible trigger="Shipping">
          <p>Via Shoppee or via website.</p>
        </Collapsible>
        <Collapsible trigger="Service Hours">
          <p>7 Days a week, orders are processed until shipping dates.</p>
        </Collapsible>
        <Collapsible trigger="Contact Info">
          <p>0963 690 9006 (Kristine Gail Sandoval)</p>
          <p>0917 426 4330 (Raul Zamora Jr.)</p>
        </Collapsible>
        <Collapsible trigger="Payment Options">
        <p>BDO Savings: 005430247449 (Kristine Gail Sandoval)</p>
					<p>RCBC Checking / RCBC Diskartech: 7590702855</p>
					<p>(Kristine Gail Sandoval-Zamora)</p>
					<p>Limited BPI to BPI Only: 8489340519</p>
					<p>(Kristine Gail Sandoval)</p>
					<p>GCash: 0963 690 9006 (Kristine Gail Sandoval)</p>
					<p>Alternative GCash: 0917 426 4330 (Raul Zamora Jr.)</p>
					<p>UnionBank Savings: 1093 4042 0640 (Kristine Gail Sandoval)</p>
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
