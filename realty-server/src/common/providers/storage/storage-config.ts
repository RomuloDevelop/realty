const StorageConfig = {
  projectId: process.env.GC_PROJECT_ID,
  private_key: process.env.GC_PRIVATE_KEY,
  client_email: process.env.GC_CLIENT_EMAIL,
  client_id: process.env.GC_CLIENT_ID,
  mediaBucket: process.env.GC_STORAGE_MEDIA_BUCKET,
};

export default StorageConfig;
