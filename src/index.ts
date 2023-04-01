import { User } from './models/Users';

const user = new User({ name: 'Austin', age: 28 });

user.save();
