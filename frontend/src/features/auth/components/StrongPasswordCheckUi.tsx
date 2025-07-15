import { useEffect, useState } from 'react';
import { PASSWORD_RULES } from '../constants/password.constant';
import { strongPasswordSchema } from '../schemas/strongPassword.schema';
import { Circle, CircleCheckBig } from 'lucide-react';
import clsx from 'clsx';

export const StrongPasswordCheckUi = ({ password }: { password: string }) => {
  const [errors, setErrors] = useState<string[]>([]);
  useEffect(() => {
    const result = strongPasswordSchema.safeParse(password);
    if (!result.success) {
      setErrors(result.error.issues.map((e) => e.message));
    } else {
      setErrors([]);
    }
  }, [password]);

  return (
    <ul>
      {PASSWORD_RULES.map((rule, index) => {
        const failed = errors.includes(rule);
        return (
          <li
            key={index}
            className="text-gray-400 text-xs flex items-center gap-1"
          >
            <span>
              {!failed ? (
                <CircleCheckBig size={10} color="#05df72" />
              ) : (
                <Circle size={10} />
              )}
            </span>
            <span className={clsx(!failed && 'line-through text-green-400')}>
              {rule}
            </span>
          </li>
        );
      })}
    </ul>
  );
};
