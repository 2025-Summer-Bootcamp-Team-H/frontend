import styled from 'styled-components'
import PropTypes from 'prop-types'

const ContainerWrapper = styled.div`
  width: 80vw;
  height: 70vh;
  padding: 30px 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4px;
  flex-shrink: 0;
  border-radius: 30px;
  background: #fff;
  margin: 9vh auto;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
`

function Container({ children, ...props }) {
  return <ContainerWrapper {...props}>{children}</ContainerWrapper>
}

Container.propTypes = {
  children: PropTypes.node,
}

export default Container
