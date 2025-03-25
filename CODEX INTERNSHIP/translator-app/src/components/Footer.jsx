const Footer = () => {
  return (
    <footer className="footer">
      <p>
        Powered by React, Vite, and Google Translator API via RapidAPI
      </p>
      <div className="footer-links">
        <a
          href="https://github.com/shbhmexe/Major-Project/tree/main/CODEX%20INTERNSHIP/translator-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Source Code
        </a>
        {' • '}
        <a
          href="https://rapidapi.com/googlecloud/api/google-translate1"
          target="_blank"
          rel="noopener noreferrer"
        >
          API Documentation
        </a>
      </div>
      <div className="copyright">
        © {new Date().getFullYear()} Universal Translator by <a 
          href="https://www.linkedin.com/in/shubham-shukla-62095032a/" 
          target="_blank" 
          rel="noopener noreferrer"
        >Shubham Shukla</a>
      </div>
    </footer>
  );
};

export default Footer; 