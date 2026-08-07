const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <h2 className="footer-logo">🎬 Elite Movie</h2>

        <p className="footer-text">
          search for the latest trending movies and discover your next favorite film.
        </p>

        <div className="footer-links">
          <a href="/">Home</a>
          <a href="/trending">Trending</a>
          <a href="/latest">Latest</a>
          <a href="/contact">Contact</a>
        </div>

        <p className="footer-copy">
          © {new Date().getFullYear()} Elite Movie. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;