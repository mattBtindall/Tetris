const G = (function () {
  const scl = 30,
    gridCoordinates = {x: [0], y: [0]};

  let box,
    frameInc = 0;

  return {
    scl,
    box,
    frameInc,
    gridCoordinates
  };
})();