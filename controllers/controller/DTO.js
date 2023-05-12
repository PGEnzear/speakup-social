const DTO = (req, res, data) => {
  const result = {}
  result.invalid = false
  for(let item of data) {
    if(req.body.hasOwnProperty(item)) {
      result[item] = req.body[item]
    } else {
      res.status(400).json({"error": `Missing param ${item}`})
      result.invalid = true
      return result;
    }
  }
  return result
}

export default DTO