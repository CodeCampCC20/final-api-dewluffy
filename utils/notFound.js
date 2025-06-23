const notFound = (req, res) => {
  res.status(404).json({message:"404 NotFound!!!"})
}
export default notFound