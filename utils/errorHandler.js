const err = (err, req, res, next) => {
  if(err) console.log(err.stack)
  const ip = req.clientIp;
  res.status(500).json({"data": 'Something went wrong', "status": 400, "timestamp": String(Date.now()), "remote": ip, "now": Date.now()});
}

export default err