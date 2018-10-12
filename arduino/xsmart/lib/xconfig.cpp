#include "xconfig.h"
#include "HardwareSerial.h"
#include <FS.h>
#ifdef ESP32
#define JSON_SIZE 1024
#include <SPIFFS.h>
#endif
#include <ArduinoJson.h>

#ifdef ESP8266
  #define JSON_SIZE 512
#endif



#ifndef FILE_WRITE
#define FILE_WRITE "w"
#endif

#ifndef FILE_READ
#define FILE_READ "r"
#endif

XConfig::XConfig(char *filename)
{
  configfile = filename;
}

void XConfig::initConfig(void)
{
#ifdef ESP32
  if (!SPIFFS.begin(true))
  {
    P("SPIFFS Mount Failed");
  }
  else
  {
    P("xconfig init");
  }
#endif
#ifdef ESP8266
  if (!SPIFFS.begin())
  {
    P("SPIFFS Mount Failed");
  }
  else
  {
    P("xconfig init");
  }
#endif
}
void XConfig::testConfig(void)
{
  addWifiSSID("manish", "java@123");
  getWifiSSID();
  deleteWifiSSID("manish");
  getWifiSSID();
}

String XConfig::loadConfigFile(void)
{
  P("load config file");
  P(configfile);
  File file = SPIFFS.open(configfile, FILE_READ);
  if (!file)
  {
    P("- failed to open file for reading");
  }
  String data = "";
  while (file.available())
  {
    char ch = (char)file.read();
    data += String(ch);
    // P(String(ch));
  }
  return data;
}

void XConfig::saveConfigFile(const char *message)
{
  P("saving config file ");
  P(message);
  File file = SPIFFS.open(configfile, FILE_WRITE);
  if (!file)
  {
    P("- failed to open file for writing");
    return;
  }
  if (file.print(message))
  {
    P("- file written");
  }
  else
  {
    P("- frite failed");
  }
}

void XConfig::deleteWifiSSID(String ssid)
{
  P("deleteWifiSSID");
  String file = loadConfigFile();
  StaticJsonBuffer<JSON_SIZE> jsonBuffer;
  JsonObject &root = jsonBuffer.parseObject(file);
  JsonArray &array1 = root["networks"].as<JsonArray>();

  StaticJsonBuffer<500> jsonBuffer2;
  JsonArray &networks = jsonBuffer2.createArray();

  for (int i = 0; i < array1.size(); i++)
  {
    JsonObject &obj = array1[i].as<JsonObject>();
    P(obj["ssid"].as<char *>());
    if (ssid != obj["ssid"].as<char *>())
    {
      StaticJsonBuffer<100> jsonBuffer1;
      JsonObject &object1 = jsonBuffer1.createObject();
      object1["ssid"] = obj["ssid"].as<char *>();
      object1["password"] = obj["password"].as<char *>();
      networks.add(object1);
    }
  }

  root.set("networks", networks);
  root.printTo(Serial);
  file = "";
  root.printTo(file);
  saveConfigFile(file.c_str());
}
JsonObject &XConfig::getWifiSSID(void)
{
  P("getWifiSSID");
  String file = loadConfigFile();
  P("reading ssid");
  StaticJsonBuffer<JSON_SIZE> jsonBuffer;
  JsonObject &root = jsonBuffer.parseObject(file);
  JsonArray &array1 = root["networks"].as<JsonArray>();


   StaticJsonBuffer<400> jsonBuffer1;
   JsonObject &networkobject = jsonBuffer1.createObject();

  for (int i = 0; i < array1.size(); i++)
  {
    JsonObject &obj = array1[i].as<JsonObject>();
    P(obj["ssid"].as<char *>());
    networkobject.set(obj["ssid"].as<char *>() , obj["password"].as<char *>());
  }
  return networkobject;
}
void XConfig::addWifiSSID(String ssid, String password)
{
  P("addWifiSSID");
  String file = loadConfigFile();
  P(file);
  StaticJsonBuffer<JSON_SIZE> jsonBuffer;
  JsonObject &root = jsonBuffer.parseObject(file);

  JsonVariant networks = root["networks"];

  if (!networks)
  {
    P("no networks in config file");
    JsonArray &array1 = root.createNestedArray("networks");
    StaticJsonBuffer<200> jsonBuffer1;
    JsonObject &object1 = jsonBuffer1.createObject();
    object1["ssid"] = ssid;
    object1["password"] = password;
    array1.add(object1);
  }
  else
  {
    deleteWifiSSID(ssid);
    JsonArray &array1 = root["networks"];
    StaticJsonBuffer<100> jsonBuffer1;
    JsonObject &object1 = jsonBuffer1.createObject();
    object1["ssid"] = ssid;
    object1["password"] = password;
    array1.add(object1);
  }
  root.printTo(Serial);
  file = "";
  root.printTo(file);
  saveConfigFile(file.c_str());
}

void XConfig::setDeviceTimezone(int tz)
{
  P("setDeviceTimezone");
  String file = loadConfigFile();
  P(file);
  StaticJsonBuffer<JSON_SIZE> jsonBuffer;
  JsonObject &root = jsonBuffer.parseObject(file);

  root["tz"] = tz;

  root.printTo(Serial);
  file = "";
  root.printTo(file);
  saveConfigFile(file.c_str());
}
int XConfig::getDeviceTimezone()
{
  P("getDeviceTimezone");
  String file = loadConfigFile();
  P(file);
  StaticJsonBuffer<JSON_SIZE> jsonBuffer;
  JsonObject &root = jsonBuffer.parseObject(file);
  int tz = root.get<int>("tz");
  if (tz)
  {
    return tz;
  }
  else
  {
    return 0;
  }
}

void XConfig::setNickName(String deviceName)
{
  P("setNickName");
  String file = loadConfigFile();
  P(file);
  StaticJsonBuffer<JSON_SIZE> jsonBuffer;
  JsonObject &root = jsonBuffer.parseObject(file);

  root["nickname"] = deviceName;

  root.printTo(Serial);
  file = "";
  root.printTo(file);
  saveConfigFile(file.c_str());
}
String XConfig::getNickName()
{
  P("getNickName");
  String file = loadConfigFile();
  P(file);
  StaticJsonBuffer<JSON_SIZE> jsonBuffer;
  JsonObject &root = jsonBuffer.parseObject(file);
  String nick = root.get<String>("nickname");
  if (nick)
  {
    return nick;
  }
  else
  {
    return "";
  }
}
JsonArray &XConfig::getPinConfig()
{
  P("getPinConfig");
  String file = loadConfigFile();
  P(file);
  StaticJsonBuffer<JSON_SIZE> jsonBuffer;
  JsonObject &root = jsonBuffer.parseObject(file);

  if (root["pins"])
  {
    return root.get<JsonVariant>("pins").as<JsonArray &>();
  }
  else
  {
    StaticJsonBuffer<200> jsonBuffer;
    return jsonBuffer.createArray();
  }
}
void XConfig::deletePinConfig()
{
  P("deletePinConfig");
  String file = loadConfigFile();
  P(file);
  StaticJsonBuffer<JSON_SIZE> jsonBuffer;
  JsonObject &root = jsonBuffer.parseObject(file);
  root.remove("pins");

  root.printTo(Serial);
  file = "";
  root.printTo(file);
  saveConfigFile(file.c_str());
}
void XConfig::setPinConfig(JsonArray &pinsConfig)
{
  P("setPinConfig");
  String file = loadConfigFile();
  P(file);
  StaticJsonBuffer<JSON_SIZE> jsonBuffer;
  JsonObject &root = jsonBuffer.parseObject(file);

  JsonArray &pins = root.createNestedArray("pins");

  for (int i = 0; i < pinsConfig.size(); i++)
  {
    pins.add(pinsConfig[i].as<JsonObject>());
  }

  root.printTo(Serial);
  file = "";
  root.printTo(file);
  saveConfigFile(file.c_str());
}

String XConfig::getPinName(int pin)
{
  P("getPinName");
  String file = loadConfigFile();
  P(file);
  StaticJsonBuffer<JSON_SIZE> jsonBuffer;
  JsonObject &root = jsonBuffer.parseObject(file);

  root.printTo(Serial);

  JsonArray &array1 = root["switches"].as<JsonArray>();

  String pinName = "";

  for (int i = 0; i < array1.size(); i++)
  {
    JsonObject &obj = array1[i].as<JsonObject>();
    P(obj["pin"].as<char *>());
    if (pin == obj["pin"].as<int>())
    {
      pinName = obj["name"].as<String>();
    }
  }
  return pinName;
}
void XConfig::setPinName(int pin, String name)
{
  P("setPinName");
  String file = loadConfigFile();
  P(file);
  StaticJsonBuffer<JSON_SIZE> jsonBuffer;
  JsonObject &root = jsonBuffer.parseObject(file);

  JsonVariant switches = root["switches"];

  if (!switches)
  {
    P("no switches in config file");
    JsonArray &array1 = root.createNestedArray("switches");
    StaticJsonBuffer<200> jsonBuffer1;
    JsonObject &object1 = jsonBuffer1.createObject();
    object1["pin"] = pin;
    object1["name"] = name;
    array1.add(object1);
  }
  else
  {

    //first delete

    JsonArray &array1 = root["switches"].as<JsonArray>();

    StaticJsonBuffer<500> jsonBuffer2;
    JsonArray &networks = jsonBuffer2.createArray();

    for (int i = 0; i < array1.size(); i++)
    {
      JsonObject &obj = array1[i].as<JsonObject>();
      P(obj["pin"].as<char *>());
      if (pin != obj["pin"].as<int>())
      {
        StaticJsonBuffer<100> jsonBuffer1;
        JsonObject &object1 = jsonBuffer1.createObject();
        object1["pin"] = obj["pin"].as<int>();
        object1["name"] = obj["name"].as<String>();
        networks.add(object1);
      }
    }

    StaticJsonBuffer<100> jsonBuffer1;
    JsonObject &object1 = jsonBuffer1.createObject();
    object1["pin"] = pin;
    object1["name"] = name;
    networks.add(object1);

    root.set("switches", networks);
  }

  root.printTo(Serial);
  file = "";
  root.printTo(file);
  saveConfigFile(file.c_str());
}

void XConfig::P(String msg)
{
  Serial.println(msg);
}