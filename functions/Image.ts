export const parsedImage = (url: string, width: number, height: number, quality: number = 100, resize = true) => {
  let parsedUrl: URL;
  if(url.indexOf("https") > -1 || url.indexOf("http") > -1) {
    parsedUrl = new URL(url);
  } else {
    parsedUrl = new URL("https:" + url);
  }
  
  if(resize) return parsedUrl.origin + "/__image/w=" + width + ",h=" + height + ",q=" + quality + parsedUrl.pathname;
  else return parsedUrl.origin + parsedUrl.pathname;
}