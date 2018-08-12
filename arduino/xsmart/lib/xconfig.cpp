#include "xconfig.h"
#include "HardwareSerial.h"
#include <FS.h>
#include <SPIFFS.h>
#include <ArduinoJson.h>

XConfig::XConfig(char *filename)
{
  configfile = filename;
}

void XConfig::initConfig(void)
{
  if (!SPIFFS.begin(true))
  {
    Serial.println("SPIFFS Mount Failed");
  }
  else
  {
    Serial.println("xconfig init");
  }
}
void XConfig::testConfig(void){
  addWifiSSID("manish", "java@123");
  getWifiSSID();
  deleteWifiSSID("manish");
  getWifiSSID();
}

String XConfig::loadConfigFile(void)
{
  Serial.println("load config file");
  Serial.println(configfile);
  File file = SPIFFS.open(configfile);
  if (!file || file.isDirectory())
  {
    Serial.println("- failed to open file for reading");
  }
  String data = "";
  while (file.available())
  {
    char ch = (char)file.read();
    data += String(ch);
  }
  return data;
}

void XConfig::saveConfigFile(const char *message)
{
  Serial.println("saving config file ");
  Serial.print(message);
  File file = SPIFFS.open(configfile, FILE_WRITE);
  if (!file)
  {
    Serial.println("- failed to open file for writing");
    return;
  }
  if (file.print(message))
  {
    Serial.println("- file written");
  }
  else
  {
    Serial.println("- frite failed");
  }
}

void XConfig::deleteWifiSSID(String ssid){
  Serial.println("deleteWifiSSID");
  String file = loadConfigFile();
  StaticJsonBuffer<1024> jsonBuffer;
  JsonObject &root = jsonBuffer.parseObject(file);
  JsonArray &array1 = root["networks"].as<JsonArray>();

  StaticJsonBuffer<500> jsonBuffer2;
  JsonArray& networks = jsonBuffer2.createArray();

  for(int i = 0;i<array1.size();i++){
    JsonObject &obj = array1[i].as<JsonObject>();
    Serial.println(obj["ssid"].as<char*>());
    if(ssid != obj["ssid"].as<char*>()){
      StaticJsonBuffer<100> jsonBuffer1;
      JsonObject &object1 = jsonBuffer1.createObject();
      object1["ssid"] = obj["ssid"].as<char*>();
      object1["password"] = obj["password"].as<char*>();
      networks.add(object1);
    }
  }

  root.set("networks", networks);
  root.printTo(Serial);
  file = "";
  root.printTo(file);
  saveConfigFile(file.c_str());
}
JsonArray& XConfig::getWifiSSID(void){
  Serial.println("getWifiSSID");
  String file = loadConfigFile();
  Serial.println("reading ssid");
  StaticJsonBuffer<1024> jsonBuffer;
  JsonObject &root = jsonBuffer.parseObject(file);
  JsonArray &array1 = root["networks"].as<JsonArray>();
  for(int i = 0;i<array1.size();i++){
    JsonObject &obj = array1[i].as<JsonObject>();
    Serial.println(obj["ssid"].as<char*>());
  }
  return array1;
}
void XConfig::addWifiSSID(String ssid, String password)
{
  Serial.println("addWifiSSID");
  String file = loadConfigFile();
  Serial.println(file);
  StaticJsonBuffer<1024> jsonBuffer;
  JsonObject &root = jsonBuffer.parseObject(file);

  JsonVariant networks = root["networks"];

  if (!networks)
  {
    Serial.println("no networks in config file");
    JsonArray &array1 = root.createNestedArray("networks");
    StaticJsonBuffer<200> jsonBuffer1;
    JsonObject &object1 = jsonBuffer1.createObject();
    object1["ssid"] = ssid;
    object1["password"] = password;
    array1.add(object1);
  }
  else
  {
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