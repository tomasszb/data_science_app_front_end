import lineChart from '@/assets/charts/line_simple.png'
import barChart from '@/assets/charts/bar_simple.png';
import scatterChart from '@/assets/charts/scatter_simple2.png';
import treeMapChart from '@/assets/charts/treemap_simple.png';
import mapChart from '@/assets/charts/map_simple.png';
import lineAreaChart from '@/assets/charts/line_area.png';
import lineStackedAreaChart from '@/assets/charts/line_stacked_area.png';
import barStackedChart from '@/assets/charts/bar_stacked.png';
import pivotTable from '@/assets/charts/table_simple.png';

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
        'layout_elements': ['grid', 'title', 'legend', 'marker', 'xaxis', 'yaxis', 'tooltip'],
        'data_fields': ['xgrid', 'ygrid', 'main', 'value', 'category', 'markerS', 'tooltip'] },
    'lineA': {
        'name': 'lineAreaChart',
        'chartPicture': lineAreaChart,
        'layout_elements': ['grid', 'title', 'legend', 'marker', 'xaxis', 'yaxis', 'tooltip'],
        'data_fields': ['xgrid', 'ygrid', 'main', 'value', 'category', 'markerS', 'tooltip']},
    'lineSA': {
        'name': 'lineStackedAreaChart',
        'chartPicture': lineStackedAreaChart,
        'layout_elements': ['grid', 'title', 'legend', 'marker', 'xaxis', 'yaxis', 'tooltip'],
        'data_fields': ['xgrid', 'ygrid', 'main', 'value', 'category', 'markerS', 'tooltip']},
    'bar': {
        'name': 'barChart',
        'chartPicture': barChart,
        'layout_elements': ['grid', 'title', 'legend', 'xaxis', 'yaxis', 'tooltip'],
        'data_fields': ['xgrid', 'ygrid', 'main', 'value', 'category', 'tooltip']},
    'barS': {
        'name': 'barStackedChart',
        'chartPicture': barStackedChart,
        'layout_elements': ['grid', 'title', 'legend', 'xaxis', 'yaxis', 'tooltip'],
        'data_fields': ['xgrid', 'ygrid', 'main', 'value', 'category', 'tooltip']},
    'scatter': {
        'name': 'scatterChart',
        'chartPicture': scatterChart,
        'layout_elements': ['grid', 'title', 'legend', 'marker', 'xaxis', 'yaxis', 'tooltip'],
        'data_fields': ['xgrid', 'ygrid', 'xaxis', 'yaxis', 'color', 'size', 'tooltip']},
    'treemap': {
        'name': 'treeMapChart',
        'chartPicture': treeMapChart,
        'layout_elements': ['grid', 'title', 'legend', 'tooltip'],
        'data_fields': ['xgrid', 'ygrid', 'xaxis', 'yaxis', 'color', 'size', 'tooltip']},
    'map': {
        'name': 'mapChart',
        'chartPicture': mapChart,
        'layout_elements': ['grid', 'title', 'legend', 'marker', 'xaxis', 'yaxis', 'tooltip'],
        'data_fields': ['xgrid', 'ygrid', 'latitude', 'longitude', 'tooltip']},
    'pivot': {
        'name': 'pivotTable',
        'chartPicture': pivotTable,
        'layout_elements': ['grid', 'title', 'legend', 'marker', 'xaxis', 'yaxis', 'tooltip'],
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
    'general': tooltip,
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
    {'element': 'general', 'type': 'bcolor', 'form': 'color', 'title': 'Background Color', 'setting_id': 'chart_bcolor', 'selector': null},
    {'element': 'general', 'type': 'size', 'form': 'coordinates', 'title': 'Chart Size', 'setting_id': 'chart_size', 'selector': null},
    {'element': 'general', 'type': 'border', 'form': 'border', 'title': 'Chart Border', 'setting_id': 'chart_border', 'selector': null},

    {'element': 'title', 'type': 'position', 'form': 'coordinates', 'title': 'Chart Title Position', 'setting_id': 'title_coordinates', 'selector': 'title'},
    {'element': 'title', 'type': 'title', 'form': 'text', 'title': 'Chart Title', 'setting_id': 'title_text', 'selector': 'title'},
    {'element': 'title', 'type': 'font', 'form': 'coordinates', 'title': 'Chart Size', 'setting_id': 'title_font', 'selector': 'title'},
    {'element': 'title', 'type': 'border', 'form': 'border', 'title': 'Chart Border', 'setting_id': 'title_border', 'selector': 'title'},

    {'element': 'legend', 'type': 'position', 'form': 'position', 'title': 'Horizontal Position', 'setting_id': 'legend_position', 'selector': 'legend'},
    {'element': 'legend', 'type': 'title', 'form': 'text', 'title': 'Legend Title', 'setting_id': 'legend_title', 'selector': 'legend'},
    {'element': 'legend', 'type': 'font', 'form': 'font', 'title': 'Legend Font', 'setting_id': 'legend_font', 'selector': 'legend'},
    {'element': 'legend', 'type': 'border', 'form': 'border', 'title': 'Legend Border', 'setting_id': 'legend_border', 'selector': 'legend'},

    {'element': 'xaxis', 'type': 'position', 'form': 'coordinates', 'title': 'X Axis Offset', 'setting_id': 'xaxis_offset', 'selector': 'xaxis'},
    {'element': 'xaxis', 'type': 'title', 'form': 'text', 'title': 'X Axis Title', 'setting_id': 'xaxis_title', 'selector': 'xaxis'},
    {'element': 'xaxis', 'type': 'font', 'form': 'font', 'title': 'X Axis Font', 'setting_id': 'xaxis_font', 'selector': 'xaxis'},
    {'element': 'xaxis', 'type': 'border', 'form': 'border', 'title': 'X Axis Border', 'setting_id': 'xaxis_border', 'selector': 'xaxis'},

    {'element': 'yaxis', 'type': 'position', 'form': 'coordinates', 'title': 'Y Axis Offset', 'setting_id': 'yaxis_offset', 'selector': 'y axis'},
    {'element': 'yaxis', 'type': 'title', 'form': 'text', 'title': 'Y Axis Title', 'setting_id': 'yaxis_title', 'selector': 'y axis'},
    {'element': 'yaxis', 'type': 'font', 'form': 'font', 'title': 'Y Axis Font', 'setting_id': 'yaxis_font', 'selector': 'y axis'},
    {'element': 'yaxis', 'type': 'border', 'form': 'border', 'title': 'Y Axis Border', 'setting_id': 'yaxis_border', 'selector': 'y axis'},

    {'element': 'marker', 'type': 'size', 'form': 'size', 'title': 'Marker Size', 'setting_id': 'marker_size', 'selector': 'marker'},
    {'element': 'marker', 'type': 'style', 'form': 'style', 'title': 'Marker Style', 'setting_id': 'marker_style', 'selector': 'marker'},
    {'element': 'marker', 'type': 'color', 'form': 'color', 'title': 'Marker Color', 'setting_id': 'marker_color', 'selector': 'marker'},

    {'element': 'line', 'type': 'size', 'form': 'size', 'title': 'Line Size', 'setting_id': 'line_size', 'selector': null},
    {'element': 'line', 'type': 'style', 'form': 'style', 'title': 'Line Style', 'setting_id': 'line_style', 'selector': null},
    {'element': 'line', 'type': 'color', 'form': 'color', 'title': 'Line Color', 'setting_id': 'line_color', 'selector': null},

    {'element': 'bar', 'type': 'size', 'form': 'size', 'title': 'Bar Size', 'setting_id': 'bar_size', 'selector': null},
    {'element': 'bar', 'type': 'color', 'form': 'color', 'title': 'Bar Color', 'setting_id': 'bar_color', 'selector': null}
];