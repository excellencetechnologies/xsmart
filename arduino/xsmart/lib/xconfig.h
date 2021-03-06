#ifndef XConfig_h
#define XConfig_h

#include <String>
#include <ArduinoJson.h>

// library interface description
class XConfig
{
  // user-accessible "public" interface
  public:
    XConfig(char * configfile);
    void initConfig(void);
    String loadConfigFile(void);
    void saveConfigFile(const char *);
    void deleteWifiSSID(String);
    JsonObject& getWifiSSID(void);
    void addWifiSSID(String, String);
    void setNickName(String);
    String getNickName();
    void testConfig(void);
    JsonArray& getPinConfig();
    void setPinConfig(JsonArray&);
    void deletePinConfig(void);
    String getPinName(int);
    void setPinName(int, String);
    void setDeviceTimezone(int);
    int getDeviceTimezone();

  // library-accessible "private" interface
  private:
    char * configfile;
    void P(String);
};

#endif

