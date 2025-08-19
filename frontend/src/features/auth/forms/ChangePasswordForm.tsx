import { Button } from '@common/components/Button';
import { LabelledInput } from '../components/LabelledInput';

export const ChangePasswordForm = () => {
  return (
    <form>
      <LabelledInput name="currentPassword" label="Current Password" />
      <LabelledInput name="newPassword" label="New Password" />
      <LabelledInput name="confirmNewPassword" label="Confirm New Password" />
      <Button>Change Password</Button>
    </form>
  );
};
