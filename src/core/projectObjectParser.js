import store from '../store/index'
import {mapGetters, mapState} from "vuex";


export function getObjectSettings(projectObjects, objectID, defaultValue) {
  if (objectID !== null && projectObjects !== {}) {
    if (projectObjects.hasOwnProperty(objectID)) {
      return projectObjects[objectID]
    }
    else {
      return defaultValue
    }
  } else {
    return defaultValue
  }
}

export function getObjectSetting(projectObjects, objectID, propertyName, defaultValue) {
  let objectSettings = getObjectSettings(projectObjects, objectID, {});
  if (objectSettings.hasOwnProperty(propertyName)) {
    return objectSettings[propertyName]
  } else {
    return defaultValue
  }
}