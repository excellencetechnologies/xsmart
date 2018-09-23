#ifndef XAccess_h
#define XAccess_h

#include <String>
#include <ArduinoJson.h>

// library interface description
class XAccess
{
  // user-accessible "public" interface
  public:
    XAccess(char * configfile);
    void initConfig(void);
    String checkUID(String);
    void addUID(String, String);
    void deleteUID(String);
    void disableUID(String);
    bool isDisabled(String);
    void enableUID(String);
    JsonObject& listData();
    
  private:
    char * configfile;
    void P(String);
    String loadConfigFile(void);
    void saveConfigFile(const char *);
};

#endif

