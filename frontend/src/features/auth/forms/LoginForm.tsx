import { Button } from '@common/components/Button';
import { LabelledInput } from '../components/LabelledInput';
import { Link } from 'react-router-dom';

export const LoginForm = () => {
  return (
    <form>
      <LabelledInput name="identifier" label="Email or Phone" />
      <div className="relative">
        <Link
          to={'/forgot_password'}
          className="absolute top-0 right-0 text-sm font-medium text-primary"
        >
          Forgot Password?
        </Link>
        <LabelledInput name="password" label="Password" type="password" />
      </div>
      <Button>Login</Button>
    </form>
  );
};
