function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import React from 'react';
import { isSearchBarAvailableForCurrentPlatform } from 'react-native-screens';
import { View } from 'react-native';

// Native components
import SearchBarNativeComponent, { Commands as SearchBarNativeCommands } from '../fabric/SearchBarNativeComponent';
export const NativeSearchBar = SearchBarNativeComponent;
export const NativeSearchBarCommands = SearchBarNativeCommands;
class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.nativeSearchBarRef = /*#__PURE__*/React.createRef();
  }
  _callMethodWithRef(method) {
    const ref = this.nativeSearchBarRef.current;
    if (ref) {
      method(ref);
    } else {
      console.warn('Reference to native search bar component has not been updated yet');
    }
  }
  blur() {
    this._callMethodWithRef(ref => NativeSearchBarCommands.blur(ref));
  }
  focus() {
    this._callMethodWithRef(ref => NativeSearchBarCommands.focus(ref));
  }
  toggleCancelButton(flag) {
    this._callMethodWithRef(ref => NativeSearchBarCommands.toggleCancelButton(ref, flag));
  }
  clearText() {
    this._callMethodWithRef(ref => NativeSearchBarCommands.clearText(ref));
  }
  setText(text) {
    this._callMethodWithRef(ref => NativeSearchBarCommands.setText(ref, text));
  }
  cancelSearch() {
    this._callMethodWithRef(ref => NativeSearchBarCommands.cancelSearch(ref));
  }
  render() {
    if (!isSearchBarAvailableForCurrentPlatform) {
      console.warn('Importing SearchBar is only valid on iOS and Android devices.');
      return View;
    }
    return /*#__PURE__*/React.createElement(NativeSearchBar, _extends({}, this.props, {
      ref: this.nativeSearchBarRef
    }));
  }
}
export default SearchBar;
//# sourceMappingURL=SearchBar.js.map