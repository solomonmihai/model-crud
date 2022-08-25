import { Store } from "pullstate";
import { getNewModel } from "../helper";

const EditStore = new Store({
  model: getNewModel(),
  id: null,
  selected: null,
  showGrid: true,
});

export default EditStore;
