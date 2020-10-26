import lineChart from '@/assets/charts/line_simple.png'
import barChart from '@/assets/charts/bar_simple.png';
import scatterChart from '@/assets/charts/scatter_simple2.png';
import treeMapChart from '@/assets/charts/treemap_simple.png';
import mapChart from '@/assets/charts/map_simple.png';
import lineAreaChart from '@/assets/charts/line_area.png';
import lineStackedAreaChart from '@/assets/charts/line_stacked_area.png';
import barStackedChart from '@/assets/charts/bar_stacked.png';
import pivotTable from '@/assets/charts/table_simple.png';


export let chartSettings = [
    {'name': 'lineChart', 'chartPicture': lineChart, 'alias': 'line', 'selectors': ['grid', 'marker', '']},
    {'name': 'lineAreaChart', 'chartPicture': lineAreaChart, 'alias': 'lineA'},
    {'name': 'lineStackedAreaChart', 'chartPicture': lineStackedAreaChart, 'alias': 'lineSA'},
    {'name': 'barChart', 'chartPicture': barChart, 'alias': 'bar'},
    {'name': 'barStackedChart', 'chartPicture': barStackedChart, 'alias': 'barS'},
    {'name': 'scatterChart', 'chartPicture': scatterChart, 'alias': 'scatter'},
    {'name': 'treeMapChart', 'chartPicture': treeMapChart, 'alias': 'treemap'},
    {'name': 'mapChart', 'chartPicture': mapChart, 'alias': 'map'},
    {'name': 'pivotTable', 'chartPicture': pivotTable, 'alias': 'pivot'}
];


export let chartsDataSettings = {
    'line': [
        {'name': 'x grid', 'alias': 'xgrid', 'selector': 'grid'},
        {'name': 'y grid', 'alias': 'ygrid', 'selector': 'grid'},
        {'name': 'main axis', 'alias': 'main', 'selector': null},
        {'name': 'values', 'alias': 'value', 'selector': null},
        {'name': 'category', 'alias': 'category', 'selector': null},
        {'name': 'marker size', 'alias': 'markerS', 'selector': 'marker'},
        {'name': 'tooltip', 'alias': 'tooltip', 'selector': 'tooltip'}
    ],
    'lineA': [
        {'name': 'x grid', 'alias': 'xgrid', 'selector': 'grid'},
        {'name': 'y grid', 'alias': 'ygrid', 'selector': 'grid'},
        {'name': 'main axis', 'alias': 'main', 'selector': null},
        {'name': 'values', 'alias': 'value', 'selector': null},
        {'name': 'category', 'alias': 'category', 'selector': null},
        {'name': 'marker size', 'alias': 'markerS', 'selector': 'marker'},
        {'name': 'tooltip', 'alias': 'tooltip', 'selector': 'tooltip'}
    ],
    'lineSA': [
        {'name': 'x grid', 'alias': 'xgrid', 'selector': 'grid'},
        {'name': 'y grid', 'alias': 'ygrid', 'selector': 'grid'},
        {'name': 'main axis', 'alias': 'main', 'selector': null},
        {'name': 'values', 'alias': 'value', 'selector': null},
        {'name': 'category', 'alias': 'category', 'selector': null},
        {'name': 'marker size', 'alias': 'markerS', 'selector': 'marker'},
        {'name': 'tooltip', 'alias': 'tooltip', 'selector': 'tooltip'}
    ],
    'bar': [
        {'name': 'x grid', 'alias': 'xgrid', 'selector': 'grid'},
        {'name': 'y grid', 'alias': 'ygrid', 'selector': 'grid'},
        {'name': 'main axis', 'alias': 'main', 'selector': null},
        {'name': 'values', 'alias': 'value', 'selector': null},
        {'name': 'category', 'alias': 'category', 'selector': null},
        {'name': 'tooltip', 'alias': 'tooltip', 'selector': 'tooltip'}
    ],
    'barS': [
        {'name': 'x grid', 'alias': 'xgrid', 'selector': 'grid'},
        {'name': 'y grid', 'alias': 'ygrid', 'selector': 'grid'},
        {'name': 'main axis', 'alias': 'main', 'selector': null},
        {'name': 'values', 'alias': 'value', 'selector': null},
        {'name': 'category', 'alias': 'category', 'selector': null},
        {'name': 'tooltip', 'alias': 'tooltip', 'selector': 'tooltip'}
    ],
    'scatter': [
        {'name': 'x grid', 'alias': 'xgrid', 'selector': 'grid'},
        {'name': 'y grid', 'alias': 'ygrid', 'selector': 'grid'},
        {'name': 'x axis', 'alias': 'x', 'selector': null},
        {'name': 'y axis', 'alias': 'y', 'selector': null},
        {'name': 'marker color', 'alias': 'markerC', 'selector': 'marker'},
        {'name': 'marker size', 'alias': 'markerS', 'selector': 'marker'},
        {'name': 'tooltip', 'alias': 'tooltip'}
    ],
    'treemap': [
        {'name': 'x grid', 'alias': 'xgrid', 'selector': 'grid'},
        {'name': 'y grid', 'alias': 'ygrid', 'selector': 'grid'},
        {'name': 'categories', 'alias': 'cat', 'selector': null},
        {'name': 'size', 'alias': 'size', 'selector': null},
        {'name': 'tooltip', 'alias': 'tooltip', 'selector': 'tooltip'}
    ],
    'map': [
        {'name': 'x grid', 'alias': 'xgrid', 'selector': 'grid'},
        {'name': 'y grid', 'alias': 'ygrid', 'selector': 'grid'},
        {'name': 'long', 'alias': 'x', 'selector': null},
        {'name': 'lat', 'alias': 'y', 'selector': null},
        {'name': 'marker color', 'alias': 'markerC', 'selector': 'marker'},
        {'name': 'marker size', 'alias': 'markerS', 'selector': 'marker'},
        {'name': 'tooltip', 'alias': 'tooltip', 'selector': 'tooltip'}
    ],
    'pivot': [
        {'name': 'x grid', 'alias': 'xgrid', 'selector': 'grid'},
        {'name': 'y grid', 'alias': 'ygrid', 'selector': 'grid'},
        {'name': 'columns', 'alias': 'column', 'selector': null},
        {'name': 'rows', 'alias': 'row', 'selector': null},
        {'name': 'values', 'alias': 'value', 'selector': null},
        {'name': 'color', 'alias': 'color', 'selector': 'color'},
        {'name': 'tooltip', 'alias': 'tooltip', 'selector': 'tooltip'}
    ]
};


let test = [
    {'part': 'general', 'type': 'bcolor', 'form': 'color', 'title': 'Background Color', 'setting_id': 'chart_bcolor', 'selector': null},
    {'part': 'general', 'type': 'size', 'form': 'coordinates', 'title': 'Chart Size', 'setting_id': 'chart_size', 'selector': null},
    {'part': 'general', 'type': 'border', 'form': 'border', 'title': 'Chart Border', 'setting_id': 'chart_border', 'selector': null},

    {'part': 'title', 'type': 'position', 'form': 'coordinates', 'title': 'Chart Title Position', 'setting_id': 'title_coordinates', 'selector': 'title'},
    {'part': 'title', 'type': 'title', 'form': 'text', 'title': 'Chart Title', 'setting_id': 'title_text', 'selector': 'title'},
    {'part': 'title', 'type': 'font', 'form': 'coordinates', 'title': 'Chart Size', 'setting_id': 'title_font', 'selector': 'title'},
    {'part': 'title', 'type': 'border', 'form': 'border', 'title': 'Chart Border', 'setting_id': 'title_border', 'selector': 'title'},

    {'part': 'legend', 'type': 'position', 'form': 'coordinates', 'title': 'Horizontal Position', 'setting_id': 'legend_coordinates', 'selector': 'legend'},
    {'part': 'legend', 'type': 'position', 'form': 'position', 'title': 'Horizontal Position', 'setting_id': 'legend_position', 'selector': 'legend'},
    {'part': 'legend', 'type': 'title', 'form': 'text', 'title': 'Legend Title', 'setting_id': 'legend_title', 'selector': 'legend'},
    {'part': 'legend', 'type': 'font', 'form': 'font', 'title': 'Legend Font', 'setting_id': 'legend_font', 'selector': 'legend'},
    {'part': 'legend', 'type': 'border', 'form': 'border', 'title': 'Legend Border', 'setting_id': 'legend_border', 'selector': 'legend'},

    {'part': 'mainaxis', 'type': 'position', 'form': 'coordinates', 'title': 'Main Axis Offset', 'setting_id': 'mainaxis_offset', 'selector': 'main axis'},
    {'part': 'mainaxis', 'type': 'title', 'form': 'text', 'title': 'Main Axis Title', 'setting_id': 'mainaxis_title', 'selector': 'main axis'},
    {'part': 'mainaxis', 'type': 'font', 'form': 'font', 'title': 'Main Axis Font', 'setting_id': 'mainaxis_font', 'selector': 'main axis'},
    {'part': 'mainaxis', 'type': 'border', 'form': 'border', 'title': 'Main Axis Border', 'setting_id': 'mainaxis_border', 'selector': 'main axis'},

    {'part': 'valueaxis', 'type': 'position', 'form': 'coordinates', 'title': 'Value Axis Offset', 'setting_id': 'valueaxis_offset', 'selector': 'value axis'},
    {'part': 'valueaxis', 'type': 'title', 'form': 'text', 'title': 'Value Axis Title', 'setting_id': 'valueaxis_title', 'selector': 'value axis'},
    {'part': 'valueaxis', 'type': 'font', 'form': 'font', 'title': 'Value Axis Font', 'setting_id': 'valueaxis_font', 'selector': 'value axis'},
    {'part': 'valueaxis', 'type': 'border', 'form': 'border', 'title': 'Value Axis Border', 'setting_id': 'valueaxis_border', 'selector': 'value axis'},

    {'part': 'marker', 'type': 'size', 'form': 'size', 'title': 'Marker Size', 'setting_id': 'marker_size', 'selector': 'marker'},
    {'part': 'marker', 'type': 'style', 'form': 'style', 'title': 'Marker Style', 'setting_id': 'marker_style', 'selector': 'marker'},
    {'part': 'marker', 'type': 'color', 'form': 'color', 'title': 'Marker Color', 'setting_id': 'marker_color', 'selector': 'marker'},

    {'part': 'line', 'type': 'size', 'form': 'size', 'title': 'Line Size', 'setting_id': 'line_size', 'selector': null},
    {'part': 'line', 'type': 'style', 'form': 'style', 'title': 'Line Style', 'setting_id': 'line_style', 'selector': null},
    {'part': 'line', 'type': 'color', 'form': 'color', 'title': 'Line Color', 'setting_id': 'line_color', 'selector': null},

    {'part': 'bar', 'type': 'size', 'form': 'size', 'title': 'Bar Size', 'setting_id': 'bar_size', 'selector': null},
    {'part': 'bar', 'type': 'color', 'form': 'color', 'title': 'Bar Color', 'setting_id': 'bar_color', 'selector': null}
];



let chartsLayoutSharedSettings = [
    {'name': 'general', 'alias': 'general'},
    {'name': 'grid', 'alias': 'grid'},
    {'name': 'title', 'alias': 'title'},
    {'name': 'border', 'alias': 'border'},
    {'name': 'legend', 'alias': 'legend'},
    {'name': 'tooltip', 'alias': 'tooltip'}
];

export let chartsLayoutSettings = {
    'line': chartsLayoutSharedSettings.concat([
        {'name': 'main axis', 'alias': 'main'},
        {'name': 'value axis', 'alias': 'value'},
        {'name': 'colors', 'alias': 'color'},
        {'name': 'size', 'alias': 'size'},
        {'name': 'markers', 'alias': 'marker'}
    ]),
    'lineA': chartsLayoutSharedSettings.concat([
        {'name': 'main axis', 'alias': 'main'},
        {'name': 'value axis', 'alias': 'value'},
        {'name': 'colors', 'alias': 'color'},
        {'name': 'size', 'alias': 'size'},
        {'name': 'markers', 'alias': 'marker'}
    ]),
    'lineSA': chartsLayoutSharedSettings.concat([
        {'name': 'main axis', 'alias': 'main'},
        {'name': 'value axis', 'alias': 'value'},
        {'name': 'colors', 'alias': 'color'},
        {'name': 'size', 'alias': 'size'},
        {'name': 'markers', 'alias': 'marker'}
    ]),
    'bar': chartsLayoutSharedSettings.concat([
        {'name': 'main axis', 'alias': 'main'},
        {'name': 'value axis', 'alias': 'value'},
        {'name': 'colors', 'alias': 'color'},
        {'name': 'size', 'alias': 'size'}
    ]),
    'barS': chartsLayoutSharedSettings.concat([
        {'name': 'main axis', 'alias': 'main'},
        {'name': 'value axis', 'alias': 'value'},
        {'name': 'colors', 'alias': 'color'},
        {'name': 'size', 'alias': 'size'}
    ]),
    'scatter': chartsLayoutSharedSettings.concat([
        {'name': 'x axis', 'alias': 'x'},
        {'name': 'Y Axis', 'alias': 'y'},
        {'name': 'colors', 'alias': 'color'},
        {'name': 'size', 'alias': 'size'},
        {'name': 'markers', 'alias': 'marker'}
    ]),
    'treemap': chartsLayoutSharedSettings.concat([
        {'name': 'categories', 'alias': 'x'},
        {'name': 'value axis', 'alias': 'value'},
        {'name': 'colors', 'alias': 'color'},
        {'name': 'size', 'alias': 'size'}
    ]),
    'map': chartsLayoutSharedSettings.concat([
        {'name': 'coordinates x', 'alias': 'geox'},
        {'name': 'coordinates y', 'alias': 'geoy'},
        {'name': 'colors', 'alias': 'color'},
        {'name': 'markers', 'alias': 'marker'}
    ]),
    'pivot': chartsLayoutSharedSettings.concat([
        {'name': 'Rows', 'alias': 'row'},
        {'name': 'columns', 'alias': 'column'},
        {'name': 'colors', 'alias': 'color'},
        {'name': 'cell', 'alias': 'cell'}
    ])
};