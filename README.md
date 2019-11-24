# pi-mcp9808-iot
A temperature sensor for the Raspberry Pi that communicates with AWS IOT via MQTT.

## Sensor module
The sensor module used in this project is the MCP9808 i2c temperature sensor from Adafruit.

### Instructions
1. Hook pins 1 (3.3V), 3 (SDA), 5 (SCL), 9 (GND) of the Raspberry Pi pin header to the MCP9808 module
1. Hook the additional address pins of the MCP9808 to `GND`, setting the adress of the i2c device to `0x18` 
1. npm install
1. npm run start