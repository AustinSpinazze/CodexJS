import { User } from './models/Users';

const user = new User({ name: 'Steve', age: 30 });

user.on('change', () => {
	console.log('Change #1');
});
user.on('change', () => {
	console.log('Change #2');
});
user.on('save', () => {
	console.log('Save triggered');
});

user.trigger('change');
user.trigger('save');
user.trigger('blah');
