const G = (function () {
  const scl = 30,
    gridCoordinates = {x: [0], y: [0]};

  const flipSign = (n) => n - (n * 2); 

  let cube,
    cubes = [],
    frameInc = 0,
    arrowPressedFlags = {
      left: false,
      right: false
    },
    speedDivider = 1; // the higher the faster

  return {
    scl,
    cube,
    cubes,
    frameInc,
    gridCoordinates,
    arrowPressedFlags,
    speedDivider,
    flipSign
  };
})();