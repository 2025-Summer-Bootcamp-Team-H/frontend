import PropTypes from 'prop-types'
import styled from 'styled-components'
import PublicSans from '../assets/fonts/PublicSans.ttf'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: stretch;
`

const Label = styled.label`
  color: #000;
  font-family: ${PublicSans};
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  align-self: stretch;
`

const InputBox = styled.div`
  display: flex;
  width: 480px;
  height: 45px;
  padding: 15px;
  align-items: center;
  align-self: stretch;
  border-radius: 12px;
  border: 1px solid #e5e8eb;
  background: #f2f4f6;
  box-sizing: border-box;
`

const Input = styled.input`
  width: 100%;
  border: none;
  background: transparent;
  color: #000;
  font-family: 'Public Sans', sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 24px;
  outline: none;
  &::placeholder {
    color: #b0b0b0;
    opacity: 1;
  }
`

function TextInput({ label, placeholder, ...props }) {
  return (
    <Wrapper>
      <Label>{label}</Label>
      <InputBox>
        <Input placeholder={placeholder} {...props} />
      </InputBox>
    </Wrapper>
  )
}

TextInput.propTypes = {
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
}

export default TextInput
