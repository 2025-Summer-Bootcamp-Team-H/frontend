import styled, { keyframes } from 'styled-components'
import PropTypes from 'prop-types'

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
`

const LoadingOverlayWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  backdrop-filter: blur(5px);
`

const LoadingContainer = styled.div`
  background: white;
  border-radius: 20px;
  padding: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  max-width: 400px;
  text-align: center;
`

const Spinner = styled.div`
  width: 60px;
  height: 60px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3182f6;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`

const LoadingTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
  margin: 0;
  font-family: 'Public Sans';
`

const LoadingText = styled.p`
  font-size: 1rem;
  color: #666;
  margin: 0;
  font-family: 'Public Sans';
  animation: ${pulse} 2s ease-in-out infinite;
`

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background: #f0f0f0;
  border-radius: 4px;
  overflow: hidden;
  margin-top: 1rem;
`

const ProgressFill = styled.div`
  height: 100%;
  background: linear-gradient(90deg, #3182f6, #4caf50);
  border-radius: 4px;
  animation: ${pulse} 1.5s ease-in-out infinite;
  width: 100%;
`

function LoadingOverlay({
  isVisible,
  title = '위조 분석 중...',
  text = '문서를 분석하고 있습니다. 잠시만 기다려주세요.',
}) {
  if (!isVisible) return null

  return (
    <LoadingOverlayWrapper>
      <LoadingContainer>
        <Spinner />
        <div>
          <LoadingTitle>{title}</LoadingTitle>
          <LoadingText>{text}</LoadingText>
        </div>
        <ProgressBar>
          <ProgressFill />
        </ProgressBar>
      </LoadingContainer>
    </LoadingOverlayWrapper>
  )
}

LoadingOverlay.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  title: PropTypes.string,
  text: PropTypes.string,
}

export default LoadingOverlay
