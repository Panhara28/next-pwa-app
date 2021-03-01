export const parsedImage = (url) => {
  let parsedUrl;
  if(url.indexOf("https") > -1 || url.indexOf("http") > -1) {
    parsedUrl = new URL(url);
  } else {
    parsedUrl = new URL("https:" + url);
  }
  
  return parsedUrl.origin + parsedUrl.pathname;
}