/**
 * Created by huangyilu on 2018/11/23.
 * 规格工具函数
 */
import _ from 'lodash'

// 重新组合 已选的规格的 ID combination
let formatAllSelectedCombIds = prearr => {
  let list = ['']
  for (let i = 0, len = prearr.length; i < len; i++) {
    list.forEach(x => {
      list.push(x + ',' + prearr[i])
    })
  }
  return list
    .map(x => {
      return x.split(',').slice(1)
    })
    .slice(1)
}
let formatSpecPropertyValues = item => {
  console.log(' formatSpecPropertyValues == ', item)
  return {
    propertyValueId: item.rid,
    propertyValueName: item.value,
    isSelect: false,
    isSpecStock: true
  }
}
let formatStock = item => {
  let selectItem = _.filter(item.propertyValues, { isSelect: true })
  return {
    name: item.propertyName,
    id: item.propertyId,
    selectid: selectItem.length ? selectItem[0].propertyValueId : '',
    selectname: selectItem.length ? selectItem[0].propertyValueName : '',
    hasselect: selectItem.length || false,
    values: item.propertyValues
  }
}
let formatSelectGoodsInfo = (skuData, priceData) => {
  let sortData = _.sortBy(skuData, ['selectid'])
  let ids = _.map(sortData, 'selectid').join(',')
  console.log(' ids ===== ', ids)
  console.log(' skuData ===== ', skuData)
  console.log(' priceData ===== ', priceData)
  return _.filter(priceData, p => {
    let slpitP = _.compact(p.propertyValueIds.split(',')).sort()
    return slpitP.join(',') === ids
  })[0]
}

let formatSelectSKu = (sku, allSkuArr) => {
  let newAll = []
  sku.forEach(witem => {
    newAll = allSkuArr.filter(item => {
      return _.includes(item, witem)
    })
  })
  return newAll.join('')
}
let formatOtherSkuValue = (sku, skuObj) => {
  let newSkuObj = []
  newSkuObj = skuObj.filter(item => {
    return !_.includes(sku, item.selectid + '')
  })
  return _.map(newSkuObj, 'values')
}
let formatNoSkuIds = (ondSkuId, skuObj, allSkuArr) => {
  // 存放 无库存的 属性的 ID
  let noSkuArr = []
  // 拿到 除了选中行之外的其他行
  let otherValue = formatOtherSkuValue(ondSkuId, skuObj)
  // 遍历 除了选中行之外的其他行 ，匹配 选中行与其他行所有可能的组合 中 是否存在 此属性, 并返回不存的的属性的ID
  otherValue.forEach(witem => {
    // 拿到 选中行与其他行 匹配的所有可能的组合
    console.log(' witem == ', witem)
    let newSelectSku = formatSelectSKu(ondSkuId, allSkuArr)
    console.log('newSelectSku == ', newSelectSku)
    console.log('allSkuArr == ', allSkuArr)
    witem.forEach(item => {
      if (!_.includes(newSelectSku, item.propertyValueId + '')) {
        noSkuArr.push(item.propertyValueId)
      }
    })
  })
  return noSkuArr
}

// 判断 iPhoneX以上 3
let systemInfo = () => {
  // var u = navigator.userAgent
  // var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1
  // var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
  // if (isiOS) {
  //   return 'ios'
  // }
  // if (isAndroid) {
  //   return 'android'
  // }
}
// iPhoneX以上
let isAboveIPhoneX = () => {
  // if (systemInfo() === 'ios') {
  //   let isIPhoneX =
  //     /iphone/gi.test(window.navigator.userAgent) && (window.screen.height === 812 && window.screen.width === 375)
  //   let isIPhoneXSMax =
  //     /iphone/gi.test(window.navigator.userAgent) &&
  //     window.devicePixelRatio &&
  //     window.devicePixelRatio === 3 &&
  //     window.screen.width === 414 &&
  //     window.screen.height === 896
  //   let isIPhoneXR =
  //     /iphone/gi.test(window.navigator.userAgent) &&
  //     window.devicePixelRatio &&
  //     window.devicePixelRatio === 2 &&
  //     window.screen.width === 414 &&
  //     window.screen.height === 896
  //   console.log(' isIPhoneX = ', isIPhoneX)
  //   if (isIPhoneX || isIPhoneXSMax || isIPhoneXR) {
  //     return true
  //   } else {
  //     return false
  //   }
  // }
  // return 0
}

export default {
  formatSpecPropertyValues,
  formatStock,
  formatSelectGoodsInfo,
  formatAllSelectedCombIds,
  formatOtherSkuValue,
  formatSelectSKu,
  formatNoSkuIds,
  systemInfo,
  isAboveIPhoneX
}
