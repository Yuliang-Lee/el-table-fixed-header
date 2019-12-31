/**
 * table 使用的指令，用于固定表头
 * @param {Number} 可接受一个数字类型参数,表示 table 上边框离浏览器窗口多少px开始fix头部,默认 0
 */
const ElementTableCtx = Symbol('__ElementTableHeaderCtx')
function setFixed(el, fixed, height) {
  if (fixed) {
    el.style.position = 'relative'
    el.style.top = height + 'px'
    el.style.zIndex = 100
  } else {
    el.style.position = 'relative'
    el.style.top = '0'
    el.style.zIndex = 'inherit'
  }
}
function setFixedHeaderFixed(el, fixed, height) {
  if (fixed) {
    el.style.top = height + 'px'
    el.style.zIndex = 100
  } else {
    el.style.top = '0'
    el.style.zIndex = 'inherit'
  }
}
function setFirstRowFixed(el, fixed, height = 0) {
  if (fixed) {
    el.style.top = height + 'px'
    el.style.zIndex = 99
    el.style.borderBottom = '2px solid #e0e6ed'
  } else {
    el.style.top = '0'
    el.style.zIndex = 'inherit'
    el.style.borderBottom = '1px solid #e0e6ed'
  }
}

export default function install(Vue) {
  Vue.directive('fixed-header', {
    bind(el, binding, vnode) {

    },
    inserted(el, binding, vnode) {
      let { startFixed = 0, container = window } = binding.value || {}
      const headerWrapper = el.querySelector('.el-table__header-wrapper')

      if (typeof container === 'string') {
        container = document.querySelector(container)
      }

      if (typeof startFixed !== 'number') {
        throw TypeError('fixed-header needs number value')
      }

      const onScroll = () => {
        console.log('scroll')
        const pos = el.getBoundingClientRect()

        if (pos.top - startFixed < 0) {
          setFixed(headerWrapper, true, Math.abs(pos.top - startFixed))
        } else {
          setFixed(headerWrapper, false)
        }
      }
      console.log(container)
      container.addEventListener('scroll', onScroll)

      el[ElementTableCtx] = {
        startFixed,
        onScroll,
        container,
        fixedScroll: null
      }
    },
    componentUpdated(el, binding, vnode) {
      let { fixedScroll, startFixed, container } = el[ElementTableCtx]

      if (fixedScroll) {
        container.removeEventListener('scroll', fixedScroll)
      }

      setTimeout(() => {
        const fixedHeaderWrappers = el.querySelectorAll('.el-table__fixed-header-wrapper')
        const fixedRightHeaderWrappers = el.querySelectorAll('.el-table__fixed-right > .el-table__fixed-header-wrapper') // eslint-disable-line max-len

        if (fixedHeaderWrappers.length || fixedRightHeaderWrappers.length) {
          el.querySelector('.el-table__fixed') && (el.querySelector('.el-table__fixed').style.zIndex = 100)
          el.querySelector('.el-table__fixed-right') && (el.querySelector('.el-table__fixed-right').style.zIndex = 101)

          fixedScroll = () => {
            const pos = el.getBoundingClientRect()

            if (binding.modifiers.first) {
              const firstRows = el.querySelectorAll('.el-table__body .sum-row > td')
              Array.prototype.slice.call(firstRows).forEach((firstRow, index) => {
                if (pos.top - startFixed < 0) {
                  setFirstRowFixed(firstRow, true, Math.abs(pos.top - startFixed))
                } else {
                  setFirstRowFixed(firstRow, false)
                }
              })
            }

            Array.prototype.slice.call(fixedHeaderWrappers).forEach((fixedHeaderWrapper) => {
              if (pos.top - startFixed < 0) {
                el[ElementTableCtx].fixedHeaderFixed = true

                setFixedHeaderFixed(fixedHeaderWrapper, true, Math.abs(pos.top - startFixed))
              } else {
                setFixedHeaderFixed(fixedHeaderWrapper, false)
              }
            })
            Array.prototype.slice.call(fixedRightHeaderWrappers).forEach((fixedRightHeaderWrapper) => {
              if (pos.top - startFixed < 0) {
                el[ElementTableCtx].fixedHeaderFixed = true

                setFixedHeaderFixed(fixedRightHeaderWrapper, true, Math.abs(pos.top - startFixed))
              } else {
                setFixedHeaderFixed(fixedRightHeaderWrapper, false)
              }
            })
          }

          container.addEventListener('scroll', fixedScroll)
          el[ElementTableCtx].fixedScroll = fixedScroll
        }
      }, 0)
    },
    unbind(el) {
      const { fixedScroll, onScroll, container } = el[ElementTableCtx]
      container.removeEventListener('scroll', onScroll)
      container.removeEventListener('scroll', fixedScroll)
      el[ElementTableCtx] = null
    }
  })
}
