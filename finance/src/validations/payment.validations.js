const JOI = require('joi');
const HTTPStatus = require('../helpers/HTTP.status');
const customError = require('../helpers/error.custom');

const payloadValidation = (payload) => {
  const { error } = JOI.object({
    value: JOI.number().min(1).required(),
    buyerName: JOI.string().required(),
    cardNumber: JOI.number().required(),
    expirationDate: JOI.date().required(),
    cvv: JOI.number().required(),
  }).validate(payload);

  if (error) throw customError(error.message, HTTPStatus.UN_ENTITY);
  return null;
}

const confirmPaymentValidation = (payload) => {
  const { error } = JOI.object({
    name: JOI.string().required(),
    cpf: JOI.number().required(),
    paymentId: JOI.number().required(),
    description: JOI.object({
      buyerAddress: {
        street: JOI.string().required(),
        number: JOI.string().required(),
        cep: JOI.number().required(), // trocar para string
        city: JOI.string().required(),
        state: JOI.string().min(2).max(2).pattern(new RegExp('^(AC|AL|AM|AP|BA|CE|DF|ES|GO|MA|MG|MS|MT|PA|PB|PE|PI|PR|RJ|RN|RO|RR|RS|SC|SE|SP|TO)$')).required(),
      },
      ordersList: JOI.array().items(JOI.object({
        product: JOI.string().required(),
        quantity: JOI.number().required(),
        price: JOI.number().required(),
      })),
    }).required(),
  }).validate(payload);

  if (error) throw customError(error.message, HTTPStatus.UN_ENTITY);
  return null;
}

module.exports = {
  payloadValidation,
  confirmPaymentValidation,
}