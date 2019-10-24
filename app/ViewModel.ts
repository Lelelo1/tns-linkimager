
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

    currentLinkImageDisplayed: LinkImage;
    @observable
    update = false;

    clearAreas() {
        const viewModel = ViewModel.get();
        const imagerScreen = this.imagerScreenRef.current;
        for(let i = this.imagerScreenRef.current.getChildrenCount() -1 ; i > 0; i --) {
            console.log("remove child at : " + i);
            imagerScreen.removeChild(imagerScreen.getChildAt(i));
        }
    }

    combine(owner: LinkImage, link: LinkImage): void {
        console.log(owner.links.indexOf(link));
        if(owner.links.indexOf(link) === -1) {
            console.log("added link");
            owner.links.push(link);
        }
        if(link.owners.indexOf(owner) === -1) {
            link.owners.push(owner);
        }
    }

    @observable
    showCamera = false;
}