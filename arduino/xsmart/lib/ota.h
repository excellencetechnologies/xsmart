#ifndef OTA_h
#define OTA_h

#include <String>
#include <ArduinoJson.h>

// library interface description
class OTA
{
  // user-accessible "public" interface
  public:
    OTA();
    void checkUpdate(void);
    

  // library-accessible "private" interface
  private:
    char * configfile;
};

#endif

