import mongoose from 'mongoose';

const password = 's3Y9HUnP9MHtGcK6';

mongoose.connect(
  `mongodb+srv://testInsole:${password}@cluster0.zoc4fqm.mongodb.net/?retryWrites=true&w=majority`,
).catch(() => console.log('Banco Conectado'));

// mongoose.connect(
//   'mongodb+srv://root:root@cluster0.rhyzehd.mongodb.net/bancodaapi?retryWrites=true&w=majority',
// ).catch(() => console.log('Banco Conectado'));

// eslint-disable-next-line import/prefer-default-export
export { mongoose };
