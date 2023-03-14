import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log('Post to the DB');

  // Connect to the database and send the version number
  const jateDB = await openDB('jate', 1);

  // New transaction and specify the DB and privileges
  const txn = jateDB.transaction('jate', 'readwrite');

  // Open the object store
  const store = txn.objectStore('jate');

  // Add the content to the database
  const request = store.put({ id:1, content });

  // Wait for the transaction to complete
  const result = await request;

  console.log('Result: ', result);
}

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('Get from the DB');

  // Connect to the database and send the version number
  const jateDB = await openDB('jate', 1);

  // New transaction and specify the DB and privileges
  const txn = jateDB.transaction('jate', 'readonly');

  // Open the object store
  const store = txn.objectStore('jate');

  // Get all the content from the database
  const request = store.getAll();

  // Wait for the transaction to complete
  const result = await request;

  console.log('Result: ', result);

  return result;
};

initdb();
