const debug = require('debug')('qcloud-sdk[tunnelSerivce]')
const url = require('url')
const TunnelApi = require('./api')
const config = require('../../config')

/**
 * 广播消息到多个信道
 * @param  {Array} tunnelIds       信道IDs
 * @param  {String} messageType    消息类型
 * @param  {String} messageContent 消息内容
 */
function broadcast (tunnelIds, messageType, messageContent) {
    debug('[broadcast] =>', { tunnelIds, messageType, messageContent })
    return TunnelApi.emitMessage(tunnelIds, messageType, messageContent)
}

/**
 * 发送消息到指定信道
 * @param  {String} tunnelId       信道ID
 * @param  {String} messageType    消息类型
 * @param  {String} messageContent 消息内容
 */
function emit (tunnelId, messageType, messageContent) {
    debug('[emit] =>', { tunnelId, messageType, messageContent })
    return TunnelApi.emitMessage([tunnelId], messageType, messageContent)
}

/**
 * 关闭指定信道
 * @param  {String} tunnelId 信道ID
 */
function closeTunnel (tunnelId) {
    debug('[closeTunnel] =>', { tunnelId })
    return TunnelApi.emitPacket([tunnelId], 'close')
}

/**
 * 构建提交给 WebSocket 信道服务器推送消息的地址
 *
 * 构建过程如下：
 *   1. 从信道服务器地址得到其通信协议（http/https），如 https
 *   2. 获取当前服务器主机名，如 109447.qcloud.la
 *   3. 获得当前 HTTP 请求的路径，如 /tunnel
 *   4. 拼接推送地址为 https://109447.qcloud.la/tunnel
 */
function receiveUrl (pathname) {
    const protocol = url.parse(config.tunnelServerUrl).protocol
    const hostname = config.serverHost
    const port = config.serverPort // 配置端口号，undefined则无效果
    return url.format({ protocol, hostname, port, pathname })
}

module.exports = { broadcast, emit, closeTunnel, receiveUrl }
