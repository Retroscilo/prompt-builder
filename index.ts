import { expandContext, expandConstraints, expandFormat, expandInterfaces } from "./utils/expand";
export default function createPrompt<T extends Collection>(
	collection: T,
	config: Config<T>
): string {
	const context = expandContext(collection, config);
	const format = expandFormat(collection, config);
	const constraints = expandConstraints(collection, config);
	const interfaces = expandInterfaces(collection, config);
	return `${context} ${format} ${constraints} ${interfaces}`;
}
