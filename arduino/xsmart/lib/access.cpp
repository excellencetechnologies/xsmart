#include "access.h"
#include <FS.h>
#ifdef ESP32
#include <SPIFFS.h>
#endif
#include <ArduinoJson.h>

#define JSON_SIZE 512

#ifndef FILE_WRITE
#define FILE_WRITE "w"
#endif

#ifndef FILE_READ
#define FILE_READ "r"
#endif

#define JSON_SIZE 1024

XAccess::XAccess(char *filename)
{
    configfile = filename;
}

void XAccess::initConfig(void)
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

String XAccess::loadConfigFile(void)
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

void XAccess::saveConfigFile(const char *message)
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

String XAccess::checkUID(String uid)
{
    String file = loadConfigFile();
    StaticJsonBuffer<JSON_SIZE> jsonBuffer;
    JsonObject &root = jsonBuffer.parseObject(file);
    String emp_id = root.get<String>(uid);
    if(emp_id){
        return emp_id;
    }else{
        return "";
    }
}

void XAccess::addUID(String uid, String emp_id)
{
    String file = loadConfigFile();
    StaticJsonBuffer<JSON_SIZE> jsonBuffer;
    JsonObject &root = jsonBuffer.parseObject(file);
    root.set("uid", emp_id);

    root.printTo(Serial);
    file = "";
    root.printTo(file);
    saveConfigFile(file.c_str());
}

void XAccess::P(String msg)
{
    Serial.println(msg);
}