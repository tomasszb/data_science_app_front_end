<template>
    <div :class="{'active': active, 'chart-type-option': true}" :id="'connector-type-image-'+name">
        <img :src="charts[name]" :alt="name"   class="m-2 mx-auto d-block">

        <b-tooltip :target="'connector-type-image-'+name" placement="bottom">
            {{name}}
        </b-tooltip>
    </div>
</template>

<script>
import csv_logo from '@/assets/connectors/csv.png';
import feather_logo from '@/assets/connectors/feather.png';
import mysql_logo from '@/assets/connectors/mysql.png';
import postgresql_logo from '@/assets/connectors/posgresql.png';
import sqlite_logo from '@/assets/connectors/sqlite.png';


    export default {
        name: "ChartTypeSelector",
        data() {
            return {
                charts: {
                    "MySQL": mysql_logo,
                    "PostgreSQL": postgresql_logo,
                    "SQLite": sqlite_logo,
                    "CSV": csv_logo,
                    "Feather": feather_logo
                }
            }
        },
        props: {
            name: { type: String, default: '' },
            active: { type: Boolean, default: false },
        },
    }
</script>

<style src="./ConnectorType.scss" lang="scss"></style>