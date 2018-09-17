#include <ota.h>
#include <HTTPClient.h>
#include <Update.h>

OTA::OTA()
{
}

void OTA::checkUpdate(void)
{
    HTTPClient http;

    Serial.print("[HTTP] begin...\n");

    // configure server and url
    http.begin("http://excellencetechnologies.co.in/xsmart.ino.bin");
    //http.begin("192.168.1.12", 80, "/test.html");

    Serial.print("[HTTP] GET...\n");
    // start connection and send HTTP header
    int httpCode = http.GET();
    if (httpCode > 0)
    {
        // HTTP header has been send and Server response header has been handled
        Serial.printf("[HTTP] GET... code: %d\n", httpCode);

        // file found at server
        if (httpCode == HTTP_CODE_OK)
        {

            // get lenght of document (is -1 when Server sends no Content-Length header)
            int len = http.getSize();

            if (len == -1)
            {
                if (!Update.begin(UPDATE_SIZE_UNKNOWN))
                { //start with max available size
                    Update.printError(Serial);
                }
            }
            else
            {
                Update.begin(len);
            }

            // create buffer for read
            uint8_t buff[1024] = {0};

            // get tcp stream
            WiFiClient *stream = http.getStreamPtr();

            // read all data from server
            while (http.connected() && (len > 0 || len == -1))
            {
                // get available data size
                size_t size = stream->available();

                if (size)
                {
                    // read up to 128 byte
                    int c = stream->readBytes(buff, ((size > sizeof(buff)) ? sizeof(buff) : size));

                    // write it to Serial
                    // Serial.write(buff, c);

                    if (Update.write(buff, c) != c)
                    {
                          Update.printError(Serial);
                    }
                    Serial.println(len);
                    Serial.println(c);
                    Serial.println(".");
                    if (len > 0)
                    {
                        len -= c;
                    }
                }
                yield();
            }

            if (Update.end(true))
            { //true to set the size to the current progress
                Serial.printf("Update Success: %u\nRebooting...\n", len);
            }
            else
            {
                Update.printError(Serial);
            }

            Serial.println();
            Serial.print("[HTTP] connection closed or file end.\n");
        }
    }
    else
    {
        Serial.printf("[HTTP] GET... failed, error: %s\n", http.errorToString(httpCode).c_str());
    }

    http.end();

    delay(1000 * 100); //temp
}