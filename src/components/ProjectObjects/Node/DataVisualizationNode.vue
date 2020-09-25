<template>
    <div>
        <DataVisualizationElement></DataVisualizationElement>
    </div>
</template>

<script>
    import { mapGetters} from "vuex";
    import DataVisualizationElement from "../Element/DataVisualizationElement"

    export default {
        name: "Node",
        components: { DataVisualizationElement },
        computed: {
            ...mapGetters('proj', [
                'projectObjects', 'dataObjects', 'ProjectTree',
                'processList', 'pageLists', 'nodeLists', 'elementLists',
                'activeProcess', 'activePage', 'activeNode', 'activeElement'
            ]),
            DataConnectionElementID() {
                for(let elementID of this.elementLists[this.activeNode]) {
                    if(this.projectObjects[elementID]['type']===400) {
                        return elementID
                    }
                }
            },
            DataPreparationElementIDs() {
                let result = [];
                for(let elementID of this.elementLists[this.activeNode]) {
                    if(this.projectObjects[elementID]['type']===401) {
                        result.push(elementID);
                    }
                }
                return result
            },

        }
    }
</script>

<style scoped>

</style>