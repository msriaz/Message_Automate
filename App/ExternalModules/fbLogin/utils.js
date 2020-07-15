import CookieManager from '@react-native-community/cookies';
const axios = require('axios');
const cheerio = require('react-native-cheerio');

const log = {
  maxRecordSize: 250,
  level: 'top',
  verbose: (a, b) => {
    console.log(a, b);
  },
  warn: (a, b) => {
    console.warn(a, b);
  },
  info: (a, b) => {
    console.info(a, b);
  },
  error: (a, b) => {
    console.error(a, b);
  },
};

const cookiesStringArray = cookies => {
  let cookiesStrings = Object.keys(cookies)?.map(key1 => {
    let cookieString = `${key1}=${cookies[key1].value}; `;
    Object.keys(cookies[key1])?.forEach(key2 => {
      if (key2 !== 'name' && key2 !== 'value') {
        cookieString += `${key2}=${cookies[key1][key2]}; `;
      }
    });
    return cookieString;
  });

  const cookieKeys = ['fr', 'sb', 'c_user', 'xs', 'spin', 'presence', 'locale'];
  let cookiesStringArrayUpdated = [...cookiesStrings];
  cookiesStrings.forEach(function(c) {
    const key = c.split('=')[0];
    if (cookieKeys.indexOf(key) !== -1) {
      var c2 = c.replace(/domain=\.facebook\.com/, 'domain=.messenger.com');
      // c2 = `meesenger_${c2}`;
      cookiesStringArrayUpdated.push(c2);
    }
  });

  return cookiesStringArrayUpdated;
};

var h;
var i = {};
var j = {
  _: '%',
  A: '%2',
  B: '000',
  C: '%7d',
  D: '%7b%22',
  E: '%2c%22',
  F: '%22%3a',
  G: '%2c%22ut%22%3a1',
  H: '%2c%22bls%22%3a',
  I: '%2c%22n%22%3a%22%',
  J: '%22%3a%7b%22i%22%3a0%7d',
  K: '%2c%22pt%22%3a0%2c%22vis%22%3a',
  L: '%2c%22ch%22%3a%7b%22h%22%3a%22',
  M: '%7b%22v%22%3a2%2c%22time%22%3a1',
  N: '.channel%22%2c%22sub%22%3a%5b',
  O: '%2c%22sb%22%3a1%2c%22t%22%3a%5b',
  P: '%2c%22ud%22%3a100%2c%22lc%22%3a0',
  Q: '%5d%2c%22f%22%3anull%2c%22uct%22%3a',
  R: '.channel%22%2c%22sub%22%3a%5b1%5d',
  S: '%22%2c%22m%22%3a0%7d%2c%7b%22i%22%3a',
  T: '%2c%22blc%22%3a1%2c%22snd%22%3a1%2c%22ct%22%3a',
  U: '%2c%22blc%22%3a0%2c%22snd%22%3a1%2c%22ct%22%3a',
  V: '%2c%22blc%22%3a0%2c%22snd%22%3a0%2c%22ct%22%3a',
  W: '%2c%22s%22%3a0%2c%22blo%22%3a0%7d%2c%22bl%22%3a%7b%22ac%22%3a',
  X: '%2c%22ri%22%3a0%7d%2c%22state%22%3a%7b%22p%22%3a0%2c%22ut%22%3a1',
  Y:
    '%2c%22pt%22%3a0%2c%22vis%22%3a1%2c%22bls%22%3a0%2c%22blc%22%3a0%2c%22snd%22%3a1%2c%22ct%22%3a',
  Z:
    '%2c%22sb%22%3a1%2c%22t%22%3a%5b%5d%2c%22f%22%3anull%2c%22uct%22%3a0%2c%22s%22%3a0%2c%22blo%22%3a0%7d%2c%22bl%22%3a%7b%22ac%22%3a',
};
(function() {
  var l = [];
  for (var m in j) {
    i[j[m]] = m;
    l.push(j[m]);
  }
  l.reverse();
  h = new RegExp(l.join('|'), 'g');
})();

const arrToForm = form => {
  return arrayToObject(
    form,
    function(v) {
      return v.name;
    },
    function(v) {
      return v.val;
    },
  );
};

const arrayToObject = (arr, getKey, getValue) => {
  return arr.reduce(function(acc, val) {
    acc[getKey(val)] = getValue(val);
    return acc;
  }, {});
};

const setCookie = async (domain, options) => {
  // debugger;
  console.log('set cookies', options);
  const setCookieResponse = await CookieManager.set(domain, {
    // name: 'myCookie',
    // value: 'myValue',
    // domain: 'some domain',
    // path: '/',
    // version: '1',
    // expires: '2015-05-30T12:30:00.00-05:00',
    ...options,
  });
  console.log('CookieManager.set =>', setCookieResponse);
  return setCookieResponse;
};

const saveCookies = async res => {
  const allCookies = await getCookies();
  var cookies = cookiesStringArray(allCookies) || [];

  cookies.forEach(function(c) {
    if (c.indexOf('.facebook.com') > -1) {
      setFromResponse('https://www.facebook.com', c);
    }
    var c2 = c.replace(/domain=\.facebook\.com/, 'domain=.messenger.com');
    // c2 = `meesenger_${c2}`;
    setFromResponse('https://www.messenger.com', c2);
  });
  const allCookiesX = await getCookies();
  // debugger;
  return res;
};

const getHeaders = (url, options) => {
  var headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    Referer: 'https://www.facebook.com/',
    Host: url.replace('https://', '').split('/')[0],
    Origin: 'https://www.facebook.com',
    'User-Agent':
      options?.userAgent ||
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_2) AppleWebKit/600.3.18 (KHTML, like Gecko) Version/8.0.3 Safari/600.3.18',
    Connection: 'keep-alive',
  };

  return headers;
};

const request = op => {
  // console.log('request is', op);
  /** ops
   * gzip: true
headers: {Content-Type: "application/x-www-form-urlencoded", Referer: "https://www.facebook.com/", Host: "www.facebook.com", Origin: "https://www.facebook.com", User-Agent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_2) Ap…(KHTML, like Gecko) Version/8.0.3 Safari/600.3.18", …}
jar: null
method: "GET"
qs: null
timeout: 60000
url: "https://www.facebook.com/"
  */

  const options = {
    ...op,
    headers: {
      ...op.headers,
      'User-Agent':
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_2) AppleWebKit/600.3.18 (KHTML, like Gecko) Version/8.0.3 Safari/600.3.18',
    },
  };
  console.log(`request type ${op.method}`, op.url, options);
  // debugger;
  // return axios('https://github.com/react-native-community/react-native-webview/blob/master/docs/Reference.md#onnavigationstatechange');
  return axios(options.url, options);
};

const get = (url, qs, options) => {
  // I'm still confused about this
  if (getType(qs) === 'Object') {
    for (var prop in qs) {
      if (qs.hasOwnProperty(prop) && getType(qs[prop]) === 'Object') {
        qs[prop] = JSON.stringify(qs[prop]);
      }
    }
  }
  var op = {
    headers: getHeaders(url, options),
    timeout: 60000,
    qs: qs,
    url: url,
    method: 'GET',
    jar: null,
    gzip: true,
    withCredentials: true,
  };

  console.log('@@@@@@@@@@get options', op);
  return request(op).then(function(res) {
    console.log('@@@@@@@@@@get res is', res);
    debugger;
    return {
      body: res?.data,
      ...res,
    };
  });
};

const getType = obj => {
  return Object.prototype.toString.call(obj).slice(8, -1);
};
const getJar = () => {
  // return {
  //   set
  // }
};

const getFrom = (str, startToken, endToken) => {
  var start = str.indexOf(startToken) + startToken.length;
  if (start < startToken.length) return '';

  var lastHalf = str.substring(start);
  var end = lastHalf.indexOf(endToken);
  if (end === -1) {
    throw Error(
      'Could not find endTime `' + endToken + '` in the given string.',
    );
  }
  return lastHalf.substring(0, end);
};

const formatCookie = (arr, url) => {
  // return {
  //   [arr[0]]: arr[1],
  //   path: arr[3],
  //   domain: `${url}.com`,
  // };
  return (
    arr[0] + '=' + arr[1] + '; Path=' + arr[3] + '; Domain=' + url + '.com'
  );
};

const getCookies = async url => {
  const cookies = await CookieManager.getAll(); // await CookieManager.get(url);
  console.log('CookieManager.get all =>', cookies);
  // debugger;
  return cookies;
};

const getAppState = () => {
  return getCookies('https://www.facebook.com')
    .concat(getCookies('https://facebook.com'))
    .concat(getCookies('https://www.messenger.com'));
};

const post = async (url, form, options) => {
  var op = {
    headers: getHeaders(url, options),
    timeout: 60000,
    url: url,
    method: 'POST',
    form: form,
    jar: null,
    gzip: true,
    withCredentials: true,
  };

  const cookies = await getCookies();
  var cookiesArray = cookiesStringArray(cookies);

  debugger;
  // const setCookieResponse1 = await setCookie(cookies.sb.domain, cookies.sb);
  // const setCookieResponse2 = await setCookie(cookies.fr.domain, cookies.fr);
  // const setCookieResponse3 = await setCookie(cookies.datr.domain, cookies.datr);
  // console.log('setcokkies', setCookieResponse1, setCookieResponse2, setCookieResponse3);

  op.headers = {
    ...op.headers,
    setCookie: cookiesArray,
  };
  debugger;
  return request(op).then(async res => {
    // const cookies = await getCookies();
    debugger;

    return {
      ...res,
      body: res.data,
    };
  });
};

const postFormData = (url, form, qs, options, cookies) => {
  var headers = getHeaders(url, options);
  debugger;
  headers['Content-Type'] = 'multipart/form-data';
  var op = {
    headers: {
      ...headers,
      Cookie: cookies,
    },
    timeout: 60000,
    url: url,
    method: 'POST',
    formData: form,
    params: qs,
    gzip: true,
    withCredentials: true,
  };

  return request(op).then(function(res) {
    debugger;
    return {
      ...res,
      body: res?.data,
    };
  });
};

const makeDefaults = (html, userID, ctx) => {
  var reqCounter = 1;
  var fb_dtsg = getFrom(html, 'name="fb_dtsg" value="', '"');

  // @Hack Ok we've done hacky things, this is definitely on top 5.
  // We totally assume the object is flat and try parsing until a }.
  // If it works though it's cool because we get a bunch of extra data things.
  //
  // Update: we don't need this. Leaving it in in case we ever do.
  //       Ben - July 15th 2017

  // var siteData = getFrom(html, "[\"SiteData\",[],", "},");
  // try {
  //   siteData = JSON.parse(siteData + "}");
  // } catch(e) {
  //   log.warn("makeDefaults", "Couldn't parse SiteData. Won't have access to some variables.");
  //   siteData = {};
  // }

  var ttstamp = '2';
  for (var i = 0; i < fb_dtsg.length; i++) {
    ttstamp += fb_dtsg.charCodeAt(i);
  }
  var revision = getFrom(html, 'revision":', ',');

  function mergeWithDefaults(obj) {
    // @TODO This is missing a key called __dyn.
    // After some investigation it seems like __dyn is some sort of set that FB
    // calls BitMap. It seems like certain responses have a "define" key in the
    // res.jsmods arrays. I think the code iterates over those and calls `set`
    // on the bitmap for each of those keys. Then it calls
    // bitmap.toCompressedString() which returns what __dyn is.
    //
    // So far the API has been working without this.
    //
    //              Ben - July 15th 2017
    var newObj = {
      __user: userID,
      __req: (reqCounter++).toString(36),
      __rev: revision,
      __a: 1,
      // __af: siteData.features,
      fb_dtsg: ctx.fb_dtsg ? ctx.fb_dtsg : fb_dtsg,
      jazoest: ctx.ttstamp ? ctx.ttstamp : ttstamp,
      // __spin_r: siteData.__spin_r,
      // __spin_b: siteData.__spin_b,
      // __spin_t: siteData.__spin_t,
    };

    // @TODO this is probably not needed.
    //         Ben - July 15th 2017
    // if (siteData.be_key) {
    //   newObj[siteData.be_key] = siteData.be_mode;
    // }
    // if (siteData.pkg_cohort_key) {
    //   newObj[siteData.pkg_cohort_key] = siteData.pkg_cohort;
    // }

    if (!obj) return newObj;

    for (var prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        if (!newObj[prop]) {
          newObj[prop] = obj[prop];
        }
      }
    }

    return newObj;
  }

  function postWithDefaults(url, form) {
    return post(url, mergeWithDefaults(form), ctx.globalOptions);
  }

  function getWithDefaults(url, qs) {
    return get(url, mergeWithDefaults(qs), ctx.globalOptions);
  }

  function postFormDataWithDefault(url, form, qs) {
    return postFormData(
      url,
      mergeWithDefaults(form),
      mergeWithDefaults(qs),
      ctx.globalOptions,
    );
  }

  return {
    get: getWithDefaults,
    post: postWithDefaults,
    postFormData: postFormDataWithDefault,
  };
};

const presenceEncode = str => {
  return encodeURIComponent(str)
    .replace(/([_A-Z])|%../g, function(m, n) {
      return n ? '%' + n.charCodeAt(0).toString(16) : m;
    })
    .toLowerCase()
    .replace(h, function(m) {
      return i[m];
    });
};

const presenceDecode = str => {
  return decodeURIComponent(
    str.replace(/[_A-Z]/g, function(m) {
      return j[m];
    }),
  );
};

const generatePresence = userID => {
  var time = Date.now();
  return (
    'E' +
    presenceEncode(
      JSON.stringify({
        v: 3,
        time: parseInt(time / 1000, 10),
        user: userID,
        state: {
          ut: 0,
          t2: [],
          lm2: null,
          uct2: time,
          tr: null,
          tw: Math.floor(Math.random() * 4294967295) + 1,
          at: time,
        },
        ch: {
          ['p_' + userID]: 0,
        },
      }),
    )
  );
};

const generateAccessiblityCookie = () => {
  var time = Date.now();
  return encodeURIComponent(
    JSON.stringify({
      sr: 0,
      'sr-ts': time,
      jk: 0,
      'jk-ts': time,
      kb: 0,
      'kb-ts': time,
      hcm: 0,
      'hcm-ts': time,
    }),
  );
};

// const post =(url, form, options)=> {
//   var op = {
//     headers: getHeaders(url, options),
//     timeout: 60000,
//     url: url,
//     method: "POST",
//     form: form,
//     jar: null,
//     gzip: true
//   };

//   return request(op).then(function(res) {
//     return res[0];
//   });
// }

// const postFormData =(url, form, qs, options) => {
//   var headers = getHeaders(url, options);
//   headers["Content-Type"] = "multipart/form-data";
//   var op = {
//     headers: headers,
//     timeout: 60000,
//     url: url,
//     method: "POST",
//     formData: form,
//     qs: qs,
//     jar: null,
//     gzip: true
//   };

//   return request(op).then(function(res) {
//     return res[0];
//   });
// }

const setFromResponse = (domain, cookie) => {
  // debugger;
  CookieManager.setFromResponse(domain, cookie).then(res => {
    // debugger;
    // `res` will be true or false depending on success.
    console.log('CookieManager.setFromResponse =>', res);
  });
};
const formatID = id => {
  if (id != undefined && id != null) {
    return id.replace(/(fb)?id[:.]/, '');
  } else {
    return id;
  }
};

const makeParsable = html => {
  let withoutForLoop = html.replace(/for\s*\(\s*;\s*;\s*\)\s*;\s*/, '');

  // (What the fuck FB, why windows style newlines?)
  // So sometimes FB will send us base multiple objects in the same response.
  // They're all valid JSON, one after the other, at the top level. We detect
  // that and make it parse-able by JSON.parse.
  //       Ben - July 15th 2017
  //
  // It turns out that Facebook may insert random number of spaces before
  // next object begins (issue #616)
  //       rav_kr - 2018-03-19
  let maybeMultipleObjects = withoutForLoop.split(/\}\r\n *\{/);
  if (maybeMultipleObjects.length === 1) return maybeMultipleObjects;

  return '[' + maybeMultipleObjects.join('},{') + ']';
};

export {
  arrToForm,
  arrayToObject,
  setCookie,
  saveCookies,
  getHeaders,
  get,
  getType,
  getJar,
  getFrom,
  formatCookie,
  getCookies,
  getAppState,
  makeDefaults,
  log,
  presenceEncode,
  presenceDecode,
  generatePresence,
  generateAccessiblityCookie,
  cheerio,
  post,
  postFormData,
  setFromResponse,
  formatID,
  makeParsable,
  cookiesStringArray,
};
