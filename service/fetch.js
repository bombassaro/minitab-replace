const doFetch = async (method, path, body) => {
  const headers = () => {
    const request = {}
    request.method = method
    request.headers = {}
    request.headers['Content-Type'] = 'application/json'
    return request
  }
  const request = headers()
  if(body) request.body = JSON.stringify(body)
  const res = await fetch(path, request)
  if(res.ok) {
    const content = await res.json()
    return content
  } else {
    console.log(`fetch.failed`, res)
    return {status: false}
  }
}
export {doFetch}