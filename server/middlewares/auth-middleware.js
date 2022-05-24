const jwtLib = require('jsonwebtoken')

exports.authenticateJWT = (requiredRoles = []) => {
    return (req, res, next) => {
      const authHeader = req.headers['authorization']
      const jwt = authHeader && authHeader.split(' ')[1]

      if (!jwt) 
          return res.status(401).send("A")
    
      jwtLib.verify(jwt, process.env.JWT_SECRET, (err, loggedUser) => {
        if (err)
          return res.status(401).send("B")
        
        const hasRequiredRoles = requiredRoles.length === 0 || requiredRoles
            .some(requiredRole => loggedUser.roles.includes(requiredRole))

        if (!hasRequiredRoles)
        {
          res.set()
          return res.status(403).send()
        }

        req.loggedUser = loggedUser
        next()
      })
    }
  }

exports.authenticateJWTForRefresh = (req, res, next) => { 
  const authHeader = req.headers['authorization']
  const jwt = authHeader && authHeader.split(' ')[1]

  if (jwt == null) 
      return res.status(401).send()

  jwtLib.verify(jwt, process.env.JWT_SECRET, {ignoreExpiration: true}, (err, refreshingUser) => {
    if (err)
      return res.status(401).send()
    
    req.refreshingUser = refreshingUser
    next()
  })
}