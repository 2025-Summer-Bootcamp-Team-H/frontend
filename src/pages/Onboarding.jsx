import TextInput from '../components/TextInput'
import Navbar from '../components/Navbar'

function Onboarding() {
  return (
    <>
      <Navbar type="default" />
      <TextInput label="Email" placeholder="Enter your email" />
      <TextInput label="Password" placeholder="Enter your password" />
      <TextInput label="Confirm Password" placeholder="Confirm your password" />
    </>
  )
}

export default Onboarding
