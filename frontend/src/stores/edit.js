import { Store } from "pullstate";

const EditStore = new Store({
  model: {
    name: "new model",
    objects: [],
  },
  selected: null,
});

export default EditStore;
