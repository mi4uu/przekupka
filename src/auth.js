import auth from 'basic-auth'

const admin = {name: 'miial', password: 'mi12Ja11Li85!'}

export default function (request, response, next) {
  const user = auth(request)
  if (!user || !admin.name || admin.password !== user.pass) {
    response.set('WWW-Authenticate', 'Basic realm="example"')
    return response.status(401).send()
  }

  return next()
}
