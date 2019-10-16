
import { LinkImage } from "./Mixins/Mixins";
import { projectMock1 } from "./Mocks/ProjectMock";
import { observable } from "mobx";
import { AbsoluteLayout } from "react-nativescript/dist/client/ElementRegistry";
import * as React from "react";

export default class ViewModel {
    private static instance = null;
    static get(): ViewModel {
        if(ViewModel.instance === null) {
            ViewModel.instance = new ViewModel();
        }
        return ViewModel.instance;
    }

    constructor() {
        this.project = projectMock1;
        this.currentLinkImageDisplayed = this.project;
    }

    imagerScreenRef = React.createRef<AbsoluteLayout>()

    project: LinkImage;

    @observable
    currentLinkImageDisplayed: LinkImage;

    clearAreas() {
        const viewModel = ViewModel.get();
        const imagerScreen = this.imagerScreenRef.current;
        for(let i = this.imagerScreenRef.current.getChildrenCount() -1 ; i > 0; i --) {
            console.log("remove chilt at : " + i);
            imagerScreen.removeChild(imagerScreen.getChildAt(i));
        }
    }
}