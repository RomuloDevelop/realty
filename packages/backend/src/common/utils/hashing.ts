import * as bcrypt from 'bcrypt';

export default class Hashing {
  static async hashKey(key: string) {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(key, salt);
  }

  static async compareKeyWithHash(key: string, hash: string) {
    return bcrypt.compare(key, hash);
  }
}
