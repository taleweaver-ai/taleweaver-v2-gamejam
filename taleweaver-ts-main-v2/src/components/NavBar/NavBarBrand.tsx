import Navbar from 'react-bootstrap/Navbar';

export default function NavBarBrand() {
  return (
    <Navbar.Brand className="flex items-center p-0 mx-4"
      style={{ alignItems: 'center', display: 'flex' }}>
      <a href="/">
        <img
          src="/taleweaver-logo.png"
          height="50"
        />
      </a>
      <span className="mx-2 color-dark-red"
        style={{ fontWeight: 'bold', fontSize: "1.2rem" }}>
        TaleWeaver
      </span>
    </Navbar.Brand >
  )
}
