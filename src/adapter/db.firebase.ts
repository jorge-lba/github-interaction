import { collection, doc, getDocs, getFirestore, initializeApp, setDoc, getDoc, query, where, orderBy } from "../../deps.ts";
import { firebaseConfig } from "../config/firebase.config.ts";
import { Dev } from "../entity/dev.entity.ts";
class DB {
  private _db: any;
  constructor() {
    const app = initializeApp(firebaseConfig, "star-wars-api");
    this._db = getFirestore(app);
  }

  async saveDev(dev: Dev) {
    await setDoc(doc(this._db, 'devs', dev.id), {
      ...dev.props,
      _id: dev.id,
    })
  }

  async listDevs() {
    const devs = await getDocs(collection(this._db, 'devs'));

    return devs.docs.map((dev) => Dev.build({
      name: dev.data().name,
      nickname: dev.data().nickname,
      avatarUrl: dev.data().avatarUrl,
      points: dev.data().points,
    }, dev.data()._id));
  }

  async findDevByNickname(nickname: string) {
    const collectionRef = collection(this._db, 'devs');
    const q = query(collectionRef, where("nickname", "==", nickname));
    const dev = await getDocs(q).then((querySnapshot) => {
      const data = querySnapshot.docs.map((doc) => doc.data());
      return data[0];
    });

    return dev ? Dev.build({
      name: dev.name,
      nickname: dev.nickname,
      avatarUrl: dev.avatarUrl,
      points: dev.points,
    }, dev._id) : null;
  }

  async rankDevs() {
    const collectionRef = collection(this._db, 'devs');
    const q = query(collectionRef, orderBy("points", "desc"));
    const devs = await getDocs(q)

    return devs.docs.map((dev) => Dev.build({
      name: dev.data().name,
      nickname: dev.data().nickname,
      avatarUrl: dev.data().avatarUrl,
      points: dev.data().points,
    }, dev.data()._id));
  }

}

export { DB };
