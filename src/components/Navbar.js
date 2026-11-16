function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        <p>Logo</p>
      </div>
      <div className="nav-links-container">
         <div className="nav-links">
        <a href="#">Home</a>
        <a href="#">About</a>
        <a href="#">Services</a>
        <a href="#">Contact</a>
      </div>
      <button className="create-account-btn">Create account</button>
      </div>
    </nav>
  );
}

export default Navbar;