import DotEnv from 'dotenv'

// import TemperatureSensorService from './service/temperatureSensor'
import MqttService from './service/mqtt'

DotEnv.config()

const onInterval = async () => {
    // const temp = await getTemp()
    // console.log(`temperature: ${temp}`)
    mqttService.publish(process.env.MQTT_TOPIC, {'temperature': '22.22'})
}

const mqttArgs = {
    keyPath: process.env.MQTT_KEY_PATH,
    certPath: process.env.MQTT_CERT_PATH,
    caPath: process.env.MQTT_CA_PATH,
    clientId: process.env.MQTT_CLIENT_ID,
    host: process.env.MQTT_HOST
 }

const main = async () => {
    let mqttService
    let temperatureSensorService
    try {
        // temperatureSensorService = await TemperatureSensorService()
        mqttService = await MqttService(mqttArgs)
    } catch (e) {
        console.log(e)
        return
    }

    // setInterval(onInterval, process.env.READ_INTERVAL)
    mqttService.publish(process.env.MQTT_TOPIC, {'temperature': '22.22'})
}

main()
