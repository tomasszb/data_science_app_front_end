import lineChart from '@/assets/charts/line_simple.png'
import barChart from '@/assets/charts/bar_simple.png';
import scatterChart from '@/assets/charts/scatter_simple2.png';
import treeMapChart from '@/assets/charts/treemap_simple.png';
import mapChart from '@/assets/charts/map_simple.png';
import lineAreaChart from '@/assets/charts/line_area.png';
import lineStackedAreaChart from '@/assets/charts/line_stacked_area.png';
import barStackedChart from '@/assets/charts/bar_stacked.png';
import pivotTable from '@/assets/charts/table_simple.png';

import general from '@/assets/icons/svg/chartparts-select.svg'
import title from '@/assets/icons/svg/chartparts-text.svg'
import border from '@/assets/icons/svg/chartparts-border-style.svg'
import size from '@/assets/icons/svg/chartparts-scale.svg'
import color from '@/assets/icons/svg/chartparts-color-circle.svg'
import font from '@/assets/icons/svg/chartparts-text-2.svg'

import grid from '@/assets/icons/svg/chartparts-dashboard.svg'
import xaxis from '@/assets/icons/svg/chartparts-grid.svg'
import yaxis from '@/assets/icons/svg/chartparts-grid.svg'
import legend from '@/assets/icons/svg/chartparts-bullet-list.svg'
import tooltip from '@/assets/icons/svg/chartparts-chat-1.svg'
import markers from '@/assets/icons/svg/chartparts-shapes-2.svg'


export let chartsSettings = {
    'line': {
        'name': 'lineChart',
        'chartPicture': lineChart,
        'layout_elements': ['general', 'title', 'legend', 'marker', 'xaxis', 'yaxis', 'tooltip'],
        'data_fields': ['xgrid', 'ygrid', 'main', 'value', 'category', 'markerS', 'tooltip'] },
    'lineA': {
        'name': 'lineAreaChart',
        'chartPicture': lineAreaChart,
        'layout_elements': ['general', 'title', 'legend', 'marker', 'xaxis', 'yaxis', 'tooltip'],
        'data_fields': ['xgrid', 'ygrid', 'main', 'value', 'category', 'markerS', 'tooltip']},
    'lineSA': {
        'name': 'lineStackedAreaChart',
        'chartPicture': lineStackedAreaChart,
        'layout_elements': ['general', 'title', 'legend', 'marker', 'xaxis', 'yaxis', 'tooltip'],
        'data_fields': ['xgrid', 'ygrid', 'main', 'value', 'category', 'markerS', 'tooltip']},
    'bar': {
        'name': 'barChart',
        'chartPicture': barChart,
        'layout_elements': ['general', 'title', 'legend', 'xaxis', 'yaxis', 'tooltip'],
        'data_fields': ['xgrid', 'ygrid', 'main', 'value', 'category', 'tooltip']},
    'barS': {
        'name': 'barStackedChart',
        'chartPicture': barStackedChart,
        'layout_elements': ['general', 'title', 'legend', 'xaxis', 'yaxis', 'tooltip'],
        'data_fields': ['xgrid', 'ygrid', 'main', 'value', 'category', 'tooltip']},
    'scatter': {
        'name': 'scatterChart',
        'chartPicture': scatterChart,
        'layout_elements': ['general', 'title', 'legend', 'marker', 'xaxis', 'yaxis', 'tooltip'],
        'data_fields': ['xgrid', 'ygrid', 'xaxis', 'yaxis', 'color', 'size', 'tooltip']},
    'treemap': {
        'name': 'treeMapChart',
        'chartPicture': treeMapChart,
        'layout_elements': ['general', 'title', 'legend', 'tooltip'],
        'data_fields': ['xgrid', 'ygrid', 'xaxis', 'yaxis', 'color', 'size', 'tooltip']},
    'map': {
        'name': 'mapChart',
        'chartPicture': mapChart,
        'layout_elements': ['general', 'title', 'legend', 'marker', 'xaxis', 'yaxis', 'tooltip'],
        'data_fields': ['xgrid', 'ygrid', 'latitude', 'longitude', 'tooltip']},
    'pivot': {
        'name': 'pivotTable',
        'chartPicture': pivotTable,
        'layout_elements': ['general', 'title', 'legend', 'marker', 'xaxis', 'yaxis', 'tooltip'],
        'data_fields': ['xgrid', 'ygrid', 'columns', 'rows', 'values', 'color', 'tooltip']}
};


export let chartsDataFields = [
        {'name': 'x grid', 'alias': 'xgrid', 'selector': 'grid'},
        {'name': 'y grid', 'alias': 'ygrid', 'selector': 'grid'},
        {'name': 'main axis', 'alias': 'main', 'selector': null},
        {'name': 'values', 'alias': 'value', 'selector': null},
        {'name': 'category', 'alias': 'category', 'selector': null},
        {'name': 'marker size', 'alias': 'markerS', 'selector': 'marker'},
        {'name': 'marker color', 'alias': 'markerC', 'selector': 'marker'},
        {'name': 'tooltip', 'alias': 'tooltip', 'selector': 'tooltip'},
        {'name': 'x axis', 'alias': 'x', 'selector': null},
        {'name': 'y axis', 'alias': 'y', 'selector': null},
        {'name': 'long', 'alias': 'x', 'selector': null},
        {'name': 'lat', 'alias': 'y', 'selector': null},
        {'name': 'columns', 'alias': 'column', 'selector': null},
        {'name': 'rows', 'alias': 'row', 'selector': null},
        {'name': 'color', 'alias': 'color', 'selector': null},
        {'name': 'size', 'alias': 'size', 'selector': null}
    ];


export let chartLayoutPartPictures = {
    'general': general,
    'title': title,
    'grid': grid,
    'xaxis': xaxis,
    'yaxis': yaxis,
    'legend': legend,
    'marker': markers
};

export let chartLayoutTypePictures= {
    'title': title,
    'border': border,
    'size': size,
    'color': color,
    'font': font
};

export let chartsLayoutSettings = [
    {'element': 'general', 'type': 'bcolor', 'form': 'color', 'form_detail': null, 'title': 'background color', 'setting_id': 'chart_bcolor', 'selector': null},
    {'element': 'general', 'type': 'size', 'form': 'coordinates', 'form_detail': 'size', 'title': 'chart size', 'setting_id': 'chart_size', 'selector': null},
    {'element': 'general', 'type': 'border', 'form': 'border', 'form_detail': null, 'title': 'chart border', 'setting_id': 'chart_border', 'selector': null},

    {'element': 'title', 'type': 'title', 'form': 'text', 'form_detail': null, 'title': 'title text', 'setting_id': 'title_text', 'selector': 'title'},
    {'element': 'title', 'type': 'position', 'form': 'size', 'form_detail': 'offset', 'title': 'position offset', 'setting_id': 'title_coordinates', 'selector': 'title'},
    {'element': 'title', 'type': 'font', 'form': 'style', 'form_detail': 'font', 'title': 'title size', 'setting_id': 'title_font', 'selector': 'title'},
    {'element': 'title', 'type': 'border', 'form': 'border', 'form_detail': null, 'title': 'title border', 'setting_id': 'title_border', 'selector': 'title'},

    {'element': 'legend', 'type': 'title', 'form': 'text', 'form_detail': null, 'title': 'legend title', 'setting_id': 'legend_title', 'selector': 'legend'},
    {'element': 'legend', 'type': 'position', 'form': 'position', 'form_detail': null, 'title': 'horizontal position', 'setting_id': 'legend_position', 'selector': 'legend'},
    {'element': 'legend', 'type': 'font', 'form': 'style', 'form_detail': 'font', 'title': 'legend font', 'setting_id': 'legend_font', 'selector': 'legend'},
    {'element': 'legend', 'type': 'border', 'form': 'border', 'form_detail': null, 'title': 'legend border', 'setting_id': 'legend_border', 'selector': 'legend'},

    {'element': 'xaxis', 'type': 'title', 'form': 'text', 'form_detail': null, 'title': 'x axis title', 'setting_id': 'xaxis_title', 'selector': 'xaxis'},
    {'element': 'xaxis', 'type': 'position', 'form': 'size', 'form_detail': 'offset', 'title': 'x axis offset', 'setting_id': 'xaxis_offset', 'selector': 'xaxis'},
    {'element': 'xaxis', 'type': 'font', 'form': 'style', 'form_detail': 'font', 'title': 'x axis font', 'setting_id': 'xaxis_font', 'selector': 'xaxis'},
    {'element': 'xaxis', 'type': 'border', 'form': 'border', 'form_detail': null, 'title': 'x axis border', 'setting_id': 'xaxis_border', 'selector': 'xaxis'},

    {'element': 'yaxis', 'type': 'title', 'form': 'text', 'form_detail': null, 'title': 'y axis title', 'setting_id': 'yaxis_title', 'selector': 'yaxis'},
    {'element': 'yaxis', 'type': 'position', 'form': 'size', 'form_detail': 'offset', 'title': 'y axis offset', 'setting_id': 'yaxis_offset', 'selector': 'yaxis'},
    {'element': 'yaxis', 'type': 'font', 'form': 'style', 'form_detail': 'font', 'title': 'y axis font', 'setting_id': 'yaxis_font', 'selector': 'yaxis'},
    {'element': 'yaxis', 'type': 'border', 'form': 'border', 'form_detail': null, 'title': 'y axis border', 'setting_id': 'yaxis_border', 'selector': 'yaxis'},

    {'element': 'marker', 'type': 'size', 'form': 'size', 'form_detail': '', 'title': 'marker size', 'setting_id': 'marker_size', 'selector': 'marker'},
    {'element': 'marker', 'type': 'style', 'form': 'style', 'form_detail': 'marker', 'title': 'marker style', 'setting_id': 'marker_style', 'selector': 'marker'},
    {'element': 'marker', 'type': 'color', 'form': 'color', 'form_detail': null, 'title': 'marker color', 'setting_id': 'marker_color', 'selector': 'marker'},

    {'element': 'line', 'type': 'size', 'form': 'size', 'form_detail': null, 'title': 'line size', 'setting_id': 'line_size', 'selector': null},
    {'element': 'line', 'type': 'style', 'form': 'style', 'form_detail': null, 'title': 'line style', 'setting_id': 'line_style', 'selector': null},
    {'element': 'line', 'type': 'color', 'form': 'color', 'form_detail': null, 'title': 'line color', 'setting_id': 'line_color', 'selector': null},

    {'element': 'bar', 'type': 'size', 'form': 'size', 'form_detail': null, 'title': 'bar size', 'setting_id': 'bar_size', 'selector': null},
    {'element': 'bar', 'type': 'color', 'form': 'color', 'form_detail': null, 'title': 'bar color', 'setting_id': 'bar_color', 'selector': null}
];