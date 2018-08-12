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
    JsonArray& getWifiSSID(void);
    void addWifiSSID(String, String);
    void testConfig(void);

  // library-accessible "private" interface
  private:
    char * configfile;
};

#endif

