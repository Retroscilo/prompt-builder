import { expandContext } from "./actions/expandContext";
import { expandFormat } from "./actions/expandFormat";
import { expandConstraints } from "./actions/expandConstraints";
import { expandInterfaces } from "./actions/expandInterfaces";
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
