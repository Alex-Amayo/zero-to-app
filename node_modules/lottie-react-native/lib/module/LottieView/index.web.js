import React, { forwardRef, useImperativeHandle, useRef, useCallback, useEffect } from 'react';
import { parsePossibleSources } from './utils';
let DotLottiePlayer, Player;
try {
  DotLottiePlayer = require('@dotlottie/react-player').DotLottiePlayer;
} catch (e) {}
try {
  Player = require('@lottiefiles/react-lottie-player').Player;
} catch (e) {}
const LottieView = /*#__PURE__*/forwardRef((_ref, ref) => {
  var _sources$sourceName;
  let {
    source,
    speed,
    loop,
    webStyle,
    autoPlay,
    hover,
    direction,
    progress,
    onAnimationFailure,
    onAnimationFinish,
    onAnimationLoop
  } = _ref;
  const sources = parsePossibleSources(source);
  const isLottie = ((_sources$sourceName = sources.sourceName) === null || _sources$sourceName === void 0 ? void 0 : _sources$sourceName.includes('.lottie')) || !!sources.sourceDotLottieURI;
  const lottieSource = sources.sourceDotLottieURI || sources.sourceName;
  const jsonSource = sources.sourceURL || sources.sourceJson;
  const [isError, setIsError] = React.useState(false);
  const [key, setKey] = React.useState(0);

  /**
   *  If an error occured reset the key when the source changes to force a re-render.
   */
  useEffect(() => {
    if (isError) {
      setKey(prevKey => prevKey + 1);
      setIsError(false);
    }
  }, [source]);
  if (progress != undefined && __DEV__) {
    console.warn('lottie-react-native: progress is not supported on web');
  }
  const handleEvent = useCallback(event => {
    switch (event) {
      case 'error':
        onAnimationFailure === null || onAnimationFailure === void 0 || onAnimationFailure('error');
        setIsError(true);
        break;
      case 'complete':
        onAnimationFinish === null || onAnimationFinish === void 0 || onAnimationFinish(false);
        break;
      case 'stop':
      case 'pause':
        onAnimationFinish === null || onAnimationFinish === void 0 || onAnimationFinish(true);
        break;
      case 'loop':
      case 'loopComplete':
        onAnimationLoop === null || onAnimationLoop === void 0 || onAnimationLoop();
        break;
    }
  }, []);
  const playerRef = useRef(null);
  useImperativeHandle(ref, () => ({
    play: () => {
      var _playerRef$current;
      (_playerRef$current = playerRef.current) === null || _playerRef$current === void 0 || _playerRef$current.play();
    },
    reset: () => {
      if (isLottie) {
        var _playerRef$current2;
        (_playerRef$current2 = playerRef.current) === null || _playerRef$current2 === void 0 || _playerRef$current2.stop();
      } else {
        var _playerRef$current3;
        (_playerRef$current3 = playerRef.current) === null || _playerRef$current3 === void 0 || _playerRef$current3.setSeeker(0, false);
      }
    },
    pause: () => {
      var _playerRef$current4;
      (_playerRef$current4 = playerRef.current) === null || _playerRef$current4 === void 0 || _playerRef$current4.pause();
    },
    resume: () => {
      var _playerRef$current5;
      (_playerRef$current5 = playerRef.current) === null || _playerRef$current5 === void 0 || _playerRef$current5.play();
    }
  }));
  if (isLottie) {
    if (!DotLottiePlayer) {
      throw new Error('lottie-react-native: The module @dotlottie/react-player is missing.');
    }
    return /*#__PURE__*/React.createElement(DotLottiePlayer, {
      lottieRef: playerRef,
      src: lottieSource,
      onEvent: handleEvent,
      style: webStyle,
      autoplay: autoPlay,
      speed: speed,
      loop: loop,
      hover: hover,
      direction: direction
    });
  }
  if (!Player) {
    throw new Error('lottie-react-native: The module @lottiefiles/react-lottie-player is missing.');
  }
  return /*#__PURE__*/React.createElement(Player, {
    key: key,
    ref: playerRef,
    src: jsonSource,
    onEvent: handleEvent,
    style: webStyle,
    autoplay: autoPlay,
    speed: speed,
    loop: loop,
    hover: hover,
    direction: direction
  });
});
export { LottieView };
//# sourceMappingURL=index.web.js.map