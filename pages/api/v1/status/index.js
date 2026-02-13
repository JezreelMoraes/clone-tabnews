function status(request, response) {
  response.status(200).json({
    chave: "retorno"
  })
}

export default status
