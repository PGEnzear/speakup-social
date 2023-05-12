const Response = async (res, result, req = undefined) => {
  if(!result) {
    if(req) {
      const ip = req.clientIp;
      return res.status(500).json({"data": 'Something went wrong', "status": 400, "timestamp": String(Date.now()), "remote": ip});
    } else {
      return res.sendStatus(500) 
    }
  }
  let status = result.status || 200
  if(!result.status && result.error) status = 400
  const cookies = result.cookies
  const error = result.error
  const data = result.data
  const dtime = Date.now()
  res.status(status);
  if(cookies) {
    for(let cookie of cookies) {
      res.cookie(cookie.name ,cookie.value, { maxAge: cookie.maxAge || 900000, httpOnly: cookie.httpOnly || true });
    }
  }
  if(error) {
    res.json({status, error, dtime})
  } else {
    res.json({status, data, dtime})
  }
}

export default Response