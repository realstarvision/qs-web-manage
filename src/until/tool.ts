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
