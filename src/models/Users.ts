interface UserProps {
	id?: number;
	name?: string;
	age?: number;
}

type Callback = () => void;

export class User {
	events: { [key: string]: Callback[] } = {};

	constructor(private data: UserProps) {}

	get(propName: string): string | number {
		return this.data[propName];
	}

	set(update: Partial<UserProps>): void {
		this.data = { ...this.data, ...update };
	}

	on(eventName: string, callback: Callback): void {
		const handlers = this.events[eventName] || [];
		handlers.push(callback);
		this.events[eventName] = handlers;
	}

	trigger(eventName: string): void {
		const handlers = this.events[eventName] || [];

		handlers.forEach((callback) => {
			callback();
		});
	}

	async fetch(): Promise<void> {
		try {
			const response = await fetch(
				`http://localhost:3001/users/${this.get('id')}`,
				{
					headers: {
						'Content-Type': 'application/json',
					},
				}
			);

			if (!response.ok) {
				throw new Error(`HTTP error ${response.status}`);
			}

			const responseData: UserProps = await response.json();
			this.set(responseData);
		} catch (error) {
			console.error(error);
		}
	}

	async save(): Promise<void> {
		const id = this.get('id');

		if (id) {
			try {
				const response = await fetch(
					`http://localhost:3001/users/${id}`,
					{
						method: 'PUT',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify(this.data),
					}
				);

				if (!response.ok) {
					throw new Error(`HTTP error ${response.status}`);
				}
			} catch (error) {
				console.error(error);
			}
		} else {
			try {
				const response = await fetch('http://localhost:3001/users', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(this.data),
				});

				if (!response.ok) {
					throw new Error(`HTTP error ${response.status}`);
				}
			} catch (error) {
				console.error(error);
			}
		}
	}
}
