import DotEnv from 'dotenv';

import TemperatureSensorService from './service/temperatureSensor';
import MqttService from './service/mqtt';

DotEnv.config();

const onInterval = async (temperatureSensorService, mqttService) => {
  const temp = await temperatureSensorService.getTemp();
  console.log(`temperature: ${temp}`);
  mqttService.publish(process.env.MQTT_TOPIC, {'temperature': temp});
};

const mqttArgs = {
  keyPath: process.env.MQTT_KEY_PATH,
  certPath: process.env.MQTT_CERT_PATH,
  caPath: process.env.MQTT_CA_PATH,
  clientId: process.env.MQTT_CLIENT_ID,
  host: process.env.MQTT_HOST,
};

const main = async () => {
  let mqttService;
  let temperatureSensorService;
  try {
    temperatureSensorService = await TemperatureSensorService();
    mqttService = await MqttService(mqttArgs);
  } catch (e) {
    console.log(e);
    return;
  }

  setInterval(() => onInterval(temperatureSensorService, mqttService), process.env.READ_INTERVAL);
};

main();
