import { Button } from "@common/components/Button"
import { LabelledInput } from "../components/LabelledInput"

export const ForgotPasswordForm = () => {
  return (
   <form>
    <LabelledInput name="email" label="Email"/>
    <Button>Send Link</Button>
   </form>
  )
}
