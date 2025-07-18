import styled from 'styled-components'
import logo from '../assets/Navbar/logo.png'
import PropTypes from 'prop-types'

const HeaderWrapper = styled.header`
  width: 100%;
  height: 80px;
  padding: 12px 30px 12px 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
  border-bottom: 1px solid #e5e8eb;
  background: #fff;
  box-sizing: border-box;
  margin: 0;
`

const LogoBox = styled.div`
  display: flex;
  align-items: center;
`

const LogoImg = styled.img`
  height: 32px;
  margin-right: 12px;
  display: block;
`

const LogoText = styled.span`
  font-weight: bold;
  font-size: 1.5rem;
  color: #222;
  letter-spacing: -1px;
  margin-top: 10px;
  cursor: default;
`

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 16px;
`

const NavButton = styled.button`
  background: transparent;
  color: #222;
  border: none;
  border-radius: 8px;
  padding: 6px 18px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.15s;
  &:hover {
    background: #f0f4ff;
  }
`

const StartButton = styled.button`
  background: #3182f6;
  color: #fff;
  border: none;
  border-radius: 20px;
  padding: 8px 32px;
  font-size: 1rem;
  cursor: pointer;
  margin-left: 8px;
  transition:
    background 0.2s,
    box-shadow 0.2s,
    transform 0.15s;
  &:hover {
    background: #2563eb;
    box-shadow: 0 4px 16px rgba(37, 99, 235, 0.15);
    transform: translateY(-0.5px) scale(1.01);
  }
`

function Navbar({ type = 'default' }) {
  let menuItems = [<NavButton key="home">Home</NavButton>]

  if (type === 'user-logged-out') {
    menuItems = [
      <NavButton key="home">Home</NavButton>,
      <NavButton key="signup">Sign up</NavButton>,
      <NavButton key="login">Login</NavButton>,
    ]
  } else if (type === 'user-logged-in') {
    menuItems = [
      <NavButton key="home">Home</NavButton>,
      <NavButton key="management">Management</NavButton>,
      <NavButton key="logout">Logout</NavButton>,
    ]
  }

  return (
    <HeaderWrapper>
      <LogoBox>
        <LogoImg src={logo} alt="ClaimBridge" />
        <LogoText>ClaimBridge</LogoText>
      </LogoBox>
      <Nav>
        {menuItems}
        <StartButton>Start</StartButton>
      </Nav>
    </HeaderWrapper>
  )
}
Navbar.propTypes = {
  type: PropTypes.oneOf(['default', 'user-logged-out', 'user-logged-in']),
}

export default Navbar
