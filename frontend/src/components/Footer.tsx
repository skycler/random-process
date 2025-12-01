import React from 'react';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <p>Random Process Illustration &copy; {new Date().getFullYear()}</p>
      <p>
        Learn more about{' '}
        <a
          href="https://en.wikipedia.org/wiki/Stochastic_process"
          target="_blank"
          rel="noopener noreferrer"
        >
          Random Processes
        </a>
      </p>
    </footer>
  );
};

export default Footer;
