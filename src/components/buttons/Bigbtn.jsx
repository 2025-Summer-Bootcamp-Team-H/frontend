import styled from 'styled-components';

const Bigbtn = styled.button`
  background: #3182f6;
  color: #fff;
  border: none;
  border-radius: 40px;
  width: 488px;
  height: 40px;
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
`;

export default Bigbtn;
