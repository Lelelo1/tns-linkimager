import * as React from "react";
import { RefObject } from "react";
import { $ActionItem, } from "react-nativescript";
import { IOSActionItemSettings, AndroidActionItemSettings, ActionItem } from "tns-core-modules/ui/action-bar";
import { autorun, observable, reaction, decorate } from "mobx";
import { device } from "tns-core-modules/platform/platform";


interface ImagerActionItemProps {
    isToggled?: boolean;
    iconSelected?: string;
    iconUnselected?: string;
    text: string;
    icon?: string;
}

class ImagerActionItem extends React.Component<ImagerActionItemProps, {}>{
    static defaultProps: Partial<ImagerActionItemProps> = {
        isToggled: false,
        text: "NoText"
    };

    @observable
    isToggled: boolean = this.props.isToggled;

    actionItemRef = React.createRef<ActionItem>();

    componentDidMount() {
        const actionItem = this.actionItemRef.current;
        
        if (device.os == "iOS") {
            actionItem.ios.position = "right";
            
        }
        // check if android.poistion ins actionbar
    }
    render() {
        return (
            <$ActionItem
                onPropertyChange={(ev) => {
                    console.log("propertyChanged: " + this.actionItemRef.current);
                }}
                
                ref={this.actionItemRef}
                text={this.props.text}
            />
        )
    }
}
export default ImagerActionItem;