import { Store } from "pullstate";

// TODO: add an id
const EditStore = new Store({
  model: {
    name: "new model",
    objects: [],
  },
  selected: null,
});

export default EditStore;
