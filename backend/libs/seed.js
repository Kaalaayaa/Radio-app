import faker from 'faker';
import Comment from '../models/comment.js';

export default async function seed() {
	await Comment.deleteMany({});

	const fakeComments = [];

	for (let i = 6; --i; ) {
		const comment = await Comment.create({
			// user: // can't be used in faker if it's tied to objectIDs ...?
			title: faker.lorem.words(5),
			content: faker.lorem.sentence()
		})
		fakeComments.push(comment);
	}
}