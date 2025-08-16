import { Button } from '@common/components/Button';
import { LabelledInput } from '../components/LabelledInput';

export const LoginForm = () => {
  return (
    <form>
      <LabelledInput name="identifier" label="Email or Phone" />
      <LabelledInput name="password" label="Password" type="password" />
      <Button>Login</Button>
    </form>
  );
};
