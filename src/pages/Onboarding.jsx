import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import logo from '../assets/Onboarding/logo.png'
import Second from '../assets/Onboarding/Second.png'
import Third from '../assets/Onboarding/Third.png'
import Management from '../assets/Onboarding/Management.png'
import Report from '../assets/Onboarding/Report.png'
import YoungMan from '../assets/Onboarding/YoungMan.png'
import YoungWoman from '../assets/Onboarding/YoungWoman.png'
import OldMan from '../assets/Onboarding/OldMan.png'
import YoungMan2 from '../assets/Onboarding/YoungMan2.png'
import Customer from '../assets/Onboarding/Customer.png'
import User from '../assets/Onboarding/User.png'

const PageWrapper = styled.div`
  width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f5f5f5;
`

// --- Section 1: Hero Section (Top Blue Gradient) ---
const HeroSection = styled.section`
  min-height: 100svh;
  height: 100svh;
  background: #e0f2fe;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #1f2937;
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
  padding: 12px 20px;
  color: white;
  font-size: 1rem;
  font-weight: 500;
  box-sizing: border-box;
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
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  color: #fff;
  border: none;
  border-radius: 20px;
  padding: 8px 24px;
  font-size: 1rem;
  cursor: pointer;
  margin-left: 0;
  transition:
    background 0.2s,
    box-shadow 0.2s,
    transform 0.15s;
  &:hover {
    background: linear-gradient(135deg, #2563eb, #1e40af);
    box-shadow: 0 4px 16px rgba(37, 99, 235, 0.15);
    transform: translateY(-0.5px) scale(1.01);
  }
`

const HeroTitle = styled.h1`
  font-size: 7em;
  font-weight: 600;
  margin: 0 0 0.5em 0;
  letter-spacing: -2px;
  color: #1f2937;
  z-index: 10;
`

const HeroTitle2 = styled.h3`
  font-size: 2em;
  font-weight: bold;
  margin: 0 0 0.5em 0;
  letter-spacing: -2px;
  color: #374151;
  z-index: 10;
`

const HeroSubtitle = styled.p`
  font-size: 1.5rem;
  margin: 0;
  color: #6b7280;
  position: absolute;
  left: 50%;
  bottom: 6rem;
  transform: translateX(-50%);
  z-index: 10;
`

// 복잡한 SVG 블롭 모형 (이미지 스타일)
const PhotoBlob = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 760px;
  height: 760px;
  z-index: 1;
  pointer-events: none;

  svg {
    width: 100%;
    height: 100%;
    viewbox: 0 0 736 736;
    fill: none;
  }

  .voice-bubble_bubble-1 {
    opacity: 0.8;
    fill: url(#paint0_linear_144_10825);
    animation: flower-1 4s ease-in-out infinite alternate;
    transform-origin: center center;
  }

  .voice-bubble_bubble-2 {
    opacity: 0.5;
    fill: url(#paint1_linear_144_10825);
    animation: flower-2 4s ease-in-out infinite alternate;
    transform-origin: center center;
  }

  .voice-bubble_bubble-3 {
    opacity: 0.6;
    fill: url(#paint2_linear_144_10825);
    animation: flower-3 4s ease-in-out infinite alternate;
    transform-origin: center center;
  }

  @keyframes flower-1 {
    0% {
      transform: rotate(0deg) scale(1);
      opacity: 0.8;
    }
    100% {
      transform: rotate(180deg) scale(0.8);
      opacity: 0.9;
    }
  }

  @keyframes flower-2 {
    0% {
      transform: rotate(0deg) scale(1);
      opacity: 0.5;
    }
    100% {
      transform: rotate(-120deg) scale(0.8);
      opacity: 0.7;
    }
  }

  @keyframes flower-3 {
    0% {
      transform: rotate(0deg) scale(1);
      opacity: 0.1;
    }
    100% {
      transform: rotate(240deg) scale(0.8);
      opacity: 0.3;
    }
  }
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
  width: 85%;
  gap: 60px;
  padding: 0 80px;
  margin: 0 auto;

  &:nth-child(odd) {
    flex-direction: row;
    justify-content: flex-start;
  }
  &:nth-child(even) {
    flex-direction: row-reverse;
    padding: 0 80px;
    justify-content: flex-end;
  }

  @media (max-width: 768px) {
    flex-direction: column !important;
    text-align: center;
    padding: 0 20px;
    width: 95%;
  }
`

const FeatureImageWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 300px;
`

const ImageContainer = styled.div`
  width: 600px;
  height: 550px;
  background: transparent;
  position: relative;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 90%;
    height: 90%;
    background-image: url(${(props) => props.src});
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    z-index: 1;
  }
`

const FeatureTextContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const FeatureHeadline = styled.h2`
  font-size: 2.8rem;
  font-weight: 600;
  color: #1f2937;
  line-height: 1.2;
  margin-bottom: 1.5rem;
`

const FeatureDescription = styled.p`
  font-size: 1.2rem;
  color: #6b7280;
  line-height: 1.5;
  margin-bottom: 2rem;
`

// --- Section 3: Dashboard Preview (Dark Blue Background) ---
const DashboardSection = styled.section`
  min-height: 1024px;
  height: 1024px;
  width: 100vw;
  margin: 0;
  background: linear-gradient(180deg, #3b82f6 0%, #1e40af 50%, #1e3a8a 100%);
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

// --- Section 4: Service Benefits/Testimonials (Dark Blue Background) ---
const BenefitsSection = styled.section`
  padding: 80px 0;
  background: linear-gradient(180deg, #1e3a8a 0%, #1e40af 50%, #3b82f6 100%);
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
  display: flex;
  gap: 30px;
  max-width: none;
  width: fit-content;
  margin-top: 30px;
  justify-content: flex-start;
  align-items: stretch;
  position: relative;
  animation: scroll 25s linear infinite;

  @keyframes scroll {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-50%);
    }
  }

  @media (max-width: 1024px) {
    gap: 20px;
  }

  @media (max-width: 768px) {
    gap: 15px;
  }
`

const BenefitCard = styled.div`
  background-color: white;
  border-radius: 15px;
  border: 2px solid #3b82f6;
  padding: 25px 30px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  color: #1f2937;
  text-align: left;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  width: 280px;
  min-height: 280px;
  flex-shrink: 0;
`

const BenefitCardTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: bold;
  color: #1f2937;
  margin: 0;
`

const BenefitText = styled.p`
  font-size: 1rem;
  line-height: 1.5;
`

const BenefitAuthor = styled.div`
  font-size: 0.9rem;
  color: #6b7280;
  margin-top: auto;
  display: flex;
  align-items: center;
  gap: 8px;
`

// --- Section 5: Service Selection (White Background) ---
const SelectionSection = styled.section`
  padding: 100px 0;
  background-color: #f5f5f5;
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
  text-align: center;
`

const SelectionCardsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
  justify-content: center;
  max-width: 800px;
  width: 90%;
  background-color: white;
  border-radius: 20px;
  padding: 50px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    align-items: center;
    padding: 40px;
  }
`

const SelectionCard = styled.div`
  background: linear-gradient(180deg, #1e3a8a 0%, #1e40af 50%, #3b82f6 100%);

  border-radius: 20px;
  padding: 45px 35px;
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
  box-shadow:
    0 8px 25px rgba(30, 58, 138, 0.3),
    0 4px 10px rgba(0, 0, 0, 0.1);

  img {
    width: 100px;
    height: auto;
    margin-bottom: 22px;
  }

  &:hover {
    transform: translateY(-8px);
    box-shadow:
      0 15px 35px rgba(30, 58, 138, 0.4),
      0 8px 15px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 768px) {
    width: 90%;
    padding: 40px 30px;
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
        {/* 복잡한 SVG 블롭 모형 */}
        <PhotoBlob>
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 736 736"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient
                id="paint0_linear_144_10825"
                x1="368"
                y1="170"
                x2="368"
                y2="596"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#BFDBFE" stopOpacity="0.8" />
                <stop offset="0.5" stopColor="#93C5FD" stopOpacity="0.7" />
                <stop offset="1" stopColor="#60A5FA" stopOpacity="0.6" />
              </linearGradient>
              <linearGradient
                id="paint1_linear_144_10825"
                x1="368"
                y1="159"
                x2="368"
                y2="592"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#BAE6FD" stopOpacity="0.5" />
                <stop offset="0.5" stopColor="#7DD3FC" stopOpacity="0.4" />
                <stop offset="1" stopColor="#38BDF8" stopOpacity="0.3" />
              </linearGradient>
              <linearGradient
                id="paint2_linear_144_10825"
                x1="368"
                y1="170"
                x2="368"
                y2="596"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#BFDBFE" stopOpacity="0.8" />
                <stop offset="0.5" stopColor="#93C5FD" stopOpacity="0.7" />
                <stop offset="1" stopColor="#60A5FA" stopOpacity="0.6" />
              </linearGradient>
            </defs>
            <path
              className="voice-bubble_bubble-1"
              opacity="0.8"
              fill="url(#paint0_linear_144_10825)"
              d="M171.705 491.676C137.431 471.644 123.636 429.089 139.638 392.758L172.543 318.056C174.645 313.283 176.264 308.312 177.376 303.217L194.772 223.465C203.233 184.678 239.442 158.408 278.941 162.4L360.154 170.61C365.342 171.135 370.57 171.138 375.76 170.621L456.985 162.521C496.487 158.582 532.661 184.901 541.069 223.699L558.358 303.475C559.462 308.572 561.074 313.545 563.173 318.321L595.974 393.067C611.927 429.419 598.074 471.956 563.773 491.942L493.244 533.036C488.738 535.662 484.506 538.732 480.612 542.201L419.661 596.496C390.018 622.902 345.282 622.872 315.675 596.426L254.798 542.048C250.908 538.573 246.681 535.498 242.178 532.866L171.705 491.676Z"
            />
            <path
              className="voice-bubble_bubble-2"
              opacity="0.8"
              fill="url(#paint1_linear_144_10825)"
              d="M275.003 592.506C235.45 595.906 199.639 569.095 191.761 530.186L175.564 450.181C174.529 445.07 172.985 440.075 170.954 435.271L139.175 360.084C123.719 323.517 138.151 281.174 172.722 261.658L243.805 221.53C248.347 218.967 252.622 215.955 256.561 212.539L318.248 159.081C348.249 133.082 392.98 133.723 422.223 160.571L482.353 215.775C486.194 219.302 490.379 222.435 494.845 225.128L564.75 267.276C598.747 287.774 611.96 330.514 595.463 366.623L561.541 440.868C559.374 445.612 557.688 450.561 556.507 455.64L538.023 535.148C529.034 573.815 492.469 599.589 453.03 595.057L371.936 585.739C366.755 585.144 361.527 585.069 356.331 585.516L275.003 592.506Z"
            />
            <path
              className="voice-bubble_bubble-3"
              opacity="0.1"
              stroke="url(#paint0_linear_144_10825)"
              strokeWidth="4"
              fill="url(#paint2_linear_144_10825)"
              d="M171.705 491.676C137.431 471.644 123.636 429.089 139.638 392.758L172.543 318.056C174.645 313.283 176.264 308.312 177.376 303.217L194.772 223.465C203.233 184.678 239.442 158.408 278.941 162.4L360.154 170.61C365.342 171.135 370.57 171.138 375.76 170.621L456.985 162.521C496.487 158.582 532.661 184.901 541.069 223.699L558.358 303.475C559.462 308.572 561.074 313.545 563.173 318.321L595.974 393.067C611.927 429.419 598.074 471.956 563.773 491.942L493.244 533.036C488.738 535.662 484.506 538.732 480.612 542.201L419.661 596.496C390.018 622.902 345.282 622.872 315.675 596.426L254.798 542.048C250.908 538.573 246.681 535.498 242.178 532.866L171.705 491.676Z"
            />
          </svg>
        </PhotoBlob>

        <TopBar>
          <Logo>
            <LogoImg src={logo} alt="ClaimBridge 로고" />
            <span
              style={{
                fontWeight: 'bold',
                fontSize: '2rem',
                color: '#1f2937',
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
        <HeroTitle2>보험 업계의 새로운 패러다임을 열다</HeroTitle2>
        <ScrollIndicator onClick={handleScroll}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="#6b7280"
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
            <ImageContainer src={Second} />
          </FeatureImageWrapper>
          <FeatureTextContent>
            <FeatureHeadline>
              <span style={{ color: '#3b82f6' }}>
                진단서와 영수증만 업로드하면 끝!
              </span>
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
            <ImageContainer src={Third} />
          </FeatureImageWrapper>
          <FeatureTextContent>
            <FeatureHeadline>
              업로드된 정보를 자동 분석하여
              <br />
              <span style={{ color: '#3b82f6' }}>
                1차 보험 심사부터 산정 금액 계산까지 한번에!
              </span>
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
        <div
          style={{
            backgroundColor: 'white',
            borderRadius: '20px',
            padding: '40px',
            maxWidth: '1200px',
            width: '90%',
            margin: '0 auto',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
          }}
        >
          <div
            style={{
              display: 'flex',
              gap: '40px',
              alignItems: 'flex-start',
            }}
          >
            <div style={{ flex: 1 }}>
              <h3
                style={{
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  marginBottom: '20px',
                  lineHeight: '1.4',
                }}
              >
                <span style={{ color: '#6b7280' }}>한눈에 볼 수 있는</span>{' '}
                <span style={{ color: '#3b82f6' }}>관리 페이지</span>
              </h3>
              <img
                src={Management}
                alt="Management page"
                style={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: '8px',
                }}
              />
            </div>
            <div style={{ flex: 1 }}>
              <h3
                style={{
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  marginBottom: '20px',
                  lineHeight: '1.4',
                }}
              >
                <span style={{ color: '#6b7280' }}>간편하게 확인하는</span>{' '}
                <span style={{ color: '#3b82f6' }}>보험 산정 금액</span>
              </h3>
              <img
                src={Report}
                alt="Insurance report"
                style={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: '8px',
                }}
              />
            </div>
          </div>
        </div>
      </DashboardSection>

      {/* Service Benefits/Testimonials Section */}
      <BenefitsSection>
        <BenefitsTitle>&apos;다른&apos; 보험 상담 서비스</BenefitsTitle>
        <BenefitsSubtitle>
          토스인슈어런스 보험상담 후기에 가장 많이 등장하는 단어는
          &apos;다른&apos;이에요. 상담을 받으면서 자연스럽게 이전에 경험했던
          보험상담과 비교하기 때문인데요. 어떤 점이 달랐을까요?
        </BenefitsSubtitle>
        <div style={{ overflow: 'hidden', width: '100%' }}>
          <BenefitsCardsContainer>
            {/* 첫 번째 세트 */}
            {/* 첫 번째 세트 */}
            <BenefitCard>
              <BenefitCardTitle>편리한 보험 청구</BenefitCardTitle>
              <BenefitText>
                “솔직히 보험 청구하는 거 진짜 귀찮았거든요. 근데 이건 그냥
                진단서 사진 올리면 끝이라서 너무 편했어요. 예전엔 뭔 서류가
                그렇게 많고 복잡했는지… 이제는 그런 거 없이도 다 정리해주니까
                시간도 아끼고, 뭔가 내가 제대로 처리하고 있다는 확신도 들어요.”
              </BenefitText>
              <BenefitAuthor>
                <span>
                  <img
                    src={YoungMan2}
                    alt="YoungMan2"
                    style={{ width: '30px', height: '40px' }}
                  />
                </span>
                <span style={{ fontWeight: 'bold' }}>20대 남성 최일우</span>
              </BenefitAuthor>
            </BenefitCard>
            <BenefitCard>
              <BenefitCardTitle>정확한 산정 서비스</BenefitCardTitle>
              <BenefitText>
                “병원에서 받은 진단서만 올렸는데 알아서 텍스트로 변환해주고,
                OCR도 정확해서 놀랐어요. 나처럼 컴퓨터 잘 못하는 사람도 어렵지
                않게 쓸 수 있어서 좋았어요.”
              </BenefitText>
              <BenefitAuthor>
                <span>
                  <img
                    src={YoungWoman}
                    alt="YoungWoman"
                    style={{ width: '30px', height: '40px' }}
                  />
                </span>
                <span style={{ fontWeight: 'bold' }}>20대 여성 김수현</span>
              </BenefitAuthor>
            </BenefitCard>
            <BenefitCard>
              <BenefitCardTitle>업무 효율성 증가</BenefitCardTitle>
              <BenefitText>
                “이 시스템 쓰면서 확실히 업무 효율이 좋아졌어요. 진단서나
                영수증을 일일이 확인할 필요 없이, OCR로 필요한 정보가 깔끔하게
                들어오니까 확인만 하면 돼요. 검색 기능도 잘 되어 있고, 청구 내역
                통계까지 바로 볼 수 있어서 한눈에 파악돼요. 특히 문제가 생기면
                슬랙으로 바로 알림 오는 게 진짜 편해요.”
              </BenefitText>
              <BenefitAuthor>
                <span>
                  <img
                    src={OldMan}
                    alt="OldMan"
                    style={{ width: '30px', height: '40px' }}
                  />
                </span>
                <span style={{ fontWeight: 'bold' }}>보험사 직원 김태수</span>
              </BenefitAuthor>
            </BenefitCard>
            <BenefitCard>
              <BenefitCardTitle>간편한 관리</BenefitCardTitle>
              <BenefitText>
                “청구 건수가 많아질수록 사람이 일일이 보는 데 한계가 있었는데,
                지금은 진단서나 영수증 정보가 깔끔하게 정리돼서 업무가 훨씬
                수월해졌습니다. 특히 위조 확인도 시스템적으로 되니까 검토 시간도
                줄고 실수도 줄었어요.”
              </BenefitText>
              <BenefitAuthor>
                <span>
                  <img
                    src={YoungMan}
                    alt="YoungMan"
                    style={{ width: '30px', height: '40px' }}
                  />
                </span>
                <span style={{ fontWeight: 'bold' }}>보험사 직원 윤일환</span>
              </BenefitAuthor>
            </BenefitCard>
            <BenefitCard>
              <BenefitCardTitle>직관적인 인터페이스</BenefitCardTitle>
              <BenefitText>
                처음 이용했는데도 어떤 버튼을 눌러야 할지 한눈에 보였어요.
                복잡한 설명 없이도 그냥 따라가기만 하면 됐어요.
              </BenefitText>
              <BenefitAuthor>
                <span>
                  <img
                    src={YoungWoman}
                    alt="YoungWoman"
                    style={{ width: '30px', height: '40px' }}
                  />
                </span>
                <span style={{ fontWeight: 'bold' }}>20대 여성 오유민</span>
              </BenefitAuthor>
            </BenefitCard>
            <BenefitCard>
              <BenefitCardTitle>가족 보험도 한 번에</BenefitCardTitle>
              <BenefitText>
                저 혼자뿐만 아니라 가족 명의 보험도 함께 처리할 수 있어서 부모님
                것도 한 번에 챙기기 편했어요.
              </BenefitText>
              <BenefitAuthor>
                <span>
                  <img
                    src={YoungWoman}
                    alt="YoungWoman"
                    style={{ width: '30px', height: '40px' }}
                  />
                </span>
                <span style={{ fontWeight: 'bold' }}>20대 여성 김다현</span>
              </BenefitAuthor>
            </BenefitCard>

            {/* 두 번째 세트 (무한 루프를 위한 복제) */}
            <BenefitCard>
              <BenefitCardTitle>편리한 보험 청구</BenefitCardTitle>
              <BenefitText>
                “솔직히 보험 청구하는 거 진짜 귀찮았거든요. 근데 이건 그냥
                진단서 사진 올리면 끝이라서 너무 편했어요. 예전엔 뭔 서류가
                그렇게 많고 복잡했는지… 이제는 그런 거 없이도 다 정리해주니까
                시간도 아끼고, 뭔가 내가 제대로 처리하고 있다는 확신도 들어요.”
              </BenefitText>
              <BenefitAuthor>
                <span>
                  <img
                    src={YoungMan2}
                    alt="YoungMan2"
                    style={{ width: '30px', height: '40px' }}
                  />
                </span>
                <span style={{ fontWeight: 'bold' }}>20대 남성 최일우</span>
              </BenefitAuthor>
            </BenefitCard>
            <BenefitCard>
              <BenefitCardTitle>정확한 산정 서비스</BenefitCardTitle>
              <BenefitText>
                “병원에서 받은 진단서만 올렸는데 알아서 텍스트로 변환해주고,
                OCR도 정확해서 놀랐어요. 나처럼 컴퓨터 잘 못하는 사람도 어렵지
                않게 쓸 수 있어서 좋았어요.”
              </BenefitText>
              <BenefitAuthor>
                <span>
                  <img
                    src={YoungWoman}
                    alt="YoungWoman"
                    style={{ width: '30px', height: '40px' }}
                  />
                </span>
                <span style={{ fontWeight: 'bold' }}>20대 여성 김수현</span>
              </BenefitAuthor>
            </BenefitCard>
            <BenefitCard>
              <BenefitCardTitle>업무 효율성 증가</BenefitCardTitle>
              <BenefitText>
                “이 시스템 쓰면서 확실히 업무 효율이 좋아졌어요. 진단서나
                영수증을 일일이 확인할 필요 없이, OCR로 필요한 정보가 깔끔하게
                들어오니까 확인만 하면 돼요. 검색 기능도 잘 되어 있고, 청구 내역
                통계까지 바로 볼 수 있어서 한눈에 파악돼요. 특히 문제가 생기면
                슬랙으로 바로 알림 오는 게 진짜 편해요.”
              </BenefitText>
              <BenefitAuthor>
                <span>
                  <img
                    src={OldMan}
                    alt="OldMan"
                    style={{ width: '30px', height: '40px' }}
                  />
                </span>
                <span style={{ fontWeight: 'bold' }}>보험사 직원 김태수</span>
              </BenefitAuthor>
            </BenefitCard>
            <BenefitCard>
              <BenefitCardTitle>간편한 관리</BenefitCardTitle>
              <BenefitText>
                “청구 건수가 많아질수록 사람이 일일이 보는 데 한계가 있었는데,
                지금은 진단서나 영수증 정보가 깔끔하게 정리돼서 업무가 훨씬
                수월해졌습니다. 특히 위조 확인도 시스템적으로 되니까 검토 시간도
                줄고 실수도 줄었어요.”
              </BenefitText>
              <BenefitAuthor>
                <span>
                  <img
                    src={YoungMan}
                    alt="YoungMan"
                    style={{ width: '30px', height: '40px' }}
                  />
                </span>
                <span style={{ fontWeight: 'bold' }}>보험사 직원 윤일환</span>
              </BenefitAuthor>
            </BenefitCard>
            <BenefitCard>
              <BenefitCardTitle>직관적인 인터페이스</BenefitCardTitle>
              <BenefitText>
                처음 이용했는데도 어떤 버튼을 눌러야 할지 한눈에 보였어요.
                복잡한 설명 없이도 그냥 따라가기만 하면 됐어요.
              </BenefitText>
              <BenefitAuthor>
                <span>
                  <img
                    src={YoungWoman}
                    alt="YoungWoman"
                    style={{ width: '30px', height: '40px' }}
                  />
                </span>
                <span style={{ fontWeight: 'bold' }}>20대 여성 오유민</span>
              </BenefitAuthor>
            </BenefitCard>
            <BenefitCard>
              <BenefitCardTitle>가족 보험도 한 번에</BenefitCardTitle>
              <BenefitText>
                저 혼자뿐만 아니라 가족 명의 보험도 함께 처리할 수 있어서 부모님
                것도 한 번에 챙기기 편했어요.
              </BenefitText>
              <BenefitAuthor>
                <span>
                  <img
                    src={YoungWoman}
                    alt="YoungWoman"
                    style={{ width: '30px', height: '40px' }}
                  />
                </span>
                <span style={{ fontWeight: 'bold' }}>20대 여성 김다현</span>
              </BenefitAuthor>
            </BenefitCard>
          </BenefitsCardsContainer>
        </div>
      </BenefitsSection>

      {/* Service Selection Section */}
      <SelectionSection>
        <SelectionCardsContainer>
          <SelectionTitle>사용하실 서비스를 선택해주세요</SelectionTitle>
          <div
            style={{ display: 'flex', gap: '30px', justifyContent: 'center' }}
          >
            <SelectionCard onClick={() => navigate('/upload')}>
              <img src={Customer} alt="Customer" />
              <SelectionCardTitle>일반 사용자</SelectionCardTitle>
              <SelectionCardDescription>
                진단서와 영수증 업로드로
                <br />
                보험 청구 완료
              </SelectionCardDescription>
            </SelectionCard>
            <SelectionCard onClick={() => navigate('/login')}>
              <img src={User} alt="User" />
              <SelectionCardTitle>보험사 직원</SelectionCardTitle>
              <SelectionCardDescription>
                자동화된 보험금 산정과
                <br />
                관리 시스템
              </SelectionCardDescription>
            </SelectionCard>
          </div>
        </SelectionCardsContainer>
      </SelectionSection>
    </PageWrapper>
  )
}

export default Onboarding
