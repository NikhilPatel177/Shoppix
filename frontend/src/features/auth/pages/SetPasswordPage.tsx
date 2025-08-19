import { useNavigate } from 'react-router-dom';
import { AuthLayout } from '../components/AuthLayout';
import { SetPasswordForm } from '../forms/SetPasswordForm';

export const SetPasswordPage = () => {
    const navigate = useNavigate()
  return (
    <AuthLayout
      title="Secure Your Account"
      description="You signed up with Google. Add a password so you can also log in directly with your email."
    >
      <SetPasswordForm />
      <button type='button' className='text-center w-full py-2 mt-1 rounded-md font-medium hover:bg-gray-200' onClick={()=>navigate('/')}>Skip</button>
    </AuthLayout>
  );
};
