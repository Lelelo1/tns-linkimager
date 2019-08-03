import * as React from "react";
import { $AbsoluteLayout, $Button } from "react-nativescript";
import { Color } from "tns-core-modules/color/color";

export default class MainScreen extends React.Component {
    
    mainScreenStyle = { backgroundColor: new Color('orange') }
    itemStyle = {padding: 0, margin: 0}

    render() {
        return (
            <$AbsoluteLayout style={this.mainScreenStyle}>
                <$Button text={"button"} style={this.itemStyle} />
            </$AbsoluteLayout>
        )
    }
}