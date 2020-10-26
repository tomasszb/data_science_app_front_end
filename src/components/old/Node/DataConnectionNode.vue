<template>
    <div>
        <DataConnectionElement></DataConnectionElement>
    </div>
</template>

<script>
    import { mapGetters} from "vuex";
    import DataConnectionElement from "../../ProjectObjects/Element/DataConnectionElement"

    export default {
        name: "Node",
        components: { DataConnectionElement },
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