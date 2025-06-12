function calculateEarnings(amount) {
  if (amount <= 1000) return null;

  const level1Earning = amount * 0.05;
  const level2Earning = amount * 0.01;

  return {
    level1: level1Earning,
    level2: level2Earning,
  };
}

module.exports = { calculateEarnings };
