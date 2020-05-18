export function getProjectBranch(projectObjects, parentIDs, parentName, groupID) {
  let objectList = null;

  if (parentIDs == null) {
    objectList = []
  } else {
    objectList = {}
  }
  for (let id in projectObjects) {
    if (projectObjects.hasOwnProperty(id)) {
      if (projectObjects[id]['group'] === groupID) {
        if (parentIDs == null) {
          objectList.push(id);
        } else {
          let child = JSON.parse(JSON.stringify(projectObjects[id]));
          if (parentName in child['parameters']) {
            let parent_id = child['parameters'][parentName];
            if (parentIDs.includes(parent_id)) {
              if (!(parent_id in objectList)) {
                objectList[parent_id] = []
              }
              objectList[parent_id].push(child['id']);
            }
          }
        }
      }
    }
  }
  return objectList
}
export function initProjectBranches(projectObjects, activeProcess) {
  let processList = getProjectBranch(projectObjects, null, null, 1);

  let processIDs = [parseInt(activeProcess, 10)];
  let pageList = getProjectBranch(projectObjects, processIDs, 'process_id', 2);

  let pageIDs = [].concat.apply([], Object.values(pageList));
  let nodeList = getProjectBranch(projectObjects, pageIDs, 'page_id', 3);

  let nodeIDs = [].concat.apply([], Object.values(nodeList));
  let elementList = getProjectBranch(projectObjects, nodeIDs, 'node_id', 4);

  return [processList, pageList, nodeList, elementList]
}

