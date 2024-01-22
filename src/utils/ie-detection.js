//source: https://gist.github.com/weblancaster/6789e76276801329893e
export function isIE() { return ((navigator.appName === 'Microsoft Internet Explorer') || ((navigator.appName === 'Netscape') && (new RegExp("Trident/.*rv:([0-9]{1,}[\\.0-9]*)").exec(navigator.userAgent) != null))); } // eslint-disable-next-line
