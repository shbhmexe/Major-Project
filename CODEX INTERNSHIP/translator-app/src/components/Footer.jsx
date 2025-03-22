const Footer = () => {
  return (
    <footer className="footer">
      <p>
        Powered by React, Vite, and Google Translator API via RapidAPI
      </p>
      <div className="footer-links">
        <a
          href="https://github.com/yourusername/translator-app"
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
        © {new Date().getFullYear()} Universal Translator
      </div>
    </footer>
  );
};

export default Footer; 