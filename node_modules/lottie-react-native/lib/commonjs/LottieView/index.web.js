"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LottieView = void 0;
var _react = _interopRequireWildcard(require("react"));
var _utils = require("./utils");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
let DotLottiePlayer, Player;
try {
  DotLottiePlayer = require('@dotlottie/react-player').DotLottiePlayer;
} catch (e) {}
try {
  Player = require('@lottiefiles/react-lottie-player').Player;
} catch (e) {}
const LottieView = /*#__PURE__*/(0, _react.forwardRef)((_ref, ref) => {
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
  const sources = (0, _utils.parsePossibleSources)(source);
  const isLottie = ((_sources$sourceName = sources.sourceName) === null || _sources$sourceName === void 0 ? void 0 : _sources$sourceName.includes('.lottie')) || !!sources.sourceDotLottieURI;
  const lottieSource = sources.sourceDotLottieURI || sources.sourceName;
  const jsonSource = sources.sourceURL || sources.sourceJson;
  const [isError, setIsError] = _react.default.useState(false);
  const [key, setKey] = _react.default.useState(0);

  /**
   *  If an error occured reset the key when the source changes to force a re-render.
   */
  (0, _react.useEffect)(() => {
    if (isError) {
      setKey(prevKey => prevKey + 1);
      setIsError(false);
    }
  }, [source]);
  if (progress != undefined && __DEV__) {
    console.warn('lottie-react-native: progress is not supported on web');
  }
  const handleEvent = (0, _react.useCallback)(event => {
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
  const playerRef = (0, _react.useRef)(null);
  (0, _react.useImperativeHandle)(ref, () => ({
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
    return /*#__PURE__*/_react.default.createElement(DotLottiePlayer, {
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
  return /*#__PURE__*/_react.default.createElement(Player, {
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
exports.LottieView = LottieView;
//# sourceMappingURL=index.web.js.map