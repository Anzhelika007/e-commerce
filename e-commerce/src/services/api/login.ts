import { ILogin } from '../../types/User/Interface';

export async function login(formData: ILogin) {
  const auth = btoa(
    `${import.meta.env.VITE_USR_CLIENT_ID}:${import.meta.env.VITE_USR_CLIENT_SECRET}`
  );
  const headers = new Headers();
  headers.append('Content-Type', 'application/x-www-form-urlencoded');
  headers.append('Authorization', `Basic ${auth}`);

  const body = new URLSearchParams();
  body.append('grant_type', 'password');
  body.append('username', formData.email.toLowerCase());
  body.append('password', formData.password);
  body.append('scope', import.meta.env.VITE_USR_SCOPES);

  const requestOptions = {
    method: 'POST',
    headers,
    body,
  };

  const answer = await fetch(
    `${import.meta.env.VITE_CTP_AUTH_URL}/oauth/${import.meta.env.VITE_CTP_PROJECT_KEY}/customers/token`,
    requestOptions
  ).then((response) => response.json());
  if (answer.expires_in) {
    const currentDateValue = new Date().getTime() / 1000;
    answer.expires_in = currentDateValue + answer.expires_in;
    answer.email = formData.email;
  }

  return answer;
}

export default login;
