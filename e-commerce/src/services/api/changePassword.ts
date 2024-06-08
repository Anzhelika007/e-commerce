import { getAppToken } from './getAppToken';
import { getCustomerInfo } from './getCustomerInfo';

type ChangePassword = {
  currentPassword: string;
  newPassword: string;
};

export async function changePassword(formData: ChangePassword) {
  const authToken = await getAppToken();
  if (!authToken) return undefined;

  const user = await getCustomerInfo();
  if (!user) return undefined;

  const token = authToken.access_token;
  const requestData = {
    id: user.id,
    version: user.version,
    currentPassword: formData.currentPassword,
    newPassword: formData.newPassword,
  };

  const answer = await fetch(
    `${import.meta.env.VITE_CTP_API_URL}/${import.meta.env.VITE_CTP_PROJECT_KEY}/customers/password`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(requestData),
    }
  );
  const answerJSON = await answer.json();
  return answerJSON;
}

export default changePassword;
