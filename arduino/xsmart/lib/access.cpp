#include "access.h"
#include <FS.h>
#ifdef ESP32
#include <SPIFFS.h>
#endif
#include <ArduinoJson.h>

#define JSON_SIZE 100

#ifndef FILE_WRITE
#define FILE_WRITE "w"
#endif

#ifndef FILE_READ
#define FILE_READ "r"
#endif

#ifndef FILE_APPEND
#define FILE_APPEND "a"
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
    root.printTo(Serial);
    if (root.containsKey(uid))
    {
        return root.get<String>(uid);
    }
    else
    {
        return "";
    }
}

void XAccess::addUID(String uid, String emp_id)
{
    String file = loadConfigFile();
    StaticJsonBuffer<JSON_SIZE> jsonBuffer;
    JsonObject &root = jsonBuffer.parseObject(file);

    root.set(uid, emp_id);

    root.printTo(Serial);
    file = "";
    root.printTo(file);
    saveConfigFile(file.c_str());
}
void XAccess::deleteUID(String emp_id)
{
    String file = loadConfigFile();
    StaticJsonBuffer<JSON_SIZE> jsonBuffer;
    JsonObject &root = jsonBuffer.parseObject(file);
    String rfid = "";
    for (auto kv : root)
    {
        Serial.println(kv.key);
        Serial.println(kv.value.as<char *>());
        if (kv.value.as<String>() == emp_id)
        {
            rfid = kv.key;
        }
    }
    root.remove(rfid);
    root.printTo(Serial);
    file = "";
    root.printTo(file);
    saveConfigFile(file.c_str());
}
bool XAccess::isDisabled(String emp_id)
{
    String file = loadConfigFile();
    StaticJsonBuffer<JSON_SIZE> jsonBuffer;
    JsonObject &root = jsonBuffer.parseObject(file);
    if (!root["disabled"])
    {
        return false;
    }
    else
    {
        bool found = false;
        JsonArray &disabled = root["disabled"].as<JsonArray>();
        for (int i = 0; i < disabled.size(); i++)
        {
            if (disabled[i].as<String>() == emp_id)
            {
                found = true;
                break;
            }
        }
        return found;
    }
}
void XAccess::enableUID(String emp_id)
{
    String file = loadConfigFile();
    StaticJsonBuffer<JSON_SIZE> jsonBuffer;
    JsonObject &root = jsonBuffer.parseObject(file);
    if (!root["disabled"])
    {
        JsonArray &disabled = root.createNestedArray("disabled");
        disabled.add(emp_id);
    }
    else
    {
        int index = -1;
        JsonArray &disabled = root["disabled"].as<JsonArray>();
        for (int i = 0; i < disabled.size(); i++)
        {
            if (disabled[i].as<String>() == emp_id)
            {
                index = i;
                break;
            }
        }
        if (index >= 0)
        {
            Serial.println(index);
            disabled.remove(index);
            root["disabled"] = disabled;
        }
    }
    root.printTo(Serial);
    file = "";
    root.printTo(file);
    saveConfigFile(file.c_str());
}
void XAccess::disableUID(String emp_id)
{
    String file = loadConfigFile();
    StaticJsonBuffer<JSON_SIZE> jsonBuffer;
    JsonObject &root = jsonBuffer.parseObject(file);
    int index = 0;
    if (!root["disabled"])
    {
    }
    else
    {
        int index = -1;
        JsonArray &disabled = root["disabled"].as<JsonArray>();
        for (int i = 0; i < disabled.size(); i++)
        {
            if (disabled[i].as<String>() == emp_id)
            {
                index = i;
                break;
            }
        }
        if (index == -1)
        {
            disabled.add(emp_id);
        }
    }
    root.printTo(Serial);
    file = "";
    root.printTo(file);
    saveConfigFile(file.c_str());
}
JsonObject &XAccess::listData()
{
    String file = loadConfigFile();
    StaticJsonBuffer<JSON_SIZE> jsonBuffer;
    JsonObject &root = jsonBuffer.parseObject(file);
    return root;
}

void XAccess::writeTimeData(String data)
{
    File file = SPIFFS.open("time.txt", "a");
    if (file)
    {
        Serial.println("file opened");
        if (file.println(data))
        {
            Serial.println("- file written");
        }
    }
    else
    {
        Serial.println("file not openined");
    }
}
void XAccess::deleteTimeData()
{
    File file = SPIFFS.open("time.txt", "w");
    if (file)
    {
        file.print("");
    }
}
String XAccess::readTimeData()
{
    String data = "";
    File file = SPIFFS.open("time.txt", "r");
    if (file)
    {
        while (file.available())
        {
            char ch = (char)file.read();
            data += String(ch);
        }
    }
    return data;
}

void XAccess::P(String msg)
{
    Serial.println(msg);
}