
 import { initializeApp } from "@firebase/app";
import {getDocs, collectionGroup, connectFirestoreEmulator, getFirestore, setDoc, doc, terminate} from 'firebase/firestore';
import {
    FirebaseFirestore,
  } from '@capacitor-firebase/firestore';

  const firebaseConfig = {
    apiKey: "test",
    authDomain: "test.firebaseapp.com",
    projectId: "test",
    storageBucket: "test.appspot.com",
    messagingSenderId: "test",
    appId: "test",
    measurementId: "test"
  };
  

  beforeAll(async () => {
    initializeApp(firebaseConfig);
    connectFirestoreEmulator(getFirestore(), 'localhost', 8080);
    await setDoc(doc(getFirestore(), 'foos/foo1/bars/bar1'), {nothing: 'here'});
    await setDoc(doc(getFirestore(), 'foos/foo2/bars/bar2'), {nothing: 'here'});
  })


  afterAll(async () => {
    await terminate(getFirestore());
    });




describe('firestore', () => { 

    it('should get data from firestore', async () => {
        const docs = await getDocs(collectionGroup(getFirestore(), 'bars'));
        const data = docs.docs.map((doc) => doc.data());
        expect(data.length).toBe(2);
    })

    it('should get data from capacitor firestore', async () => {
        const collectionGroup = await FirebaseFirestore.getCollectionGroup({
            reference: 'bars',
          });
          const data = collectionGroup.snapshots.map((snapshot) => snapshot.data);
          expect(data.length).toBe(2);

    })
 })