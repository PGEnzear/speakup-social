class ApplicationData {

  static wsServer;
  static expressServer;
  static databaseConnection;
  static redisConnection;
  static telegramBotConnection;
  static vkBotConnection;
  static passport;
  static discordBotConnection;

  static setWsServer(val) { ApplicationData.wsServer = val };
  static setExpressServer(val) { ApplicationData.server = val };
  static setDatabaseConnection(val) { ApplicationData.databaseConnection = val };
  static setRedisConnection(val) { ApplicationData.redisConnection = val };
  static setTelegramBotConnection(val) { ApplicationData.telegramBotConnection = val };
  static setVkBotConnection(val) { ApplicationData.vkBotConnection = val };
  static setDiscordBotConnection(val) { ApplicationData.discordBotConnection = val };
  static setPassport(val) { ApplicationData.passport = val };

  static getPassport() { return ApplicationData.passport }
  static getWsServer() { return ApplicationData.wsServer };
  static getExpressServer() { return ApplicationData.expressServer };
  static getDatabaseConnection() { return ApplicationData.databaseConnection };
  static getRedisConnection() { return ApplicationData.redisConnection };
  static getTelegramBotConnection() { return ApplicationData.telegramBotConnection };
  static getVkBotConnection() { return ApplicationData.vkBotConnection };
  static getDiscordBotConnection() { return ApplicationData.discordBotConnection };
}

export default ApplicationData