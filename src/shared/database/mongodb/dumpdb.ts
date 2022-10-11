import fs from 'fs';
import _ from 'lodash';
import { MongoClient } from 'mongodb';

import 'dotenv/config';
import searchFiles from '@shared/utils/files/searchFiles.util';

const connectionUri = process.env.DATABASE_URL;

const mongodb = new MongoClient(connectionUri || '');
const dbName = 'criarvarejo_api_v2';

const files = searchFiles.getAllFiles(
  {},
  `${__dirname}/../../../../JSON-SEEDS`,
  ['.json.ts']
);

function writeLog(collectionName: string) {
  console.log('--------------------------------------------------------');
  console.log(`Fazendo backup de ${collectionName}`);
}

mongodb.connect(async () => {
  const db = mongodb.db(dbName);
  db.collections(async (err, collections) => {
    if (!_.isNil(collections)) {
      collections?.forEach(async ({ collectionName }) => {
        const content = await db.collection(collectionName).find().toArray();
        const backupAlreadyExists = fs.existsSync(
          `./JSON-SEEDS/${collectionName}.seed.json`
        );
        if (backupAlreadyExists) {
          fs.unlinkSync(`./JSON-SEEDS/${collectionName}.seed.json`);
        }

        const cllName = collectionName.replaceAll('.', '_');
        const newName = _.camelCase(cllName);
        writeLog(newName);

        fs.writeFileSync(
          `./JSON-SEEDS/${collectionName}.seed.json`,
          `{"${newName}": ${JSON.stringify(content)}}`
        );
      });
    }
  });
});

setTimeout(() => {
  console.log('--------------------------------------------------------\n');
  console.log('Backup concluido\n');
  process.exit(0);
}, 60 * 60 * 5);
