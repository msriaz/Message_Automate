import CookieManager from '@react-native-community/cookies';
import reduce from 'lodash/reduce';

import {
  postFormData,
  formatID,
  post,
  formatCookie,
  setCookie,
  setFromResponse,
  log,
  get,
  makeParsable,
  cookiesStringArray,
} from '../../ExternalModules/fbLogin/utils';

const clearCookies = async () => {
  let response = false;
  response = await CookieManager.clearAll(true);
  response = await CookieManager.clearAll();

  return response;
};

const getCookies = async () => {
  let cookies = {};

  const nonWebkitCookies = await CookieManager.getAll();
  const webkitCookies = await CookieManager.getAll(true);
  console.log('@@@@ nonWebkitCookies', nonWebkitCookies);
  console.log('@@@@ webkitCookies', webkitCookies);

  cookies = reduce(
    {...nonWebkitCookies, ...webkitCookies},
    (result, value, key) => ({...result, [key]: value.value}),
    {},
  );

  return webkitCookies;
};
const delay = ms => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

const getRequestCookie = async () => {
  const cookies = await getCookies();
  const requestCookie = reduce(
    cookies,
    (result, cookie) => `${cookie.name}=${cookie.value}; ${result}`,
    '',
  );

  return requestCookie;
};

const parseAndCheckLogin = (ctx, retryCount) => {
  if (retryCount == undefined) {
    retryCount = 0;
  }
  return function(data) {
    debugger;
    log.verbose('parseAndCheckLogin', data && data.body ? data.body : 'no');
    if (data.status >= 500 && data.status < 600) {
      if (retryCount >= 5) {
        throw {
          error:
            'Request retry failed. Check the `res` and `status` property on this error.',
          status: data.status,
          res: data.body,
        };
      }
      retryCount++;
      var retryTime = Math.floor(Math.random() * 5000);
      log.warn(
        'parseAndCheckLogin',
        'Got status code ' +
          data.status +
          ' - ' +
          retryCount +
          '. attempt to retry in ' +
          retryTime +
          ' milliseconds...',
      );
      var url =
        data.request.uri.protocol +
        '//' +
        data.request.uri.hostname +
        data.request.uri.pathname;
      if (
        data.request.headers['Content-Type'].split(';')[0] ===
        'multipart/form-data'
      ) {
        return delay(retryTime)
          .then(function() {
            return postFormData(url, data.request.formData, {});
          })
          .then(parseAndCheckLogin(ctx, retryCount));
      } else {
        return delay(retryTime)
          .then(function() {
            return post(url, data.request.formData);
          })
          .then(parseAndCheckLogin(ctx, retryCount));
      }
    }
    if (data.status !== 200)
      throw new Error(
        'parseAndCheckLogin got status code: ' +
          data.status +
          '. Bailing out of trying to parse response.',
      );

    var res = null;
    try {
      res = JSON.parse(makeParsable(data.body));
    } catch (e) {
      throw {
        error: 'JSON.parse error. Check the `detail` property on this error.',
        detail: e,
        res: data.body,
      };
    }

    // In some cases the response contains only a redirect URL which should be followed
    if (res.redirect && data.request.method === 'GET') {
      debugger;
      return get(res.redirect).then(parseAndCheckLogin(ctx));
    }

    // TODO: handle multiple cookies?
    if (
      res.jsmods &&
      res.jsmods.require &&
      Array.isArray(res.jsmods.require[0]) &&
      res.jsmods.require[0][0] === 'Cookie'
    ) {
      res.jsmods.require[0][3][0] = res.jsmods.require[0][3][0].replace(
        '_js_',
        '',
      );
      var cookie = formatCookie(res.jsmods.require[0][3], 'facebook');
      var cookie2 = formatCookie(res.jsmods.require[0][3], 'messenger');
      setFromResponse('https://www.facebook.com', cookie);
      setFromResponse('https://www.messenger.com', cookie2);
      debugger;
    }

    // On every request we check if we got a DTSG and we mutate the context so that we use the latest
    // one for the next requests.
    if (res.jsmods && Array.isArray(res.jsmods.require)) {
      var arr = res.jsmods.require;
      for (var i in arr) {
        if (arr[i][0] === 'DTSG' && arr[i][1] === 'setToken') {
          ctx.fb_dtsg = arr[i][3][0];

          // Update ttstamp since that depends on fb_dtsg
          ctx.ttstamp = '2';
          for (var j = 0; j < ctx.fb_dtsg.length; j++) {
            ctx.ttstamp += ctx.fb_dtsg.charCodeAt(j);
          }
        }
      }
      debugger;
    }

    if (res.error === 1357001) {
      throw {error: 'Not logged in.'};
    }
    return res;
  };
};

export {
  clearCookies,
  getCookies,
  getRequestCookie,
  postFormData,
  formatID,
  log,
  parseAndCheckLogin,
  cookiesStringArray,
};

export default {
  clearCookies,
  getCookies,
  getRequestCookie,
  postFormData,
  formatID,
  log,
  parseAndCheckLogin,
  cookiesStringArray,
};
