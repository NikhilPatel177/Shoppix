import { Button } from '@common/components/Button';
import { LabelledInput } from '../components/LabelledInput';

export const SetPasswordForm = () => {
  return (
    <form>
      <LabelledInput name="newPassword" label="New Password" />
      <LabelledInput name="confirmNewPassword" label="Confirm New Password" />
      <Button>Set New Password</Button>
    </form>
  );
};
