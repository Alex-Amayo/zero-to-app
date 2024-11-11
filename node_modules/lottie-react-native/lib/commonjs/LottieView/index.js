"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LottieView = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _utils = require("./utils");
var _LottieAnimationViewNativeComponent = _interopRequireWildcard(require("../specs/LottieAnimationViewNativeComponent"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
const defaultProps = {
  source: undefined,
  progress: 0,
  speed: 1,
  loop: true,
  autoPlay: false,
  enableMergePathsAndroidForKitKatAndAbove: false,
  cacheComposition: true,
  useNativeLooping: false,
  resizeMode: 'contain',
  colorFilters: [],
  textFiltersAndroid: [],
  textFiltersIOS: []
};
class LottieView extends _react.default.PureComponent {
  static defaultProps = defaultProps;
  constructor(props) {
    super(props);
    this.play = this.play.bind(this);
    this.reset = this.reset.bind(this);
    this.pause = this.pause.bind(this);
    this.resume = this.resume.bind(this);
    this.onAnimationFinish = this.onAnimationFinish.bind(this);
    this.captureRef = this.captureRef.bind(this);
    if (props.hover != undefined && __DEV__) {
      console.warn('lottie-react-native: hover is only supported on web');
    }
  }
  play(startFrame, endFrame) {
    _LottieAnimationViewNativeComponent.Commands.play(this.lottieAnimationViewRef, startFrame ?? -1, endFrame ?? -1);
  }
  reset() {
    _LottieAnimationViewNativeComponent.Commands.reset(this.lottieAnimationViewRef);
  }
  pause() {
    _LottieAnimationViewNativeComponent.Commands.pause(this.lottieAnimationViewRef);
  }
  resume() {
    _LottieAnimationViewNativeComponent.Commands.resume(this.lottieAnimationViewRef);
  }
  onAnimationFinish = evt => {
    var _this$props$onAnimati, _this$props;
    (_this$props$onAnimati = (_this$props = this.props).onAnimationFinish) === null || _this$props$onAnimati === void 0 || _this$props$onAnimati.call(_this$props, evt.nativeEvent.isCancelled);
  };
  onAnimationFailure = evt => {
    var _this$props$onAnimati2, _this$props2;
    (_this$props$onAnimati2 = (_this$props2 = this.props).onAnimationFailure) === null || _this$props$onAnimati2 === void 0 || _this$props$onAnimati2.call(_this$props2, evt.nativeEvent.error);
  };
  onAnimationLoaded = () => {
    var _this$props$onAnimati3, _this$props3;
    (_this$props$onAnimati3 = (_this$props3 = this.props).onAnimationLoaded) === null || _this$props$onAnimati3 === void 0 || _this$props$onAnimati3.call(_this$props3);
  };
  captureRef(ref) {
    if (ref === null) {
      return;
    }
    this.lottieAnimationViewRef = ref;
    if (this.props.autoPlay === true) {
      this.play();
    }
  }
  render() {
    var _this$props$colorFilt;
    const {
      style,
      source,
      autoPlay,
      duration,
      textFiltersAndroid,
      textFiltersIOS,
      resizeMode,
      ...rest
    } = this.props;
    const sources = (0, _utils.parsePossibleSources)(source);
    const speed = duration && sources.sourceJson && source.fr ? Math.round(source.op / source.fr * 1000 / duration) : this.props.speed;
    const colorFilters = (_this$props$colorFilt = this.props.colorFilters) === null || _this$props$colorFilt === void 0 ? void 0 : _this$props$colorFilt.map(colorFilter => ({
      ...colorFilter,
      color: (0, _reactNative.processColor)(colorFilter.color)
    }));
    return /*#__PURE__*/_react.default.createElement(_LottieAnimationViewNativeComponent.default, _extends({
      ref: this.captureRef
    }, rest, {
      colorFilters: colorFilters,
      textFiltersAndroid: textFiltersAndroid,
      textFiltersIOS: textFiltersIOS,
      speed: speed,
      style: style,
      onAnimationFinish: this.onAnimationFinish,
      onAnimationFailure: this.onAnimationFailure,
      onAnimationLoaded: this.onAnimationLoaded,
      autoPlay: autoPlay,
      resizeMode: resizeMode
    }, sources));
  }
}
exports.LottieView = LottieView;
//# sourceMappingURL=index.js.map