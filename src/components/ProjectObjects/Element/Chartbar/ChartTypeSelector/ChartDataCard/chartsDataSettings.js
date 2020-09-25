export let chartsDataSettings = {
    'lineChart': [
        {'name': 'x grid', 'active': true},
        {'name': 'y grid', 'active': true},
        {'name': 'main axis', 'active': true},
        {'name': 'values', 'active': true},
        {'name': 'marker color', 'active': false},
        {'name': 'marker size', 'active': false},
        {'name': 'tooltip', 'active': false}
    ],
    'barChart': [
        {'name': 'x grid', 'active': true},
        {'name': 'y grid', 'active': true},
        {'name': 'main axis', 'active': true},
        {'name': 'values', 'active': true},
        {'name': 'tooltip', 'active': false}
    ],
};

export let chartsDataSettingSelector = {
    'lineChart': [
        {'name': 'grid', 'setting_ids': [0, 1]},
        {'name': 'marker', 'setting_ids': [4, 5]},
        {'name': 'tooltip', 'setting_ids': [6]}
    ],
    'barChart': [
        {'name': 'grid', 'setting_ids': [0, 1]},
        {'name': 'tooltip', 'setting_ids': [4]}
    ],
};
