#ifndef Access_h
#define Access_h

#include <String>
#include <ArduinoJson.h>

// library interface description
class Access
{
  // user-accessible "public" interface
  public:
    Access(char * configfile);
    void initConfig(void);
    String checkUID(String);
    void addUID(String, String);
    
  private:
    char * configfile;
    void P(String);
    String loadConfigFile(void);
    void saveConfigFile(const char *);
};

#endif

