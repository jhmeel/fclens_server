const Config = {
  PORT: process.env.PORT || 8000,
  MONGOOSE: {
    URI: process.env.MONGOOSE_URI||'mongodb+srv://Jhmeel:08081434@cluster0.cyblpqk.mongodb.net/',
  },
  LOGGER: {
    LOG_STORAGE_PATH: "./log",
    MAX_LOG_FILE: 3,
    MAX_LOG_FILE_SIZE: 15 << 20,
  },
};

export default Config;
