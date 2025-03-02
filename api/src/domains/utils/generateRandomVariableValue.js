module.exports = function generateRandomVariableValue({ min, max, step }) {
  const range = (max - min) / step
  const randomStep = Math.floor(Math.random() * (range + 1))
  const randomNumber = min + randomStep * step
  const decimalPlaces = (step.toString().split(".")[1] || "").length
  return parseFloat(randomNumber.toFixed(decimalPlaces))
}
