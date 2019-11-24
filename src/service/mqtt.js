import awsIot from 'aws-iot-device-sdk';

const MqttService = ({
  keyPath,
  certPath,
  caPath,
  clientId,
  host,
}) => new Promise((resolve, reject) => {
  let device = {};
  try {
    device = awsIot.device({
      keyPath,
      certPath,
      caPath,
      clientId,
      host,
    });
  } catch (e) {
    reject(e);
    return;
  }

  resolve({
    publish: (topic, payload) => {
      device.publish(topic, JSON.stringify(payload));
    },
  });
});

export default MqttService;
