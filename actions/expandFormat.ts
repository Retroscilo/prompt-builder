import { expand } from "../utils/expand";

export function expandFormat<T extends Collection>(collection: T, config: Config<T>) {
	if (!config.format) return "";
	return expand(collection, "format", config.format);
}
