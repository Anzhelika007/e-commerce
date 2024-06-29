import { AppToken } from '../../redux/store/appSlice';
import { DiscountCode as DiscountCodeCart } from '../../redux/store/cartSlice';
import { DiscountCode, setCodes } from '../../redux/store/discountSlice';
import { AppMessage, getAppToken } from './getAppToken';
import store, { AppDispatch } from '../../redux/store/store';

const urlProject = `${import.meta.env.VITE_CTP_API_URL}/${import.meta.env.VITE_CTP_PROJECT_KEY}`;

// Create options for POST and GET (body=false)
function requestOptions(
  token: AppMessage<AppToken>,
  body: object | false = false
) {
  const myHeaders = new Headers();
  myHeaders.append('Authorization', `Bearer ${token.thing?.access_token}`);

  const options: RequestInit = {
    method: body ? 'POST' : 'GET',
    headers: myHeaders,
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  return options;
}

export async function getDiscountsCodes(dispatch?: AppDispatch) {
  const discounts = store.getState().discountSlice.discountCodes;
  if (discounts.length > 0) {
    const result: AppMessage<DiscountCode[]> = {
      isError: false,
      thing: discounts,
    };
    return result;
  }

  const appToken = await getAppToken();
  if (appToken.isError) {
    const result: AppMessage<DiscountCode[]> = {
      isError: true,
      message: appToken.message,
    };
    return result;
  }

  const url = new URL(`${urlProject}/discount-codes`);
  url.searchParams.append('where', 'isActive="true"');
  const options = requestOptions(appToken);
  const answer = await fetch(url, options)
    .then((response) => response.json())
    .then((response) => {
      if (response.errors) {
        const result: AppMessage<DiscountCode[]> = {
          isError: true,
          message: response.message,
        };
        return result;
      }
      const result: AppMessage<DiscountCode[]> = {
        isError: false,
        thing: response.results,
        message: 'Successful',
      };
      return result;
    })
    .catch((reason: Error) => {
      const result: AppMessage<DiscountCode[]> = {
        isError: true,
        message: reason.message,
      };
      return result;
    });

  if (!answer.isError && dispatch) dispatch(setCodes(answer.thing!));

  return answer;
}

export function findDiscountCodes(discounts: DiscountCodeCart[]) {
  const newDiscounts: DiscountCodeCart[] = [];

  const { discountCodes } = store.getState().discountSlice;
  if (discountCodes.length === 0) {
    return discounts;
  }

  discounts.forEach((item) => {
    const code = discountCodes.find(
      (line) => line.id === item.discountCode.id
    )?.code;
    if (code && item.state === 'MatchesCart') {
      newDiscounts.push({ ...item, code });
    }
  });

  return newDiscounts;
}

export async function getDiscountCode(code: string, byId = false) {
  const result: AppMessage<DiscountCode> = {
    isError: true,
    message: `Discount code ${code} not found`,
  };

  const discountsCodes = await getDiscountsCodes();
  if (discountsCodes.isError || discountsCodes.thing?.length === 0) {
    return result;
  }

  const findCode = discountsCodes.thing!.find((elem) => {
    if ((!byId && elem.code === code) || (byId && elem.id === code)) {
      return true;
    }
    return false;
  });
  if (findCode) {
    result.isError = false;
    result.message = 'Success';
    result.thing = findCode;
  }
  return result;
}

export default getDiscountsCodes;
