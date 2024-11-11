function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var lottie = _interopDefault(require('lottie-web'));
var React = require('react');
var React__default = _interopDefault(React);
var equal = _interopDefault(require('fast-deep-equal/es6/react'));
var clone = _interopDefault(require('rfdc/default'));

function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}

var emptyObject = {};
var noOp = function noOp() {
  return undefined;
};
var makeLottiePlayer = function makeLottiePlayer(_ref) {
  var loadAnimation = _ref.loadAnimation;
  var Lottie = React.memo(React.forwardRef(function (params, forwardedRef) {
    var _params$play = params.play,
      play = _params$play === void 0 ? null : _params$play,
      _params$speed = params.speed,
      speed = _params$speed === void 0 ? 1 : _params$speed,
      _params$direction = params.direction,
      direction = _params$direction === void 0 ? 1 : _params$direction,
      _params$segments = params.segments,
      segmentsIn = _params$segments === void 0 ? null : _params$segments,
      _params$goTo = params.goTo,
      goTo = _params$goTo === void 0 ? null : _params$goTo,
      _params$useSubframes = params.useSubframes,
      useSubframes = _params$useSubframes === void 0 ? true : _params$useSubframes,
      _params$renderer = params.renderer,
      renderer = _params$renderer === void 0 ? 'svg' : _params$renderer,
      _params$loop = params.loop,
      loop = _params$loop === void 0 ? true : _params$loop,
      _params$rendererSetti = params.rendererSettings,
      rendererSettingsIn = _params$rendererSetti === void 0 ? emptyObject : _params$rendererSetti,
      audioFactory = params.audioFactory,
      _params$onLoad = params.onLoad,
      onLoad = _params$onLoad === void 0 ? noOp : _params$onLoad,
      _params$onComplete = params.onComplete,
      onComplete = _params$onComplete === void 0 ? noOp : _params$onComplete,
      _params$onLoopComplet = params.onLoopComplete,
      onLoopComplete = _params$onLoopComplet === void 0 ? noOp : _params$onLoopComplet,
      _params$onEnterFrame = params.onEnterFrame,
      onEnterFrame = _params$onEnterFrame === void 0 ? noOp : _params$onEnterFrame,
      _params$onSegmentStar = params.onSegmentStart,
      onSegmentStart = _params$onSegmentStar === void 0 ? noOp : _params$onSegmentStar,
      props = _objectWithoutPropertiesLoose(params, ["play", "speed", "direction", "segments", "goTo", "useSubframes", "renderer", "loop", "rendererSettings", "audioFactory", "onLoad", "onComplete", "onLoopComplete", "onEnterFrame", "onSegmentStart"]);
    var propsFiltered = props;
    var animationData;
    var path;
    if ('animationData' in props) {
      var _props = props;
      animationData = _props.animationData;
      propsFiltered = _objectWithoutPropertiesLoose(_props, ["animationData"]);
    }
    if ('path' in props) {
      var _props2 = props;
      path = _props2.path;
      propsFiltered = _objectWithoutPropertiesLoose(_props2, ["path"]);
    }
    var animElementRef = React.useRef(null);
    var animRef = React.useRef();
    var getAnim = React.useCallback(function () {
      if (animRef.current == null) throw new Error('Lottie ref is not set');
      return animRef.current;
    }, []);
    var _useState = React.useState(false),
      ready = _useState[0],
      setReady = _useState[1];
    var _useState2 = React.useState(segmentsIn),
      segments = _useState2[0],
      setSegments = _useState2[1];
    React.useEffect(function () {
      if (!equal(segments, segmentsIn)) setSegments(segmentsIn);
    }, [segmentsIn, segments]);
    var _useState3 = React.useState(rendererSettingsIn),
      rendererSettings = _useState3[0],
      setRendererSettings = _useState3[1];
    React.useEffect(function () {
      if (!equal(rendererSettings, rendererSettingsIn)) setRendererSettings(rendererSettingsIn);
    }, [rendererSettingsIn, rendererSettings]);
    React.useEffect(function () {
      return function () {
        return getAnim().removeEventListener('complete', onComplete);
      };
    }, [getAnim, onComplete]);
    React.useEffect(function () {
      return function () {
        return getAnim().removeEventListener('loopComplete', onLoopComplete);
      };
    }, [getAnim, onLoopComplete]);
    React.useEffect(function () {
      return function () {
        return getAnim().removeEventListener('enterFrame', onEnterFrame);
      };
    }, [getAnim, onEnterFrame]);
    React.useEffect(function () {
      return function () {
        return getAnim().removeEventListener('segmentStart', onSegmentStart);
      };
    }, [getAnim, onSegmentStart]);
    React.useEffect(function () {
      return function () {
        return getAnim().removeEventListener('DOMLoaded', onLoad);
      };
    }, [getAnim, onLoad]);
    var setLottieRefs = React.useCallback(function (newRef) {
      animRef.current = newRef;
      if (typeof forwardedRef === 'function') {
        forwardedRef(newRef);
      } else if (forwardedRef !== undefined && forwardedRef !== null) {
        forwardedRef.current = newRef;
      }
    }, [forwardedRef]);
    React.useEffect(function () {
      function parseAnimationData() {
        if (animationData == null || typeof animationData !== 'object') return animationData;
        if ('default' in animationData && typeof animationData["default"] === 'object') {
          return clone(animationData["default"]);
        }
        return clone(animationData);
      }
      if (animElementRef.current == null) throw new Error('animElementRef is not set');
      var lottie = loadAnimation(_extends({
        animationData: parseAnimationData(),
        path: path,
        container: animElementRef.current,
        renderer: renderer,
        loop: false,
        autoplay: false,
        rendererSettings: rendererSettings
      }, audioFactory ? {
        audioFactory: audioFactory
      } : {}));
      setLottieRefs(lottie);
      var onDomLoaded = function onDomLoaded() {
        return setReady(true);
      };
      getAnim().addEventListener('DOMLoaded', onDomLoaded);
      return function () {
        getAnim().removeEventListener('DOMLoaded', onDomLoaded);
        setReady(false);
        getAnim().destroy();
        setLottieRefs(undefined);
      };
    }, [loop, renderer, rendererSettings, animationData, path, audioFactory, setLottieRefs, getAnim]);
    React.useEffect(function () {
      getAnim().addEventListener('DOMLoaded', onLoad);
    }, [getAnim, onLoad]);
    React.useEffect(function () {
      getAnim().addEventListener('complete', onComplete);
    }, [getAnim, onComplete]);
    React.useEffect(function () {
      getAnim().addEventListener('loopComplete', onLoopComplete);
    }, [getAnim, onLoopComplete]);
    React.useEffect(function () {
      getAnim().addEventListener('enterFrame', onEnterFrame);
    }, [getAnim, onEnterFrame]);
    React.useEffect(function () {
      getAnim().addEventListener('segmentStart', onSegmentStart);
    }, [getAnim, onSegmentStart]);
    React.useEffect(function () {
      if (!ready) return;
      getAnim().loop = loop;
    }, [ready, loop, getAnim]);
    var wasPlayingSegmentsRef = React.useRef(false);
    React.useEffect(function () {
      if (!ready) return;
      function playReverse(lastFrame) {
        getAnim().goToAndPlay(lastFrame, true);
        getAnim().setDirection(direction);
      }
      if (play === true) {
        var force = true;
        if (segments) {
          getAnim().playSegments(segments, force);
          wasPlayingSegmentsRef.current = true;
          if (direction === -1) {
            var lastFrame = typeof segments[1] === 'number' ? segments[1] : segments[1][1];
            playReverse(lastFrame);
          }
        } else {
          if (wasPlayingSegmentsRef.current) getAnim().resetSegments(force);
          wasPlayingSegmentsRef.current = false;
          if (direction === -1) {
            var _lastFrame = getAnim().getDuration(true);
            playReverse(_lastFrame);
          } else {
            getAnim().play();
          }
        }
      } else if (play === false) {
        getAnim().pause();
      }
    }, [play, segments, ready, direction, getAnim]);
    React.useEffect(function () {
      if (!ready) return;
      if (Number.isNaN(speed)) return;
      getAnim().setSpeed(speed);
    }, [speed, ready, getAnim]);
    React.useEffect(function () {
      if (!ready) return;
      getAnim().setDirection(direction);
    }, [direction, getAnim, ready]);
    React.useEffect(function () {
      if (!ready) return;
      if (goTo == null) return;
      var isFrame = true;
      if (play) getAnim().goToAndPlay(goTo, isFrame);else getAnim().goToAndStop(goTo, isFrame);
    }, [getAnim, goTo, play, ready]);
    React.useEffect(function () {
      if (getAnim().setSubframe) getAnim().setSubframe(useSubframes);
    }, [getAnim, useSubframes]);
    return (
      /*#__PURE__*/
      React__default.createElement("div", _extends({}, propsFiltered, {
        ref: animElementRef
      }))
    );
  }));
  return Lottie;
};

var LottiePlayer = makeLottiePlayer(lottie);

module.exports = LottiePlayer;
//# sourceMappingURL=LottiePlayer.js.map
