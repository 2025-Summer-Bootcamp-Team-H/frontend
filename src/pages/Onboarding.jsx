import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import logowhite from '../assets/Navbar/logowhite.png'

const PageWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f5f5f5;
`

// --- Section 1: Hero Section (Top Blue Gradient) ---
const HeroSection = styled.section`
  min-height: 100svh;
  height: 100svh;
  background: linear-gradient(180deg, #3b82f6 0%, #1e3a8a 100%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  text-align: center;
  position: relative;
  padding: 0;
  overflow: hidden;
`

const TopBar = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 30px;
  color: white;
  font-size: 1rem;
  font-weight: 500;
`

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 1.5rem;
  font-weight: bold;
`

const LogoImg = styled.img`
  height: 40px;
  margin-right: 12px;
  display: block;
`

const GetStartedButton = styled.button`
  background: none;
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

const HeroTitle = styled.h1`
  font-size: 7em;
  font-weight: bold;
  margin: 0 0 0.5em 0;
  letter-spacing: -2px;
  color: #ffffff;
  margin-top: -2em;
`

const HeroSubtitle = styled.p`
  font-size: 1.5rem;
  margin: 0;
  opacity: 0.9;
  position: absolute;
  left: 50%;
  bottom: 6rem;
  transform: translateX(-50%);
`

const ScrollIndicator = styled.div`
  position: absolute;
  left: 50%;
  bottom: 2rem;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  z-index: 10;

  svg {
    width: 40px;
    height: 40px;
    animation: bounce 1.5s infinite;
  }

  @keyframes bounce {
    0%,
    20%,
    50%,
    80%,
    100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-10px);
    }
    60% {
      transform: translateY(-5px);
    }
  }
`

// --- Section 2: Feature Highlights (White Background) ---
const FeatureSection = styled.section`
  min-height: 100svh;
  padding: 0;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0;
`

const FeatureBlock = styled.div`
  display: flex;
  align-items: center;
  min-height: 100svh;
  height: 100svh;
  max-width: 1200px;
  width: 90%;
  gap: 60px;
  padding: 0 0;
  justify-content: center;

  &:nth-child(odd) {
    flex-direction: row;
  }
  &:nth-child(even) {
    flex-direction: row-reverse;
  }

  @media (max-width: 768px) {
    flex-direction: column !important;
    text-align: center;
  }
`

const FeatureImageWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 300px;

  img {
    max-width: 100%;
    height: auto;
    display: block;
  }
`

const FeatureTextContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const FeatureHeadline = styled.h2`
  font-size: 3.5rem;
  font-weight: bold;
  color: #3b82f6;
  line-height: 1.3;
  margin-bottom: 1.5rem;
`

const FeatureDescription = styled.p`
  font-size: 1.5rem;
  color: #4b5563;
  line-height: 1.6;
  margin-bottom: 2rem;
`

// --- Section 3: Dashboard Preview (Dark Blue Background) ---
const DashboardSection = styled.section`
  min-height: 1024px;
  height: 1024px;
  max-width: 1440px;
  width: 100vw;
  margin: 0 auto;
  background-color: #1e3a8a;
  color: white;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 40px;
  padding: 0;
  box-sizing: border-box;
  overflow: hidden;
`

const DashboardTitle = styled.h2`
  font-size: 2.8rem;
  font-weight: bold;
  margin-bottom: 20px;
`

const DashboardCardsContainer = styled.div`
  display: flex;
  gap: 30px;
  max-width: 1200px;
  width: 80vw;
  justify-content: center;
  align-items: stretch;
  height: 60vh;

  @media (max-width: 1440px) {
    width: 90vw;
  }
  @media (max-width: 1024px) {
    flex-direction: column;
    align-items: center;
    height: auto;
  }
`

const DashboardCard = styled.div`
  background-color: white;
  border-radius: 15px;
  padding: 30px;
  flex: 1;
  min-width: 400px;
  max-width: 500px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  color: #1f2937;
  text-align: left;
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: center;
  align-items: center;
  height: 100%;

  @media (max-width: 1024px) {
    min-width: unset;
    width: 90%;
    height: auto;
  }
`

const DashboardCardTitle = styled.h3`
  font-size: 1.8rem;
  font-weight: bold;
  color: #1f2937;
`

const DashboardImage = styled.img`
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
`

// --- Section 4: Service Benefits/Testimonials (Dark Blue Background) ---
const BenefitsSection = styled.section`
  padding: 80px 0;
  background-color: #1e3a8a;
  color: white;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
`

const BenefitsTitle = styled.h2`
  font-size: 2.8rem;
  font-weight: bold;
  margin-bottom: 20px;
`

const BenefitsSubtitle = styled.p`
  font-size: 1.2rem;
  opacity: 0.8;
  max-width: 800px;
  line-height: 1.6;
`

const BenefitsCardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  max-width: 1200px;
  width: 90%;
  margin-top: 30px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const BenefitCard = styled.div`
  background-color: white;
  border-radius: 15px;
  padding: 30px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  color: #1f2937;
  text-align: left;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 15px;
`

const BenefitIcon = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #e0e7ff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: #3b82f6;
`

const BenefitText = styled.p`
  font-size: 1.1rem;
  line-height: 1.5;
`

const BenefitAuthor = styled.p`
  font-size: 0.9rem;
  color: #6b7280;
  margin-top: auto;
`

// --- Section 5: Service Selection (White Background) ---
const SelectionSection = styled.section`
  padding: 80px 0;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
`

const SelectionTitle = styled.h2`
  font-size: 2.2rem;
  font-weight: bold;
  color: #1f2937;
  margin-bottom: 20px;
`

const SelectionCardsContainer = styled.div`
  display: flex;
  gap: 30px;
  justify-content: center;
  max-width: 800px;
  width: 90%;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`

const SelectionCard = styled.div`
  background: linear-gradient(135deg, #3b82f6, #1e3a8a);
  border-radius: 20px;
  padding: 40px 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  color: white;
  flex: 1;
  min-width: 280px;
  cursor: pointer;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.25);
  }

  @media (max-width: 768px) {
    width: 90%;
  }
`

const SelectionIcon = styled.div`
  width: 80px;
  height: 80px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;

  svg {
    width: 40px;
    height: 40px;
    fill: white;
  }
`

const SelectionCardTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 10px;
`

const SelectionCardDescription = styled.p`
  font-size: 1rem;
  opacity: 0.9;
  line-height: 1.5;
`

function Onboarding() {
  const navigate = useNavigate()

  const handleGetStartedClick = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    })
  }

  const handleScroll = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    })
  }

  return (
    <PageWrapper>
      {/* Hero Section */}
      <HeroSection>
        <TopBar>
          <Logo>
            <LogoImg src={logowhite} alt="ClaimBridge 로고" />
            <span
              style={{
                fontWeight: 'bold',
                fontSize: '2rem',
                color: '#fff',
                letterSpacing: '-1px',
                marginTop: '10px',
                cursor: 'default',
              }}
            >
              ClaimBridge
            </span>
          </Logo>
          <GetStartedButton onClick={handleGetStartedClick}>
            Start
          </GetStartedButton>
        </TopBar>
        <HeroTitle>Claim Bridge</HeroTitle>
        <ScrollIndicator onClick={handleScroll}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="white"
          >
            <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6z" />
          </svg>
        </ScrollIndicator>
        <HeroSubtitle>보험금 산정 자동 서비스</HeroSubtitle>
      </HeroSection>

      {/* Feature Highlights Section */}
      <FeatureSection>
        <FeatureBlock>
          <FeatureImageWrapper>
            <img
              src="https://via.placeholder.com/400x300?text=Upload+Image"
              alt="Upload documents"
            />
          </FeatureImageWrapper>
          <FeatureTextContent>
            <FeatureHeadline>
              진단서와 영수증만 업로드하면 끝!
              <br />
              복잡한 보험 청구, 이제 간편하게
            </FeatureHeadline>
            <FeatureDescription>
              진단서와 영수증 하나만 업로드하면, 복잡한 서류 제출 없이
              <br />더 쉽고 빠르게 청구할 수 있습니다.
            </FeatureDescription>
          </FeatureTextContent>
        </FeatureBlock>
        <FeatureBlock>
          <FeatureImageWrapper>
            <img
              src="https://via.placeholder.com/400x300?text=Processing+Image"
              alt="Automatic processing"
            />
          </FeatureImageWrapper>
          <FeatureTextContent>
            <FeatureHeadline>
              업로드된 정보를 자동 분석하여
              <br />
              1차 보험 심사부터 산정 금액 계산까지 한번에!
            </FeatureHeadline>
            <FeatureDescription>
              업로드된 진단서와 영수증을 자동 분석해
              <br />
              반복 작업과 실수를 줄이고
              <br />
              업무 효율과 고객 만족도를 높일 수 있습니다.
            </FeatureDescription>
          </FeatureTextContent>
        </FeatureBlock>
      </FeatureSection>

      {/* Dashboard Preview Section */}
      <DashboardSection>
        <DashboardTitle>Claim Bridge에서 경험하세요</DashboardTitle>
        <DashboardCardsContainer>
          <DashboardCard>
            <DashboardCardTitle>
              한눈에 볼 수 있는 관리 페이지
            </DashboardCardTitle>
            <DashboardImage
              src="https://via.placeholder.com/500x300?text=Dashboard+View+1"
              alt="Management page"
            />
          </DashboardCard>
          <DashboardCard>
            <DashboardCardTitle>
              간편하게 확인하는 보험 산정 금액
            </DashboardCardTitle>
            <DashboardImage
              src="https://via.placeholder.com/500x300?text=Dashboard+View+2"
              alt="Insurance amount check"
            />
          </DashboardCard>
        </DashboardCardsContainer>
      </DashboardSection>

      {/* Service Benefits/Testimonials Section */}
      <BenefitsSection>
        <BenefitsTitle>간편하고 편리한 보험 서비스</BenefitsTitle>
        <BenefitsSubtitle>
          많은 고객들과 보험사 직원들이 편리하게 사용한 Claim Bridge,
          <br />
          어떤 점이 달라졌을까요?
        </BenefitsSubtitle>
        <BenefitsCardsContainer>
          <BenefitCard>
            <BenefitIcon>👤</BenefitIcon>
            <BenefitText>
              보험금 청구는 그 자체로 복잡합니다.
              <br />
              그 복잡함을 줄여주는 것이 클레임 브릿지의
              <br />
              핵심 목표입니다.
            </BenefitText>
            <BenefitAuthor>20대 남성 직장인</BenefitAuthor>
          </BenefitCard>
          <BenefitCard>
            <BenefitIcon>👩‍💻</BenefitIcon>
            <BenefitText>
              진단서와 영수증을 분석하여
              <br />
              정확한 산정 금액을 알려주어
              <br />
              신뢰도를 높여줍니다.
            </BenefitText>
            <BenefitAuthor>20대 여성 직장인</BenefitAuthor>
          </BenefitCard>
          <BenefitCard>
            <BenefitIcon>📈</BenefitIcon>
            <BenefitText>
              반복적인 수작업을 줄여
              <br />
              업무 효율성을 극대화하고
              <br />
              직원들의 만족도를 높여줍니다.
            </BenefitText>
            <BenefitAuthor>보험사 직원</BenefitAuthor>
          </BenefitCard>
          <BenefitCard>
            <BenefitIcon>✅</BenefitIcon>
            <BenefitText>
              모든 보험 청구 과정을
              <br />
              한눈에 관리할 수 있어
              <br />
              편리합니다.
            </BenefitText>
            <BenefitAuthor>보험사 직원</BenefitAuthor>
          </BenefitCard>
        </BenefitsCardsContainer>
      </BenefitsSection>

      {/* Service Selection Section */}
      <SelectionSection>
        <SelectionTitle>사용하실 서비스를 선택해주세요</SelectionTitle>
        <SelectionCardsContainer>
          <SelectionCard onClick={() => navigate('/upload')}>
            <SelectionIcon>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="white"
              >
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10H7v-2h10v2zm0-4H7V7h10v2z" />
              </svg>
            </SelectionIcon>
            <SelectionCardTitle>일반 사용자</SelectionCardTitle>
            <SelectionCardDescription>
              진단서와 영수증 업로드
              <br />
              보험금 청구
            </SelectionCardDescription>
          </SelectionCard>
          <SelectionCard onClick={() => navigate('/login')}>
            <SelectionIcon>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="white"
              >
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            </SelectionIcon>
            <SelectionCardTitle>보험사 직원</SelectionCardTitle>
            <SelectionCardDescription>
              자동화된 보험금 산정
              <br />
              관리 시스템
            </SelectionCardDescription>
          </SelectionCard>
        </SelectionCardsContainer>
      </SelectionSection>
    </PageWrapper>
  )
}

export default Onboarding
