<template>
    <table class="c-100 info-section-table">
        <colgroup>
            <col span="1" class="c-75 mr-5">
            <col span="1" class="c-25">
        </colgroup>
        <tbody>
        <tr v-for="item in sectionData">
            <td>
                <div class="info-section-table-display-value">
                    {{item['display_name']}}
                </div>
            </td>
            <td>
                <div>
                    {{item['display_value']}}
                </div>
            </td>
        </tr>
        </tbody>
    </table>
</template>

<script>
    import Vue from 'vue';

    export default {
        name: 'InfoSectionTable',
        props: {
            sectionData: {type: Array, default: function() {return []}}
        },
        data() {
            return {
            }
        }
    };
</script>

<style src="./InfoSectionTable.scss" lang="scss"></style>
