const firebaseConfig = {
  type: Deno.env.get("FIREBASE_TYPE"),
  projectId: Deno.env.get("FIREBASE_PROJECT_ID"),
  privateKeyId: Deno.env.get("FIREBASE_PRIVATE_KEY_ID"),
  privateKey: Deno.env.get("FIREBASE_PRIVATE_KEY"),
  clientEmail: Deno.env.get("FIREBASE_CLIENT_EMAIL"),
  clientId: Deno.env.get("FIREBASE_CLIENT_ID"),
  authUri: Deno.env.get("FIREBASE_AUTH_URI"),
  tokenUri: Deno.env.get("FIREBASE_TOKEN_URI"),
  authProviderX509CertUrl: Deno.env.get("FIREBASE_AUTH_PROVIDER_X509_CERT_URL"),
  clientX509CertUrl: Deno.env.get("FIREBASE_CLIENT_X509_CERT_URL"),
  storageBucket: `${Deno.env.get("FIREBASE_PROJECT_ID")}.appspot.com`,
}

type FirebaseConfig = {
  type: string | undefined;
  projectId: string | undefined;
  privateKeyId: string | undefined;
  privateKey: string | undefined;
  clientEmail: string | undefined;
  clientId: string | undefined;
  authUri: string | undefined;
  tokenUri: string | undefined;
  authProviderX509CertUrl: string | undefined;
  clientX509CertUrl: string | undefined;
  storageBucket: string | undefined;
}

export { firebaseConfig, type FirebaseConfig };