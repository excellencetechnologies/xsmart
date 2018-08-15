
  cordova.define('cordova/plugin_list', function(require, exports, module) {
    module.exports = [
      {
        "id": "cordova-plugin-hotspot.HotSpotPlugin",
        "file": "plugins/cordova-plugin-hotspot/www/HotSpotPlugin.js",
        "pluginId": "cordova-plugin-hotspot",
        "clobbers": [
          "cordova.plugins.hotspot"
        ]
      },
      {
        "id": "cordova-plugin-nativestorage.mainHandle",
        "file": "plugins/cordova-plugin-nativestorage/www/mainHandle.js",
        "pluginId": "cordova-plugin-nativestorage",
        "clobbers": [
          "NativeStorage"
        ]
      },
      {
        "id": "cordova-plugin-nativestorage.LocalStorageHandle",
        "file": "plugins/cordova-plugin-nativestorage/www/LocalStorageHandle.js",
        "pluginId": "cordova-plugin-nativestorage"
      },
      {
        "id": "cordova-plugin-nativestorage.NativeStorageError",
        "file": "plugins/cordova-plugin-nativestorage/www/NativeStorageError.js",
        "pluginId": "cordova-plugin-nativestorage"
      },
      {
        "id": "cordova-plugin-uniquedeviceid.UniqueDeviceID",
        "file": "plugins/cordova-plugin-uniquedeviceid/www/uniqueid.js",
        "pluginId": "cordova-plugin-uniquedeviceid",
        "merges": [
          "window.plugins.uniqueDeviceID"
        ]
      }
    ];
    module.exports.metadata =
    // TOP OF METADATA
    {
      "cordova-plugin-compat": "1.2.0",
      "cordova-plugin-hotspot": "1.2.10",
      "cordova-plugin-nativestorage": "2.3.2",
      "cordova-plugin-uniquedeviceid": "1.3.2"
    };
    // BOTTOM OF METADATA
    });
    