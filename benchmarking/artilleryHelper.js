const getRandNum = (userContext, events, done) => {
  const randNum = Math.floor(Math.random() * Math.floor(10000000 + 1));
  userContext.vars.randNum = randNum;
  return done();
};

module.exports = {
  getRandNum,
};
