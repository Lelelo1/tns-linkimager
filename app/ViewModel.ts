
import { LinkImage } from "./Mixins/Mixins";
import { projectMock1 } from "./Mocks/ProjectMock";

export default class ViewModel {
    private static instance = null;
    static get(): ViewModel {
        if(ViewModel.instance === null) {
            ViewModel.instance = new ViewModel();
        }
        return ViewModel.instance;
    }

    constructor() {
        this.project = projectMock1
    }

    project: LinkImage;
}