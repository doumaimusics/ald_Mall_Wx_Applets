import basis from 'utils/basis'

export const shareStatus = {
  // 状态 0未分享 1去分享 2分享成功 3分享失败
  INIT: 0,
  TO_SHARE: 1,
  SUCCESS: 2,
  FAIL: 3
}

const help = (val, def) => (val !== undefined ? val : def)

const shareMessage = function(root, params) {
  let title = help(params.title, root.title)
  let path = help(params.path, root.path)
  if (params.pathParams) {
    path += '?' + basis.urlencoded(params.pathParams)
  }
  let imageUrl = help(params.imageUrl, root.imageUrl)

  root.status = shareStatus.TO_SHARE
  if (params.success) {
    setTimeout(() => {
      params.success()
    }, 400)
  }
  return { title, path, imageUrl }
}

const createShare = function(params) {
  let status = shareStatus.INIT
  if (!params) params = {}
  if (!params.path) params.path = '/pcollage/pages/collage/share'
  let data = { status, ...params }

  // 分享数据
  data.shareMessage = params => {
    return shareMessage(data, params)
  }
  // 是否分享初始化状态
  data.isInit = () => {
    return data.status === shareStatus.INIT
  }
  // 重置分享状态
  data.reset = () => {
    data.status = shareStatus.INIT
  }

  return data
}

export default { shareStatus, createShare }
