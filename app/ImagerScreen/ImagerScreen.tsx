import * as React from "react";
import { $AbsoluteLayout, $Button, $StackLayout } from "react-nativescript";
import { Color } from "tns-core-modules/color/color";
import { CameraPlus } from "@nstudio/nativescript-camera-plus";
import { AbsoluteLayout } from "tns-core-modules/ui/layouts/absolute-layout/absolute-layout";
import { Button } from "tns-core-modules/ui/button/button";
import { StackLayout, Page, View, ActionBar } from "react-nativescript/dist/client/ElementRegistry";
import { device } from "tns-core-modules/platform/platform";
import { PercentLength } from "tns-core-modules/ui/page/page";
// https://github.com/PeterStaev/nativescript-photo-editor

/* the conatainer/layer for all the imager ui and gestures*/
export default class ImagerScreen extends React.Component {
    
    // stackLayoutRef = React.createRef<StackLayout>()

    absoluteLayoutRef = React.createRef<AbsoluteLayout>();

    componentDidMount() {

    }

    render() {
        return (
            <$AbsoluteLayout
                width={PercentLength.parse("100%")}
                height={PercentLength.parse("100%")}
                backgroundColor={new Color('gray')}
            >
                    
            </$AbsoluteLayout>
        )
    }
}
/* cmeraview covers all screen <--- fix.
 A button added is placed nexto appbar*/