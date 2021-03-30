export const parsedImage = (url: string, width: number, height: number, quality: number = 90) => {
  let parsedUrl;
  if(url.indexOf("https") > -1 || url.indexOf("http") > -1) {
    parsedUrl = new URL(url);
  } else {
    parsedUrl = new URL("https:" + url);
  }
  
  return parsedUrl.origin + "/__image/w=" + width + ",h=" + height + ",q=" + quality + parsedUrl.pathname;
}