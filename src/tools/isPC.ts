export function isPc(e: Navigator) {
  const userInfo = e.userAgent;
  const Agents = new Array(
    "Android",
    "iPhone",
    "SymbianOS",
    "Windows Phone",
    "iPad",
    "iPod"
  );
  let flag = true;
  for (let v = 0; v < Agents.length; v++) {
    if (userInfo.indexOf(Agents[v]) > 0) {
      flag = false;
      break;
    }
  }
  return flag;
}
