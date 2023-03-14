/**
 * 防抖
 * @param {function} fn 
 * @param {number} delay 
 */
export function debounce(fn: any, delay = 500,) {
  let timer: NodeJS.Timeout | null | undefined = null
  return () => {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn()
      // fn.apply(this, arguments)
      clearTimeout(timer as NodeJS.Timeout)
    }, delay)
  }
}


/* 
*数组对象去重
*
*/

export function deleteRepetition(data: any[]) {

  let obj: any = {};
  let peon = data.reduce((cur, next) => {
    obj[next.id] ? "" : obj[next.id] = true && cur.push(next);
    return cur
  }, []) //设置cur默认类型为数组，并且初始值为空的数组

  return peon
}


/* 复制到剪切板 */
export function copyToClip(content) {
  const aux = document.createElement('input')
  aux.setAttribute('value', content)
  document.body.appendChild(aux)
  aux.select()
  document.execCommand('copy')
  document.body.removeChild(aux)
}


/* 保存成geojson文件下载 */
export function saveGeoJSON(data, filename) {
  if (!data) {
    alert("保存的数据为空");
    return;
  }
  if (!filename) filename = "json.geojson";
  if (typeof data === "object") {
    data = JSON.stringify(data, undefined, 4);
  }
  let blob = new Blob([data], { type: "text/geojson" }),
    a = document.createElement("a");
  a.download = filename;
  a.href = window.URL.createObjectURL(blob);
  a.dataset.downloadurl = ["text/geojson", a.download, a.href].join(":");
  document.body.appendChild(a);
  a.click();
  // 然后移除
  document.body.removeChild(a);
}
//分割url
export function getParams(_url?: any) {
  if (_url && typeof _url !== 'string') return {};
  let url = (_url || location.href).split('?')[1] || '';

  url = url.indexOf('#') > -1 ? url.split('#')[0] : url;
  let ansObj = {};
  if (url) {
    let str = url.split("&");//将？去掉 进行&分割  a=1 b=2  进行对象拼装
    for (let i = 0; i < str.length; i++) {
      let tempArr = str[i].split("=");
      tempArr[0] && (ansObj[tempArr[0]] = (tempArr[1]));
    }
  }
  return ansObj;
}