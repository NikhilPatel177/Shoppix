import { Button } from '@common/components/Button';
import { LabelledInput } from '../components/LabelledInput';

export const RegisterForm = () => {
  return (
    <form>
      <LabelledInput name="email" label="Email" />
      <LabelledInput name="password" label="Password" type="password" />
      <Button>Register</Button>
    </form>
  );
};
