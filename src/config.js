const dev = process.env.NODE_ENV !== 'production'
const redirect_uri = dev ? 'http://127.0.0.1:7001/api/v1/getUser' : 'https://scauc.top/api/v1/getUser'
const client_id = dev ? '5af9ba8505354d54' : '9aad00f39e1b483b'

export const loginUrl = `https://oauth.yiban.cn/code/html?client_id=${client_id}&redirect_uri=${redirect_uri}&state=STATE`
