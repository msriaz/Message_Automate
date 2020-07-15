import {log} from './utils';
import * as utils from './utils';
import {domain} from 'process';

global.Buffer = global.Buffer || require('buffer').Buffer;

var defaultLogRecordSize = 100;
log.maxRecordSize = defaultLogRecordSize;

const setOptions = (globalOptions, options) => {
  Object.keys(options).map(function(key) {
    switch (key) {
      case 'logLevel':
        log.level = options.logLevel;
        globalOptions.logLevel = options.logLevel;
        break;
      case 'logRecordSize':
        log.maxRecordSize = options.logRecordSize;
        globalOptions.logRecordSize = options.logRecordSize;
        break;
      case 'selfListen':
        globalOptions.selfListen = options.selfListen;
        break;
      case 'listenEvents':
        globalOptions.listenEvents = options.listenEvents;
        break;
      case 'pageID':
        globalOptions.pageID = options.pageID.toString();
        break;
      case 'updatePresence':
        globalOptions.updatePresence = options.updatePresence;
        break;
      case 'forceLogin':
        globalOptions.forceLogin = options.forceLogin;
        break;
      case 'userAgent':
        globalOptions.userAgent = options.userAgent;
        break;
      case 'autoMarkDelivery':
        globalOptions.autoMarkDelivery = options.autoMarkDelivery;
        break;
      case 'autoMarkRead':
        globalOptions.autoMarkRead = options.autoMarkRead;
        break;
      default:
        log.warn(
          'setOptions',
          'Unrecognized option given to setOptions: ' + key,
        );
        break;
    }
  });
};

const buildAPI = (globalOptions, html) => {
  var maybeCookie = utils.getCookies('https://www.facebook.com').then(res => {
    debugger;
    res?.filter(function(val) {
      return val?.cookieString().split('=')[0] === 'c_user';
    });
  });

  if (maybeCookie.length === 0) {
    throw {
      error:
        'Error retrieving userID. This can be caused by a lot of things, including getting blocked by Facebook for logging in from an unknown location. Try logging in with a browser to verify.',
    };
  }

  var userID = `maybeCookie[0]
    .cookieString()
    .split('=')[1]
    .toString();`;
  log.info('login', 'Logged in');

  var clientID = ((Math.random() * 2147483648) | 0).toString(16);

  // All data available to api functions
  var ctx = {
    userID: userID,
    jar: null,
    clientID: clientID,
    globalOptions: globalOptions,
    loggedIn: true,
    access_token: 'NONE',
    clientMutationId: 0,
    mqttClient: undefined,
    lastSeqId: 0,
    syncToken: undefined,
  };

  var api = {
    setOptions: setOptions.bind(null, globalOptions),
    getAppState: function getAppState() {
      return utils.getAppState();
    },
  };

  // const apiFuncNames = [
  //   'addUserToGroup',
  //   'changeAdminStatus',
  //   'changeArchivedStatus',
  //   'changeBlockedStatus',
  //   'changeGroupImage',
  //   'changeNickname',
  //   'changeThreadColor',
  //   'changeThreadEmoji',
  //   'createPoll',
  //   'deleteMessage',
  //   'deleteThread',
  //   'forwardAttachment',
  //   'getCurrentUserID',
  //   'getEmojiUrl',
  //   'getFriendsList',
  //   'getThreadHistory',
  //   'getThreadInfo',
  //   'getThreadList',
  //   'getThreadPictures',
  //   'getUserID',
  //   'getUserInfo',
  //   'handleMessageRequest',
  //   'listenMqtt',
  //   'logout',
  //   'markAsDelivered',
  //   'markAsRead',
  //   'markAsReadAll',
  //   'muteThread',
  //   'removeUserFromGroup',
  //   'resolvePhotoUrl',
  //   'searchForThread',
  //   'sendMessage',
  //   'sendTypingIndicator',
  //   'setMessageReaction',
  //   'setTitle',
  //   'threadColors',
  //   'unsendMessage',

  //   // Deprecated features
  //   "getThreadListDeprecated",
  //   'getThreadHistoryDeprecated',
  //   'getThreadInfoDeprecated',
  //   'listen'
  // ];

  // var defaultFuncs = utils.makeDefaults(html, userID, ctx);

  // // Load all api functions in a loop
  // apiFuncNames.map(function (v) {
  //   console.log('hey', v);
  //   api[v] = require('./src/' + v)(defaultFuncs, api, ctx);
  // });

  return [ctx, api];
};

const makeLogin = (res, email, password, loginOptions, callback) => {
  var html = res.body;
  var $ = utils.cheerio.load(html);
  var arr = [];
  // This will be empty, but just to be sure we leave it
  $('#login_form input').map(function(i, v) {
    arr.push({val: $(v).val(), name: $(v).attr('name')});
  });

  arr = arr.filter(function(v) {
    return v.val && v.val.length;
  });

  var form = utils.arrToForm(arr);
  form.lsd = utils.getFrom(html, '["LSD",[],{"token":"', '"}');
  form.lgndim = Buffer.from(
    '{"w":1440,"h":900,"aw":1440,"ah":834,"c":24}',
  ).toString('base64');
  form.email = email;
  form.pass = password;
  form.default_persistent = '0';
  form.lgnrnd = utils.getFrom(html, 'name="lgnrnd" value="', '"');
  form.locale = 'en_US';
  form.timezone = '240';
  form.lgnjs = ~~(Date.now() / 1000);

  // Getting cookies from the HTML page... (kill me now plz)
  // we used to get a bunch of cookies in the headers of the response of the
  // request, but FB changed and they now send those cookies inside the JS.
  // They run the JS which then injects the cookies in the page.
  // The "solution" is to parse through the html and find those cookies
  // which happen to be conveniently indicated with a _js_ in front of their
  // variable name.
  //
  // ---------- Very Hacky Part Starts -----------------
  var willBeCookies = html.split('_js_');
    debugger;
  willBeCookies.slice(1).map((val)=> {
    
    var cookieData = JSON.parse('["' + utils.getFrom(val, '', ']') + ']');
    console.log('@@@@cookiesData is', cookieData);
    debugger;
    // utils.setFromResponse(
    //   'https://www.facebook.com',
    //   utils.formatCookie(cookieData, 'facebook'),
    // );
  });

  debugger;
  // ---------- Very Hacky Part Ends -----------------

  log.info('login', 'Logging in...');
  return utils
    .post(
      'https://www.facebook.com/login.php?login_attempt=1&lwv=110',
      form,
      loginOptions,
    )
    .then(res => {
      utils.saveCookies(res);
      return res;
    })
    .then(function(res) {
      var headers = {
        ...res.headers,
        // location: 'https://www.facebook.com/',
      };
      debugger;
      if (!headers.location) {
        throw {error: 'Wrong username/password.'};
      }

      // This means the account has login approvals turned on.
      if (
        headers.location.indexOf('https://www.facebook.com/checkpoint/') > -1
      ) {
        log.info('login', 'You have login approvals turned on.');
        var nextURL =
          'https://www.facebook.com/checkpoint/?next=https%3A%2F%2Fwww.facebook.com%2Fhome.php';

        return utils
          .get(headers.location, null, loginOptions)
          .then(res => {
            utils.saveCookies(res);
            return res;
          })
          .then(function(res) {
            var html = res.body;
            // Make the form in advance which will contain the fb_dtsg and nh
            var $ = utils.cheerio.load(html);
            var arr = [];
            $('form input').map(function(i, v) {
              arr.push({val: $(v).val(), name: $(v).attr('name')});
            });

            arr = arr.filter(function(v) {
              return v.val && v.val.length;
            });

            var form = utils.arrToForm(arr);
            if (html.indexOf('checkpoint/?next') > -1) {
              throw {
                error: 'login-approval',
                continue: function(code) {
                  form.approvals_code = code;
                  form['submit[Continue]'] = 'Continue';
                  return utils
                    .post(nextURL, form, loginOptions)
                    .then(res => utils.saveCookies(res))
                    .then(function() {
                      // Use the same form (safe I hope)
                      form.name_action_selected = 'save_device';

                      return utils
                        .post(nextURL, form, loginOptions)
                        .then(res => {
                          utils.saveCookies(res);
                          return res;
                        });
                    })
                    .then(function(res) {
                      var headers = res.headers;
                      if (
                        !headers.location &&
                        res.body.indexOf('Review Recent Login') > -1
                      ) {
                        throw {
                          error: 'Something went wrong with login approvals.',
                        };
                      }

                      var appState = utils.getAppState();

                      // Simply call loginHelper because all it needs is the jar
                      // and will then complete the login process
                      return loginHelper(
                        appState,
                        email,
                        password,
                        loginOptions,
                        callback,
                      );
                    })
                    .catch(function(err) {
                      callback(err);
                    });
                },
              };
            } else {
              if (!loginOptions.forceLogin) {
                throw {
                  error:
                    "Couldn't login. Facebook might have blocked this account. Please login with a browser or enable the option 'forceLogin' and try again.",
                };
              }
              if (html.indexOf('Suspicious Login Attempt') > -1) {
                form['submit[This was me]'] = 'This was me';
              } else {
                form['submit[This Is Okay]'] = 'This Is Okay';
              }

              return utils
                .post(nextURL, form, loginOptions)
                .then(res => utils.saveCookies(res))
                .then(function() {
                  // Use the same form (safe I hope)
                  form.name_action_selected = 'save_device';

                  return utils.post(nextURL, form, loginOptions).then(res => {
                    utils.saveCookies(res);
                    return res;
                  });
                })
                .then(function(res) {
                  var headers = res.headers;

                  if (
                    !headers.location &&
                    res.body.indexOf('Review Recent Login') > -1
                  ) {
                    throw {
                      error: 'Something went wrong with review recent login.',
                    };
                  }

                  var appState = utils.getAppState();

                  // Simply call loginHelper because all it needs is the jar
                  // and will then complete the login process
                  return loginHelper(
                    appState,
                    email,
                    password,
                    loginOptions,
                    callback,
                  );
                })
                .catch(function(e) {
                  callback(e);
                });
            }
          });
      }

      return utils
        .get('https://www.facebook.com/', null, loginOptions)
        .then(res => utils.saveCookies(res));
    });
};

// Helps the login
const loginHelper = (appState, email, password, globalOptions, callback) => {
  var mainPromise = null;

  // If we're given an appState we loop through it and save each cookie
  // back into the jar.
  if (appState) {
    appState.map(function(c) {
      var str =
        c.key +
        '=' +
        c.value +
        '; expires=' +
        c.expires +
        '; domain=' +
        c.domain +
        '; path=' +
        c.path +
        ';';
      utils.setCookie('http://' + c.domain, {
        [c.key]: c.value,
        expires: c.expires,
        domain: c.domain,
        path: c.path,
      });
    });

    // Load the main page.
    mainPromise = utils
      .get('https://www.facebook.com/', null, globalOptions)
      .then(res => utils.saveCookies(res));
  } else {
    // Open the main page, then we login with the given credentials and finally
    // load the main page again (it'll give us some IDs that we need)
    debugger;
    mainPromise = utils
      .get('https://www.facebook.com/', null, globalOptions)
      .then(res => {
        utils.saveCookies(res);
        return res;
      })
      .then(res => {
        debugger;
        makeLogin(res, email, password, globalOptions, callback);
      })
      .then(function() {
        return utils
          .get('https://www.facebook.com/', null, globalOptions)
          .then(res => utils.saveCookies(res));
      });
  }

  var ctx = null;
  var defaultFuncs = null;
  var api = null;

  mainPromise = mainPromise
    .then(function(res) {
      // Hacky check for the redirection that happens on some ISPs, which doesn't return statusCode 3xx
      var reg = /<meta http-equiv="refresh" content="0;url=([^"]+)[^>]+>/;
      var redirect = reg.exec(res.body);
      if (redirect && redirect[1]) {
        return utils
          .get(redirect[1], null, globalOptions)
          .then(res => utils.saveCookies(res));
      }
      return res;
    })
    .then(function(res) {
      var html = res.body;
      var stuff = buildAPI(globalOptions, html);
      ctx = stuff[0];
      defaultFuncs = stuff[1];
      api = stuff[2];
      return res;
    })
    .then(function() {
      var form = {
        reason: 6,
      };
      log.info('login', 'Request to reconnect');
      return utils
        .get('https://www.facebook.com/ajax/presence/reconnect.php', form)
        .then(res => utils.saveCookies(res));
    })
    .then(function() {
      var presence = utils.generatePresence(ctx.userID);

      utils.setFromResponse(
        'https://www.facebook.com',
        'presence=' + presence + '; path=/; domain=.facebook.com; secure',
      );
      utils.setFromResponse(
        'https://www.messenger.com',
        'presence=' + presence + '; path=/; domain=.messenger.com; secure',
      );
      utils.setFromResponse(
        'https://www.facebook.com',
        'locale=en_US; path=/; domain=.facebook.com; secure',
      );
      utils.setFromResponse(
        'https://www.messenger.com',
        'locale=en_US; path=/; domain=.messenger.com; secure',
      );
      utils.setFromResponse(
        'https://www.facebook.com',
        'a11y=' +
          utils.generateAccessiblityCookie() +
          '; path=/; domain=.facebook.com; secure',
      );
      return true;
    });

  // given a pageID we log in as a page
  if (globalOptions.pageID) {
    mainPromise = mainPromise
      .then(function() {
        return utils.get(
          'https://www.facebook.com/' +
            ctx.globalOptions.pageID +
            '/messages/?section=messages&subsection=inbox',
          null,
          globalOptions,
        );
      })
      .then(function(resData) {
        var url = utils
          .getFrom(
            resData.body,
            'window.location.replace("https:\\/\\/www.facebook.com\\',
            '");',
          )
          .split('\\')
          .join('');
        url = url.substring(0, url.length - 1);

        return utils.get('https://www.facebook.com' + url, null, globalOptions);
      });
  }

  // At the end we call the callback or catch an exception
  mainPromise
    .then(function() {
      log.info('login', 'Done logging in.');
      return callback(null, api);
    })
    .catch(function(e) {
      log.error('login', e.error || e);
      callback(e);
    });
};

const login = (loginData, options, callback) => {
  if (
    utils.getType(options) === 'Function' ||
    utils.getType(options) === 'AsyncFunction'
  ) {
    callback = options;
    options = {};
  }

  var globalOptions = {
    selfListen: false,
    listenEvents: false,
    updatePresence: false,
    forceLogin: false,
    autoMarkDelivery: true,
    autoMarkRead: false,
    logRecordSize: defaultLogRecordSize,
    userAgent:
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.106 Safari/537.36',
    // 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_2) AppleWebKit/600.3.18 (KHTML, like Gecko) Version/8.0.3 Safari/600.3.18',
  };
  // utils.getCookies();
  setOptions(globalOptions, options);

  loginHelper(
    loginData.appState,
    loginData.email,
    loginData.password,
    globalOptions,
    callback,
  );
};

export {setOptions, buildAPI, makeLogin, loginHelper, login};
