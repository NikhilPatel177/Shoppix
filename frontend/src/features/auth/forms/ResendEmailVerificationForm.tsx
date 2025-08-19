import { Button } from "@common/components/Button"
import { LabelledInput } from "../components/LabelledInput"

export const ResendEmailVerificationForm = () => {
  return (
 <form>
    <LabelledInput name="email" label="Email"/>
    <Button>Resend Email</Button>
   </form>  )
}
