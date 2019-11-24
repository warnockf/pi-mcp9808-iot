const raspi = require('raspi');
const I2C = require('raspi-i2c').I2C;

const i2c = new I2C();

const SENSOR_ADDRESS = 0x18;
const CONFIG_REGISTER = 0x01;
const SENSOR_REGISTER = 0x05;

const initAsync = () => new Promise((resolve, reject) => {
  raspi.init(() => {
    i2c.write(SENSOR_ADDRESS, CONFIG_REGISTER, Buffer.alloc(2), () => {
      setTimeout(() => {
        resolve();
      }, 500);
    });
  });
});

const readTempAsync = () => new Promise((resolve, reject) => {
  i2c.readWord(SENSOR_ADDRESS, SENSOR_REGISTER, (err, data) => {
    if (err) {
      reject(err);
    } else {
      const raw = data;

      // Get the lower 4 bits of the upper byte (Uppr bits not useful)
      const upper = raw & 0x0F;
      const lower = raw >> 8;

      // Combine the upper and lower bytes
      let currentTemp = upper << 8 | lower;
      currentTemp = currentTemp >> 4;

      // The lower 4 bits of the lower byte are what comes after the decimal in the temperature reading
      let dec = lower & 0xF;
      dec = dec / 16;

      const temp = currentTemp + dec;
      resolve(temp);
    }
  });
});

const service = () => new Promise(async (resolve, reject) => {
  try {
    await initAsync();
  } catch (e) {
    reject(e);
    return;
  }

  resolve({
    getTemp: async () => {
      return readTempAsync();
    },
  });
});

export default service;
