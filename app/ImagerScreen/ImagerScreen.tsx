import * as React from "react";
import { $AbsoluteLayout, $Button, $StackLayout } from "react-nativescript";
import { Color } from "tns-core-modules/color/color";
import { CameraPlus } from "@nstudio/nativescript-camera-plus";
import { AbsoluteLayout } from "tns-core-modules/ui/layouts/absolute-layout/absolute-layout";
import { Button } from "tns-core-modules/ui/button/button";
import { StackLayout, Page } from "react-nativescript/dist/client/ElementRegistry";
import { device } from "tns-core-modules/platform/platform";
// https://github.com/PeterStaev/nativescript-photo-editor

/* the conatainer/layer for all the imager ui and gestures*/
export default class ImagerScreen extends React.Component {
    
    // stackLayoutRef = React.createRef<StackLayout>()

    absoluteLayoutRef = React.createRef<AbsoluteLayout>();
    imagerScreenStyle = { opacity: 0 }; // backgroundColor: new Color('orange') 
    itemStyle = {padding: 0, margin: 0};
    

    componentDidMount() {
        /*
        const deviceWidth = device.
        const stackLayout = this.stackLayoutRef.current;
        */
        const cameraPlus = new CameraPlus();

        /*
        cameraPlus.width = 300;
        cameraPlus.height = 300
        */
        const screen = this.absoluteLayoutRef.current;

        screen.addChild(cameraPlus);
        const b = new Button();
        b.text = "yooooo";
        screen.addChild(b);
        // const mainScreen = imagerScreenRef.current;
        /*
        console.log("mainScreen: " + mainScreen);

        const stackLayout = new StackLayout();
        const button = new Button();
        
        button.height = 100;
        button.width= 80;
        button.backgroundColor = new Color('brown');
        button.left = 0,
        button.top = 0;

        stackLayout.addChild(button);
        stackLayout.addChild(cameraPlus);
        mainScreen.addChild(stackLayout);
        */
    }

    render() {
        return (
            <$AbsoluteLayout left={0} top={0} padding={0} margin={0} ref={this.absoluteLayoutRef} backgroundColor={new Color('orange')}>
                
            </$AbsoluteLayout>
        )
    }
}
/* cmeraview covers all screen <--- fix.
 A button added is placed nexto appbar*/