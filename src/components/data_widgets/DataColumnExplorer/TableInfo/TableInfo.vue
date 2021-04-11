<template>
    <b-row class="col-explorer-table-info">
        <div class="c-40 mr-5">
            <info-section-table
                :sectionData = "tableStats['page1']"
            />
        </div>
        <div class="c-40 mr-5">
            <info-section-table
                :sectionData = "dataPage2"
            />
        </div>
    </b-row>
</template>

<script>
    import InfoSectionTable from "@/components/data_widgets/DataColumnExplorer/InfoSectionTable/InfoSectionTable";
    export default {
        name: 'TableInfo',
        components: {InfoSectionTable},
        props: {
            tableStats: {type: Object, default: function() {return {}}},
        },
        data() {
            return {
            }
        },
        computed: {
            dataPage2() {
                let result = [];
                for (const [index, settings] of Object.entries(this.tableStats['page2'])) {
                    result.push(
                        {"name": index, "display_name": index, "value": settings, "display_value": settings}
                    )
                }
                return result
            }
        }
    };
</script>

<style src="./TableInfo.scss" lang="scss"></style>
