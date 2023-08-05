import {
  initializeApp,
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  getDoc,
  where,
  orderBy,
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";
import { uuid } from "https://deno.land/x/uuid@v0.1.2/mod.ts";

export {
  getFirestore,
  initializeApp,
  uuid,
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  getDoc,
  where,
  orderBy
};
