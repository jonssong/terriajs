'use strict';

/*global require*/
var ArcGisMapServerCatalogItem = require('../Models/ArcGisMapServerCatalogItem');

var BaseMapViewModel = require('./BaseMapViewModel');
/*
var BingMapsCatalogItem = require('../Models/BingMapsCatalogItem');

var BingMapsStyle = require('terriajs-cesium/Source/Scene/BingMapsStyle');
*/
var createBingBaseMapOptions = function(terria, bingMapsKey) {
    var result = [];
/*
    var bingMapsAerial = new BingMapsCatalogItem(terria);
    bingMapsAerial.name = 'Bing Maps Aerial';
    bingMapsAerial.mapStyle = BingMapsStyle.AERIAL;
    bingMapsAerial.opacity = 1.0;
    bingMapsAerial.key = bingMapsKey;
    bingMapsAerial.isRequiredForRendering = true;

    result.push(new BaseMapViewModel({
        image: require('../../wwwroot/images/bing-aerial.png'),
        catalogItem: bingMapsAerial
    }));
*/
    var qldImagery = new ArcGisMapServerCatalogItem(terria);
    qldImagery.url = 'https://gisservices.information.qld.gov.au/arcgis/rest/services/Imagery/QldBase_AllUsers/MapServer';
    qldImagery.opacity = 1.0;
    qldImagery.isRequiredForRendering = true;
    qldImagery.name = 'QLD gov Imagery';
    qldImagery.allowFeaturePicking = false;

    result.push(new BaseMapViewModel({
        image: require('../../wwwroot/images/qld-imagery.png'),
        catalogItem: qldImagery,
        contrastColor: '#000000'
    }));

    return result;
};

module.exports = createBingBaseMapOptions;
