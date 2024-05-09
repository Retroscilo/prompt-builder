import { expand } from "../utils/expand";

export function expandContext<T extends Collection>(collection: T, config: Config<T>) {
	if (!config.context) throw new Error("Context is required to build a prompt.");
	return expand(collection, "context", config.context);
}
