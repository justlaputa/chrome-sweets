/**
 * background script for goto-google extension
 * functionanity of the script:
 * find all existing *.google.com tabs, pick the first one and move it to the head of Chrome window, close all other tabs
 * if no google tabs found, create a new tab with url: www.google.com, and move it the the head of Chrome window
 */

var GOOGLE_URLS =["https://www.google.com/*", "https://www.google.ac/*", "https://www.google.ad/*", "https://www.google.ae/*", "https://www.google.com.af/*", "https://www.google.com.ag/*", "https://www.google.com.ai/*", "https://www.google.al/*", "https://www.google.am/*", "https://www.google.co.ao/*", "https://www.google.com.ar/*", "https://www.google.as/*", "https://www.google.at/*", "https://www.google.com.au/*", "https://www.google.az/*", "https://www.google.ba/*", "https://www.google.com.bd/*", "https://www.google.be/*", "https://www.google.bf/*", "https://www.google.bg/*", "https://www.google.com.bh/*", "https://www.google.bi/*", "https://www.google.bj/*", "https://www.google.com.bn/*", "https://www.google.com.bo/*", "https://www.google.com.br/*", "https://www.google.bs/*", "https://www.google.bt/*", "https://www.google.co.bw/*", "https://www.google.by/*", "https://www.google.com.bz/*", "https://www.google.ca/*", "https://www.google.com.kh/*", "https://www.google.cc/*", "https://www.google.cd/*", "https://www.google.cf/*", "https://www.google.cat/*", "https://www.google.cg/*", "https://www.google.ch/*", "https://www.google.ci/*", "https://www.google.co.ck/*", "https://www.google.cl/*", "https://www.google.cm/*", "https://www.google.cn/*", "https://www.google.com.co/*", "https://www.google.co.cr/*", "https://www.google.com.cu/*", "https://www.google.cv/*", "https://www.google.com.cy/*", "https://www.google.cz/*", "https://www.google.de/*", "https://www.google.dj/*", "https://www.google.dk/*", "https://www.google.dm/*", "https://www.google.com.do/*", "https://www.google.dz/*", "https://www.google.com.ec/*", "https://www.google.ee/*", "https://www.google.com.eg/*", "https://www.google.es/*", "https://www.google.com.et/*", "https://www.google.fi/*", "https://www.google.com.fj/*", "https://www.google.fm/*", "https://www.google.fr/*", "https://www.google.ga/*", "https://www.google.ge/*", "https://www.google.gf/*", "https://www.google.gg/*", "https://www.google.com.gh/*", "https://www.google.com.gi/*", "https://www.google.gl/*", "https://www.google.gm/*", "https://www.google.gp/*", "https://www.google.gr/*", "https://www.google.com.gt/*", "https://www.google.gy/*", "https://www.google.com.hk/*", "https://www.google.hn/*", "https://www.google.hr/*", "https://www.google.ht/*", "https://www.google.hu/*", "https://www.google.co.id/*", "https://www.google.iq/*", "https://www.google.ie/*", "https://www.google.co.il/*", "https://www.google.im/*", "https://www.google.co.in/*", "https://www.google.io/*", "https://www.google.is/*", "https://www.google.it/*", "https://www.google.je/*", "https://www.google.com.jm/*", "https://www.google.jo/*", "https://www.google.co.jp/*", "https://www.google.co.ke/*", "https://www.google.ki/*", "https://www.google.kg/*", "https://www.google.co.kr/*", "https://www.google.com.kw/*", "https://www.google.kz/*", "https://www.google.la/*", "https://www.google.com.lb/*", "https://www.google.com.lc/*", "https://www.google.li/*", "https://www.google.lk/*", "https://www.google.co.ls/*", "https://www.google.lt/*", "https://www.google.lu/*", "https://www.google.lv/*", "https://www.google.com.ly/*", "https://www.google.co.ma/*", "https://www.google.md/*", "https://www.google.me/*", "https://www.google.mg/*", "https://www.google.mk/*", "https://www.google.ml/*", "https://www.google.com.mm/*", "https://www.google.mn/*", "https://www.google.ms/*", "https://www.google.com.mt/*", "https://www.google.mu/*", "https://www.google.mv/*", "https://www.google.mw/*", "https://www.google.com.mx/*", "https://www.google.com.my/*", "https://www.google.co.mz/*", "https://www.google.com.na/*", "https://www.google.ne/*", "https://www.google.com.nf/*", "https://www.google.com.ng/*", "https://www.google.com.ni/*", "https://www.google.nl/*", "https://www.google.no/*", "https://www.google.com.np/*", "https://www.google.nr/*", "https://www.google.nu/*", "https://www.google.co.nz/*", "https://www.google.com.om/*", "https://www.google.com.pk/*", "https://www.google.com.pa/*", "https://www.google.com.pe/*", "https://www.google.com.ph/*", "https://www.google.pl/*", "https://www.google.com.pg/*", "https://www.google.pn/*", "https://www.google.com.pr/*", "https://www.google.ps/*", "https://www.google.pt/*", "https://www.google.com.py/*", "https://www.google.com.qa/*", "https://www.google.ro/*", "https://www.google.rs/*", "https://www.google.ru/*", "https://www.google.rw/*", "https://www.google.com.sa/*", "https://www.google.com.sb/*", "https://www.google.sc/*", "https://www.google.se/*", "https://www.google.com.sg/*", "https://www.google.sh/*", "https://www.google.si/*", "https://www.google.sk/*", "https://www.google.com.sl/*", "https://www.google.sn/*", "https://www.google.sm/*", "https://www.google.so/*", "https://www.google.st/*", "https://www.google.sr/*", "https://www.google.com.sv/*", "https://www.google.td/*", "https://www.google.tg/*", "https://www.google.co.th/*", "https://www.google.com.tj/*", "https://www.google.tk/*", "https://www.google.tl/*", "https://www.google.tm/*", "https://www.google.to/*", "https://www.google.tn/*", "https://www.google.com.tr/*", "https://www.google.tt/*", "https://www.google.com.tw/*", "https://www.google.co.tz/*", "https://www.google.com.ua/*", "https://www.google.co.ug/*", "https://www.google.co.uk/*", "https://www.google.us/*", "https://www.google.com.uy/*", "https://www.google.co.uz/*", "https://www.google.com.vc/*", "https://www.google.co.ve/*", "https://www.google.vg/*", "https://www.google.co.vi/*", "https://www.google.com.vn/*", "https://www.google.vu/*", "https://www.google.ws/*", "https://www.google.co.za/*", "https://www.google.co.zm/*", "https://www.google.co.zw/*"];

chrome.commands.onCommand.addListener(function(command) {
  if (command !== 'goto-google-tab') {
    console.debug('GoogleTabs received command: %s, not my command, skip', command);
    return;
  }

  console.debug('GoogleTabs received command: %s, my command, handling it', command);

  findGoogleTabs(function(tabs) {
    if (tabs.length === 0) {
      openNewGoogleTabAndJump();
    } else {
      jumpToPrimaryGoogleTab(tabs);
      closeOtherGoogleTabs(tabs);
    }
  });
});

function findGoogleTabs(callback) {
  chrome.tabs.query({currentWindow: true, url: GOOGLE_URLS}, function(tabs) {
    if (tabs === undefined) {
      console.debug('no google tabs found')
      callback([]);
    } else {
      console.groupCollapsed('found %d google tabs', tabs.length);
      for (var tab of tabs) {
        console.dir(tab);
      }
      console.groupEnd();
      callback(tabs);
    }
  });
}

function openNewGoogleTabAndJump() {
  chrome.tabs.create({
    url: 'https://www.google.com',
    index: 0,
    active: true
  }, function(tab) {
    console.debug('created new google search tab', tab);
  });
}

function closeOtherGoogleTabs(tabs, callback) {
  if (tabs.length <= 1) {
    console.debug('no more than 1 tabs, skip close other tabs');
    if (callback && typeof callback === 'function') {
      callback();
    }
    return;
  }
  var otherIds = tabs.filter(function(_, index) {return index > 0}).map(function(t) {return t.id});
  console.debug('close other tabs: [%s]', otherIds.join());

  chrome.tabs.remove(otherIds, callback);
}

function jumpToPrimaryGoogleTab(tabs, callback) {
  chrome.tabs.highlight({tabs: tabs[0].index}, function(tab) {
    console.log('highlight first google tab', tab);
    console.log('send message to google tab');

    chrome.tabs.sendMessage(tabs[0].id, { type: 'JUMP_TO_SEARCH'}, function(response) {
      console.log('get response from google tab content script', response);
    });
  });
}
