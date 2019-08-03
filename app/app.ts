
import * as React from "react";
import * as ReactNativeScript from "react-nativescript";

import AppContainer, { rootRef } from './AppContainer';
ReactNativeScript.start(React.createElement(AppContainer, {}, null), rootRef);

/*
Do not place any code after the application has been started as it will not
be executed on iOS.
*/

/* running tns run ios generates js files for each ts/tsx file.
 They can be removed. -> run with: 
 tns run ios --bundle --syncAllFiles --device 919ead2494a426d628884a9cc72e611613836d25
 */

// create android emulator https://docs.nativescript.org/tooling/android-virtual-devices